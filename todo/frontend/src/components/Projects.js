import React from 'react'
import {Link} from 'react-router-dom'
import app_path from "../AppPath";

const ProjectItem = ({project, deleteProject, addEditProjectParams}) => {
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
                {project.user.join(", ")}
            </td>
            <td>
                <button onClick={()=>addEditProjectParams(project.id, project.name, project.repoUrl, project.user)} type='button'>Edit</button>
                {' '}
                <button onClick={()=>deleteProject(project.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject, addEditProjectParams}) => {
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
                           Users
                       </th>
                       <th>
                           Action
                       </th>
                   </tr>
               </thead>
               <tbody>
                {projects.map((project) => <ProjectItem key={project.id}
                                                        project={project}
                                                        deleteProject={deleteProject}
                                                        addEditProjectParams={addEditProjectParams}
                />)}
               </tbody>
           </table>
           <Link to={app_path.project_create}>Create</Link>
       </div>
   )
}


export default ProjectList