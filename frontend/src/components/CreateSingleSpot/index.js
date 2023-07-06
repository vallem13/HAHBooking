import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkCreateSingleSpot } from "../../store/spots"

const CreateSingleSpot = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState(34.100570)
    const [lng, setLng] = useState(118.611930)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [prevImg, setPrevImg] = useState('')
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')
    const [img4, setImg4] = useState('')
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {

        const errors = {}

        if (!address) errors.address = 'Please enter a valid address'
        if (!city) errors.city = 'Please enter a valid city'
        if (!state) errors.state = 'Please enter valid state'
        if (!country) errors.country = 'Please enter a valid country'
        if (!name) errors.name = 'Please enter a valid name'
        if (!price || price <= 0) errors.price = 'Please enter a valid price number'
        if (prevImg && !prevImg.endsWith('png') && !prevImg.endsWith('jpg') && !prevImg.endsWith('jpeg')) errors.prevImg = 'Please make sure your image extension ends with .png or .jpg or .jpeg'
        if (img1 && !img1.endsWith('png') && !img1.endsWith('jpg') && !img1.endsWith('jpeg')) errors.img1 = 'Please make sure your image extension ends with .png or .jpg or .jpeg'
        if (img2 && !img2.endsWith('png') && !img2.endsWith('jpg') && !img2.endsWith('jpeg')) errors.img2 = 'Please make sure your image extension ends with .png or .jpg or .jpeg'
        if (img3 && !img3.endsWith('png') && !img3.endsWith('jpg') && !img3.endsWith('jpeg')) errors.img3 = 'Please make sure your image extension ends with .png or .jpg or .jpeg'
        if (img4 && !img4.endsWith('png') && !img4.endsWith('jpg') && !img4.endsWith('jpeg')) errors.img4 = 'Please make sure your image extension ends with .png or .jpg or .jpeg'

        setErrors(errors)
    }, [address, city, state, country, lat, lng, name, description, price, prevImg, img1, img2, img3, img4])

    if (!user) {
        history.push('/')
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        setSubmitted(true)

        const imgURLs = [prevImg, img1, img2, img3, img4]

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

        const imgArr = [];

        if(!Object.values(errors).length) {
            imgURLs.forEach((img, index) => {
                const previewImage = { url: img, preview: index === 0 };
                if (img) imgArr.push(previewImage);
            });
            const addSpot = await dispatch(thunkCreateSingleSpot(newSpot, imgArr, user))
            const allErrors = { ...errors, Errors: addSpot.errors }

            if (addSpot.errors) setErrors(allErrors)
            else await history.push(`/spots/${addSpot.id}`)
        }
    }

    return (

        <>
            <form className='createSpotForm' onSubmit={handleSubmit}>

                <h1>Create a New Spot!</h1>

                <div className='createSpotTitle'>

                    <h3>Where's your place located?</h3>
                    <p>Guests will only get your exact address once they booked a reservation.</p>

                    <label>Country</label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder='Country'
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

                <div className='createSpotTitle'>

                    <h3>Liven up your spot with photos</h3>
                    <p>Submit a link to at least one photo to publish your spot.</p>

                    <input
                        type="url"
                        value={prevImg}
                        onChange={(e) => setPrevImg(e.target.value)}
                        placeholder='Preview Image URL'
                    />
                    {errors.prevImg && submitted && <p className='errorsForm'>{errors.prevImg}</p>}

                    <input
                        type="url"
                        value={img1}
                        onChange={(e) => setImg1(e.target.value)}
                        placeholder='Image URL'
                    />
                    {errors.img1 && submitted && <p className='errorsForm'>{errors.img1}</p>}

                    <input
                        type="url"
                        value={img2}
                        onChange={(e) => setImg2(e.target.value)}
                        placeholder='Image URL'
                    />
                    {errors.img2 && submitted && <p className='errorsForm'>{errors.img2}</p>}

                    <input
                        type="url"
                        value={img3}
                        onChange={(e) => setImg3(e.target.value)}
                        placeholder='Image URL'
                    />
                    {errors.img3 && submitted && <p className='errorsForm'>{errors.img3}</p>}

                    <input
                        type="url"
                        value={img4}
                        onChange={(e) => setImg4(e.target.value)}
                        placeholder='Image URL'
                    />
                    {errors.img4 && submitted && <p className='errorsForm'>{errors.img4}</p>}

                </div>

                <button type="submit">Create Spot</button>

            </form>

        </>

    )

}

export default CreateSingleSpot
