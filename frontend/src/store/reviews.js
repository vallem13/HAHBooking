import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS-spotId'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW-reviewId'

const getSpotReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        reviews
    };
};

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

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

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

        const data = await response.json()
        dispatch(deleteReview(reviewId))
        return data
}

const initialState = { singleSpot: {}, user: {} };

const reviewsReducer = (state = initialState, action) => {

    let newState;

    switch (action.type) {

        case GET_SPOT_REVIEWS:
            newState = { ...state, singleSpot: {} };
            action.reviews.forEach(review => {
                newState.singleSpot[review.id] = review;
            })

            //console.log(newState)

        return newState;

        case DELETE_REVIEW:
            newState = { ...state, singleSpot: { ...state.singleSpot}}
            delete newState.singleSpot[action.reviewId]
        return newState

        default:
            return state;
    }
  };

export default reviewsReducer;
