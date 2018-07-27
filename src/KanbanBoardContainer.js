import React, { Component } from 'react';
import 'whatwg-fetch';
import 'babel-polyfill';
import KanbanBoard from './KanbanBoard';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authentication: 'i-fetched-kanban-data'
};

class KanbanBoardContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards: []
        };
    }

    componentDidMount() {
        fetch(API_URL + '/cards', {headers: API_HEADERS})
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({cards: responseData});
        })
        .catch((error) => {
            console.log('Error fetching and parsing data', error);
        });
    }

    addTask(cardId, taskName) {
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

        let newTask = { id: Date.now(), name: taskName, done: false };

        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: { $splice: [[taskIndex, 1]] }
            }
        });

        this.setState({ cards: nextState });

        fetch('${API_URL}/cards/${cardId}/tasks/${taskId}', {
            method: 'delete',
            headers: API_HEADERS
        });
    }

    deleteTask(cardId, taskId, taskIndex) {
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: { $splice: [[taskIndex, 1]] }
            }
        });

        this.setState({ cards: nextState });

        fetch('${API_URL}/cards/${cardId}/tasks/${taskId}', {
            method: 'delete',
            headers: API_HEADERS,
            body: JSON.stringify({ done: newDoneValue })
        })
        .then((response) => response.json())
        .then((responseData) => {
                newTask.id = responseData.id
                this.setState({ cards: nextState });
        });
    }

    toggleTask(cardId, taskId, taskIndex) {
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

        let newDoneValue;

        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: { $apply: (done) => {
                            newDoneValue = !done
                            return newDoneValue;
                        }}
                    }
                }
            }
        });

        this.setState({ cards: nextState });

        fetch('${API_URL}/cards/${cardId}/tasks/${taskId}', {
            method: 'delete',
            headers: API_HEADERS,
            body: JSON.stringify({ done: newDoneValue })
        });
    }

    render() {
        return <KanbanBoard cards={this.state.cards}
                taskCallbacks = {{
                    toggle: this.toggleTask.bind(this),
                    delete: this.deleteTask.bind(this),
                    add: this.addTask.bind(this) }} />
    }
}

export default KanbanBoardContainer;