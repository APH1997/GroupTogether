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
    const {url, preview} = req.body;

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

module.exports = router;
