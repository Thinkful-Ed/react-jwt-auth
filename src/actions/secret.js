import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_SECRET_SUCCESS = 'FETCH_SECRET_SUCCESS';
export const fetchSecretSuccess = secret => ({
    type: FETCH_SECRET_SUCCESS,
    secret
});

export const FETCH_SECRET_ERROR = 'FETCH_SECRET_ERROR';
export const fetchSecretError = secret => ({
    type: FETCH_SECRET_ERROR,
    secret
});

export const fetchSecret = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/secret`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({secret}) => dispatch(fetchSecretSuccess(secret)))
    .catch(err => {
        dispatch(fetchSecretError(err));
    });
};

