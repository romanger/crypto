import React, { useState, useEffect, useCallback } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import CoinCard from '../components/CoinCard'
import SortCoins from '../components/SortCoins'
import { fetchCoins } from '../utils/CoinUtils'

const HomeScreen = () => {
  const [coins, setCoins] = useState([])
  const [sortedCoins, setSortedCoins] = useState([])
  const [pinnedCoins, setPinnedCoins] = useState([])
  const [loading, setLoading] = useState(true)

  const [sortType, setSortType] = useState()

  const isPinned = useCallback((id) => {
    return pinnedCoins.findIndex(pinnedId => pinnedId === id) !== -1
  }, [pinnedCoins])

  useEffect(() => {
    // calculate sorted coins and store them
    const sorted = [...coins]
    sorted.sort((a, b) => {
      const pinnedA = +isPinned(a.CoinInfo.Id)
      const pinnedB = +isPinned(b.CoinInfo.Id)

      if (pinnedA !== pinnedB) {
        return pinnedB - pinnedA
      }

      switch (sortType) {
        case 'price':
          return b.RAW.USD.PRICE - a.RAW.USD.PRICE
        case 'name':
          const nameA = a.CoinInfo.FullName.toUpperCase()
          const nameB = b.CoinInfo.FullName.toUpperCase()
          return nameA < nameB ? -1 : 1
        default:
          return 0
      }
    })

    setSortedCoins(sorted)
  }, [coins, pinnedCoins, sortType, isPinned])

  const sortByCoinName = () => {
    setSortType('name')
  }

  const sortByCoinPrice = () => {
    setSortType('price')
  }

  const pinCoinToTop = (coin) => {
    setPinnedCoins((old) => {
      return [...old, coin.CoinInfo.Id]
    })
  }

  const unPinCoin = (coin) => {
    setPinnedCoins((old) => {
      return old.filter(c => (c !== coin.CoinInfo.Id))
    })
  }

  useEffect(() => {
    const getCoins = async () => {
      const coinsRaw = await fetchCoins()
      setCoins(coinsRaw)
      setLoading(false)
    }
    getCoins()
  }, [])

  return (
    <>
      <h1 className="h2">Welcome to CryptoCurrency</h1>
      <SortCoins sortByCoinName={sortByCoinName} sortByCoinPrice={sortByCoinPrice}/>
      {loading ? <Spinner animation="border" variant="primary"/> :
        <Row className="py-4">
          {sortedCoins.map((coin, index) => (
            <Col className="pb-4" sm={6} md={4} lg={2} key={coin.CoinInfo.Id}>
              <CoinCard coin={coin} pinCoinToTop={pinCoinToTop} unPinCoin={unPinCoin} pinned={isPinned}/>
            </Col>
          ))}
        </Row>
      }
    </>
  )}

export default HomeScreen