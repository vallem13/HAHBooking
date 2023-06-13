const express = require('express');
const { Spot, User, Booking, SpotImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const router = express.Router();

// 1. Get all spots w/ avg rating and images
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

// 4. Post a new spot w/ error handlers
const createSpotChecker = (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const errors = {}

    if (!address) errors.address = 'Street address is required'
    if (!city) errors.city = 'City is required'
    if (!state) errors.state = 'State is required'
    if (!country) errors.country = 'Country is required'
    if (!lat) errors.lat = 'Latitude is not valid'
    if (!lng) errors.lng = 'Longitude is not valid'
    if (!name) errors.name = 'Name must be less than 50 characters'
    if (!description) errors.description = 'Description is required'
    if (!price) errors.price = 'Price per day is required'

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            message: 'Bad Request',
            errors: errors
        })
    }
    next()
}

router.post('/', requireAuth, createSpotChecker, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.status(201)
    res.json(newSpot)
})

// 5. Add Image to a spot
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { url, preview } = req.body

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found"})
    }

    const newImage = await spot.createSpotImage({
        url,
        preview
    })

    res.status(200)
    res.json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview,
    })

})

// 2. Get all spots by the current user that is logged in w/ avg rating and images
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

// 3. Get spot by spotId w/  avg rating, images, and owner
router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: Review
            },
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            },
        ]
    })

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found"})
    }

   const spotsObj = spot.toJSON()

   let rating = 0

   for (let reviews of spotsObj.Reviews) {
       rating += reviews.stars
   }

   spotsObj.averageRating = rating / spotsObj.Reviews.length
   spotsObj.numReviews = spotsObj.Reviews.length

   delete spotsObj.Reviews

   if (spotsObj.SpotImages.length > 0) {
    spotsObj.SpotImages = spotsObj.SpotImages.map((img) => ({
        id: img.id,
        url: img.url,
        preview: img.preview
    }))
   }

    res.json(spotsObj)
})


module.exports = router;
