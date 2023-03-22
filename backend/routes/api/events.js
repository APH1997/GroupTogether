const express = require('express');
const router = express.Router();
const { Attendance, EventImage, Event, Venue, GroupImage, User, Group, Membership, sequelize } = require('../../db/models');

router.get('/', async (req, res, next) => {
    const events = await Event.findAll({
        include:
        [
            {model: Venue, attributes: ['id','city','state']},
            {model: Attendance},
            {model: EventImage},
            {model: Group, attributes: ['id','name','city','state']}
        ]
    });

    const eventsList = [];

    events.forEach(event => {
        eventsList.push(event.toJSON())
    })

    for (let event of eventsList){
        delete event.description;
        delete event.createdAt;
        delete event.updatedAt;
        delete event.capacity;
        delete event.price;

        event.numAttending = 0;
        for (let attendance of event.Attendances){
            if (attendance.status === 'attending'){
                event.numAttending++
            }
        }
        delete event.Attendances;

        for (let image of event.EventImages){
            if (image.preview === true){
                event.previewImage = image.url
            }
        }
        delete event.EventImages;

    }

    return res.json({Events: eventsList});
})

router.get('/:eventId', async (req, res, next) => {
    const event = await Event.findByPk(req.params.eventId, {
        include:
        [
            {model: Group, attributes: ['id','name','private','city','state']},
            {model: Venue, attributes: ['id','address','city','state','lat','lng']},
            {model: EventImage, attributes: ['id','url','preview']}
        ],
    })

    if (!event){
        res.status(404);
        res.json({"message": "Event couldn't be found"})
    }

    const resEvent = event.toJSON();
    delete resEvent.createdAt;
    delete resEvent.updatedAt;

    return res.json(resEvent)
})

module.exports = router;
