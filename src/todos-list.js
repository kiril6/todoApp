import _ from 'lodash';
import React from 'react';
import TodosListHeader from './todos-list-header';
import TodosListFooter from './todos-list-footer';
import TodosListItem from './todos-list-item';

export default class TodosList extends React.Component {
    renderItems() {
        const props = _.omit(this.props, 'todos');

        return _.map(this.props.todos, (todo, index) => <TodosListItem key={index} {...todo} {...props} />);
    }

    render() {
        return (
            <table>
                <TodosListHeader markAll={this.props.markAll} deleteAll={this.props.deleteAll} isDeleteAllShown={this.props.isDeleteAllShown} />
                <tbody>
                    {this.renderItems()}
                </tbody>
                <TodosListFooter filterAll={this.props.filterAll} filterActive={this.props.filterActive} filterCompleted={this.props.filterCompleted} />
            </table>
        );
    }
}
