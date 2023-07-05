import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { thunkGetAllSpots } from "../../store/spots"
import SingleSpot from "../SingleSpot"
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

    const checkSpots = () => {
        if (!userSpots.length) return 'Add your first Spot!'
        else return 'Manage your Spots'
    }

    const createNewSpotButton = () => {
        history.push('/spots/new')
    }

    return (
        <div>
            <h1>{checkSpots}</h1>
            <button onClick={createNewSpotButton} >Create a New Spot</button>
            <div>
                {userSpots.map(spot => <SingleSpot key={spot.id} manage={true} spot={spot} /> )}
            </div>
        </div>
    )
}


export default UserManageSpots
