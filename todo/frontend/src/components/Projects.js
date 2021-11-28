import React from 'react'


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                <a href="#/project/{project.id}">{project.name}</a>
            </td>
            <td>
                {project.repoUrl}
            </td>
            <td>
                {project.user}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
   return (
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
               </tr>
           </thead>
           <tbody>
            {projects.map((project) => <ProjectItem key={project.id} project={project} />)}
           </tbody>
       </table>
   )
}


export default ProjectList