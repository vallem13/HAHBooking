import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/ALL-SPOTS-landing-page'
const GET_SINGLE_SPOT = 'spots/GET_SINGLE_SPOT-spotId'
const DELETE_SPOT = 'spots/DELETE-SPOT-spotId'

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

const deleteSingleSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
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

export const thunkDeleteSingleSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(deleteSingleSpot(spotId))
        return data
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
            newState = { ...state, singleSpot: {}}
            newState.singleSpot = action.payload

        return newState

        case DELETE_SPOT:
            newState = { ...state, allSpots: { ...state.allSpots}, singleSpot: {}}
            delete newState.allSpots[action.spotId]

        return newState

        default:
            return state;
    }
  };



export default spotsReducer;
