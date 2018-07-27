import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'babel-polyfill';

class CheckList extends Component {
    checkInputKeyPress(evt) {
        if (evt === 'Enter') {
            this.props.taskCallbacks.add(this.props.cardId, evt.target.value);
        }
    }

    render() {
        let tasks = this.props.tasks.map((task) => (
            <li key={task.id} className="checklist__task">
                <input type="checkbox" checked={task.done} onChange={
                    this.props.taskCallbacks.toggle.bind(null, this.props.cardId,
                    task.id, this.props.taskIndex)
                } />
                {task.name}{' '}
                <a href="#" className="checklist__task--remove" onClick={
                    this.props.taskCallbacks.delete.bind(null, this.props.cardId,
                    task.id, this.props.taskIndex)
                } />
            </li>
        ));

        return (
            <div className="checklist">
                <ul>{tasks}</ul>
                <input type="text"
                        className="checklist__task--add"
                        placeholder="Type then hit Enter to add a task"
                        onKeyPress={this.checkInputKeyPress.bind(this)} />
            </div>
        );
    }
}

CheckList.propTypes = {
    cardId: PropTypes.number,
    taskCallbacks: PropTypes.object,
    tasks: PropTypes.array
};

export default CheckList;