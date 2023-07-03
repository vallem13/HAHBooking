import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/ALL-SPOTS-landing-page'

const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    };
};

export const thunkGetAllSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    const spots = await response.json();
    dispatch(getAllSpots(spots));
    return response;
};

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

        default:
            return state;
    }
  };



export default spotsReducer;
