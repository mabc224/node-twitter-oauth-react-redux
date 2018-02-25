const initialState = {
    error: null,
    tweets: []
};

const profile = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TWEET_SUCCESS':
            return Object.assign({}, state, {error: null, tweets: action.payload});
        case 'GET_TWEET_ERROR':
            return Object.assign({}, state, {error: action.payload, tweets: []});
        default:
            return state;
    }
};

export default profile;