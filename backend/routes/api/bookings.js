const express = require('express');
const { Booking, User, Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize')

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
        Bookings: allSpots
    })
})

// 17. Edit all bookings by spotId
router.put('/:bookingId', requireAuth, async (req, res, next) => {

    const booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" })
    }

    if (booking.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" })
    }

    const { startDate, endDate } = req.body

    const checkAvailability = await Booking.findOne({
        where: {
            spotId: req.params.bookingId,
            [Op.or]: [
                {
                    startDate: { [Op.between]: [startDate, endDate] }
                },
                {
                    endDate: { [Op.between]: [startDate, endDate] }
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

    let currentDate = new Date().toJSON().slice(0, 10)

    if (startDate < currentDate) {
        return res.status(403).json({ message: "Past bookings can't be modified" })
    }

    let setObj = {}

    if (startDate) {
        setObj.startDate = startDate
    }
    if (endDate) {
        setObj.endDate = endDate
    }

    booking.set(setObj)
    await booking.save()

    res.status(200)
    res.json(booking)
})

// 18. Delete a booking by bookingId
router.delete('/:bookingId', requireAuth, async (req, res, next) => {

    const booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" })
    }

    if (booking.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" })
    }

    const currentDate = new Date()

    if (currentDate >= booking.startDate && currentDate <= booking.endDate) {
        return res.status(403).json({ message: "Bookings that have been started can't be deleted" })
    } else {

        await booking.destroy()

        res.json({
            message: 'Successfully deleted'
        })
    }

})




module.exports = router;
