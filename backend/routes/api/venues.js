const express = require('express');
const router = express.Router();
const { Venue, GroupImage, User, Group, Membership, sequelize } = require('../../db/models');

router.put('/:venueId', async (req, res, next) => {
    const { user } = req;
    const venue = await Venue.findByPk(req.params.venueId)
    // return res.json(venue);
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
    const group = await Group.findByPk(venue.groupId)
    let status;

    if (membership){
        for (let member of membership){
            status = member.status;
        }
    }
    
    if (user.id === group.organizerId) status = 'organizer'

    if (status !== 'organizer' && status !== 'co-host') {
        res.status(403);
        return res.json({ "message": "Forbidden" })
    }

    const { address, city, state, lat, lng } = req.body;
    const errors = {};
    if (!address) errors.address = "Street address is required";
    if (!city) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (lat < -90 || lat > 90) errors.lat = "Latitude is not valid";
    if (lng < -180 || lng > 180) errors.lng = "Longitude is not valid";
    if (Object.keys(errors).length) {
        let err = {};
        err.message = "Bad Request"
        err.errors = { ...errors }
        err.status = 400;
        err.title = 'Validation Error'
        next(err);
    }

    try {
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
