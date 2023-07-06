import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/ALL-SPOTS-landing-page'
const GET_SINGLE_SPOT = 'spots/GET_SINGLE_SPOT-spotId'
const DELETE_SPOT = 'spots/DELETE-SPOT-spotId'
const CREATE_SINGLE_SPOT = 'spots/CREATE_SINGLE_SPOT-new'

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

const createSingleSpot = (spot) => {
    return {
        type: CREATE_SINGLE_SPOT,
        spot
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

export const thunkCreateSingleSpot = (spot, spotImages, user) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    });
    if (response.ok) {
        const newSpot = await response.json();
        await dispatch(thunkAddImage(newSpot, spotImages, user))
        return newSpot;
    } else {
      const errors = await response.json();
      return errors
    }
}

export const thunkAddImage = (spot, spotImages, user) => async (dispatch) => {
    for (let i = 0; i < spotImages.length; i++) {
        const image = spotImages[i]
        await csrfFetch(`/api/spots/${spot.id}/images`, {
        method: 'POST',
        body: JSON.stringify(image)
        });
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

        case CREATE_SINGLE_SPOT:
            newState = { ...state, allSpots: { ...state.allSpots}}
            const spot = action.spot
            newState.singleSpot = spot
            newState.allSpots[spot.id] = spot

        return newState

        default:
            return state;
    }
  };



export default spotsReducer;
