import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS-spotId'

const getSpotReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        reviews
    };
};

export const thunkGetSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const reviews = await response.json()
        dispatch(getSpotReviews(reviews.Reviews))
        return reviews
    } else {
        const errors = await response.json()
        return errors
    }
};

const initialState = { singleSpot: {}, user: {} };

const reviewsReducer = (state = initialState, action) => {

    let newState;

    switch (action.type) {

        case GET_SPOT_REVIEWS:
            newState = { ...state, singleSpot: {} };
            action.reviews.forEach(review => {
                newState.singleSpot[review.id] = review;
            })

            console.log(newState)

        return newState;

        default:
            return state;
    }
  };

export default reviewsReducer;
