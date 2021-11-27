import React from 'react'


const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.id}
            </td>
            <td>
                {user.username}
            </td>
            <td>
                {user.firstName}
            </td>
            <td>
                {user.lastName}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
   return (
       <table>
           <th>
               ID
           </th>
           <th>
               User name
           </th>
           <th>
               First name
           </th>
           <th>
               Last Name
           </th>
           <th>
               E-mail
           </th>
           {users.map((user) => <UserItem user={user} />)}
       </table>
   )
}


export default UserList