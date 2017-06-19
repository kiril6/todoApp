import React from 'react';
import _ from 'lodash';

export default class TodosList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        };
    }

    renderError() {
        if (!this.state.error) { return null; }

        return <div style={{ color: 'red' }}>{this.state.error}</div>;
    }

    render() {
        return (
            <form className="input-group" onSubmit={this.handleCreate.bind(this)}>
                <input id="add" className="form-control input-sm" type="text" placeholder="What do I need to do?" ref="createInput" />&nbsp;
                <button className="btn btn-sm btn-primary"><i className="fa fa-plus-circle" aria-hidden="true"></i> Add Task</button>
                {this.renderError()}
            </form>
        );
    }

    handleCreate(event) {
        event.preventDefault();

        const createInput = this.refs.createInput;
        const task = createInput.value;
        const validateInput = this.validateInput(task);

        if (validateInput) {
            this.setState({ error: validateInput });
            return;
        }

        this.setState({ error: null });
        this.props.createTask(task);
        this.refs.createInput.value = '';
    }

    validateInput(task) {
        if (!task) {
            return 'Please enter a task.';
        } else if (_.find(this.props.todos, todo => todo.task === task)) {
            return 'Task already exists.';
        } else {
            return null;
        }
    }
}
