const express = require('express');
const router = express.Router();
const { Attendance, Event, EventImage, GroupImage, User, Group, Membership, sequelize } = require('../../db/models');
const { Op } = require("sequelize");

router.get('/', async (req, res) => {
    const groups = await Group.findAll({

        include:
            [
                { model: Membership },
                { model: GroupImage },
                { model: Event      }

            ]
    })
    let groupsList = [];
    groups.forEach(group => {
        groupsList.push(group.toJSON())
    })

    groupsList.forEach(group => {
        //default; if not images this message will display
        group.previewImage = 'No image preview available'
        group.GroupImages.forEach(groupImage => {
            if (groupImage && groupImage.preview === true) {
                group.previewImage = groupImage.url
            } else {
                group.previewImage = 'No image preview available'
            }
        });

        group.numMembers = 0;
        for (let member of group.Memberships) {
            if (member.status !== 'pending') {
                group.numMembers++
            }
        }

        delete group.Memberships;
        delete group.GroupImages;
    })
    return res.json({ Groups: groupsList });
});

router.get('/current', async (req, res, next) => {
    const { user } = req;
    if (user) {
        const memberships = await user.getMemberships({
            include:
                [
                    {
                        model: Group,
                        include: [{ model: Membership }, { model: GroupImage }]
                    }
                ]
        });

        let userGroups = [];
        memberships.forEach(membership => {
            userGroups.push(membership.Group.toJSON());
        });

        userGroups.forEach(group => {
            group.GroupImages.forEach(image => {
                if (image.preview === true) {
                    group.previewImage = image.url
                } else {
                    group.previewImage = 'No available image'
                }
                delete group.GroupImages
            })
            group.numMembers = 0;
            for (let member of group.Memberships) {
                if (member.status !== 'pending') {
                    group.numMembers++
                }
            }

            delete group.Memberships;
        });
        return res.json({ Groups: userGroups })

    } else {
        res.status(401);
        return res.json({ "message": "Authentication required" })
    }
});

router.get('/:groupId', async (req, res, next) => {
    const groupId = req.params.groupId;
    try {
        const group = await Group.findByPk(groupId, {
            include:
                [
                    {
                        model: GroupImage,
                        attributes: ['id', 'url', 'preview']
                    },
                    {
                        model: User,
                        as: 'Organizer',
                        attributes: ['id', 'firstName', 'lastName']
                    },
                    {
                        model: Event,
                        include: {model: EventImage}
                    },
                    {
                        model: Membership,
                        include: {model: User}
                    }
                ]
        });
        group.dataValues.numMembers = (await Membership.findAll({
            where: [{ groupId: group.dataValues.id }, { status: { [Op.not]: 'pending' } }]
        })).length;

        jsonGroup = group.toJSON();

        if (jsonGroup.numMembers === 0){
            jsonGroup.numMembers = 1;
        }
        members = [...jsonGroup.Memberships]
        jsonGroup.Memberships = {}
        members.forEach(member => jsonGroup.Memberships[member.userId] = member)


        return res.json(jsonGroup)

    } catch (e) {
        res.status(404);
        return res.json({ "message": "Group couldn't be found" })
    }
});

router.post('/', async (req, res, next) => {
    const { user } = req;
    if (user) {
        try {
            const errors = {};

            const { name, about, type, private, city, state } = req.body;
            if (!name || name.length > 60) {
                errors.name = "Name must be 60 characters or less"
            }
            if (!about || about.length < 50) {
                errors.about = "About must be 50 characters or more"
            }
            if (type !== "Online" && type !== "In person") {
                errors.type = "Type must be 'Online' or 'In person'"
            }
            if (typeof private !== 'boolean') {
                errors.private = "Private must be a boolean"
            }
            if (!city) errors.city = "City is required"
            if (!state) errors.state = "State is required"
            //throw error if any of these are caught
            if (Object.keys(errors).length) {
                let err = {};
                err.message = "Bad Request"
                err.errors = { ...errors }
                err.status = 400;
                err.title = 'Validation Error'
                next(err);
            }

            const newGroup = await user.createGroup({
                organizerId: user.id,
                name,
                about,
                type,
                private,
                city,
                state
            });
            res.status(201);
            return res.json(newGroup);
        } catch (e) {
            next(e);
        }
    } else {
        res.status(401);
        return res.json({ "message": "Authentication required" })
    }
});

