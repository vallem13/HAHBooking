import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllSpots } from "../../store/spots";
import SingleSpot from '../SingleSpot'
import "./Spots.css";

const SpotsIndex = () => {

    const dispatch = useDispatch();
    const spotsObj = useSelector((state => state.spots.allSpots))
    const spots = spotsObj ? Object.values(spotsObj) : [];

    useEffect(() => {
        dispatch(thunkGetAllSpots());
    }, [dispatch]);

    if (!spots.length) return null

    return (
        <div>
            {spots.map((spot) => (
                <SingleSpot key={spot.id} spot={spot}/>
            ))}
        </div>
    )
}

export default SpotsIndex;
