import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS-spotId'
//const CREATE_SPOT_REVIEW = 'reviews/CREATE_REVIEW-review'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW-reviewId'
const CLEAN_REVIEWS = 'reviews/CLEAN_REVIEWS-reviews'

const getSpotReviews = (reviews, spotId) => {
    return {
        type: GET_SPOT_REVIEWS,
        reviews,
        spotId
    };
};

// const createSpotReview = (review) => {
//     return {
//         type: CREATE_SPOT_REVIEW,
//         review
//     }
// }

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

export const clearReviews = () => {
    return {
        type: CLEAN_REVIEWS
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

export const thunkcreateSpotReview = (review, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })
    if (response.ok) {
        const newReview = await response.json()
        dispatch(thunkGetSpotReviews(spotId))
        return newReview
    } else {
        const error = await response.json()
        return error
    }
}

export const thunkDeleteReview = (reviewId, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(deleteReview(reviewId))
        return data
    }
}

const initialState = { singleSpot: {}, user: {} };

const reviewsReducer = (state = initialState, action) => {

    let newState;

    switch (action.type) {

        case GET_SPOT_REVIEWS:
            newState = { ...state, singleSpot: { ...state.singleSpot } };
            action.reviews.forEach(review => {
                newState.singleSpot[review.id] = review;
            })

        return newState;

        // case CREATE_SPOT_REVIEW:
        //     newState = { ...state, singleSpot: { ...state.singleSpot }}
        //     newState.spot[action.review.id] = action.review

        // return newState

        case DELETE_REVIEW:
            newState = { ...state, singleSpot: { ...state.singleSpot}}
            delete newState.singleSpot[action.reviewId]

        return newState

        case CLEAN_REVIEWS:
            return initialState

        default:
            return state;
    }
  };

export default reviewsReducer;
