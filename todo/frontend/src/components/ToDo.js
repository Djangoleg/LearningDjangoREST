import React from 'react'
import Moment from 'moment' /* npm install moment --save */

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
       <table>
           <thead>
               <tr>
                   <td>
                        <button type='button'>Create</button>
                   </td>
               </tr>
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
   )
}


export default TodoList