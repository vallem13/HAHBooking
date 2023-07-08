import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllSpots } from "../../store/spots";
import SingleSpot from '../SingleSpot'
import { clearReviews } from '../../store/reviews';
import "./Spots.css";

const SpotsIndex = () => {

    const dispatch = useDispatch();
    const spotsObj = useSelector((state => state.spots.allSpots))
    const spots = spotsObj ? Object.values(spotsObj) : [];

    useEffect(() => {
        dispatch(thunkGetAllSpots());
        dispatch(clearReviews())
    }, [dispatch]);

    if (!spots.length) return null

    return (
        <div className='allSpots'>
            {spots.map((spot) => (
                <SingleSpot key={spot.id} spot={spot}/>
            ))}
        </div>
    )
}

export default SpotsIndex;
