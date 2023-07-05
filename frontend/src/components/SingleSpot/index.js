import { useHistory } from 'react-router';
import './SingleSpot.css'

const SingleSpot = ({ spot }) => {

    const history = useHistory()

    const getSpotById = () => {
        history.push(`/spots/${spot.id}`)
    }

    return (
        <div className='singleSpot' onClick={getSpotById} >
            <div className='name-image'>
                <h3 className='name'>{spot.name}</h3>
                <img className='singleImage' src={spot.previewImage} alt={spot.name} title={spot.name}></img>
            </div>
            <div classsName='location-rating'>
                <div className='city-state'>{spot.city}, {spot.state}</div>
                <div className='rating'>
                    <span class="material-symbols-outlined">hotel_class</span>
                    {spot.averageRating ? spot.averageRating : 'New!'}
                </div>
            </div>
            <div>${Number(spot.price).toFixed(2)} per night</div>
        </div>
    )

}


export default SingleSpot;
