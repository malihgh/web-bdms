import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import HeaderComponent from './pages/header/headerComponent'
import HomeComponent from './pages/home/homeComponent'
import EditorComponent from './pages/editor/editorComponent'

console.log('process.env.PUBLIC_URL: ' + process.env.PUBLIC_URL)
class App extends Component {
  render() {
    return (
      <Router>
          <div style={{
            'overflow': 'hidden',
            'height': '100%',
            'display': 'flex',
            'flex': 1,
            'flexDirection': 'column'
          }}>
          <HeaderComponent/>
          <div id="appBody" style={{
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flex: 1,
              flexDirection: 'column'
            }}>
            <Switch>
              {
                [
                  {
                    path: process.env.PUBLIC_URL + '/',
                    exact: true,
                    body: HomeComponent
                  },
                  {
                    path: process.env.PUBLIC_URL + '/editor',
                    exact: true,
                    body: EditorComponent
                  }
                ].map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.body}
                  />))
              }
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
