const express = require('express');
const router = express.Router();
const { Attendance, EventImage, Event, Venue, GroupImage, User, Group, Membership, sequelize } = require('../../db/models');

router.get('/', async (req, res, next) => {
    const events = await Event.findAll({
        include:
        [
            {model: Venue},
            {model: Attendance}
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
    }

    res.json({Events: eventsList});
})

module.exports = router;
