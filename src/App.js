import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import _ from 'lodash';

import HomeComponent from './pages/home/homeComponent';
import EditorComponent from './pages/editor/editorComponent';
// import SidebarComponent from './pages/sidebar/sidebarComponent';
import SettingCmp from './pages/settings/settingCmp';

import {
  loadDomains,
  loadCantons,
  loadSettings,
  loadUser,
} from '@ist-supsi/bmsjs';

import {
  Icon
} from 'semantic-ui-react';

const cpaths = [
  {
    path: process.env.PUBLIC_URL + '/editor',
    exact: false,
    body: EditorComponent
  },
  {
    path: process.env.PUBLIC_URL + '/setting/:id',
    exact: true,
    body: SettingCmp
  },
  {
    path: process.env.PUBLIC_URL + '/',
    body: HomeComponent
  },
];

class App extends React.Component {

  componentDidMount() {

    this.props.loadUser();

    // Get the scrollbar width
    var scrollDiv = document.createElement("div");
    scrollDiv.className = "scrollbar-measure";
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    this.props.setScrollbarWidth(scrollbarWidth + 'px');
    // Delete the DIV 
    document.body.removeChild(scrollDiv);

  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.user.data, prevProps.user.data)) {
      this.props.loadSettings();
      this.props.loadDomains();
      this.props.loadCantons();
    }
  }

  isFetching() {
    const {
      cantons,
      domains,
      user
    } = this.props;
    if (
      user.data === null
      || user.isFetching === true
    ) {
      return true;
    }
    if (
      Object.keys(domains.data).length === 0
      || domains.isFetching === true
    ) {
      return true;
    }
    if (
      cantons.data.length === 0
      || cantons.isFetching === true
    ) {
      return true;
    }
    return false;
  }
  render() {
    return (
      this.isFetching() ?
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
                      textAlign: 'left'
                    }}
                  >
                    {
                      this.props.user.data === null?
                        <span>
                          <span
                            className='linker link'
                            onClick={()=>{
                              this.props.loadUser();
                            }}
                          >
                            Please login
                          </span> <Icon
                            name='lock'
                            size='small'
                          />
                        </span>:
                        <span>
                          Initialization <Icon
                            loading
                            name='spinner'
                            size='small'
                          />
                        </span>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>:
        <Router>
          <Switch>
            {
              cpaths.map((route, index) => {
                return (
                  <Route
                    component={(r) => (
                      <route.body />
                    )}
                    exact={route.exact}
                    key={index}
                    path={route.path}
                  />
                );
              })
            }
            <Route
              component={(r) => (
                <Redirect
                  to={{
                    pathname: process.env.PUBLIC_URL + "/"
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
    user: state.core_user
  };
};

const mapDispatchToProps = (dispatch) => {
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

