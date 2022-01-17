import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Goal from '../components/Goal'
import { Row, Col, Form, Modal, Button, Accordion } from 'react-bootstrap'
import Task from '../components/Task.js'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import _ from 'lodash'


function DailyTasksPage({ goals, setGoals, task, setTask }) {

    const [state, setState] = useState({})

    const getAllContent = async () => {
        try { // get all data from django api
            const response = await axios.get('http://127.0.0.1:8000/dashboard/goals/')
            const res = response.data
            const responseTwo = await axios.get('http://127.0.0.1:8000/dashboard/daily-task/')
            const resTwo = responseTwo.data
            const responseThree = await axios.get('http://127.0.0.1:8000/dashboard/task/')
            const resThree = responseThree.data
            console.log('res', res, 'restwo', resTwo)
            // format data for mapping
            let columnSet = {
                "daily-task": {
                    title: "Daily Tasks",
                    items: resTwo
                },
                "goals-tasks": {
                    title: "Goals/Tasks",
                    items: res
                },
                "tasklist": {
                    title: "TaskList",
                    items: resThree
                }
            }

            setState(columnSet)
        } catch (err) {
            console.log(err)
        }

    }
    // load getAllContent once
    useEffect(() => {
        getAllContent()
    }, [])

    console.log('state', state)


    const completeTask = async id => {
        try {
            const taskItem = task.filter(item => item.id === id)[0]
            taskItem.completed = true
            await axios.put(`/dashboard/task/${id}/`, taskItem)
            getAllContent()
        } catch (err) {
            console.log(err)
        }
    }

    const editTask = async task => {
        try {
            await axios.put(`/dashboard/task/${task.id}/`, task)
            getAllContent()
        } catch (err) {
            console.log(err)
        }
    }

    const deleteTask = async id => {
        try {
            await axios.delete(`http://127.0.0.1:8000/dashboard/task/${id}/`)
            getAllContent()
        } catch (err) {
            console.log(err)
        }
    }

    const completeGoal = async id => {
        try {
            const goal = goals.filter(goal => goal.id === id)[0]
            goal.completed = true
            await axios.put(`/dashboard/goals/${id}/`, goal)
            getAllContent()
        } catch (err) {
            console.log(err)
        }
    }

    const editGoal = async goal => {
        try {
            await axios.put(`/dashboard/goals/${goal.id}/`, goal)
            getAllContent()
        } catch (err) {
            console.log(err)
        }

    }

    const deleteGoal = async id => {
        try {
            await axios.delete(`/dashboard/goals/${id}/`)
            getAllContent()
        } catch (err) {
            console.log(err)
        }
    }

    const handleDragEnd = ({ destination, source }) => {
        console.log("from", source)
        console.log("to", destination)

        if (!destination) {
            return
        }

        if (destination.index === source.index && destination.droppableId == source.droppableId) {
            return
        }

        const itemCopy = state[source.droppableId].items[source.index]
        setState(prev => {
            prev = { ...prev }
            prev[source.droppableId].items.splice(source.index, 1)

            prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)
            return prev
        })


    }


    return (
        <div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Row>
                    {_.map(state, (data, key) => {
                        return (
                            <Col key={key} className={data.title === "Daily Tasks" ? "daily-task-column daily-item" : "daily-task-column"} sm={6}>
                                <h3 className="droppable-header">{data.title}</h3>
                                <Droppable droppableId={key}>
                                    {(provided) => {
                                        return (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className={"droppable-col"}
                                            >
                                                {data.items.map((el, index) => {
                                                    return (
                                                        <Draggable key={el.id} index={index} draggableId={`${key}-${el.id}`}>
                                                            {(provided) => {
                                                                return (
                                                                    <div
                                                                        className="item"
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        {data.title === 'Goals/Tasks' ? !el.completed && <Goal key={index} id={el.id} name={el.name} completeGoal={completeGoal} deleteGoal={deleteGoal} editGoal={editGoal} /> : !el.completed && <Task key={index} id={el.id} name={el.name} goal={el.goal} list={el.list} completeTask={completeTask} deleteTask={deleteTask} editTask={editTask} />}

                                                                    </div>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    )
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }}
                                </Droppable>
                            </Col>
                        )

                    })}

                </Row>
            </DragDropContext>
        </div>
    )
}

export default DailyTasksPage
