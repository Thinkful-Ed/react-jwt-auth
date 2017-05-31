import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import redirectIf from './redirect-if';
import {fetchSecret} from '../actions/secret';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchSecret());
    }

    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">
                    Name: {this.props.name}
                </div>
                <div className="dashboard-secret">
                    Secret: {this.props.secret}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        loggedIn: currentUser !== null,
        username: currentUser ? state.auth.currentUser.username : '',
        name: currentUser ?
            `${currentUser.firstName} ${currentUser.lastName}` :
            '',
        secret: state.secret.secret
    };
};

export default compose(
    connect(mapStateToProps),
    // Only visible to logged in users
    redirectIf(props => !props.loggedIn, '/')
)(Dashboard);

