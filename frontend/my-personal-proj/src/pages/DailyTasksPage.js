import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Goal from '../components/Goal'
import { Row, Col, Form, Modal, Button, Accordion } from 'react-bootstrap'
import Task from '../components/Task.js'


function DailyTasksPage({ goals, setGoals, task, setTask }) {

    const getGoals = async () => {
        try {
            const response = await axios.get('/dashboard/goals/')
            const { data } = response
            setGoals(data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getGoals()
    }, [])

    const getTask = async () => {
        try {
            const response = await axios.get('/dashboard/task/')
            const { data } = response
            setTask(data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getTask()
    }, [])

    const completeTask = async id => {
        try {
            const taskItem = task.filter(item => item.id === id)[0]
            taskItem.completed = true
            await axios.put(`/dashboard/task/${id}/`, taskItem)
            getTask()
        } catch (err) {
            console.log(err)
        }
    }

    const editTask = async task => {
        try {
            await axios.put(`/dashboard/task/${task.id}/`, task)
            getTask()
        } catch (err) {
            console.log(err)
        }
    }

    const deleteTask = async id => {
        try {
            await axios.delete(`/dashboard/task/${id}/`)
            getTask()
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div>
            <h1 className="header">Daily Tasks</h1>
            <Row>
                <Col sm={6}>sm=8</Col>
                <Col sm={6}>
                    <Accordion>
                        {goals.map((goal, index) => (
                            !goal.completed && <Accordion.Item eventKey={index}>
                                <Accordion.Header><p>{goal.name}</p></Accordion.Header>
                                <Accordion.Body>
                                    {task.map((item, index) => (
                                        goal.id === item.goal && <Task key={index} id={item.id} name={item.name} goal={item.goal} list={item.list} completeTask={completeTask} deleteTask={deleteTask} editTask={editTask} />
                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}


                    </Accordion>
                </Col>
            </Row>
            {goals.map((goal, index) => (
                !goal.completed && <p>{goal.name}</p>
            ))}
        </div>
    )
}

export default DailyTasksPage
