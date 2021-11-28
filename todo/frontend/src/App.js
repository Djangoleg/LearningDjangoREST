import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from 'axios'
import UserList from "./components/Users";
import ProjectList from "./components/Projects";
import TodoList from "./components/ToDo";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import {HashRouter, Route, Link} from 'react-router-dom'
import app_path from "./AppPath";

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
        }
        // this.handleClick = this.handleClick.bind(this);
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

        axios.get('http://127.0.0.1:8000/api/todo/')
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }

    componentDidUpdate() {
        let header = document.getElementsByClassName('header');
        if (header) {
            if (header.length > 0) {
                if (header[0].children) {
                    if (header[0].children.length > 0) {
                        if (document.location.hash === '#' + app_path.users) {
                            header[0].children[0].className = 'active';
                        } else if (document.location.hash === '#' + app_path.projects) {
                            header[0].children[1].className = 'active';
                        } else if (document.location.hash === '#' + app_path.todo) {
                            header[0].children[2].className = 'active';
                        }
                    }
                }
            }
        }
    }

    render() {
        return (
            <div>
                <HashRouter>
                    <div className="wrapper">
                        <Menu/>
                        <Route exact path={app_path.users} component={() =>
                            <div className="content">
                                <div className="contentDiscription">
                                    <b>Пользователи</b>
                                </div>
                                <UserList users={this.state.users}/>
                            </div>
                        }/>
                        <Route exact path={app_path.projects} component={() =>
                            <div className="content">
                                <div className="contentDiscription">
                                    <b>Проекты</b>
                                </div>
                                <ProjectList projects={this.state.projects}/>
                            </div>
                        }/>
                        <Route exact path={app_path.todo} component={() =>
                            <div className="content">
                                <div className="contentDiscription">
                                    <b>Заметки</b>
                                </div>
                                <TodoList todos={this.state.todos}/>
                            </div>
                        }/>
                        <Footer/>
                    </div>
                </HashRouter>
            </div>
        )
    }
}

export default App;