router.post('/:groupId/images', async (req, res, next) => {
    const { user } = req;
    const groupId = req.params.groupId;
    const group = await Group.findByPk(groupId);
    if (!user) {
        res.status(401);
        return res.json({ "message": "Authentication required" })
    }
    if (!group) {
        res.status(404);
        return res.json({ "message": "Group couldn't be found" })
    }
    if (user.id !== group.organizerId) {
        res.status(403);
        return res.json({ "message": "Forbidden" })
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
    try {
        const newGroupImage = await group.createGroupImage({
            url,
            preview
        });
        const newId = newGroupImage.id;
        const resGroupImage = await GroupImage.findByPk(newId, {
            attributes: ['id', 'url', 'preview']
        })
        return res.json(resGroupImage)
    } catch (e) {
        next(e);
    }
})

router.put('/:groupId', async (req, res, next) => {
    const { user } = req;
    const groupId = req.params.groupId;
    const group = await Group.findByPk(groupId);
    if (!user) {
        res.status(401);
        return res.json({ "message": "Authentication required" })
    }
    if (!group) {
        res.status(404);
        return res.json({ "message": "Group couldn't be found" })
    }
    if (user.id !== group.organizerId) {
        res.status(403);
        return res.json({ "message": "Forbidden" })
    }

    const { name, about, type, private, city, state } = req.body;
    const errors = {};
    if (!name || name.length > 60) {
        errors.name = "Name must be 60 characters or less"
    }
    if (!about || about.length < 50) {
        errors.about = "About must be 50 characters or more"
    }
    if (type !== "Online" && type !== "In person") {
        errors.type = "Type must be 'Online' or 'In person'"
    }
    if (typeof private !== 'boolean') {
        errors.private = "Private must be a boolean"
    }
    if (!city) errors.city = "City is required"
    if (!state) errors.state = "State is required"
    //throw error if any of these are caught
    if (Object.keys(errors).length) {
        let err = {};
        err.message = "Bad Request"
        err.errors = { ...errors }
        err.status = 400;
        err.title = 'Validation Error'
        next(err);
    }

    try {

        group.name = name;
        group.about = about;
        group.type = type;
        group.private = private;
        group.city = city;
        group.state = state;
        group.updatedAt = new Date();
        await group.save();

        res.json(group);
    } catch (e) {
        next(e);
    }
})

router.delete('/:groupId', async (req, res, next) => {
    const { user } = req;
    const groupId = req.params.groupId;
    const group = await Group.findByPk(groupId);
    if (!user) {
        res.status(401);
        return res.json({ "message": "Authentication required" })
    }
    if (!group) {
        res.status(404);
        return res.json({ "message": "Group couldn't be found" })
    }
    if (user.id !== group.organizerId) {
        res.status(403);
        return res.json({ "message": "Forbidden" })
    }

    await group.destroy();

    res.json({ "message": "Successfully deleted" })
})


router.get('/:groupId/events', async (req, res, next) => {
    const group = await Group.findByPk(req.params.groupId)
    if (!group) {
        res.status(404);
        res.json({ "message": "Group couldn't be found" })
    }
    const groupEvents = await Event.findAll({
        where: { groupId: group.id },
        include:
            [
                { model: Group, attributes: ['id', 'name', 'city', 'state'] },
                { model: Attendance },
                { model: EventImage }
            ]
    })


    const eventsList = [];
    groupEvents.forEach(event => {
        eventsList.push(event.toJSON());
    });

    for (let event of eventsList) {
        event.numAttending = 0
        for (let attendance of event.Attendances) {
            if (attendance.status === 'attending') {
                event.numAttending++
            }
        }
        delete event.Attendances;
        delete event.createdAt;
        delete event.updatedAt;
        delete event.price;
        delete event.description;
        delete event.capacity;

        event.previewImage = 'Preview image does not exist'
        for (let image of event.EventImages) {
            if (image.preview === true) {
                event.previewImage = image.url;
            }
        }
        delete event.EventImages;
    }

    return res.json({ Events: eventsList })
})

router.post('/:groupId/events', async (req, res, next) => {
    const { user } = req;
    const group = await Group.findByPk(req.params.groupId);
    if (!user) {
        res.status(401);
        return res.json({ "message": "Authentication required" })
    }
    if (!group) {
        res.status(404);
        return res.json({ "message": "Group couldn't be found" })
    }
    const membership = await Membership.findOne({
        where: [{ userId: user.id }, { groupId: group.id }]
    })
    let status;
    if (membership){
        status = membership.status
    }
    if (group.organizerId === user.id) status = 'organizer'

    if (status !== 'organizer' && status !== 'co-host') {
        res.status(403);
        return res.json({ "message": "Forbidden" })
    }
    const { lat, lng, name, type, capacity, price, description, startDate, endDate } = req.body;
    const errors = {};

    // TODO: check date validations
    if (!name || name.length < 5) errors.name = "Name must be at least 5 characters";
    if (type !== 'Online' && type !== 'In person') errors.type = 'Type must be Online or In person';
    if (capacity % 1 !== 0) errors.capacity = "Capacity must be an integer";
    if (typeof price !== 'number' || price < 0) errors.price = 'Price is invalid';
    if (!description) errors.description = "Description is required";
    if (new Date(startDate) < new Date()) errors.startDate = 'Start date must be in the future';
    if (new Date (endDate) < new Date(startDate)) errors.endDate = 'End date is less than start date';
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

        const newEvent = await group.createEvent({
            hostId: user.Id,
            lat,
            lng,
            name,
            type,
            capacity,
            price,
            description,
            startDate,
            endDate
        })
        //When someone makes an event, they should be attending by default
        const hostAttends = await user.createAttendance({
            eventId: newEvent.id,
            userId: user.id,
            status: "attending"
        })

        const resNewEvent = newEvent.toJSON();
        delete resNewEvent.updatedAt;
        delete resNewEvent.createdAt;

        return res.json(resNewEvent)

    } catch (e) {
        res.json(e);
    }


})

