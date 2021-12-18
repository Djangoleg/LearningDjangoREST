import React from 'react'
import {Link} from 'react-router-dom'
import app_path from "../AppPath";

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                <Link to={app_path.project + '/' + project.id}>{project.name}</Link>
            </td>
            <td>
                {project.repoUrl}
            </td>
            <td>
                {project.user}
            </td>
            <td>
                <button type='button'>Edit</button>
                {' '}
                <button onClick={()=>deleteProject(project.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
   return (
       <div>
           <table>
               <thead>
                   <tr>
                       <th>
                           ID
                       </th>
                       <th>
                           Name
                       </th>
                       <th>
                           URL
                       </th>
                       <th>
                           User
                       </th>
                       <th>
                           Action
                       </th>
                   </tr>
               </thead>
               <tbody>
                {projects.map((project) => <ProjectItem key={project.id} project={project} deleteProject={deleteProject} />)}
               </tbody>
           </table>
           <Link to='/projects/create'>Create</Link>
       </div>
   )
}


export default ProjectList