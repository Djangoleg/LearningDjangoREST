import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from 'axios'
import UserList from "./components/User";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="wrapper">

                <div className="header">
                    <a className="active" href="index.html">Home</a>
                    <a href="#news">News</a>
                    <a href="#contact">Contact</a>
                    <a href="#about">About</a>
                </div>

                <div className="content">
                    <div className="contentDiscription">
                        <b>Пользователи</b>
                    </div>
                    <UserList users={this.state.users}/>
                </div>

                <div className="footer">
                    <div className="footerText">
                        ©{(new Date().getFullYear())} by OK
                    </div>
                </div>

            </div>
        )
    }

}

export default App;
