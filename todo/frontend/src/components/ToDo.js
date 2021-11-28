import React from 'react'
import Moment from 'moment'; /* npm install moment --save */


const TodoItem = ({todo}) => {
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
        </tr>
    )
}

const TodoList = ({todos}) => {
   return (
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
                       user
                   </th>
                   <th>
                       Active
                   </th>
               </tr>
           </thead>
           <tbody>
            {todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
           </tbody>
       </table>
   )
}


export default TodoList