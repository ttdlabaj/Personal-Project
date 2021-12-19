import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function TopNavBar() {
    return (
        <Navbar expand="lg">
            <Container className='pp'>
                <Link to='/'><Navbar.Brand>Productivity<span className="orange">APP</span></Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to='/'><Nav>Goals</Nav></Link>
                        <Link to='/'><Nav>Daily Tasks</Nav></Link>
                        <Link to='/'><Nav>Master Task List</Nav></Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default TopNavBar
