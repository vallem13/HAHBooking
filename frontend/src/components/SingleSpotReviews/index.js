
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useParams } from 'react-router-dom'
import { thunkGetSingleSpot } from "../../store/spots";
import { thunkGetSpotReviews } from "../../store/reviews"
import OpenModalButton from '../OpenModalButton'
import DeleteReviewModal from "../SingleSpotDetails/DeleteReviewModal"
import './SingleSpotReviews.css'

const SingleSpotReviews = ({reviews}) => {

    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot)
    const user = useSelector(state => state.session.user)
    const reviewsArr = Object.keys(reviews)

    useEffect(() => {
        dispatch(thunkGetSingleSpot(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(thunkGetSpotReviews(spotId))
    }, [dispatch, spotId])


    if (reviewsArr.length < 1) return null

    const { averageRating, numReviews } = spot

    const getDate = (date) => {
        const event = new Date(date);
        const month = event.toLocaleString('default', { month: 'long' });
        const year = event.toLocaleString('default', { year: 'numeric' });
        return `${month} ${year}`
      }

    return (
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
    )

}


export default SingleSpotReviews;
