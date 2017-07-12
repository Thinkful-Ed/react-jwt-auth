import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import LoginForm from './login-form';
import redirectIf from './redirect-if';

export function LandingPage(props) {
    return (
        <div className="home">
            <h2>Welcome to Foo App</h2>
            <LoginForm />
            <Link to="/register">Register</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(
    // If we are logged in redirect straight to the user's dashboard
    redirectIf(props => props.loggedIn, '/dashboard')(
        LandingPage
    )
);
