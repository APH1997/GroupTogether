const express = require('express');
const router = express.Router();
const { Attendance, EventImage, Event, GroupImage, User, Group, Membership, sequelize } = require('../../db/models');

router.get('/', async (req, res, next) => {
    let { page, size, name, type, startDate } = req.query;
    const errors = {};
    if (page || page === 0) {
        if (page < 1) { errors.page = "Page must be greater than or equal to 1" }
        if (page > 10) page = 10;
    } else { page = 1 }

    if (size || size === 0) {
        if (size < 1) { errors.size = "Size must be greater than or equal to 1" }
        if (size > 20) page = 20;
    } else { size = 20 }

    if (name) {
        if (typeof name !== 'string') { errors.name = "Name must be a string" }
    }
    if (type) {
        if (type !== 'Online' && type !== 'In person') { errors.type = "Type must be 'Online' or 'In Person'" }
    }
    if (startDate) {
        if ((new Date(startDate)).toString() === "Invalid Date") { errors.startDate = "Start date must be a valid datetime" }
    }
    if (Object.keys(errors).length) {
        res.status(400);
        return res.json({
            "message": "Bad Request",
            errors
        })
    }
    //Build query object
    const offset = size * (page - 1);
    const limit = size;
    const where = {}
    if (name) where.name = name;
    if (type) where.type = type;
    if (startDate) where.startDate = startDate;


    const events = await Event.findAll({
        where,
        include:
            [
                { model: Attendance },
                { model: EventImage },
                { model: Group, attributes: ['id', 'name', 'city', 'state'] }
            ],
        limit,
        offset
    });

    const eventsList = [];

    events.forEach(event => {
        eventsList.push(event.toJSON())
    })

    for (let event of eventsList) {
        // delete event.description;
        delete event.createdAt;
        delete event.updatedAt;
        delete event.capacity;
        delete event.price;

        event.attendances = {}
        event.numAttending = 0;
        for (let attendance of event.Attendances) {
            if (attendance.status === 'attending') {
                event.numAttending++
            }
            event.attendances[attendance.userId] = attendance
        }
        delete event.Attendances;

        for (let image of event.EventImages) {
            if (image.preview === true) {
                event.previewImage = image.url
            }
        }
        delete event.EventImages;
    }

    return res.json({ Events: eventsList, page, size });
})

