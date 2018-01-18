import React from 'react';
import {connect} from 'react-redux';

import {clearAuth} from '../actions/auth';
import {
    showActivityDialog,
    hideActivityDialog,
    setLogoutTime
} from '../actions/activity';

export class ActivityDialog extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (!this.props.loggedIn && nextProps.loggedIn) {
            this.startWaiting();
        } else if (this.props.loggedIn && !nextProps.loggedIn) {
            this.stopWaiting();
        }
    }

    startWaiting() {
        // How long we will wait
        const ms = this.props.minutes * 60 * 1000;
        // The dialog shouldn't show to start with, only when there is a minute
        // remaining
        this.props.dispatch(hideActivityDialog());
        // Store the logout time, so we can display a countdown
        this.props.dispatch(setLogoutTime(new Date().getTime() + ms));
        // Logout after the wait
        this.logoutTimeout = setTimeout(() => this.logout(), ms);
        // Show the dialog one minute before we actually logout
        this.showTimeout = setTimeout(() => this.show(), ms - 60 * 1000);

        // Restart the counter if we click anywhere on the page
        this.clickListener = () => this.restartWaiting();
        window.addEventListener('click', this.clickListener);
    }

    stopWaiting() {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
        if (this.logoutTimeout) {
            clearTimeout(this.logoutTimeout);
            this.logoutTimeout = null;
        }
        if (this.rerenderInterval) {
            clearInterval(this.rerenderInterval);
            this.clearInterval = null;
        }
        if (this.clickListener) {
            window.removeEventListener('click', this.clickListener);
            this.clickListener = null;
        }
    }

    restartWaiting() {
        this.stopWaiting();
        this.startWaiting();
    }

    show() {
        // We aren't waiting to show the dialog any more
        this.showTimeout = null;
        // Show the dialog
        this.props.dispatch(showActivityDialog());
        // Rerender the dialog every second to update the countdown timer
        this.rerenderInterval = setInterval(() => this.forceUpdate(), 1000);
        // Clicks anywhere are no longer good enough to restart - you have to hit
        // the button
        window.removeEventListener('click', this.clickListener);
        this.clickListener = null;
    }

    logout() {
        // We aren't waiting to log out any more
        this.logoutTimeout = null;
        // Hide the dialog
        this.props.dispatch(hideActivityDialog());
        // Log out
        this.props.dispatch(clearAuth());
    }

    render() {
        if (!this.props.showDialog) {
            return <div className="refresh-dialog hidden" />;
        }

        const now = new Date().getTime();

        const secondsToGo =
            Math.floor((this.props.logoutTime - now) / 1000) + 1;
        const unit = secondsToGo > 1 ? 'seconds' : 'second';

        return (
            <div className="refresh-dialog">
                <div>
                    You will be logged out in {secondsToGo} {unit}
                </div>
                <button onClick={() => this.restartWaiting()}>
                    Keep me logged in
                </button>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => ({
    loggedIn: state.auth.currentUser !== null,
    showDialog: state.activity.showDialog,
    logoutTime: state.activity.logoutTime
});

export default connect(mapStateToProps)(ActivityDialog);
