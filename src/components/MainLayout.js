import React from 'react'
import {Container} from 'react-bootstrap'
import Header from './Header'
import Footer from './Footer'


const MainLayout = ({children}) => {
  return (
    <>
      <Header/>
      <main className="py-3">
        <Container>
        {children}
        </Container>
      </main>
      <Footer/>
    </>
  )
}

export default MainLayout