import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { thunkGetSingleSpot } from "../../store/spots";
import { thunkGetSpotReviews } from "../../store/reviews"
import OpenModalButton from '../OpenModalButton'
import ReserveFormModal from '../ReserveFormModal'
import DeleteReviewModal from "./DeleteReviewModal"
//import SingleSpotReviews from '../SingleSpotReviews'
import "./SingleSpotDetails.css";

const SingleSpotDetails = () => {

    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot);
    const reviews = useSelector(state => (state.reviews.singleSpot));
    const user = useSelector(state => state.session.user)
    const spotArr = Object.keys(spot)
    const reviewsArr = reviews ? Object.values(reviews).reverse() : [];


    useEffect(() => {
        dispatch(thunkGetSingleSpot(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(thunkGetSpotReviews(spotId))
    }, [dispatch, spotId])

    if (spotArr.length < 1) return null

    const { name, city, state, country, description, Owner, SpotImages, price, averageRating, numReviews } = spot

    let previewImg = [];
    let allImages = [];

    previewImg = SpotImages.find(image => image.preview === true)
    allImages = SpotImages.filter(image => image.preview === false)

    const getDate = (date) => {
        const event = new Date(date);
        const month = event.toLocaleString('default', { month: 'long' });
        const year = event.toLocaleString('default', { year: 'numeric' });
        return `${month} ${year}`
    }

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
            <h3>Hosted by: {Owner.firstName} {Owner.lastName}</h3>
            <div>
                <h2>${price} per night</h2>
                {reviewsArr.length ?
                    <div>
                        <h3><span className="material-symbols-outlined">hotel_class</span> {averageRating} · {numReviews} {numReviews > 1 ? "Reviews" : "Review"}</h3>
                    </div>
                    :
                    <div>
                        <h3><span className="material-symbols-outlined">hotel_class</span>New</h3>
                    </div>
                }
                <OpenModalButton buttonText='Reserve' modalComponent={<ReserveFormModal />} />
            </div>
            <div>
                {reviewsArr.length ?
                    <div>
                        <h3><span className="material-symbols-outlined">hotel_class</span> {averageRating} · {numReviews} {numReviews > 1 ? "Reviews" : "Review"}</h3>
                        {reviewsArr.map((review) => (
                            <div>
                                <h4>{review.User.firstName}</h4>
                                <p>{getDate(review.createdAt)}</p>
                                <p>{review.review}</p>
                                {(review.userId === user?.id) &&
                                    <div>
                                        <OpenModalButton
                                            buttonText="Delete Review"
                                            modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spot.id} />}
                                        />
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                    :
                    <div>
                        <h3><span className="material-symbols-outlined">hotel_class</span>New</h3>
                        <h4>Be the first to post a review!</h4>
                    </div>
                }
            </div>

        </>
    )
}

export default SingleSpotDetails;
