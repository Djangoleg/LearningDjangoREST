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

                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="text">Текст заметки </label>
                            </td>
                            <td>
                                <input type="text" className="form-control-text" name="text" value={this.state.text}
                               onChange={(event) => this.handleChange(event)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="project">Проект </label>
                            </td>
                            <td>
                                <Select name="project" className='form-control-select' onChange={(event)=>this.handleChangeSelect(event)}
                                options={this.props.projects.map((item) => ({ label: item.name, value: item.id, name: 'project' }))} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="user">Пользователь </label>
                            </td>
                            <td>
                                <Select name="user" className='form-control-select' onChange={(event)=>this.handleChangeSelect(event)}
                                options={this.props.users.map((item)=>({ label: item.username, value: item.id, name: 'user' }))} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default TodoForm;
