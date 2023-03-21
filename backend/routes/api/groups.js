const express = require('express');
const router = express.Router();
const { Venue, GroupImage, User, Group, Membership, sequelize } = require('../../db/models');

router.get('/', async (req, res) => {
    const groups = await Group.findAll();
    for (let group of groups) {
        group.dataValues.numMembers = (await Membership.findAll({
            where: { groupId: group.dataValues.id }
        })).length;
        group.dataValues.previewImage = (await GroupImage.findAll({
            where: { groupId: group.dataValues.id },
            attributes: ['url']
        }))[0].url;
    }
    return res.json({ Groups: groups });
});

router.get('/current', async (req, res, next) => {
    const { user } = req;
    if (user) {
        const memberships = await user.getMemberships();
        let groupIds = [];
        for (let membership of memberships) {
            groupIds.push(Number(membership.dataValues.groupId))
        }
        const groups = await Group.findAll({
            where: { id: groupIds }
        })
        for (let group of groups) {
            group.dataValues.numMembers = (await Membership.findAll({
                where: { groupId: group.dataValues.id }
            })).length;
            group.dataValues.previewImage = (await GroupImage.findAll({
                where: { groupId: group.dataValues.id },
                attributes: ['url']
            }))[0].url;
        }
        return res.json({ Groups: groups });
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
                        model: Venue,
                        as: 'Venue',
                        attributes: ['id', 'groupId', 'address', 'city', 'state', 'lat', 'lng']
                    }
                ]
        });
        group.dataValues.numMembers = (await Membership.findAll({
            where: { groupId: group.dataValues.id }
        })).length;
        return res.json(group)

    } catch (e) {
        res.status(404);
        return res.json({ "message": "Group couldn't be found" })
    }
});

router.post('/', async (req, res, next) => {
    const { user } = req;
    if (user) {
        try {

            const { name, about, type, private, city, state } = req.body;
            const newGroup = await Group.create({
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
            let errors = {
                "message": "Bad Request",
                "errors": {
                    "name": "Name must be 60 characters or less",
                    "about": "About must be 50 characters or more",
                    "type": "Type must be 'Online' or 'In person'",
                    "private": "Private must be a boolean",
                    "city": "City is required",
                    "state": "State is required",
                }
            }

            errors.status = 400;
            errors.title = 'Validation Error'
            next(errors);
        }
    } else {
        res.status(401);
        return res.json({ "message": "Authentication required" })
    }
});

router.post('/:groupId/images', async (req, res, next) => {
    const {user} = req;
    const groupId = req.params.groupId;
    const group = await Group.findByPk(groupId);
    if (!user){
        res.status(401);
        return res.json({ "message": "Authentication required" })
    }
    if (!group){
        res.status(404);
        return res.json({"message": "Group couldn't be found"})
    }
    if (user.id !== group.organizerId){
        res.status(403);
        return res.json({"message": "Forbidden"})
    }

    const {url, preview} = req.body;
    try {
        const newGroupImage = await group.createGroupImage({
            url,
            preview
        });
        const newId = newGroupImage.id;
        const resGroupImage = await GroupImage.findByPk(newId, {
            attributes: ['id','url','preview']
        })
        return res.json(resGroupImage)
    } catch (e){
        next(e);
    }

})



module.exports = router;
