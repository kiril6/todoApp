import React from 'react';

export default class TodosListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    renderTaskSection() {
        const { task, isCompleted } = this.props;

        const taskStyle = {
            color: isCompleted ? 'green' : 'red',
            opacity: isCompleted ? '0.3' : '0.9',
            cursor: 'pointer',
            textDecoration: isCompleted ? 'line-through' : 'none'
        };

        if (this.state.isEditing) {
            return (
                <td>
                    <form className="input-size" onSubmit={this.onSaveClick.bind(this)}>
                        <input id="edit" className="form-control input-sm" type="text" defaultValue={task} ref="editInput" />
                    </form>
                </td>
            );
        }

        return (
            <td style={taskStyle}
                onClick={this.props.toggleTask.bind(this, task)}
            ><form className="input-size">
                    <label>
                        <input checked={this.props.isCompleted} type="checkbox" />&nbsp;
                        <i class="input-helper"></i>
                    </label>
                    <span>{task}</span>  </form>
            </td>
        );
    }

    renderActionsSection() {
        if (this.state.isEditing) {
            return (
                <td>
                    &nbsp; <button className="btn btn-sm btn-success" onClick={this.onSaveClick.bind(this)}><i className="fa fa-floppy-o" aria-hidden="true"></i></button>
                    &nbsp;<button className="btn btn-sm btn-primary" onClick={this.onCancelClick.bind(this)}><i className="fa fa-ban" aria-hidden="true"></i></button>
                </td>
            );
        }

        return (
            <td>
                &nbsp;<button className="btn btn-sm btn-success" onClick={this.onEditClick.bind(this)}><i className="fa fa-pencil" aria-hidden="true"> </i></button>
                &nbsp;<button className="btn btn-sm btn-danger" onClick={this.props.deleteTask.bind(this, this.props.task)}><i className="fa fa-trash" aria-hidden="true"> </i></button>
            </td>
        );
    }

    render() {
        return (
            <tr>
                {this.renderTaskSection()}
                {this.renderActionsSection()}
            </tr>
        );
    }

    onEditClick() {
        this.setState({ isEditing: true });
    }

    onCancelClick() {
        this.setState({ isEditing: false });
    }

    onSaveClick(event) {
        event.preventDefault();
        const oldTask = this.props.task;
        const newTask = this.refs.editInput.value;
        this.props.saveTask(oldTask, newTask);
        this.setState({ isEditing: false });
    }
}
