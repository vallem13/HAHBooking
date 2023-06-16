const express = require('express');
const { Spot, User, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize')

const router = express.Router();

// 18. Delete a spot-image by imageId
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const image = await SpotImage.findOne({
        where: {
            id: req.params.imageId
        },
        include: {
            model: Spot
        }
    })

    if (!image) {
        return res.status(404).json({ message: "Spot Image couldn't be found"})
    }

    if (image.Spot.ownerId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden"})
    }

    await image.destroy()

    res.status(200)
    res.json({
        message: 'Successfully deleted'
    })
})

module.exports = router;
