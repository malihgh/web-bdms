import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import HomeComponent from './pages/home/homeComponent';
import EditorComponent from './pages/editor/editorComponent';
// import SidebarComponent from './pages/sidebar/sidebarComponent';
import SettingCmp from './pages/settings/settingCmp';

import {
  loadDomains,
  loadCantons,
  loadSettings,
  loadUser
} from '@ist-supsi/bmsjs';

import {
  Icon
} from 'semantic-ui-react';

const cpaths = [
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
  },
  {
    path: process.env.PUBLIC_URL + '/setting/:id',
    exact: true,
    body: SettingCmp
  }
];

// console.log('process.env.PUBLIC_URL: ' + process.env.PUBLIC_URL)
class App extends React.Component {
  componentDidMount(){
    const {
      domains, cantons
    } = this.props;
    if(Object.keys(domains.data).length === 0){
      this.props.loadDomains();
    }
    if(cantons.data.length===0) this.props.loadCantons();
    this.props.loadSettings();
    this.props.loadUser();

    var scrollDiv = document.createElement("div");
    scrollDiv.className = "scrollbar-measure";
    document.body.appendChild(scrollDiv);

    // Get the scrollbar width
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    // console.warn(scrollbarWidth); // Mac:  15
    this.props.setScrollbarWidth(scrollbarWidth+'px')

    // Delete the DIV 
    document.body.removeChild(scrollDiv);

  }
  isFetching(){
    const {
      domains, cantons
    } = this.props;
    if(
      Object.keys(domains.data).length === 0
      || domains.isFetching === true
    ) return true;
    if (
      cantons.data.length === 0
      || cantons.isFetching === true
    ) return true;
    return false;
  }
  render() {
    const fpaths = cpaths.filter(rt => {
      // console.log(
      //   rt.path,
      //   this.props.user.data !== null?
      //     this.props.user.data.roles.indexOf('producer')>=0: '-'
      // )
      return (
        rt.path === '/'
        || (
          this.props.user.data !== null
          && this.props.user.data.roles.indexOf('producer')>=0
        ))
    })
    // console.log(fpaths);
    return (
      this.isFetching()?
      <div
          style={{
            flex: '1 1 0%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >

          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <img
                alt="Swiss Logo"
                src={process.env.PUBLIC_URL + '/img/ch.png'}
                style={{
                  height: '30px',
                  width: 'auto'
                }}
              />
              <div
                style={{
                  marginLeft: '1em'
                }}
              >
                <div>
                  <div>
                    Borehole Management System
                  </div>
                  <div
                    style={{
                      fontSize: '0.8em',
                      textAlign: 'center'
                    }}
                  >
                    Loading <Icon loading name='spinner' /> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>:
      <Router>
        <Switch>
          {
            fpaths.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={(r)=>(
                    <route.body/>
                  )}
                />
              )
            })
          }
          <Route
            component={(r)=>(
              <Redirect
                to={{
                  pathname:  process.env.PUBLIC_URL + "/"
                }}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    cantons: state.core_canton_list,
    domains: state.core_domain_list,
    // setting: state.setting,
    user: state.core_user
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    loadDomains: () => {
      dispatch(loadDomains());
    },
    loadCantons: () => {
      dispatch(loadCantons());
    },
    loadSettings: () => {
      dispatch(loadSettings());
    },
    setScrollbarWidth: (w) => {
      dispatch({
        type: "SETTING_SCROLLBAR_WIDTH",
        width: w
      });
    },
    loadUser: () => {
      dispatch(loadUser());
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// export default App
