const express = require('express');
const { Booking, User, Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');


const router = express.Router();

// 16. Get all bookings by current user
router.get('/current', requireAuth, async (req, res, next) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: [{
                    model: SpotImage,
                    attributes: ['url']
                }]
            },
        ]
    })

    const allSpots = bookings.map(spot => {
        const spotsObj = spot.toJSON()

        const image = spotsObj.Spot

        if (image.SpotImages.length > 0) {
            image.previewImage = image.SpotImages[0].url
        }

        delete image.SpotImages

        return spotsObj
    })

    res.json({
        Reviews: allSpots
    })
})

// 17.




module.exports = router;
