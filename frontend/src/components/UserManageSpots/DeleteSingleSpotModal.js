import { useModal } from '../../context/Modal'
import { useDispatch } from "react-redux";
import { thunkDeleteSingleSpot } from '../../store/spots';
import './DeleteSingleSpotModal.css'

const DeleteSingleSpotModal = ({ spot, user, spotId }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()


    const deleteSpot = () => {
        return dispatch(thunkDeleteSingleSpot(spotId))
        .then(closeModal)
    };

    const dontDeleteSpot = () => {
        closeModal()
    }

    return (
        <div>
            <h4>Confirm Delete</h4>
            <h3>Are you sure you want to delete this spot?</h3>
            <button onClick={deleteSpot}>Yes (Delete Spot)</button>
            <button onClick={dontDeleteSpot}>No (Keep Spot)</button>
        </div>
    )
}

export default DeleteSingleSpotModal
