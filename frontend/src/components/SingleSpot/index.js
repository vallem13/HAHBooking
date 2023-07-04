import { useHistory } from 'react-router';
import './SingleSpot.css'

const SingleSpot = ({ spot }) => {

    const history = useHistory()

    const getSpotById = () => {
        history.push(`/spots/${spot.id}`)
    }


    return (
        <>
            <div className='singleSpot' onClick={getSpotById} >
                <div>
                    <div>{spot.name}</div>
                    <img className='previewImage' src={spot.previewImage} alt={spot.name} title={spot.name}></img>
                </div>
                <div>
                    <div>{spot.city}, {spot.state}</div>
                    <div className={spot.averageRating ? 'rating' : 'new-rating'}>
                        <span class="material-symbols-outlined">hotel_class</span>
                        {spot.averageRating ? spot.averageRating : 'New!'}</div>
                    <div>${spot.price} per night</div>
                </div>
            </div>
        </>
    )

}


export default SingleSpot;


