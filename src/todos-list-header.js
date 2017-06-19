import React from 'react';

export default class TodosListHeader extends React.Component {

    renderDeleteAllBtn() {
        if (this.props.isDeleteAllShown) {
            return (
                <button onClick={this.props.deleteAll} className="btn btn-xs btn-danger" type="button">
                    <i className="fa fa-trash-o" aria-hidden="true"></i> All</button>
            )
        }
    }

    render() {
        return (
            <thead>
                <tr>
                    <th><span onClick={this.props.markAll}><i className="fa fa-check-square-o" aria-hidden="true"></i> Mark all completed</span>
                        <span className="pull-right">
                            {this.renderDeleteAllBtn()}
                        </span>
                    </th>


                </tr>
            </thead>
        );
    }
}
