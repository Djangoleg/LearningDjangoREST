import React from 'react'
import app_path from "../AppPath";
import {inactiveLinkClass} from "../common"


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {login: '', password: ''}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        // console.log(this.state.login + ' ' + this.state.password)
        this.props.get_token(this.state.login, this.state.password);
        event.preventDefault();
        inactiveLinkClass();
        document.location.hash = '#' + app_path.users;
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" name="login" placeholder="login" value={this.state.login}
                       onChange={(event) => this.handleChange(event)}/>
                <input type="password" name="password" placeholder="password" value={this.state.password}
                       onChange={(event) => this.handleChange(event)}/>
                <input type="submit" value="Login"/>
            </form>
        );
    }
}

export default LoginForm