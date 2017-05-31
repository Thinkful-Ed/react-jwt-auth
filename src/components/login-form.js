import React from 'react';
import {Field, reduxForm} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
    }

    render() {
        let error;
        if (this.props.error) {
            error = <div className="form-error">{this.props.error}</div>;
        }
        return (
            <form className="login-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                {error}
                <label htmlFor="username">Username</label>
                <Field component={Input} type="text" name="username" id="username"
                    validate={[required, nonEmpty]}/>
                <label htmlFor="password">Password</label>
                <Field component={Input} type="password" name="password" id="password"
                    validate={[required, nonEmpty]} />
                <button>Log in</button>
            </form>
        );
    }
}

export default reduxForm({form: 'login'})(LoginForm);
