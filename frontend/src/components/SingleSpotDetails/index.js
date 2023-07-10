import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { thunkGetSingleSpot } from "../../store/spots";
import { thunkGetSpotReviews } from "../../store/reviews"
import OpenModalButton from '../OpenModalButton'
import ReserveFormModal from '../ReserveFormModal'
import DeleteReviewModal from "./DeleteReviewModal"
import CreateSpotReviewModal from './CreateReviewModal';
import "./SingleSpotDetails.css";

const SingleSpotDetails = () => {

    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot);
    const reviews = useSelector(state => state.reviews.singleSpot);
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkGetSingleSpot(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(thunkGetSpotReviews(spotId))
    }, [dispatch, spotId])

    if (!spot.id) return null

    const reviewsArr = Object.values(reviews).reverse();
    const { name, city, state, country, description, Owner, SpotImages, price, averageRating, numReviews } = spot

    let previewImg = SpotImages.find(image => image.preview === true) ? SpotImages.find(img => img.preview === true) : SpotImages[0]
    let allImages = SpotImages.filter(image => image.preview === false)

    const getDate = (date) => {
        const event = new Date(date);
        const month = event.toLocaleString('default', { month: 'long' });
        const year = event.toLocaleString('default', { year: 'numeric' });
        return `${month} ${year}`
    }

    const checkOwner = user && user.id === spot.Owner.id
    const checkReview = user && reviewsArr.find((review) => review.userId === user.id)

    return (
        <div className='singleSpotDetails'>
            <div className='single-name'>
                <h1>{name}</h1>
                <h2>{city}, {state}, {country}</h2>
            </div>
            <div className='singleSpott-allImg'>
                <div >
                    <img className='single-prevImg' src={previewImg.url} alt={name}></img>
                </div>
                <div >
                    {allImages.map(image =>
                        <img className='single-allImg' key={image.id} src={image.url} alt={name}></img>)}
                </div>
            </div>
            <div id='single-details'>
                <div className='owner-description'>
                    <h1>Hosted by: {Owner.firstName} {Owner.lastName}</h1>
                    <h2 className='singleSpot-description'>Description: {description}</h2>
                </div>
                <div className='reserve-box'>
                    <div className='reserve-price-rating'>
                        <h2>${price} night</h2>
                        {reviewsArr.length ?
                            <div>
                                <h3 id='reserve-rating'><span className="material-symbols-outlined">star_rate</span>{Number(averageRating).toFixed(2)} · {numReviews} {numReviews > 1 ? "Reviews" : "Review"}</h3>
                            </div>
                            :
                            <div>
                                <h3 className='reserve-rating'><span className="material-symbols-outlined">star_rate</span>New</h3>
                            </div>}
                    </div>
                    <div id='reserve-button'>
                        <OpenModalButton buttonText='Reserve' modalComponent={<ReserveFormModal />} />
                    </div>
                </div>
            </div>
            <div className='singleSpot-reviews'>
                {reviewsArr.length ?
                    <div>
                        <h1 id='reserve-rating'><span className="material-symbols-outlined">star_rate</span>{Number(averageRating).toFixed(2)} · {numReviews} {numReviews > 1 ? "Reviews" : "Review"}</h1>
                        {user && !(checkReview || checkOwner) && (
                            <div id='post-review-button'>
                            <OpenModalButton
                                buttonText="Post Your Review"
                                modalComponent={<CreateSpotReviewModal user={user} spot={spot} />}
                            />
                            </div>
                        )}
                        {reviewsArr.map((review) => (
                            <div>
                                <h3 className='review-user-name'>{review.User.firstName}</h3>
                                <p className='review-createdAt'>{getDate(review.createdAt)}</p>
                                <p className='review-review'>{review.review}</p>
                                {(review.userId === user?.id) &&
                                    <div className='delete-review-button'>
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
                        <h2 className='new-rating'><span className="material-symbols-outlined">star_rate</span>New</h2>
                        {user && !(checkReview || checkOwner) && (
                            <div id='post-review-button'>
                                <h4>Be the first to post a review!</h4>
                                <OpenModalButton
                                    buttonText="Post Your Review"
                                    modalComponent={<CreateSpotReviewModal user={user} spot={spot} />}
                                    />
                                </div>
                            )}
                    </div>
                }
            </div>
        </div>
    )
}

export default SingleSpotDetails;
