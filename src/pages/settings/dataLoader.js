import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  Button,
  Input
} from 'semantic-ui-react';

import {
  loadDomains,
  loadCantons,
  loadSettings,
  loadUser,
  setAuthentication,
} from '@ist-supsi/bmsjs';


class DataLoader extends React.Component {

  componentDidMount(){
    if (process.env.NODE_ENV === 'development'){
      this.props.setAuthentication('admin', 'admin');
    } else {
      this.props.setAuthentication('', '');
    }
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.user.data, prevProps.user.data)) {
      this.props.loadSettings();
      this.props.loadDomains();
      this.props.loadCantons();
    }
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: '#787878',
          flex: '1 1 0%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '2px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            display: 'flex',
            flexDirection: 'row',
            padding: '2em'
          }}
        >
          <div
            style={{
              width: '300px',
              paddingRight: '1em'
            }}
          >
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
                  width: '27.27px'
                }}
              />
              <div
                style={{
                  marginLeft: '1em',
                  textAlign: 'left'
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '1.2em'
                    }}
                  >
                    Welcome to BDMS
                  </div>
                  <div
                    style={{
                      fontSize: '0.8em'
                    }}
                  >
                    Borehole Data Management System
                  </div>
                </div>
              </div>
            </div>
            
            <div
              style={{
                paddingTop: '2em'
              }}
            >
              A platform to manage data of soil investigations according to
              the Borehole data model defined by the Swiss Geological
              Survey at swisstopo (
              <a
                className='linker link'
                href='https://geoservice.ist.supsi.ch/docs/bdms'
                rel="noopener noreferrer"
                target='_BLANK'
              >
                more
              </a>).
            </div>
            <div
              style={{
                paddingTop: '1em'
              }}
            >
              For information or to request a demonstration please &nbsp;
              <a
                className='linker link'
                href='https://geoservice.ist.supsi.ch/docs/bdms'
                rel="noopener noreferrer"
                target='_BLANK'
              >
                contact
              </a>
              &nbsp; the Swiss Geological Survey at Swisstopo.
            </div>
          </div>

          <div
            style={{
              width: '300px',
              padding: '0px 1em 0px 2em'
            }}
          >
            <div
              style={{
                fontSize: '1.2em',
                paddingBottom: '2em',
                textAlign: 'center'
              }}
            >
              Signin
            </div>
            {/** Trick to disable autofill in chrome */}
            <input
              name='password'
              style={{
                display: 'none'
              }}
              type='password'
            />
            <div
              style={{
                fontSize: '0.8em',
                paddingBottom: '4px'
              }}
            >
              Username
            </div>
            <Input
              autoComplete="off"
              fluid
              onChange={(e) => {
                this.props.setAuthentication(
                  e.target.value,
                  this.props.user.authentication !== null?
                    this.props.user.authentication.password: ''
                );
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter'){
                  this.props.loadUser();
                }
              }}
              placeholder='username'
              value={
                this.props.user.authentication !== null?
                  this.props.user.authentication.username: ''
              }
            />
            
            <div
              style={{
                fontSize: '0.8em',
                padding: '8px 0px 4px 0px'
              }}
            >
              Password
            </div>
            <Input
              autoComplete="off"
              fluid
              onChange={(e) => {
                this.props.setAuthentication(
                  this.props.user.authentication !== null?
                    this.props.user.authentication.username: '',
                  e.target.value
                );
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter'){
                  this.props.loadUser();
                }
              }}
              placeholder='password'
              type='password'
              value={
                this.props.user.authentication !== null?
                  this.props.user.authentication.password: ''
              }
            />
            <Button
              color={
                this.props.user.data !== null? 'green': null
              }
              compact
              content='Login'
              fluid
              loading={this.props.user.data !== null}
              onClick={() => {
                this.props.loadUser();
              }}
              primary={this.props.user.data === null}
              style={{
                marginTop: '1.5em'
              }}
            />
            <div
              style={{
                color: 'red',
                fontSize: '0.8em'
              }}
            >
              {
                this.props.user.error === false?
                  <span>&nbsp;</span>: 'User or password wrong'
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
};

DataLoader.propTypes = {
  loadCantons: PropTypes.func,
  loadDomains: PropTypes.func,
  loadSettings: PropTypes.func,
  loadUser: PropTypes.func,
  setAuthentication: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
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
    loadUser: () => {
      dispatch(loadUser());
    },
    setAuthentication: (username, password) => {
      dispatch(setAuthentication(username, password));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataLoader);
