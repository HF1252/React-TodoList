import React from 'react';
import ReactDOM from 'react-dom';

import TodoList from './component/todoList';

import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <div
            style={{
                backgroundColor: '#87832b',
                height: 40,
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Container>
                <h1
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: '39',
                        fontFamily: 'serif',
                        marginTop: '10%',
                        marginBottom: '3.5%',
                        fontWeight: 'bold',
                    }}
                >
                    ToDo List
                </h1>
                <TodoList />
            </Container>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
