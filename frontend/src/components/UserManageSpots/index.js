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

    return (
        <>
            <div>
                <h1>{userSpots.length <= 0 ? 'Add your first Spot!' : 'Manage your Spots'}</h1>
                <button onClick={createNewSpotButton} >Create a New Spot</button>
            </div>
            <div>
                {userSpots.map(spot =>(
                        <div>
                            <SingleSpot key={spot.id} manage={true} spot={spot} />
                            
                            <OpenModalButton buttonText="Delete Spot" modalComponent={<DeleteSingleSpotModal spotId={spot.id}/>}/>
                        </div>
                    )
                )}
            </div>
        </>
    )
}


export default UserManageSpots
