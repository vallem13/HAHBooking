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
            <span className='name-tooltip'>{spot.name}</span>
                <img className='singleImage' src={spot.previewImage} alt={spot.name} title={spot.name}></img>
            </div>
            <div id='location-rating'>
                <div className='city-state'>{spot.city}, {spot.state}</div>
                <div className='rating'>
                    <span class="material-symbols-outlined">star_rate</span>
                    {spot.averageRating ? `${Number(spot.averageRating).toFixed(1)}` : 'New!'}
                </div>
            </div>
            <div className='price'>${Number(spot.price).toFixed(2)} night</div>
        </div>
    )

}


export default SingleSpot;
