import React, { useState } from 'react'
import { fetchCoin, useInterval } from '../utils/CoinUtils'
import { Card, Col, ListGroup, ListGroupItem, Row, Spinner } from 'react-bootstrap'
import CoinGraph from '../components/CoinGraph'

const CoinScreen = ({ match }) => {

  const [coin, setCoin] = useState({})
  const [loading, setLoading] = useState(true)

  const currency = coin.Price && Object.keys(coin.Price)[0]
  const creationDate = coin.CoinInfo && new Date(coin.CoinInfo.AssetLaunchDate)

  useInterval(() => {
    const getCoin = async () => {
      const coinRaw = await fetchCoin(match.params.id)
      setCoin(coinRaw)
      setLoading(false)
    }
    getCoin()

  }, 2000)

  return (

    <Row>
      <Col md={12} lg={4}>
        {loading ? <Spinner animation="border" variant="primary"/> :
          <Card>
            <Card.Body>
              <Card.Img variant="top" src={process.env.REACT_APP_API_URL_IMAGES_ROOT + coin.CoinInfo.ImageUrl}/>
              <Card.Title className="d-flex justify-content-between pt-3">
                <span>{coin.CoinInfo.FullName}</span>
                <span>{coin.Price.USD > 1 ? coin.Price.USD.toFixed(2) : coin.Price[currency].toPrecision(2)} {currency}</span>
              </Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Creation date: {creationDate.toLocaleDateString()}</ListGroupItem>
              <ListGroupItem>Blocks Number: {coin.CoinInfo.BlockNumber}</ListGroupItem>
            </ListGroup>
          </Card>}
      </Col>
      <Col md={12} lg={8}>
        { !loading &&
        <CoinGraph coin={coin.CoinInfo.Name} /> }
      </Col>
    </Row>
  )
}

export default CoinScreen