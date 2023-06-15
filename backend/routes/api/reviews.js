const express = require('express');
const { Review, User, Spot, ReviewImage } = require('../../db/models');
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


module.exports = router;
