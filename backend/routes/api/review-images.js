const express = require('express');
const { Spot, User, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize')

const router = express.Router();

// 19. Delete a review by imageId
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const reviewImage = await Review.findOne({
        where: {
            id: req.params.imageId
        },
        include: {
            model: ReviewImage
        }
    })

    if (!reviewImage) {
        return res.status(404).json({ message: "Spot couldn't be found"})
    }

    if (reviewImage.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden"})
    }

    await reviewImage.destroy()

    res.status(200)
    res.json({
        message: 'Successfully deleted'
    })
})

module.exports = router;
