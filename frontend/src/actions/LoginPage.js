export const loginError = (error) => ({
    type: 'LOGIN_ERROR',
    payload: error
});

export const loginSuccess = (token, user) => ({
    type: 'LOGIN_SUCCESS',
    payload: {token, user}
});