router.get('/:groupId/members', async (req, res, next) => {
    const { user } = req;
    //no authentication needed; just need to check if organizer or cohost
    const group = await Group.findByPk(req.params.groupId);
    if (!group) {
        res.status(404);
        return res.json({ "message": "Group couldn't be found" })
    }
    const members = await Membership.findAll({
        where: { groupId: group.id },
        include: { model: User, attributes: ['id', 'firstName', 'lastName'] },
    });

    let userStatus;
    if (group.organizerId === user.id) userStatus = 'organizer'
    const membersList = [];
    for (let member of members) {
        if (member.userId !== group.organizerId) {
            const currMember = member.toJSON()

            currMember.firstName = currMember.User.firstName;
            currMember.lastName = currMember.User.lastName;
            currMember.Membership = {}
            currMember.Membership.status = currMember.status;
            delete currMember.status;
            delete currMember.createdAt;
            delete currMember.updatedAt;
            currMember.id = currMember.userId;
            delete currMember.userId;
            delete currMember.groupId;
            delete currMember.User;
            membersList.push(currMember)
        }
    }

    // let userStatus;

    for (let member of members) {
        if (member.userId === user.id) {
            userStatus = member.status
        }
    }
    if (group.organizerId === user.id) userStatus = 'organizer';

    if (userStatus === 'organizer' || userStatus === 'co-host') {
        return res.json({ Members: membersList })
    } else {
        const filteredMembers = [];
        for (let member of membersList) {
            if (member.Membership.status !== 'organizer' && member.Membership.status !== 'pending') {
                filteredMembers.push(member);
            }
        }
        return res.json({ Members: filteredMembers })
    }

})

