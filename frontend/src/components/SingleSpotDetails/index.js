import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { thunkGetSingleSpot } from "../../store/spots";
import OpenModalButton from '../OpenModalButton'
import ReserveFormModal from '../ReserveFormModal'
import "./SingleSpotDetails.css";

const SingleSpotDetails = () => {

    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot);
    const spotArr = Object.keys(spot)

    useEffect(() => {
        dispatch(thunkGetSingleSpot(spotId))
    }, [dispatch, spotId])

    if (spotArr.length < 1) return null

    const { name, city, state, country, description, Owner, SpotImages } = spot

    let previewImg = [];
    let allImages = [];

    previewImg = SpotImages.find(image => image.preview === true)
    allImages = SpotImages.filter(image => image.preview === false)

    return (
        <>
            <h1>{name}</h1>
            <div>
                <img src={previewImg.url} alt={name}></img>
            </div>
            <div>
                {allImages.map(image =>
                <img key={image.id} src={image.url} alt={name}></img>)}
            </div>
            <h2>{city} · {state} · {country}</h2>
            <h3>Description: {description}</h3>
            <h3>Hosted by: {Owner.firstName} {Owner.lasName}</h3>
            <div>
                <OpenModalButton buttonText='Reserve' modalComponent={<ReserveFormModal />} />
            </div>
        </>
    )
}

export default SingleSpotDetails;
