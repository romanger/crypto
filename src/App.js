import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import MainLayout from './components/MainLayout'
import HomeScreen from './pages/HomeScreen'
import CoinScreen from './pages/CoinScreen'

const App = () => {
  return (
    <Router>
    <MainLayout>
      <Route path='/' component={HomeScreen} exact />
      <Route path='/coin/:id' component={CoinScreen} />
    </MainLayout>
    </Router>
  )
}

export default App;
