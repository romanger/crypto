import React, { useEffect, useState } from 'react'
import { fetchCoin, formatPrice, getPrice, useInterval } from '../utils/CoinUtils'
import { Card, Col, ListGroup, ListGroupItem, Row, Spinner } from 'react-bootstrap'
import CoinGraph from '../components/CoinGraph'

const CoinScreen = ({ match }) => {
  const [coin, setCoin] = useState({})
  const [loading, setLoading] = useState(true)
  const [price, setPrice] = useState({})

  const currency = coin.Price && Object.keys(coin.Price)[0]
  const creationDate = coin.CoinInfo && new Date(coin.CoinInfo.AssetLaunchDate)

  useEffect(() => {
    const getCoin = async () => {
      const coinRaw = await fetchCoin(match.params.id)
      setCoin(coinRaw)
      setLoading(false)
    }
    getCoin()
  }, [match.params.id])

  useInterval(() => {
    const getPriceHandler = async () => {
      const priceRaw = await getPrice(match.params.id)

      setPrice((old) => {
          if (priceRaw[currency] > old[currency]) {
            return { ...priceRaw, change: 'up' }
          }
          if (priceRaw[currency] < old[currency]) {
            return { ...priceRaw, change: 'down' }
          }
          return { ...priceRaw, change: null }
        }
      )
    }
    getPriceHandler()
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
                {price[currency] &&
                <span className={price.change}>
                  {price && formatPrice(price[currency])} {currency}
                </span>
                }
              </Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Creation date: {creationDate.toLocaleDateString()}</ListGroupItem>
              <ListGroupItem>Blocks Number: {coin.CoinInfo.BlockNumber}</ListGroupItem>
              <ListGroupItem>Total Coins Mined: {coin.CoinInfo.TotalCoinsMined}</ListGroupItem>
            </ListGroup>
          </Card>}
      </Col>
      <Col md={12} lg={8}>
        {!loading &&
        <CoinGraph coin={coin.CoinInfo.Name}/>}
      </Col>
    </Row>
  )
}

export default CoinScreen