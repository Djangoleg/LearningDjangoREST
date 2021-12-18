import React from 'react'


class ProjectForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            repo_url: '',
            user: props.users.length > 0 ? props.users[0].id : 0
        };
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        console.log(this.state.name);
        console.log(this.state.repo_url);
        console.log(this.state.user);

        this.props.createProject(this.state.name, this.state.repo_url, this.state.user);

        event.preventDefault();
    }

    render() {

        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="login">Название </label>
                    <input type="text" className="form-control" name="name" value={this.state.name}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="repo_url">URL </label>
                    <input type="text" className="form-control" name="repo_url" value={this.state.repo_url}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="user">Пользователь </label>
                    <select name="user" className='form-control' onChange={(event)=>this.handleChange(event)}>
                        {this.props.users.map((item)=><option key={item.id} value={item.id}>{item.username}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default ProjectForm;
