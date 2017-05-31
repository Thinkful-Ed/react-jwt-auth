import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches} from '../validators'

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password, firstName, lastName} = values;
        const user = {username, password, firstName, lastName};
        return this.props.dispatch(registerUser(user)).then(() =>
            this.props.dispatch(login(username, password))
        );
    }

    render() {
        return (
            <form className="login-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                <label htmlFor="firstName">First name</label>
                <Field component={Input} type="text" name="firstName" />
                <label htmlFor="lastName">Last name</label>
                <Field component={Input} type="text" name="lastName" />
                <label htmlFor="username">Username</label>
                <Field component={Input} type="text" name="username"
                    validate={[required, nonEmpty]}/>
                <label htmlFor="password">Password</label>
                <Field component={Input} type="password" name="password"
                    validate={[required, nonEmpty]} />
                <label htmlFor="passwordConfirm">Confirm password</label>
                <Field component={Input} type="password" name="passwordConfirm"
                    validate={[required, nonEmpty, matches('password')]} />
                <button>Register</button>
            </form>
        );
    }
}

export default reduxForm({form: 'registration'})(RegistrationForm);
