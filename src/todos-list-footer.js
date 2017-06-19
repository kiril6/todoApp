import React from 'react';

export default class TodosListFooter extends React.Component {
    render() {
        return (
            <tfoot>
                <tr>
                    <th><span onClick={this.props.filterAll}>All</span> | <span onClick={this.props.filterActive}>Active</span> | <span onClick={this.props.filterCompleted}>Completed</span></th>
                </tr>
            </tfoot>
        );
    }
}
