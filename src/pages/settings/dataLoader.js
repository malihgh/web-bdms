import React, { createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withTranslation } from 'react-i18next';
import Markdown from 'markdown-to-jsx';

import {
  Button,
  Icon,
  Input
} from 'semantic-ui-react';

import {
  loadDomains,
  loadCantons,
  loadSettings,
  loadUser,
  setAuthentication,
  getContent,
} from '@ist-supsi/bmsjs';


class DataLoader extends React.Component {

  constructor(props) {
    super(props);
    this.fieldToRef = createRef();
    this.state = {
      isFetching: true,
      title: window.loginContent.title,
      body: window.loginContent.body,
      // title: {
      //   en: '',
      //   de: '',
      //   fr: '',
      //   it: '',
      //   ro: '',
      // },
      // body: {
      //   en: '',
      //   de: '',
      //   fr: '',
      //   it: '',
      //   ro: '',
      // },
    };
  }

  componentDidMount(){
    if (process.env.NODE_ENV === 'development'){
      this.props.setAuthentication('admin', 'swissforages');
    } else {
      this.props.setAuthentication('', '');
    }
    this.fieldToRef.current.focus();

    // setTimeout(
    //   () => {
    //     getContent('login')
    //       .then(
    //         r => {
    //           if (r.data.data !== null) {
    //             this.setState({
    //               isFetching: false,
    //               title: r.data.data.title,
    //               body: r.data.data.body,
    //             });
    //           }
    //         }
    //       );
    //   }, 500
    // );
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.user.data, prevProps.user.data)) {
      this.props.loadSettings();
      this.props.loadDomains();
      this.props.loadCantons();
    }
  }

  render() {
    const {
      i18n, t
    } = this.props;
    return (
      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#787878',
          display: 'flex',
          flex: '1 1 0%',
          justifyContent: 'center',
          height: '100%'
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '2px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: '2em',
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
                      {
                        this.state.title[
                          this.props.i18n.language
                        ]
                      }
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
                <Markdown>
                  {this.state.body[
                    this.props.i18n.language
                  ]}
                </Markdown>
              </div>
              {/* <div
                style={{
                  paddingTop: '1em'
                }}
              >
                For any use of swissforages.ch please respect the disclaimer of
                the Swiss Confederation and in particular the disclaimer
                (LINK to DISCLAIMER) of swissforages.ch.
              </div> */}
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
                Sign in
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
                ref={this.fieldToRef}
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
                size='small'
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
              <Button
                compact
                content='Enter as viewer'
                disabled={this.props.user.data !== null}
                fluid
                onClick={() => {
                  this.props.anonymousLogin(
                    'guest', 'MeiSe0we1Oowief'
                  );
                }}
                secondary
                size='small'
              />
            </div>
          </div>
          
          <div
            style={{
              fontSize: '0.9em',
              textAlign: 'center',
              paddingBottom: '1em',
            }}
          >
            <span
              className='link'
              onClick={() => {
                i18n.changeLanguage('de');
              }}
              style={{
                paddingRight: '0.5em',
                color: i18n.language === 'de' ?
                  '#ed1d24' : null,
                textDecoration: i18n.language === 'de' ?
                  'underline' : null
              }}
            >
              DE
            </span>
            <span
              className='link'
              onClick={() => {
                i18n.changeLanguage('fr');
              }}
              style={{
                paddingRight: '0.5em',
                color: i18n.language === 'fr' ?
                  '#ed1d24' : null,
                textDecoration: i18n.language === 'fr' ?
                  'underline' : null
              }}
            >
              FR
            </span>
            <span
              className='link'
              onClick={() => {
                i18n.changeLanguage('it');
              }}
              style={{
                paddingRight: '0.5em',
                color: i18n.language === 'it' ?
                  '#ed1d24' : null,
                textDecoration: i18n.language === 'it' ?
                  'underline' : null
              }}
            >
              IT
            </span>
            <span
              className='link'
              onClick={() => {
                i18n.changeLanguage('en');
              }}
              style={{
                color: i18n.language === 'en' ?
                  '#ed1d24' : null,
                textDecoration: i18n.language === 'en' ?
                  'underline' : null
              }}
            >
              EN
            </span>
          </div>
        </div>
      </div>
    );
  }
};

DataLoader.propTypes = {
  anonymousLogin: PropTypes.func,
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
      return dispatch(setAuthentication(username, password));
    },
    anonymousLogin: async (username, password) => {
      await Promise.all([
        dispatch(setAuthentication(username, password)),
        dispatch(loadUser())
      ]);
      return 'ciao';
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('common')(DataLoader));
