import './App.css';
import React, { Component, PropTypes } from 'react';
import CreateTodo from './create-todo';
import TodosList from './todos-list';
import _ from 'lodash';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.storage = localStorage;
        this.state = {
            todos: [{
                id: 1,
                task: 'Demo task 1 (mark it)',
                isCompleted: false
            },
            {
                id: 2,
                task: 'Demo task 2 (de-mark it)',
                isCompleted: true
            },
            {
                id: 3,
                task: 'Demo task 3 (edit it)',
                isCompleted: false
            },
            {
                id: 4,
                task: 'Demo task 4 (delete it)',
                isCompleted: false
            }],
            isDeleteAllShown: false
        };
    }

    generateUUID() {
        let uidPartal = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return uidPartal() + uidPartal() + '-' + uidPartal() + '-' + uidPartal() + '-' +
            uidPartal() + '-' + uidPartal() + uidPartal() + uidPartal();
    }

    render() {
        if (this.state.todos.length > 0) {
            return (
                <div className="frame">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <h1 className="app-title">Fancy ToDo App</h1>
                            <CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)} />
                            <TodosList
                                markAll={this.markAll.bind(this)}
                                filterAll={this.filterAll.bind(this)}
                                filterActive={this.filterActive.bind(this)}
                                filterCompleted={this.filterCompleted.bind(this)}
                                todos={this.state.todos}
                                deleteAll={this.deleteAll.bind(this)}
                                toggleTask={this.toggleTask.bind(this)}
                                saveTask={this.saveTask.bind(this)}
                                deleteTask={this.deleteTask.bind(this)}
                                isDeleteAllShown={this.state.isDeleteAllShown}
                            />
                            <div className="creator bg-primary"> Author: Kiril Delovski</div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="frame">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <h1 className="app-title">Fancy ToDo App</h1>
                        <CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)} />
                        <div className="empty-tasks">No tasks to display. Please add tasks.</div>
                        <div className="creator bg-primary"> Author: Kiril Delovski</div>
                    </div>
                </div>
            </div>
        );
    }

    toggleTask(task) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === task);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.storage.setItem('todos', JSON.stringify(this.state.todos));
        this.setState({ todos: this.state.todos });
    }

    markAll() {
        let markAll;
        markAll = _.map(this.state.todos, (todo) => {
            return {
                ...todo, isCompleted: true
            }
        });
        this.setState({ todos: markAll, isDeleteAllShown: true });
    }


    filterAll() {
        var allTodos = JSON.parse(this.storage.getItem('todos'));
        this.setState({ todos: allTodos });
    }

    filterActive() {
        var allTodos = JSON.parse(this.storage.getItem('todos'));
        if (allTodos) {
            this.setState({ todos: allTodos });
        }
        const filterActive = _.filter(allTodos, { 'isCompleted': false });
        this.setState({ todos: filterActive });
    }

    filterCompleted() {

        var allTodos = JSON.parse(this.storage.getItem('todos'));
        if (allTodos) {
            this.setState({ todos: allTodos });
        }

        const filterCompleted = _.filter(allTodos, { 'isCompleted': true });
        this.setState({ todos: filterCompleted });
    }

    createTask(task) {
        this.state.todos.push({
            task,
            id: this.generateUUID(),
            isCompleted: false,
        });
        this.storage.setItem('todos', JSON.stringify(this.state.todos));

        this.setState({ todos: this.state.todos });
    }

    saveTask(oldTask, newTask) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
        foundTodo.task = newTask;
        this.storage.setItem('todos', JSON.stringify(this.state.todos));
        this.setState({ todos: this.state.todos });
    }

    deleteTask(todoID) {
        _.remove(this.state.todos, todo => todo.task === todoID);
        this.storage.setItem('todos', JSON.stringify(this.state.todos));
        this.setState({ todos: this.state.todos });
    }
    deleteAll(todoID) {
        this.setState({ todos: [], isDeleteAllShown: false });
        this.storage.setItem('todos', JSON.stringify([]));
    }
}