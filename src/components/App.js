import React, { Component } from 'react'
import './bootcamp/App.css'
import Home from './bootcamp/Home'
import About from './bootcamp/About'
import Topics from './bootcamp/Topics'
import Bootcamp from './bootcamp/Bootcamp'
import Taskapp from './taskapp/Taskapp.js'
import {
  BrowserRouter,
  Route,
  Link,
} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      // Must wrap in BrowserRouter to utlize react-router-dom
      <BrowserRouter>
        <div>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/About'>About</Link></li>
            <li><Link to='/Bootcamp'>Bootcamp</Link></li>
            <li><Link to='/Topics'>Topics</Link></li>
            <li><Link to='/Taskapp'>Task App</Link></li>
          </ul>

          <hr />

          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/bootcamp' component={Bootcamp} />
          <Route path='/topics' component={Topics} />
          <Route path='/taskapp' component={Taskapp} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
