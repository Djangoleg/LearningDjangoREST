import logo from './logo.svg';
import './App.css';
import React from 'react'
import UserList from "./components/User";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
       const users = [
           {
               'username': 'Fedya',
               'first_name': 'Фёдор',
               'last_name': 'Достоевский',
               'email': 'D.Fedya@mail.ru'
           },
           {
               'username': 'Alex',
               'first_name': 'Александр',
               'last_name': 'Грин',
               'email': 'A.Green@gmail.com'
           },
       ]
       this.setState(
           {
               'users': users
           }
       )
   }

   render () {
       return (
           <div>
               <UserList users={this.state.users} />
           </div>
       )
   }

}

export default App;
