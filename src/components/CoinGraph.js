import React, { useEffect, useState } from 'react'
import { getCoinHistory } from '../utils/CoinUtils'
import { Button } from 'react-bootstrap'

const CoinGraph = ({ coin }) => {
  const [history, setHistory] = useState([])
  const [graph, setGraph] = useState([])
  const [days, setDays] = useState(5)
  const [loading, setLoading] = useState(true)

  const normalizeGraph = (graph) => {
    const priceList = graph.map(item => (item.close))
    const maxValue = Math.max(...priceList)
    const minValue = Math.min(...priceList)

    return priceList.map(
      price => Math.trunc(5 + ((price - minValue) * 95) / (maxValue - minValue))
    )
  }

  const getColStyle = (col) => {
    return { height: col + '%', width: '20%' }
  }

  const getPriceClass = () => {
    return `graph__price--${days}`
  }

  const setDaysNumber = (daysNumber) => {
    setLoading(true)
    setDays(daysNumber)
  }

  useEffect(() => {
    const getGraph = async () => {
      const history = await getCoinHistory(coin, days)
      setHistory(history.slice(1))
      setGraph(normalizeGraph(history.slice(1)))
      setLoading(false)
    }
    getGraph()
  }, [days, coin])

  return (
    <div className="bg-dark h-100 p-3 graph">
      <div className="graph__head d-flex justify-content-between align-items-start">
        <h2>Coin Rate for last {days} days</h2>
        {days === 5 ?
          <Button className="link d-none d-lg-inline-block" onClick={() => {setDaysNumber(30)}}>Last 30 days</Button> :
          <Button className="link d-none d-lg-inline-block" onClick={() => {setDaysNumber(5)}}>Last 5 days</Button>}
      </div>
      {loading ? 'Loading ..' :
        <div className="graph__body d-flex h-75 align-items-end">
          {graph.map((col, index) => (
            <div key={index} className="bg-primary mx-1 px-1 graph__col" style={getColStyle(col)}>
              <span className={getPriceClass()}>{history[index].close} $</span>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default CoinGraph