import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from 'axios'
import UserList from "./components/Users";
import ProjectList from "./components/Projects";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import {HashRouter, Route} from 'react-router-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <HashRouter>
                    <Route exact path='/' component={() =>

                        <div className="wrapper">

                            <Menu/>

                            <div className="content">
                                <div className="contentDiscription">
                                    <b>Пользователи</b>
                                </div>
                                <UserList users={this.state.users}/>
                            </div>

                            <Footer/>

                        </div>

                    }/>
                    <Route exact path='/projects' component={() =>

                        <div className="wrapper">

                            <Menu/>

                            <div className="content">
                                <div className="contentDiscription">
                                    <b>Проекты</b>
                                </div>
                                <ProjectList projects={this.state.projects}/>
                            </div>

                            <Footer/>

                        </div>

                    }/>
                </HashRouter>
            </div>
        )
    }
}

export default App;
