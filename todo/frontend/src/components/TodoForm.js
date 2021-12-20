import React from 'react'
import Select from 'react-select';


class TodoForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            text: '',
            project: '',
            user: '',
        };
    }

    handleChangeSelect(event) {

        this.setState(
            {
                [event.name]: event.value
            }
        );
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        console.log(this.state.text);
        console.log(this.state.project);
        console.log(this.state.user);

        this.props.createTodo(this.state.text, this.state.project, this.state.user);

        event.preventDefault();
    }

    render() {

        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="text">Текст заметки </label>
                    <input type="text" className="form-control" name="text" value={this.state.text}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="project">Проект </label>
                    <Select name="project" className='form-control' onChange={(event)=>this.handleChangeSelect(event)}
                            value={{ label: this.props.current_project.name, value: this.props.current_project.Id }}
                            options={this.props.projects.map((item) => ({ label: item.name, value: item.id, name: 'project' }))} />
                </div>

                <div className="form-group">
                    <label htmlFor="user">Пользователь </label>
                    <Select name="user" className='form-control' onChange={(event)=>this.handleChangeSelect(event)}
                            value={{ label: this.props.current_user.username, value: this.props.current_user.Id }}
                            options={this.props.users.map((item)=>({ label: item.username, value: item.id, name: 'user' }))} />
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default TodoForm;
