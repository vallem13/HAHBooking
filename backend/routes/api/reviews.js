const express = require('express');
const { Review, User, Spot, ReviewImage, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize')

const router = express.Router();

// 12. Post image on a spotId
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { url } = req.body

    const review = await Review.findByPk(req.params.reviewId)

    if (!review) {
        return res.status(404).json({ message: "Review couldn't be found"})
    }

    if (review.userId !== req.user.id) {
        return res.status(403).json({ message: 'Forbidden'})
    }

    let images = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        },
        attributes: ['id', 'url']
    })

    if (images.length >= 10) {
        return res.status(403).json({ message: 'Maximum number of images for this resource was reached'})
    }

    const newImage = await ReviewImage.create({
       reviewId: req.params.reviewId,
       url: req.body.url
    })

    res.status(200)
    res.json(newImage)
})

// 13. Get all reviews by current user
router.get('/current', requireAuth, async (req, res, next) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: [{
                    model: SpotImage,
                    attributes: ['url']
                }]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    const allSpots = reviews.map(spot => {
        const spotsObj = spot.toJSON()

        const image = spotsObj.Spot

        if (image.SpotImages.length > 0) {
            image.previewImage = image.SpotImages[0].url
        }

        delete image.SpotImages

        return image
    })

    res.json({
        Reviews: allSpots
    })

})

// 14. Edit a review by reviewId
const createReviewChecker = (req, res, next) => {
    const { review , stars } = req.body

    const errors = {}

    if (!review) errors.review = 'Review text is required'
    if (!stars) errors.stars = 'Stars must be an integer from 1 to 5'

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            message: 'Bad Request',
            errors: errors
        })
    }
    next()
}

router.put('/:reviewId', requireAuth, createReviewChecker, async (req, res, next) => {
    const reviews = await Review.findByPk(req.params.reviewId)

    if (!reviews) {
        return res.status(404).json({ message: "Review couldn't be found"})
    }

    if (reviews.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden"})
    }

    const { review, stars } = req.body

    let setObj = {}

    if (review) {
        setObj.review = review
    }
    if (stars) {
        setObj.stars = stars
    }

    reviews.set(setObj)
    await reviews.save()

    res.json(reviews)

})

// 15. Delete review by review



module.exports = router;
