import React, { useEffect, useState } from 'react';
import { Form, FormGroup, FormControl, Table } from 'react-bootstrap';

const url = 'http://localhost:3000/todo/';

const TodoList = () => {
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        fetchTodo();
    }, []);
    const fetchTodo = () => {
        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((todoTitle) => {
                setTodo(todoTitle);
            });
    };

    const addRow = (todoTitle) => {
        const json = { todoTitle, done: false };
        console.log(todoTitle);
        fetch(url, {
            body: JSON.stringify(json),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(fetchTodo);
    };

    const deleteRow = (id) => {
        const targetUrl = url + id;
        console.log(targetUrl);
        fetch(targetUrl, {
            method: 'DELETE',
        }).then(fetchTodo);
    };

    const updateRow = (props) => {
        const targetUrl = url + props.id;
        console.log(props.done);
        const done = props.done ? false : true;
        console.log(done);

        const json = {
            done: done,
            id: props.id,
            todoTitle: props.todoTitle,
        };

        fetch(targetUrl, {
            body: JSON.stringify(json),
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(fetchTodo);
    };

    return (
        <div>
            <Table className="mt-3">
                <table
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <thead>
                        <tr>
                            <TodoAddForm addRow={addRow} />
                        </tr>
                    </thead>
                    <tbody>
                        {todo.map((row, index) => {
                            const { id, todoTitle, done } = row;
                            return (
                                <TodoRow
                                    key={index}
                                    id={id}
                                    todoTitle={todoTitle}
                                    deleteRow={deleteRow}
                                    updateRow={updateRow}
                                    done={done}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </Table>
        </div>
    );
};

const TodoRow = (props) => {
    return (
        <tr style={{}}>
            <td>
                <span onClick={() => props.updateRow(props)}>
                    {props.done ? (
                        <img src="img/circle.svg" style={{ width: '1.5rem' }} />
                    ) : (
                        <img
                            src="img/circle_check.svg"
                            style={{ width: '1.5rem' }}
                        />
                    )}
                </span>
            </td>
            <td>
                <span
                    style={
                        props.done
                            ? { textDecoration: 'line-through' }
                            : { textDecoration: 'none' }
                    }
                >
                    {props.todoTitle}
                </span>
            </td>
            <td>
                <span onClick={() => props.deleteRow(props.id)}>
                    <img src="img/trash.svg" style={{ width: '1.5rem' }} />
                </span>
            </td>
        </tr>
    );
};

const TodoAddForm = (props) => {
    const [form, setForm] = useState({
        todoTitle: '',
    });

    const handleInputChange = (event) => {
        const { value } = event.target;

        setForm({
            ...form,
            todoTitle: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { todoTitle } = form;
        if (todoTitle === '') {
            return false;
        }
        props.addRow(todoTitle);
        setForm({ todoTitle: '' });
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                    <FormControl
                        id="todoTitleInput"
                        name="todoTitle"
                        type="text"
                        onChange={handleInputChange}
                        value={form.todoTitle}
                        placeholder="ToDoを追加"
                        style={{ marginBottom: '25%', width: 300 }}
                    />
                </FormGroup>
            </Form>
        </div>
    );
};

export default TodoList;
