import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/ALL-SPOTS-landing-page'
const GET_SINGLE_SPOT = 'spots/GET_SINGLE_SPOT-spotId'

const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    };
};

const getSingleSpot = (spot) => {
    return {
        type: GET_SINGLE_SPOT,
        payload: spot
    }
}

export const thunkGetAllSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    const spots = await response.json();
    dispatch(getAllSpots(spots));
    return response;
};

export const thunkGetSingleSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    if (response.ok) {
        const spot = await response.json()
        dispatch(getSingleSpot(spot))
        return response
    } else {
        const errors = await response.json()
        return errors
    }
}

const initialState = { allSpots: {}, singleSpot: {} };

const spotsReducer = (state = initialState, action) => {

    let newState;

    switch (action.type) {

        case GET_ALL_SPOTS:
            newState = { ...state, allSpots: {}, singleSpot: {} };
            action.spots.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot;
            })

        return newState;

        case GET_SINGLE_SPOT:
            newState = { ...state, singleSpot: {} }
            newState.singleSpot = action.payload
            return newState

        default:
            return state;
    }
  };



export default spotsReducer;
