import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Player from "../components/Player"
import Header from "../components/Header"

import Home from './Home'
import Rank from './Rank'
import PlayList from './PlayList'
import Fm from './Fm'
import New from './New'
import Search from './Search'


const App = () =>(
  <Router>
    <div className="container">
      <Header />
      <Route exact path="/" component={ Home }/>
      <Route path="/rank" component={ Rank }/>
      <Route path="/playlist" component={ PlayList }/>
      <Route path="/fm" component={ Fm }/>
      <Route path="/new" component={ New }/>
      <Route path="/search" component={ Search }/>
      <Player />
    </div>
  </Router>
)

export default App