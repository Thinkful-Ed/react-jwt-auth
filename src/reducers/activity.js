import {
    SHOW_ACTIVITY_DIALOG,
    HIDE_ACTIVITY_DIALOG,
    SET_LOGOUT_TIME
} from '../actions/activity';

const initialState = {
    showDialog: false,
    logoutTime: null
};

export default (state = initialState, action) => {
    if (action.type === SHOW_ACTIVITY_DIALOG) {
        return Object.assign({}, state, {
            showDialog: true
        });
    } else if (action.type === HIDE_ACTIVITY_DIALOG) {
        return Object.assign({}, state, {
            showDialog: false
        });
    } else if (action.type === SET_LOGOUT_TIME) {
        return Object.assign({}, state, {
            logoutTime: action.logoutTime
        });
    }

    return state;
};
