import {
    FETCH_SECRET_SUCCESS,
    FETCH_SECRET_ERROR
} from '../actions/secret';

const initialState = {
    secret: '',
    error: null
};

export default function reducer(state=initialState, action) {
    if (action.type === FETCH_SECRET_SUCCESS) {
        return Object.assign({}, state, {
            secret: action.secret,
            error: null
        });
    }
    else if (action.type === FETCH_SECRET_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    }
    return state;
}
