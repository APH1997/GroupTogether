const express = require('express');
const router = express.Router();
const { Attendance, EventImage, Event, Venue, GroupImage, User, Group, Membership, sequelize } = require('../../db/models');

router.get('/', async (req, res, next) => {
    const events = await Event.findAll({
        include:
            [
                { model: Venue, attributes: ['id', 'city', 'state'] },
                { model: Attendance },
                { model: EventImage },
                { model: Group, attributes: ['id', 'name', 'city', 'state'] }
            ]
    });

    const eventsList = [];

    events.forEach(event => {
        eventsList.push(event.toJSON())
    })

    for (let event of eventsList) {
        delete event.description;
        delete event.createdAt;
        delete event.updatedAt;
        delete event.capacity;
        delete event.price;

        event.numAttending = 0;
        for (let attendance of event.Attendances) {
            if (attendance.status === 'attending') {
                event.numAttending++
            }
        }
        delete event.Attendances;

        for (let image of event.EventImages) {
            if (image.preview === true) {
                event.previewImage = image.url
            }
        }
        delete event.EventImages;

    }

    return res.json({ Events: eventsList });
})

router.get('/:eventId', async (req, res, next) => {
    const event = await Event.findByPk(req.params.eventId, {
        include:
            [
                { model: Group, attributes: ['id', 'name', 'private', 'city', 'state'] },
                { model: Venue, attributes: ['id', 'address', 'city', 'state', 'lat', 'lng'] },
                { model: EventImage, attributes: ['id', 'url', 'preview'] }
            ],
    })

    if (!event) {
        res.status(404);
        res.json({ "message": "Event couldn't be found" })
    }

    const resEvent = event.toJSON();
    delete resEvent.createdAt;
    delete resEvent.updatedAt;

    return res.json(resEvent)
});

router.post('/:eventId/images', async (req, res, next) => {
    const { user } = req;
    const event = await Event.findByPk(req.params.eventId, {
        include:
            [
                { model: Group, include: { model: Membership } },
                { model: Attendance }
            ]
    });
    if (!user) {
        res.status(401);
        return res.json({ "message": "Authentication required" })
    }
    if (!event) {
        res.status(404);
        res.json({ "message": "Event couldn't be found" })
    }

    //Authorization
    for (let membership of event.Group.Memberships) {
        if (membership.userId === user.id) {
            if (membership.status !== 'organizer' && membership.status !== 'co-host') {
                for (let attendance of event.Attendances) {
                    if (attendance.userId === user.id) {
                        if (attendance.status !== 'attending') {
                            res.status(403);
                            return res.json({ "message": "Forbidden" })
                        }
                    }
                }
            }
        }
    }
    const { url, preview } = req.body;

    const image = await event.createEventImage({
        url,
        preview
    })

    const resImage = image.toJSON();

    delete resImage.eventId
    delete resImage.updatedAt
    delete resImage.createdAt

    res.json(resImage)
})

router.put('/:eventId', async (req, res, next) => {
    const { user } = req;
    const event = await Event.findByPk(req.params.eventId, {
        include:
            [
                { model: Group, include: { model: Membership } }
            ]
    })

    if (!user) {
        res.status(401);
        return res.json({ "message": "Authentication required" })
    };
    if (!event) {
        res.status(404);
        res.json({ "message": "Event couldn't be found" })
    };

    for (let membership of event.Group.Memberships) {
        if (user.id === membership.userId) {
            const status = membership.status;
            if (status !== 'organizer' && status !== 'co-host') {
                res.status(403);
                return res.json({ "message": "Forbidden" })
            }
        }
    }

    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;
    const venue = await Venue.findByPk(venueId)
    if (!venue) {
        res.status(404);
        return res.json({ "message": "Venue couldn't be found" })
    }
    try {
        event.venueId = venueId;
        event.name = name;
        event.type = type;
        event.capacity = capacity;
        event.price = price;
        event.description = description;
        event.startDate = startDate;
        event.endDate = endDate;
        event.updatedAt = new Date();

        await event.save();

        const resEvent = event.toJSON();
        delete resEvent.Group
        delete resEvent.updatedAt
        delete resEvent.createdAt

        return res.json(resEvent);

    } catch (e) {
        next(e);
    }

})

router.delete('/:eventId', async (req, res, next) => {
    const { user } = req;
    const event = await Event.findByPk(req.params.eventId, {
        include:
            { model: Group, include: { model: Membership } }
    });

    if (!user) {
        res.status(401);
        return res.json({ "message": "Authentication required" })
    };
    if (!event) {
        res.status(404);
        return res.json({ "message": "Event couldn't be found" })
    };

    for (let membership of event.Group.Memberships) {
        if (user.id === membership.userId) {
            const status = membership.status;
            if (status !== 'organizer' && status !== 'co-host') {
                res.status(403);
                return res.json({ "message": "Forbidden" })
            }
        }
    }

    await event.destroy();
    return res.json({ "message": "Successfully deleted" })
})

