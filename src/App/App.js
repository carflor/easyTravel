import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom'
import Holidays from '../Holidays/Holidays'
import Saved from '../Saved/Saved'

const main = (
  <main className="app">
    <nav className="nav">
      <p className="page-title">EasyTravel</p>
      {/* saved icon  */}
    </nav>
    <section className="search-box">
      <input type="search-bar">

      </input>
      {/* ICON FOR SEARCH BAR */}
    </section>
  </main> 
)

function App() {

  return (
    <Switch>
      <Route path="/holidays/:country" render={() => <Holidays />} />
      <Route path="/saved" render={() => <Saved />} />
      <Route path="/" render={() => main} />
    </Switch>
  )
}

export default App;
