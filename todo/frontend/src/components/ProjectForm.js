import React from 'react'

class ProjectForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
                name: '',
                repo_url: '',
                user: []
            };
        if (!props.is_create) {
            let url_split = document.location.hash.split('/');
            let id = parseInt(url_split[url_split.length - 1]);
            let project_edit = props.projects.filter((item)=>item.id === id)[0];
            if (project_edit) {
                this.state = {
                    id: project_edit.id,
                    name: project_edit.name ?? '',
                    repo_url: project_edit.repoUrl ?? '',
                    user: project_edit.user,
                };
            }
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleUserChange(event) {

        if (!event.target.selectedOptions) {
            this.setState(
                {
                    'user': []
                }
            );
            return;
        }

        let users = [];
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value);
        }

        this.setState(
                {
                    'user': users
                }
            );
    }

    handleSubmit(event) {

        if (this.props.is_create === true) {
            this.props.createProject(this.state.name, this.state.repo_url, this.state.user);
        } else {
            console.log(this.state.id);
            console.log(this.state.name);
            console.log(this.state.repoUrl);
            console.log(this.state.user);
            this.props.editProject(this.state.id, this.state.name, this.state.repo_url, this.state.user);
        }

        event.preventDefault();
    }

    render() {

        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>

                <table>
                    <tr>
                        <td>
                            <label htmlFor="name">Название </label>
                        </td>
                        <td>
                            <input type="text" className="form-control-text" name="name" value={this.state.name}
                           onChange={(event) => this.handleChange(event)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="repo_url">URL </label>
                        </td>
                        <td>
                            <input type="text" className="form-control-text" name="repo_url" value={this.state.repo_url}
                           onChange={(event) => this.handleChange(event)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="user">Пользователи </label>
                        </td>
                        <td>
                            <select name="user" className='form-control-select' multiple onChange={(event)=>this.handleUserChange(event)}
                            value={this.state.user}>
                                {this.props.users.map((item)=><option key={item.id} value={item.id}>{item.username}</option>)}
                            </select>
                        </td>
                    </tr>
                </table>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default ProjectForm;
