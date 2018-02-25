import axios from "axios/index";

export const getUserTweetsError = (error) => ({
    type: 'GET_TWEET_ERROR',
    payload: error
});

export const getUserTweetsSuccess = (data) => ({
    type: 'GET_TWEET_SUCCESS',
    payload: data
});

export const getUserTweets = (data) => {
    return dispatch => {
        return axios({
            method: 'get',
            params: {
                token: data
            },
            url: 'http://localhost:4000/tweets',
            config: {
                headers: {
                    'Accept': 'application/json'
                    // 'x-auth-token': data
                }
            }
        }).then(json => {
            dispatch(getUserTweetsSuccess(json.data));
        }).catch(err => {
            dispatch(getUserTweetsError(err.message));
        });
    };
};