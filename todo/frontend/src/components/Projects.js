import React from 'react'


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.name}
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
           <th>
               Name
           </th>
           <th>
               URL
           </th>
           <th>
               User
           </th>
           {projects.map((project) => <ProjectItem project={project} />)}
       </table>
   )
}


export default ProjectList