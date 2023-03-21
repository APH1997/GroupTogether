const express = require('express');
const router = express.Router();
const {GroupImage, User, Group, Membership, sequelize} = require('../../db/models');

router.get('/', async (req, res) => {
    const groups = await Group.findAll();
    return res.json(groups);
})

router.get('/current', async (req, res, next) => {
    const {user} = req;
    if (user){
        const groups = await Membership.findAll({
            attributes: [],
            where: {userId: user.id},
            include:
            [
                {
                    model: Group,
                    include:
                    [
                        {
                            model: GroupImage,
                            attributes: ['url']
                        }
                    ]
                },

            ]
            
        })
        return res.json(groups);
    }
})

module.exports = router;
