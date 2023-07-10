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
        <div id='delete-confirmation-box'>
            <h4>Confirm Delete</h4>
            <h3>Are you sure you want to delete this spot?</h3>
            <div className='delete-buttons'>
            <button className='delete-button-yes' onClick={deleteSpot}>Yes (Delete Spot)</button>
            <button className='delete-button-no' onClick={dontDeleteSpot}>No (Keep Spot)</button>
            </div>
        </div>
    )
}

export default DeleteSingleSpotModal
