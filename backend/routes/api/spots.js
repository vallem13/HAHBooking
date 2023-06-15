const express = require('express');
const { Spot, User, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize')

const router = express.Router();

// 1. Get all spots w/ avg rating and images
const createQueryChecker = (req, res, next) => {
    const { page, size } = req.query

    const errors = {}

    if (size <= 0) errors.size = "Size must be greater than or equal to 1"
    if (page <= 0) errors.page = "Page must be greater than or equal to 1"

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            message: 'Bad Request',
            errors: errors
        })
    }
    next()
}

router.get('/', createQueryChecker,  async (req, res, next) => {

    // 20. Add Query Filters to Get All Spots
    let {page, size} = req.query

    if (!page || isNaN(page)) page = 1
    else page = parseInt(page)

    if (!size || isNaN(size)) size = 20
    else size = parseInt(size)

    if (size > 20) size = 20
    if (page > 10) page = 1

    let pagination = {}

    pagination.limit = size
    pagination.offset = (page - 1) * size

    const spots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage,
                attributes: ['url']
            }
        ],
        ...pagination
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
        Spots: allSpots,
        page,
        size
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

    if (spot.ownerId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden"})
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
                model: Review,
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

// 6. Edit a spot
router.put('/:spotId', requireAuth, createSpotChecker, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found"})
    }

    if (spot.ownerId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden"})
    }

    const { address, city, state, country, lat, lng, name, description, price } = req.body

    let setObj = {}

    if (address) {
        setObj.address = address
    }
    if (city) {
        setObj.city = city
    }
    if (state) {
        setObj.state = state
    }
    if (country) {
        setObj.country = country
    }
    if (lat) {
        setObj.lat = lat
    }
    if (lng) {
        setObj.lng = lng
    }
    if (name) {
        setObj.name = name
    }
    if (description) {
        setObj.description = description
    }
    if (price) {
        setObj.price = price
    }

    spot.set(setObj)
    await spot.save()

    res.json(spot)

})

// 7. Delete a spot by spotId
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found"})
    }

    if (spot.ownerId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden"})
    }

    await spot.destroy()

    res.json({
        message: 'Successfully deleted'
    })
})

// 8. Create a review by spotId
const createReviewChecker = (req, res, next) => {
    const { review, stars } = req.body

    const errors = {}

    if (!review) errors.address = 'Review text is required'
    if (!stars) errors.city = 'Stars must be an integer from 1 to 5'


    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            message: 'Bad Request',
            errors: errors
        })
    }
    next()
}

router.post('/:spotId/reviews', requireAuth, createReviewChecker, async (req, res, next) => {
    const { review, stars } = req.body

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found"})
    }

    const checkReview = await Review.findOne({
        where: {
            spotId: req.params.spotId,
            userId: req.user.id
        }
    })

    if (checkReview) {
        return res.status(500).json({ message: 'User already has a review for this spot'})
    }

    const newSpotReview = await spot.createReview({
        userId: req.user.id,
        spotId: req.params.spotId,
        review,
        stars
    })

    res.status(201)
    res.json(newSpotReview)
})

// 9. Get all reviews by spotId
router.get('/:spotId/reviews', async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found"})
    }

    const review = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    res.status(200)
    res.json({
        Reviews: review
    })
})

// 10. POST a booking by spotId
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found"})
    }

    if (req.user.id === spot.ownerId) {
        return res.status(403).json({ message: 'Forbidden'})
    }

    const checkAvailability = await Booking.findOne({
        where: {
            spotId: req.params.spotId,
            [Op.or]: [
                {
                    startDate: {[Op.between]: [startDate, endDate]}
                },
                {
                    endDate: {[Op.between]: [startDate, endDate]}
                },
            ]
        }
    })

    if (checkAvailability) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
              startDate: "Start date conflicts with an existing booking",
              endDate: "End date conflicts with an existing booking"
            }
        })
    }

    const newBooking = await spot.createBooking({
        userId: req.user.id,
        spotId: req.params.spotId,
        startDate,
        endDate
    })

    const newBookingUpdates = {
        id: newBooking.id,
        spotId: newBooking.spotId,
        userId: newBooking.userId,
        startDate: newBooking.startDate.toISOString().slice(0,10),
        endDate: newBooking.endDate.toISOString().slice(0,10),
        createdAt: newBooking.createdAt,
        updatedAt: newBooking.updatedAt
    }

    res.status(200)
    res.json(newBookingUpdates)

})

// 11. GET a booking w/ spotId
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found"})
    }

    if (req.user.id === spot.ownerId) {

        const booking = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        })
        res.status(200).json({
            Bookings: booking
        })
    }

    if (req.user.id !== spot.ownerId) {
        const booking = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            },
            attributes: ['spotId', 'startDate', 'endDate']
        })
        res.status(200).json({
            Bookings: booking
        })
    }
})


module.exports = router;
