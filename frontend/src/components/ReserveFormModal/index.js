import { useModal } from '../../context/Modal'

const ReserveFormModal = () => {

    const { closeModal } = useModal()

    return (
        <>
            <h3>Featute Coming Soon!</h3>
            <button onClick={closeModal}>Go Back</button>
        </>
    )
}

export default ReserveFormModal
