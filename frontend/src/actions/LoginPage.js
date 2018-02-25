export const loginError = (error) => ({
    type: 'LOGIN_ERROR',
    payload: error
});

export const loginSuccess = (token, user) => ({
    type: 'LOGIN_SUCCESS',
    payload: {token, user}
});


export const getUser = (token, user)  => {
    return dispatch => {
        return user.json().then(user => {
            if (user) {
                dispatch(loginSuccess(token, user));
            } else{
                dispatch(loginError("Not Successful"));
            }
        }).catch(err => {
            dispatch(loginError(err.message));
        });
    };
};