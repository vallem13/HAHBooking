import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { thunkGetSingleSpot } from "../../store/spots";
import EditSingleSpotForm from "./EditSingleSpotForm";

const EditSingleSpot = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot);


    console.log("-------->index", spot)

    useEffect(() => {
        dispatch(thunkGetSingleSpot(spotId))
    }, [dispatch, spotId])

    if (!spot.SpotImages) return null

    return (

            <EditSingleSpotForm formType='Update Spot' spot={spot} />

    )

}


export default EditSingleSpot
