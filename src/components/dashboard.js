import React from 'react';
import {connect} from 'react-redux';
import redirectIf from './redirect-if';
import {fetchProtectedData} from '../actions/protected-data';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
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
                <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
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
        protectedData: state.protectedData.data
    };
};

export default connect(mapStateToProps)(
    // Only visible to logged in users
    redirectIf(props => !props.loggedIn, '/')(
        Dashboard
    )
);

