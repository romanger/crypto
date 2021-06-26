// Formatting data from coins object to array

import axios from 'axios'
import { useEffect, useRef } from 'react'

export const fetchCoins = async () => {
  const { data } = await axios.get(
    `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=USD&api_key=${process.env.REACT_APP_API_KEY}`
  )
  return data.Data
}

export const fetchCoin = async (coinName) => {
  const name = coinName.toUpperCase()
  const {data} = await axios.get(`https://min-api.cryptocompare.com/data/blockchain/mining/calculator?fsyms=${name}&tsyms=USD&api_key=${process.env.REACT_APP_API_KEY}`)
  return data.Data[name]
}

export const getCoinHistory = async (coinName, limit) => {
  const name = coinName.toUpperCase()
  const {data} = await axios.get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${name}&tsym=USD&limit=${limit}&api_key=${process.env.REACT_APP_API_KEY}`)
  return data.Data.Data
}

export const getPrice = async (coin) => {
  const {data} = await  axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=USD&api_key=${process.env.REACT_APP_API_KEY}`)
  return data
}

export const formatCoinsData = (coin) => {
    const coinDataArray = []

    for(const [key, value] of Object.entries(coin)) {
      const coin = {
        CURRENCY: key,
        ...value
      }

      coinDataArray.push(coin)
    }
    return coinDataArray;
}

export const formatPrice = (price) => {
  return  price > 1 ? price.toFixed(2) : price.toPrecision(2)
}

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}