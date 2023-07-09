import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkEditSingleSpot } from "../../store/spots"

const EditSingleSpotForm = ({ spot }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const [address, setAddress] = useState(spot?.address)
    const [city, setCity] = useState(spot?.city)
    const [state, setState] = useState(spot?.state)
    const [country, setCountry] = useState(spot?.country)
    const [lat] = useState(34.100570)
    const [lng] = useState(118.611930)
    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot?.description)
    const [price, setPrice] = useState(spot?.price)
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {

        const errors = {}

        if (!address) errors.address = 'Please enter a valid address'
        if (!city) errors.city = 'Please enter a valid city'
        if (!state) errors.state = 'Please enter valid state'
        if (!country) errors.country = 'Please enter a valid country'
        if (!name) errors.name = 'Please enter a valid name'
        if (!description || description.length < 30) errors.description = 'Please describe your spot'
        if (!price || price <= 0) errors.price = 'Please enter a valid price number'

        setErrors(errors)

    }, [address, city, state, country, name, description, price])

    if (!spot) {
        history.push('/')
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        setSubmitted(true)

        const newSpot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }

        if(!Object.values(errors).length) {
            const editSpot = await dispatch(thunkEditSingleSpot(newSpot, spot.id))

            if (editSpot.errors) setErrors(editSpot.errors)
            else await history.push(`/spots/${spot.id}`)
        }
    }

    return (

        <>
            <form className='createSpotForm' onSubmit={handleSubmit}>

                <h1>Update your Spot</h1>

                <div className='createSpotTitle'>

                    <h3>Where's your place located?</h3>
                    <p>Guests will only get your exact address once they booked a reservation.</p>

                    <label>Country</label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder={'Country'}
                    />
                    {errors.country && submitted && <p className='errorsForm'>{errors.country}</p>}

                    <label>Street Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Address'
                    />
                    {errors.address && submitted && <p className='errorsForm'>{errors.address}</p>}

                    <label>City</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='City'
                    />
                    {errors.city && submitted && <p className='errorsForm'>{errors.city}</p>}

                    <label>State</label>
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder='State'
                    />
                    {errors.state && submitted && <p className='errorsForm'>{errors.state}</p>}

                </div>

                <div className='createSpotTitle'>

                    <h3>Describe your place to guests</h3>
                    <p>Mention the best feature of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please write at least 30 characters"
                    />
                    {errors.description && submitted && <p className='errorsForm'>{errors.description}</p>}

                </div>

                <div className='createSpotTitle'>

                    <h3>Create a title for your spot</h3>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name your spot'
                    />
                    {errors.name && submitted && <p className='errorsForm'>{errors.name}</p>}

                </div>

                <div className='createSpotTitle'>

                    <h3>Set a base price for your spot</h3>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>

                    $<input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder='Price per night (USD)'
                    />
                    {errors.price && submitted && <p className='errorsForm'>{errors.price}</p>}

                </div>

                <button type="submit">Update Spot</button>

            </form>

        </>

    )

}

export default EditSingleSpotForm
