import React from 'react'
import { useParams } from 'react-router-dom'
import Moment from "moment" /* npm install moment --save */

const ProjectTodoItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.text}</td>
            <td>{item.user}</td>
            <td>{Moment(item.updatedOn).format('DD:MM:YYYY HH:mm:ss')}</td>
            <td>{item.isActive ? 'Yes' : 'No'}</td>
        </tr>
    )
}


const ProjectTodoList = ({items}) => {

    let { id } = useParams();
    let filtered_items = items.filter((item) => item.projectId == id)
    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>TEXT</th>
                <th>USER</th>
                <th>UPDATED</th>
                <th>ACTIVE</th>
            </tr>
            </thead>
            <tbody>
                {filtered_items.map((item) => <ProjectTodoItem key={item.id} item={item} />)}
            </tbody>
        </table>
    )
}

export default ProjectTodoList
