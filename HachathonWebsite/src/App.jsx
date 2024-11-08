import React from 'react'
import { Route,Routes,BrowserRouter as Router } from 'react-router-dom'
import Home from './components/Home'
import Map from './components/Map'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/map' element={<Map/>}/>
      </Routes>
    </Router>
  )
}

export default App