router.get('/:eventId/attendees', async (req, res, next) => {
    const { user } = req;
    //check if event exists
    const event = await Event.findByPk(req.params.eventId);
    if (!event) {
        res.status(404);
        return res.json({
            "message": "Event couldn't be found",
        })
    }
    //if organizer or cohost, include pending statuses
    const attendances = await Attendance.findAll({
        where: { eventId: req.params.eventId },
        include:
            [
                { model: Event, include: { model: Group, include: { model: Membership } } },
                { model: User }
            ],
    })

    //json the attendances for manipulation
    let attendanceList = []
    attendances.forEach(attendance => {
        attendanceList.push(attendance.toJSON())
    })

    //determine whether or not user is co-host/organizer
    let userStatus;
    if (user) {
        //only need [0] because each group return is the same one
        for (let member of attendanceList[0].Event.Group.Memberships) {
            if (member.userId === user.id) {
                userStatus = member.status;
            }
        }
    }



    let attendees = [];
    for (let attendance of attendanceList) {
        attendance.id = attendance.User.id
        attendance.firstName = attendance.User.firstName;
        attendance.lastName = attendance.User.lastName;
        attendance.Attendance = { status: attendance.status };
        delete attendance.User;
        delete attendance.Event;
        delete attendance.updatedAt;
        delete attendance.createdAt;
        delete attendance.userId;
        delete attendance.status;
        delete attendance.eventId;

        //Res all attendees for host/co-host
        if (userStatus === 'organizer' || userStatus === 'co-host') {
            attendees.push(attendance);
        } else {
            //Don't add pending attendees if not host or co-host
            if (attendance.Attendance.status !== 'pending') {
                attendees.push(attendance)
            }
        }
    }
    return res.json({ Attendees: attendees })
});

router.post('/:eventId/attendance', async (req, res, next) => {
    const {user} = req;
    const event = await Event.findByPk(req.params.eventId);

    //Authenticate user and check if valid event
    if (!user) {
        res.status(401);
        return res.json({ "message": "Authentication required" })
    };
    if (!event) {
        res.status(404);
        return res.json({ "message": "Event couldn't be found" })
    };

    //Check if user is already attendee or requested
    const attendance = await Attendance.findOne({
        where: {userId: user.id}
    })
    if (attendance){
        res.status(400);
        if (attendance.status === 'attending'){
            return res.json({
                "message": "User is already an attendee of the event",
              })
        } else {
            //user is waitlisted or pending
            return res.json({
                "message": "Attendance has already been requested",
              })
        }
    }

    //Create attendance for user with status "pending":
    const newAttendance = await Attendance.create({
        eventId: event.id,
        userId: user.id,
        status: 'pending'
    });

    return res.json({
        userId: newAttendance.userId,
        status: newAttendance.status
    })
});

router.put('/:eventId/attendance', async (req, res, next) => {
    const {userId, status} = req.body;
    //Throw error if status is pending
    if (status === 'pending'){
        res.status(400);
        res.json({
            "message": "Cannot change an attendance status to pending",
          })
    }
    const {user} = req;
    const event = await Event.findByPk(req.params.eventId, {
        include:
        [
            {model: Attendance},
            {model: Group, include: {model: Membership}}
        ]
    })

    //Validate user, event
    if (!user) {
        res.status(401);
        return res.json({ "message": "Authentication required" })
    };
    if (!event) {
        res.status(404);
        return res.json({ "message": "Event couldn't be found" })
    };


    //Check if user is host or co-host
    let userStatus;
    for (let member of event.Group.Memberships){
        if (member.userId === user.id){
            userStatus = member.status;
        }
    }
    if (userStatus !== 'organizer' && userStatus !== 'co-host'){
        res.status(403);
        return res.json({
            "message": "Forbidden",
          })
    }

    //Check if target user has a pending request
    for (let attendee of event.Attendances){
        if (userId === attendee.userId){
            attendee.status = status;
            await attendee.save();
            return res.json({
                id: attendee.id,
                eventId: attendee.eventId,
                userId: attendee.userId,
                status: attendee.status
            })
        }
    }

    //attendance record not found
    res.status(404);
    return res.json({
        "message": "Attendance between the user and the event does not exist",
      })
});

router.delete('/:eventId/attendance', async (req, res, next) => {
    const {user} = req;
    const {userId} = req.body;
    const targetId = userId;

    const event = await Event.findByPk(req.params.eventId, {
        include:
        [
            {model: Group},
            {model: Attendance}
        ]
    });


    //Validate user, event
    if (!user) {
        res.status(401);
        return res.json({ "message": "Authentication required" })
    };
    if (!event) {
        res.status(404);
        return res.json({ "message": "Event couldn't be found" })
    };


    //Throw error if user is NOT the group organizer or target
    if (user.id !== event.Group.organizerId && user.id !== targetId){
        res.status(403);
        return res.json({
            "message": "Only the User or organizer may delete an Attendance",
          })
    }

    //Iterate through event.Attendances to find target
    for (let attendee of event.Attendances){
        if (attendee.userId === targetId){
            const targetAttendance = await Attendance.findByPk(attendee.id)
            await targetAttendance.destroy();
            return res.json({
                "message": "Successfully deleted attendance from event"
              })
        }
    }


    //if it gets here, SHOULD mean attendance Does not exist
    res.status(404);
    return res.json({
        "message": "Attendance does not exist for this User",
      })
})



module.exports = router;