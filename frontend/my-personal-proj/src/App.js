import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GoalsPage from './pages/GoalsPage'
import ErrorPage from './pages/ErrorPage';
import TopNavBar from './components/TopNavBar';
import { Container } from 'react-bootstrap'
import Date from './components/Date'
import DailyTasksPage from './pages/DailyTasksPage';
import MasterTasksPage from './pages/MasterTasksPage'
import { useState } from 'react'
import axios from 'axios'


function App() {
  const [goals, setGoals] = useState([])
  const [task, setTask] = useState([])
  return (
    <Router>
      <Container className='pp'>
        <TopNavBar />
        <Date />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/goals' element={<GoalsPage goals={goals} setGoals={setGoals} />} />
          <Route path='/daily-tasks' element={<DailyTasksPage goals={goals} setGoals={setGoals} task={task} setTask={setTask} />} />
          <Route path='/task-list' element={<MasterTasksPage task={task} setTask={setTask} />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Container>
    </Router>


  );
}

export default App;
