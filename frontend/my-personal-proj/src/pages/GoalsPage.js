import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import AddGoal from '../components/AddGoal'
import Goal from '../components/Goal'

import axios from 'axios'

// axios.get('/dashboard/goals/')

function GoalsPage() {
    // useState to store the goals and set the goals
    const [goals, setGoals] = useState([])

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

    const addGoal = async newGoal => {
        try {
            await axios.post('/dashboard/goals/', newGoal)
            getGoals()
        } catch (err) {
            console.log(err)
        }
    }

    const completeGoal = async id => {
        try {
            const goal = goals.filter(goal => goal.id === id)[0]
            goal.completed = true
            await axios.put(`/dashboard/goals/${id}/`, goal)
            getGoals()
        } catch (err) {
            console.log(err)
        }
    }

    const editGoal = async goal => {
        try {
            await axios.put(`/dashboard/goals/${goal.id}/`, goal)
            getGoals()
        } catch (err) {
            console.log(err)
        }

    }

    const deleteGoal = async id => {
        try {
            await axios.delete(`/dashboard/goals/${id}/`)
            getGoals()
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div>
            <h1 className="header">Add Your Goals</h1>
            <AddGoal addGoal={addGoal} />
            {goals.map((goal, index) => (
                !goal.completed && <Goal key={index} id={goal.id} name={goal.name} completeGoal={completeGoal} deleteGoal={deleteGoal} editGoal={editGoal} />
            ))}
        </div>
    )
}

export default GoalsPage
