import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GoalsPage from './pages/GoalsPage'
import ErrorPage from './pages/ErrorPage';
import TopNavBar from './components/TopNavBar';
import { Container } from 'react-bootstrap'
import Date from './components/Date'

function App() {
  return (
    <Router>
      <Container className='pp'>
        <TopNavBar />
        <Date />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/goals' element={<GoalsPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Container>
    </Router>


  );
}

export default App;
