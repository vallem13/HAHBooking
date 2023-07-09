import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkGetSingleSpot } from '../../store/spots';
import { thunkcreateSpotReview } from "../../store/reviews";
import "./CreateReviewModal.css"

const CreateSpotReviewModal = ({ spot, user }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const [review, setReview] = useState('');
    const [stars, setStars] = useState("")
    const [activeRating, setActiveRating] = useState(1)
    const [errors, setErrors] = useState(false);

    useEffect(() => {

        let errors = {}

        if (stars < 1) errors.stars = "Stars can not be empty"
        if (review.length < 10) errors.review = "Review should be 10 characters or more"

        setErrors(errors)

    }, [review, stars])

    const handleSubmit = async (e) => {

        e.preventDefault()

        const addReview = {
            review,
            stars
        }

        await dispatch(thunkcreateSpotReview(addReview, spot.id, user))
            await dispatch(thunkGetSingleSpot(spot.id))
                await closeModal()
        }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h2>How was your stay?</h2>
                <textarea
                    placeholder="Leave your review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                {errors.review && review.length > 0 && (
                    <p className='error-message'>{errors.review}</p>
                )}
                <div>
                    <div
                        onClick={(e) => setStars(1)}
                        onMouseEnter={(e) => setActiveRating(1)}
                        onMouseLeave={(e) => setActiveRating(stars)}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" ></i>
                    </div>
                    <div
                        onClick={(e) => setStars(2)}
                        onMouseEnter={(e) => setActiveRating(2)}
                        onMouseLeave={(e) => setActiveRating(stars)}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" ></i>
                    </div>
                    <div
                        onClick={(e) => setStars(3)}
                        onMouseEnter={(e) => setActiveRating(3)}
                        onMouseLeave={(e) => setActiveRating(stars)}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" ></i>
                    </div>
                    <div
                        onClick={(e) => setStars(4)}
                        onMouseEnter={(e) => setActiveRating(4)}
                        onMouseLeave={(e) => setActiveRating(stars)}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" ></i>
                    </div>
                    <div
                        onClick={(e) => setStars(5)}
                        onMouseEnter={(e) => setActiveRating(5)}
                        onMouseLeave={(e) => setActiveRating(stars)}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" ></i>
                    </div>
                    <label>Stars</label>
                </div>
                <button type="submit" disabled={(review.length < 10) || !stars || Object.values(errors) < 0}>Submit Your Review</button>
            </div>
        </form>

    )
}

export default CreateSpotReviewModal