router.get('/:eventId', async (req, res, next) => {
    const event = await Event.findByPk(req.params.eventId, {
        include:
            [
                {
                    model: Group, attributes: ['id', 'name', 'private', 'city', 'state'],
                    include: [{ model: GroupImage }, { model: User, as: 'Organizer' }]
                },
                { model: EventImage, attributes: ['id', 'url', 'preview'] },
                { model: Attendance }
            ],
    })


    if (!event) {
        res.status(404);
        return res.json({ "message": "Event couldn't be found" })
    }

    const resEvent = event.toJSON();
    resEvent.numAttending = resEvent.Attendances.length;
    resEvent.attendances = {}
    for (let attendance of resEvent.Attendances) {
        resEvent.attendances[attendance.userId] = attendance
    }
    delete resEvent.Attendances;
    delete resEvent.createdAt;
    delete resEvent.updatedAt;
    resEvent.Group.GroupImages.forEach(groupImage => {
        if (groupImage && groupImage.preview) {
            resEvent.Group.imgUrl = groupImage.url
        }
    })
    delete resEvent.Group.GroupImages;

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
        return res.json({ "message": "Event couldn't be found" })
    }

    //Authorization
    let userStatus;

    if (event.Group.organizerId === user.id) {
        userStatus = 'organizer';
    } else {
        for (let member of event.Group.Memberships) {
            if (member.dataValues.userId === user.id) {
                userStatus = member.dataValues.status;
            };
        };
    };


    if (userStatus !== 'organizer' && userStatus !== 'co-host') {
        userStatus = 'check'
        for (let attendance of event.Attendances) {
            if (attendance.userId === user.id) {
                userStatus = attendance.status;
                if (userStatus !== 'attending') {
                    res.status(403);
                    return res.json({
                        "message": "Forbidden",
                    })
                }
            }
        }
        if (userStatus === 'check') {
            res.status(403);
            return res.json({
                "message": "Forbidden",
            })
        }
    }

    const { url, preview } = req.body;
    //validation erros
    const errors = {};
    if (!url) errors.url = "Image URL is required";
    if (typeof preview !== 'boolean') errors.preview = "Image preview is required and must be true or false"
    if (Object.keys(errors).length) {
        let err = {};
        err.message = "Bad Request"
        err.errors = { ...errors }
        err.status = 400;
        err.title = 'Validation Error'
        next(err);
    }
    const image = await event.createEventImage({
        url,
        preview
    })

    const resImage = image.toJSON();

    delete resImage.eventId
    delete resImage.updatedAt
    delete resImage.createdAt

    return res.json(resImage)
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
    let status;
    if (event.Group.organizerId === user.id) {
        status = 'organizer'
    }
    if (status !== 'organizer') {
        for (let membership of event.Group.Memberships) {
            if (user.id === membership.userId) {
                status = membership.status;
            }
        }
    }
    if (status !== 'organizer' && status !== 'co-host') {
        res.status(403);
        return res.json({ "message": "Forbidden" })
    }

    const { lat, lng, name, type, capacity, price, description, startDate, endDate } = req.body;

    const errors = {};
    // TODO: check the data validations
    if (!name || name.length < 5) errors.name = "Name must be at least 5 characters";
    if (type !== 'Online' && type !== 'In person') errors.type = 'Type must be Online or In person';
    if (capacity % 1 !== 0) errors.capacity = "Capacity must be an integer";
    if (typeof price !== 'number' || price < 0) errors.price = 'Price is invalid';
    if (!description) errors.description = "Description is required";
    if (new Date(startDate) < new Date()) errors.startDate = 'Start date must be in the future';
    if (new Date(endDate) < new Date(startDate)) errors.endDate = 'End date is less than start date';
    if (lat < -90 || lat > 90) errors.lat = "Latitude must be between -90 and 90"
    if (lng < -180 || lng > 180) errors.lat = "Longitude must be between -180 and 180"

    if (Object.keys(errors).length) {
        let err = {};
        err.message = "Bad Request"
        err.errors = { ...errors }
        err.status = 400;
        err.title = 'Validation Error'
        next(err);
    }

    try {
        event.lat = lat;
        event.lng = lng;
        event.name = name;
        event.type = type;
        event.capacity = capacity;
        event.price = price.toFixed(2);
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

    let status;
    if (event.Group.organizerId === user.id) status = 'organizer';
    if (status !== 'organizer') {
        for (let membership of event.Group.Memberships) {
            if (user.id === membership.userId) {
                status = membership.status;
            }
        }
    }

    if (status !== 'organizer' && status !== 'co-host') {
        res.status(403);
        return res.json({ "message": "Forbidden" })
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

    if (attendances && !attendances.length) {
        return res.json({ Attendees: attendances })
    }

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
    if (attendances[0].Event.Group.organizerId === user.id) userStatus = 'organizer'


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
    const { user } = req;
    const event = await Event.findByPk(req.params.eventId, {
        include: { model: Group, include: { model: Membership } }
    });
    //Authenticate user and check if valid event
    if (!event) {
        res.status(404);
        return res.json({ "message": "Event couldn't be found" })
    };
    if (!user) {
        res.status(401);
        return res.json({ "message": "Authentication required" })
    };
    //Check if user is in group
    let isMember;
    for (let member of event.Group.Memberships) {
        if (member.userId === user.id) isMember = true;
    }
    if (!isMember) {
        res.status(403);
        return res.json({ "message": "Forbidden" })
    }

    //Check if user is already attendee or requested
    const attendance = await Attendance.findOne({
        where: { userId: user.id, eventId: event.id }
    })
    if (attendance) {
        res.status(400);
        if (attendance.status === 'attending') {
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

    // TODO: just make the status attending
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
    const { userId, status } = req.body;
    //Throw error if status is pending
    if (status === 'pending') {
        res.status(400);
        res.json({
            "message": "Cannot change an attendance status to pending",
        })
    }
    const { user } = req;
    const event = await Event.findByPk(req.params.eventId, {
        include:
            [
                { model: Attendance },
                { model: Group, include: { model: Membership } }
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
    for (let member of event.Group.Memberships) {
        if (member.userId === user.id) {
            userStatus = member.status;
        }
    }
    if (event.Group.organizerId === user.id) userStatus = 'organizer'
    if (userStatus !== 'organizer' && userStatus !== 'co-host') {
        res.status(403);
        return res.json({
            "message": "Forbidden",
        })
    }

    //Check if target user has a pending request
    for (let attendee of event.Attendances) {
        if (userId === attendee.userId) {
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
    const { user } = req;
    const { userId } = req.body;
    const targetId = userId;

    const event = await Event.findByPk(req.params.eventId, {
        include:
            [
                { model: Group },
                { model: Attendance }
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
    if (user.id !== event.Group.organizerId && user.id !== targetId) {
        res.status(403);
        return res.json({
            "message": "Only the User or organizer may delete an Attendance",
        })
    }



    for (let attendee of event.Attendances) {
        if (attendee.userId === targetId) {
            const targetAttendance = await Attendance.findOne({
                where: { userId: targetId, eventId: event.id }
            })
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
