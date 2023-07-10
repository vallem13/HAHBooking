import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { thunkGetAllSpots } from "../../store/spots"
import OpenModalButton from '../OpenModalButton'
import SingleSpot from "../SingleSpot"
import DeleteSingleSpotModal from "./DeleteSingleSpotModal"
import "./UserManageSpots.css"

const UserManageSpots = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const spots = useSelector(state => state.spots.allSpots)
    const spotsArr = Object.values(spots)
    const userSpots = spotsArr.filter(spot => spot.ownerId === user.id)

    useEffect(() => {
        dispatch(thunkGetAllSpots())
    }, [dispatch])

    // const checkSpots = () => {
    //     if (userSpots.length <= 0) return ('Add your first Spot!')
    //     else return ('Manage your Spots')
    // }

    const createNewSpotButton = () => {
        history.push('/spots/new')
    }

    const editSpot = (spotId) => {
        history.push(`/spots/${spotId}/edit`)
    }

    return (
        <div className="manage-spots-container">
            <div className="manage-spots">
                <h1>{userSpots.length <= 0 ? 'Add your first Spot!' : 'Manage your Spots'}</h1>
                <button className="create-spot-button" onClick={createNewSpotButton} >Create a New Spot</button>
            </div>
            <div className="user-allSpots">
                {userSpots.map(spot =>(
                        <div className="single-user-spot-container">
                            <SingleSpot key={spot.id} manage={true} spot={spot} />

                            <div className="update-delete-user-buttons">
                            <button className="" onClick={() => editSpot(spot.id)}>Update Spot</button>

                            <OpenModalButton buttonText="Delete Spot" modalComponent={<DeleteSingleSpotModal spotId={spot.id}/>}/>

                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}


export default UserManageSpots
