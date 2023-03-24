const express = require('express');
const router = express.Router();
const { Venue, GroupImage, User, Group, Membership, sequelize } = require('../../db/models');

router.put('/:venueId', async (req, res, next) => {
    const { user } = req;
    const venue = await Venue.findByPk(req.params.venueId)
    if (!user) {
        res.status(401);
        return res.json({ "message": "Authentication required" })
    }
    if (!venue) {
        res.status(404);
        return res.json({ "message": "Venue couldn't be found" })
    }
    const membership = await user.getMemberships({
        where: { groupId: venue.groupId }
    })
    const status = membership[0].status
    if (status !== 'organizer' && status !== 'co-host') {
        res.status(403);
        return res.json({ "message": "Forbidden" })
    }

    try {

        const { address, city, state, lat, lng } = req.body;

        venue.address = address;
        venue.city = city;
        venue.state = state;
        venue.lat = lat;
        venue.lng = lng;
        venue.updatedAt = new Date();

        await venue.save();

        const resVenue = venue.toJSON();
        delete resVenue.updatedAt;
        delete resVenue.createdAt;

        return res.json(resVenue);

    } catch (e) {
        const err = {};
        err.status = 400;
        err.message = "Bad Request";
        err.errors = {
            "address": "Street address is required",
            "city": "City is required",
            "state": "State is required",
            "lat": "Latitude is not valid",
            "lng": "Longitude is not valid",
        };
        next(err);
    }
})

module.exports = router;