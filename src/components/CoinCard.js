import React from 'react'
import {Link} from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { formatCoinsData, formatPrice} from '../utils/CoinUtils'

const CoinCard = ({coin, pinCoinToTop, unPinCoin, pinned}) => {

  const {CoinInfo, RAW} = coin
  const coinRawData = formatCoinsData(RAW)[0]

  return (
    <Card className='coin-card'>
      <Link to={`/coin/${CoinInfo.Name.toLowerCase()}`}>
      <Card.Img className='bg-white' variant="top" src={process.env.REACT_APP_API_URL_IMAGES_ROOT + CoinInfo.ImageUrl} />
      </Link>
      <Card.Body className='text-center'>
        <Card.Title className='text-primary d-flex align-items-center justify-content-center'>
          {formatPrice(coinRawData.PRICE) + coinRawData.CURRENCY}
          { coinRawData.CHANGE24HOUR > 0 ? <i className="fas fa-sort-up text-success mx-2"></i> : <i className="fas fa-sort-down text-danger mx-2"></i>}
        </Card.Title>
        <Card.Text>
          for {CoinInfo.FullName}
        </Card.Text>
      </Card.Body>
      { pinned(coin.CoinInfo.Id) ?
        <Button onClick={() => unPinCoin(coin)} variant='link'><i className="fas fa-thumbtack text-primary"></i></Button> :
        <Button onClick={() => pinCoinToTop(coin)} variant='link'><i className="fas fa-thumbtack text-secondary"></i></Button>
      }
    </Card>
  )
}

export default CoinCard;