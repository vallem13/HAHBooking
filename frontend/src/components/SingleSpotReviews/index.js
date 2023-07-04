import { useSelector } from "react-redux"
import SingleSpotDetails from '../SingleSpotDetails'
import './SingleSpotReviews.css'

const SingleSpotReviews = () => {

    const spot = useSelector(state => state.spots.singleSpot)
    const reviews = useSelector(state => state.reviews.spot);
    const reviewsArr = Object.keys(reviews)

    if (reviewsArr.length < 1) return null

    return (
        <div>
            <SingleSpotDetails />
            {reviewsArr.map((review) => (
                <div>
                    <h1>{review.User.firstName}</h1>
                </div>
            ))}
        </div>
    )

}


export default SingleSpotReviews;
