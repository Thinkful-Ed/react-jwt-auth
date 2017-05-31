import jwtDecode from 'jwt-decode';
import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {handleResponse} from './utils';
import {saveAuthToken, clearAuthToken} from '../local-storage';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
    type: SET_AUTH_TOKEN,
    authToken
});

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const setCurrentUser = currentUser => ({
    type: SET_CURRENT_USER,
    currentUser
});


// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
const storeAuthInfo = (authToken, dispatch) => {
    const decodedToken = jwtDecode(authToken);
    dispatch(setAuthToken(authToken));
    dispatch(setCurrentUser(decodedToken.user));
    saveAuthToken(authToken);
};

export const login = (username, password) => dispatch => {
    const token = btoa(`${username}:${password}`);
    return fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            // Provide our username and password as login credentials
            Authorization: `Basic ${token}`
        }
    })
    .then(res => handleResponse(res))
    .then(({authToken}) => storeAuthInfo(authToken, dispatch))
    .catch(err => {
        const {code} = err;
        if (code === 401) {
            // Could not authenticate, so return a SubmissionError for Redux
            // Form
            return Promise.reject(new SubmissionError({
                _error: 'Incorrect username or password'
            }));
        }
    });
};

export const refreshAuthToken = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            // Provide our existing token as credentials to get a new one
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => handleResponse(res))
    .then(({authToken}) => storeAuthInfo(authToken, dispatch))
    .catch(err => {
        const {code} = err;
        if (code === 401) {
            // We couldn't get a refresh token because our current credentials
            // are invalid or expired, so clear them and sign us out
            dispatch(setCurrentUser(null));
            dispatch(setAuthToken(null));
            clearAuthToken(authToken);
        }
    });
};