router.post('/:groupId/membership', async (req, res, next) => {
    const { user } = req;
    const group = await Group.findByPk(req.params.groupId);

    if (!user) {
        res.status(401);
        return res.json({ "message": "Authentication required" })
    }
    if (!group) {
        res.status(404);
        return res.json({ "message": "Group couldn't be found" })
    }

    if (group.organizerId === user.id) {
        res.status(400);
        return res.json({ "message": "User is already a member of the group" })
    }

    const membership = await group.getMemberships({
        where: { userId: user.id }
    })

    if (membership){
        for (let member of membership){
            if (member.status && member.status === "pending"){
                res.status(400);
                return res.json({ "message": "Membership has already been requested" })
            } else if (member.status && member.status === "member"){
                res.status(400);
                return res.json({ "message": "User is already a member of the group" })
            }
        }
    }
    // if (membership.length) {
    //     if (membership[0].dataValues.status === "pending") {
    //         res.status(400);
    //         return res.json({ "message": "Membership has already been requested" })
    //     } else {
    //         res.status(400);
    //         return res.json({ "message": "User is already a member of the group" })
    //     }
    // }


    const newMembership = await Membership.create({
        userId: user.id,
        groupId: group.id,
        status: "pending"
    })

    const jsonNewMembership = newMembership.toJSON();
    delete jsonNewMembership.updatedAt;
    delete jsonNewMembership.createdAt;

    return res.json(jsonNewMembership);
})

router.put('/:groupId/membership', async (req, res, next) => {
    const { user } = req;
    if (!user) {
        res.status(401);
        return res.json({ "message": "Authentication required" })
    }
    const group = await Group.findByPk(req.params.groupId);
    if (!group) {
        res.status(404);
        return res.json({ "message": "Group couldn't be found" })
    }
    const { memberId, status } = req.body;


    //only organizer can make someone co-host
    if (status === 'co-host' && (user.id !== group.organizerId)) {
        res.status(403);
        return res.json({ "message": "Forbidden" })
    }
    //cannot change to pending
    if (status === 'pending') {
        res.status(400);
        return res.json({
            "message": "Validations Error",
            "errors": {
                "status": "Cannot change a membership status to pending"
            }
        })
    }

    const targetUser = await User.findByPk(memberId);

    if (!targetUser) {
        res.status(400);
        return res.json({
            "message": "Validation Error",
            "errors": {
                "memberId": "User couldn't be found"
            }
        })
    }

    const members = await Membership.findAll({
        where: { groupId: group.id }
    });
    let membersList = [];
    for (let member of members) {
        membersList.push(member.toJSON())
    }
    //set the requesting user's status
    let userStatus;
    let targetMembershipId;

    for (let member of membersList) {
        if (member.userId === user.id) {
            userStatus = member.status;
        }
        if (member.userId === targetUser.id) {
            targetMembershipId = member.id
        }
    }
    //If no hit in member loop, check if it's the organizer
    if (group.organizerId === user.id) {
        userStatus = 'organizer'
    }
    const targetMembership = await Membership.findByPk(targetMembershipId, {
        include: {model: User}
    });

    if (userStatus === 'organizer' || userStatus === 'co-host') {

        targetMembership.status = status;
        await targetMembership.save();

        const resTargetMembership = targetMembership.toJSON();
        delete resTargetMembership.updatedAt;
        delete resTargetMembership.createdAt;


        return res.json(resTargetMembership)
    } else {
        res.status(403);
        return res.json({ "message": "Forbidden" })
    }
})

router.delete('/:groupId/membership', async (req, res, next) => {
    const { user } = req;

    //memberId is the user's id
    const { memberId } = req.body
    const group = await Group.findByPk(req.params.groupId);

    if (!user) {
        res.status(401);
        return res.json({ "message": "Authentication required" })
    }
    if (!group) {
        res.status(404);
        return res.json({ "message": "Group couldn't be found" })
    }

    //user must be organizer or the member themself

    if (user.id !== memberId && user.id !== group.organizerId) {
        res.status(403);
        return res.json({ "message": "Forbidden" })
    }

    const targetUser = await User.findByPk(memberId);
    if (!targetUser) {
        res.status(400);
        return res.json({
            "message": "Validation Error",
            "errors": {
                "memberId": "User couldn't be found"
            }
        })
    }

    const membership = await Membership.findOne({
        where: [{ userId: memberId, groupId: group.id }]
    })

    if (!membership) {
        res.status(404);
        return res.json({
            "message": "Membership does not exist for this User",
        })
    };

    await membership.destroy();

    return res.json({
        "message": "Successfully deleted membership from group"
    })
})

module.exports = router;
