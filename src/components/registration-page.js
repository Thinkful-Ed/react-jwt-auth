import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import RegistrationForm from './registration-form';
import redirectIf from './redirect-if';

export function RegistrationPage(props) {
    return (
        <div className="home">
            <h2>Register for Foo App</h2>
            <RegistrationForm />
            <Link to="/">Login</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default compose(
    connect(mapStateToProps),
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    redirectIf(props => props.loggedIn, '/dashboard'),
)(RegistrationPage);
