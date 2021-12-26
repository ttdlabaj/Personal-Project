import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'

function Task({ id, name, goal, list, completeTask, deleteTask, editTask }) {

    const [show, setShow] = useState(false);
    const [newName, setName] = useState(name)
    const [newGoal, setGoal] = useState(goal)
    const [newList, setList] = useState(list)

    const [goalData, setGoalData] = useState([])
    const [listData, setListData] = useState([])

    const [isChecked, setIsChecked] = useState(false)

    const getGoals = async () => {
        try {
            const response = await axios.get('/dashboard/goals/')
            const { data } = response
            setGoalData(data)

        } catch (err) {
            console.log(err)
        }
    }

    const getLists = async () => {
        try {
            const response = await axios.get('/dashboard/task-list/')
            const { data } = response
            setListData(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getGoals()
        getLists()


    }, [])

    useEffect(() => {

    }, [])

    const handleClose = () => {
        setShow(false)
        setName(name)
        setGoal(goal)
        setList(list)
    };
    const handleShow = () => {

        setShow(true)
    };

    const editTaskHandler = (name) => {
        handleClose()
        const task = {
            id,
            name,
            completed: false,
            list: [],
            goal,
        }
        editTask(task)
        setName(name)
    }

    const handleListValue = e => {
        const target = e.target
        let value = target.name
        if (target.checked) {
            console.log('hello')
            // setList([value, ...list])
        }
    }

    return (
        <>
            <Row className='task-item'>
                <Col md={1}><Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" onChange={() => completeTask(id)} />
                </Form.Group>
                </Col>
                <Col>
                    <p class="task-title">{name}</p>
                </Col>
                <Col md={2} className='edit-icons'>
                    <span className="e-icons" onClick={handleShow}><FontAwesomeIcon icon={faPen} /></span>
                    <span className="d-icons" onClick={() => deleteTask(id)}><FontAwesomeIcon icon={faTrashAlt} /></span>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Control type="text" value={newName} onChange={e => setName(e.target.value)} />

                            {/* {listData.map((listItem, index) => (
                                newList.includes(listItem.id) ? <Form.Check type="checkbox" key={index} checked={isChecked} label={listItem.name} name={listItem.id} aria-label="check" onChange={e => console.log(e)} /> : <Form.Check type="checkbox" key={index} label={listItem.name} name={listItem.id} aria-label="check" onChange={e => console.log(e)} />
                            ))} */}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => editTaskHandler(newName)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Task
