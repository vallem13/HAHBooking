const express = require('express');
const { Spot, User, Booking, SpotImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage,
                attributes: ['url']
            }
        ]
    })

    const allSpots = spots.map(spot => {
        const spotsObj = spot.toJSON()
        //console.log(spots)

        let rating = 0

        for (let reviews of spotsObj.Reviews) {
            rating += reviews.stars
        }

        spotsObj.averageRating = rating / spotsObj.Reviews.length
        if (spotsObj.SpotImages.length > 0) {
            spotsObj.previewImage = spotsObj.SpotImages[0].url
        }

        delete spotsObj.Reviews
        delete spotsObj.SpotImages

        return spotsObj
    })

    res.json({
        Spots: allSpots
    })
})

router.post('/', async (req, res, next) => {

})


router.get('/current', requireAuth, async (req, res, next) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            {
                model: Review
            },
            {
                model: SpotImage,
                attributes: ['url']
            }
        ]
    })
    const allSpots = spots.map(spot => {
        const spotsObj = spot.toJSON()
        //console.log(spots)

        let rating = 0

        for (let reviews of spotsObj.Reviews) {
            rating += reviews.stars
        }

        spotsObj.averageRating = rating / spotsObj.Reviews.length
        if (spotsObj.SpotImages.length > 0) {
            spotsObj.previewImage = spotsObj.SpotImages[0].url
        }

        delete spotsObj.Reviews
        delete spotsObj.SpotImages

        return spotsObj
    })

    res.json({
        Spots: allSpots
    })
})



module.exports = router;
