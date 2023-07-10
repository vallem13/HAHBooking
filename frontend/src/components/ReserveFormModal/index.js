import { useModal } from '../../context/Modal'
import './ReserveFormModal.css'

const ReserveFormModal = () => {

    const { closeModal } = useModal()

    return (
        <div id='coming-soon-box'>
            <h3>Featute Coming Soon!</h3>
            <button className='go-back-reserve-button' onClick={closeModal}>Go Back</button>
        </div>
    )
}

export default ReserveFormModal
