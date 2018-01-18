export const SHOW_ACTIVITY_DIALOG = 'SHOW_ACTIVITY_DIALOG';
export const showActivityDialog = () => ({
    type: SHOW_ACTIVITY_DIALOG
});

export const HIDE_ACTIVITY_DIALOG = 'HIDE_ACTIVITY_DIALOG';
export const hideActivityDialog = () => ({
    type: HIDE_ACTIVITY_DIALOG
});

export const SET_LOGOUT_TIME = 'SET_LOGOUT_TIME';
export const setLogoutTime = logoutTime => ({
    type: SET_LOGOUT_TIME,
    logoutTime
});
