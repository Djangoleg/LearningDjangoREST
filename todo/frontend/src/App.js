import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import UserList from "./components/Users";
import ProjectList from "./components/Projects";
import TodoList from "./components/ToDo";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import LoginForm from "./components/LoginForm";
import ProjectTodoList from "./components/ProjectDetail";
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import app_path from "./AppPath";
import {inactiveLinkClass, setActiveLink} from "./common"
import {Link} from 'react-router-dom'
import {NavLink} from "react-router-dom";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";


const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'username': '',
            'token': '',
        }
    }

    set_token(token, username) {
        const cookies = new Cookies();
        cookies.set('token', token);
        cookies.set('username', username);
        this.setState({'token': token, 'username': username}, () => this.load_data());
    }

    is_authenticated() {
        return this.state.token !== '';
    }

    logout() {
        inactiveLinkClass();
        this.set_token('', '');
    }

    get_token_from_storage() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const username = cookies.get('username');
        this.setState({'token': token, 'username': username}, () => this.load_data());
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {

                this.set_token(response.data['token'], username);

            }).catch(error => alert('Неверный логин или пароль'));
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token;
        }
        return headers;
    }

    load_data() {

        const headers = this.get_headers();

        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => {
            this.setState({users: []});
            console.log(error);
        });

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => {
            this.setState({projects: []});
            console.log(error);
        });

        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => {
            this.setState({todos: []});
            console.log(error);
        });
    }

    componentDidMount() {
        this.get_token_from_storage();
    }

    componentDidUpdate() {
        setActiveLink();
    }

    deleteTodo(id) {
        const headers = this.get_headers();
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers})
            .then(response => {
                // Вместо удаления заметки, делаем её неактивной.
                this.state.todos.map(function(item, i) {
                    if (item.id === id) {
                        item.isActive = false;
                    }
                });
                this.setState({todos: this.state.todos});
            }).catch(error => {
                console.log(error);
            });
    }

    deleteProject(id) {
        const headers = this.get_headers();
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                // this.setState({projects: this.state.projects.filter((item)=>item.id !== id)})
                // this.setState({todos: this.state.todos.filter((item)=>item.project !== id)});

                this.load_data();

            }).catch(error => {
                console.log(error);
            });
    }

    createProject(name, repo_url, user) {
        const headers = this.get_headers()
        const data = {name: name, repoUrl: repo_url, user: user}

        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
            .then(response => {

              //let new_project = response.data
              // const user = this.state.users.filter((item) => item.username === new_project.user[0])[0];
              // new_project.user = user;

              this.load_data();

            }).catch(error => console.log(error))
    }

    editProject(id, name, repo_url, user) {
        const headers = this.get_headers()
        const data = {id: id, name: name, repoUrl: repo_url, user: user}

        axios.put(`http://127.0.0.1:8000/api/projects/${id}/`, data, {headers})
            .then(response => {

              this.load_data();

            }).catch(error => console.log(error))
    }

    createTodo(text, project, user) {

        const headers = this.get_headers()
        const data = {text: text, project: project, user: user}

        axios.post(`http://127.0.0.1:8000/api/todo/`, data, {headers})
            .then(response => {

              //let new_todo = response.data
              // const user = this.state.users.filter((item) => item.username === new_project.user[0])[0];
              // new_project.user = user;
              //this.setState({todos: [...this.state.todos, new_todo]})

                this.load_data();

            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <HashRouter>
                    <div className="wrapper">
                        <div className="header">
                            <Menu/>
                            {this.is_authenticated() ? <NavLink className="login" to={app_path.login}
                                                                onClick={() => this.logout()}>{this.state.username} Logout</NavLink> :
                                <NavLink className="login" to={app_path.login}
                                         onClick={() => inactiveLinkClass()}>Login</NavLink>}
                        </div>

                        <div className="content">
                            <Switch>
                                <Route path={app_path.login}>
                                    <div>
                                        <div className="contentDiscription">
                                            <b>Авторизация</b>
                                        </div>
                                        <br/>
                                        <LoginForm
                                            get_token={(username, password) => this.get_token(username, password)}/>
                                    </div>
                                </Route>
                                <Route exact path={app_path.users} component={() =>
                                    <div>
                                        <div className="contentDiscription">
                                            <b>Пользователи</b>
                                        </div>
                                        <UserList users={this.state.users}/>
                                    </div>
                                }/>
                                <Route exact path={app_path.projects} component={() =>
                                    <div>
                                        <div className="contentDiscription">
                                            <b>Проекты</b>
                                        </div>
                                        <ProjectList projects={this.state.projects}
                                                     deleteProject={(id) => this.deleteProject(id)}/>
                                    </div>
                                }/>
                                <Route exact path={app_path.todo} component={() =>
                                    <div>
                                        <div className="contentDiscription">
                                            <b>Заметки</b>
                                        </div>
                                        <TodoList todos={this.state.todos}
                                                  deleteToDo={(id) => this.deleteTodo(id)}/>
                                    </div>
                                }/>
                                <Route path={app_path.project_id}>
                                    <div>
                                        <div className="contentDiscription">
                                            <b>Заметки проекта</b>
                                        </div>
                                        <ProjectTodoList items={this.state.todos}/>
                                    </div>

                                </Route>
                                <Route exact path={app_path.project_edit_id} component={ () =>
                                    <div>
                                        <div className="contentDiscription">
                                            <b>Редактирование проекта</b>
                                        </div>
                                        <ProjectForm users={this.state.users}
                                                     projects={this.state.projects}
                                                     is_create={false}
                                                     editProject={(id, name, url, user) =>
                                                         this.editProject(id, name, url, user)}
                                        />
                                    </div>
                                }/>
                                <Route exact path={app_path.project_create} component={ () =>
                                    <div>
                                        <div className="contentDiscription">
                                            <b>Создание проекта</b>
                                        </div>
                                        <ProjectForm users={this.state.users}
                                                     is_create={true}
                                                     createProject={(name, repo_url, user) =>
                                                         this.createProject(name, repo_url, user)}/>
                                    </div>
                                }/>
                                <Route exact path={app_path.todo_create} component={ () =>
                                    <div>
                                        <div className="contentDiscription">
                                            <b>Создание заметки</b>
                                        </div>
                                        <TodoForm users={this.state.users}
                                                  projects={this.state.projects}
                                                  createTodo={(text, project, user) =>
                                                      this.createTodo(text, project, user)}/>
                                    </div>
                                }/>
                                <Route component={NotFound404}/>
                            </Switch>
                        </div>
                        <Footer/>
                    </div>
                </HashRouter>
            </div>
        );
    }
}

export default App;
