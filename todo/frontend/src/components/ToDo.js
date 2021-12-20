import React from 'react'
import Moment from 'moment'
import app_path from "../AppPath";
import {Link} from "react-router-dom"; /* npm install moment --save */

const TodoItem = ({todo, deleteToDo}) => {
    return (
        <tr>
            <td>
                {todo.id}
            </td>
            <td>
                {Moment(todo.updated_on).format('DD:MM:YYYY HH:mm:ss')}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.user}
            </td>
            <td>
                {todo.isActive ? 'Yes' : 'No'}
            </td>
            <td>
                <button onClick={()=>deleteToDo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const TodoList = ({todos, deleteToDo}) => {
   return (
       <div>
           <table>
               <thead>
                   <tr>
                       <th>
                           ID
                       </th>
                       <th>
                           Updated
                       </th>
                       <th>
                           Project
                       </th>
                       <th>
                           Text
                       </th>
                       <th>
                           User
                       </th>
                       <th>
                           Active
                       </th>
                       <th>
                           Action
                       </th>
                   </tr>
               </thead>
               <tbody>
                {todos.map((todo) => <TodoItem key={todo.id} todo={todo} deleteToDo={deleteToDo}/>)}
               </tbody>
           </table>
           <Link to={app_path.todo_create}>Create</Link>
       </div>

   )
}


export default TodoList