const express = require('express');
const router = express.Router();
const { Attendance, EventImage, Event, Venue, GroupImage, User, Group, Membership, sequelize } = require('../../db/models');

router.delete('/:imageId', async (req, res, next) => {
    const { user } = req;
    const image = await GroupImage.findByPk(req.params.imageId, {
        include: { model: Group, include: { model: Membership } }
    });

    //Check if user/image exist
    if (!user) {
        res.status(401);
        return res.json({ "message": "Authentication required" })
    }
    if (!image) {
        res.status(404);
        return res.json({ "message": "Group Image couldn't be found" })
    }

    //user must be organizer or co-host to delete
    let userStatus;
    for (let member of image.Group.Memberships){
        if (user.id === member.userId){
            userStatus = member.status
        }
    };
    if (image.Group.organizerId === user.id) userStatus = 'organizer';
    
    if (userStatus === 'organizer' || userStatus === 'co-host'){
        await image.destroy();
        res.json({
            "message": "Successfully deleted",
          })
    }

    //only gets here if user is not the organizer or co-host
    res.status(403);
    return res.json({ "message": "Forbidden" })
})

module.exports = router;
