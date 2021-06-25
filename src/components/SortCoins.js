import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'

const SortCoins = ({ sortByCoinName, sortByCoinPrice }) => {

  return (
    <Row className='justify-content-end'>
      <Col className='text-right'>
        <Button className='mx-3' onClick={() => sortByCoinName('name')}><i className="fas fa-sort-alpha-up-alt"></i></Button>
        <Button onClick={() => sortByCoinPrice('price')}><i className="fas fa-sort-numeric-up-alt"></i></Button>
      </Col>
    </Row>
  )
}

export default SortCoins