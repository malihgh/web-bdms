import React from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import HomeComponent from './pages/home/homeComponent'
import EditorComponent from './pages/editor/editorComponent'
import SidebarComponent from './pages/sidebar/sidebarComponent'

import {
  loadDomains,
  loadCantons
} from '@ist-supsi/bmsjs'

// console.log('process.env.PUBLIC_URL: ' + process.env.PUBLIC_URL)
class App extends React.Component {
  componentDidMount(){
    const {
      domains, cantons
    } = this.props
    if(Object.keys(domains.data).length === 0){
      this.props.loadDomains()
    }
    if(cantons.data.length===0) this.props.loadCantons()
  }
  isFetching(){
    const {
      domains, cantons
    } = this.props
    if(
      Object.keys(domains.data).length === 0
      || domains.isFetching === true
    ) return true
    if (
      cantons.data.length === 0
      || cantons.isFetching === true
    ) return true
    return false
  }
  render() {
    return (
      this.isFetching()?
      'loading...':
      <Router>
        <Switch>
          {
            [
              {
                path: process.env.PUBLIC_URL + '/',
                exact: true,
                body: HomeComponent
              },
              {
                path: process.env.PUBLIC_URL + '/detail/:id',
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
                component={(r)=>(
                  false?
                    <SidebarComponent>
                      <route.body/>
                    </SidebarComponent>: <route.body/>
                )}
              />))
          }
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    domains: state.core_domain_list,
    cantons: state.core_canton_list
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    loadDomains: () => {
      dispatch(loadDomains())
    },
    loadCantons: () => {
      dispatch(loadCantons())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

// export default App
