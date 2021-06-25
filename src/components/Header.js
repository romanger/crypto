import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar className='px-3' bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand className="d-flex align-items-center" href='/'><i className="fab fa-bitcoin text-primary display-6"></i><span className="mx-2">CryptoCurrency</span></Navbar.Brand>
          </LinkContainer>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header