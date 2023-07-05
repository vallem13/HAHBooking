import { useModal } from '../../context/Modal'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkDeleteReview } from '../../store/reviews';
import { thunkGetSingleSpot } from '../../store/spots';
import './DeleteReviewModal.css'

const DeleteReviewModal = ({ spotId, reviewId }) => {

    const { closeModal } = useModal()
    const history = useHistory()
    const dispatch = useDispatch()

    const deleteReview = () => {
        dispatch(thunkDeleteReview(reviewId))
        .then(() => dispatch(thunkGetSingleSpot(spotId)))
        //history.push(`/spots/${spotId}`)
        .then(closeModal)
    };

    const dontDeleteReview = () => {
        closeModal()
    }

    return (
        <div>
            <h4>Confirm Delete</h4>
            <h3>Are you sure you want to delete this review?</h3>
            <button onClick={deleteReview}>Yes (Delete Review)</button>
            <button onClick={dontDeleteReview}>No (Keep Review)</button>
        </div>
    )
}

export default DeleteReviewModal


//
