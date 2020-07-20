import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';

import {
  List,
  Icon,
  Popup,
} from 'semantic-ui-react';

import {
  unsetAuthentication
} from '@ist-supsi/bmsjs';

import Feedback from '../feedback/feedbackComponent';

class MenuComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      feedback: false,
    };
  }

  render () {

    const {
      i18n, handleModeChange, mode
    } = this.props;

    return (
      <div
        style={{
          alignItems: 'center',
          boxShadow: 'rgba(0, 0, 0, 0.17) 0px 4px 12px',
          display: 'flex',
          flexDirection: 'row',
          height: '5em',
          padding: '0px 1em',
          zIndex: 10
        }}
      >
        <img
          alt='ch logo'
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
            Borehole Management System
          </div>
          <div
            style={{
              color: '#787878',
              fontSize: '0.8em'
            }}
          >
            {
              (() => {
                switch (mode) {
                  case 'viewer':
                    return (
                      <span
                        style={{ color: '#ed1d24' }}
                      >
                        <Icon name='binoculars' /> Viewer mode
                      </span>
                    );
                  case 'editor':
                    return (
                      <span
                        style={{ color: '#ed1d24' }}
                      >
                        <Icon name='edit' />
                        Editor Mode
                      </span>
                    );
                  case 'setting':
                    return (
                      <span
                        style={{ color: '#ed1d24' }}
                      >
                        <Icon name='setting' /> Settings
                      </span>
                    );

                  default:
                    break;
                }
              })()
            }
          </div>
        </div>
        <div
          style={{
            alignItems: 'end',
            display: 'flex',
            flex: '1 1 100%',
            flexDirection: 'column',
            padding: '1em'
          }}
        >
          <Popup
            content={
              <Feedback
                onFinised={
                  () => {
                    this.setState({
                      feedback: false
                    });
                  }
                }
              />
            }
            on='click'
            onClose={()=>{
              this.setState({
                feedback: false
              });
            }}
            onOpen={()=>{
              this.setState({
                feedback: true
              });
            }}
            open={this.state.feedback}
            position='top right'
            trigger={
              <div
                className='linker'
              >
                Feedback
              </div>}
          />
        </div>
        <Popup
          on='click'
          position='bottom right'
          trigger={
            <Icon
              name='th'
              size='big'
              style={{
                cursor: 'pointer'
              }}
            />
          }
        >
          <div
            style={{
              minWidth: '200px'
            }}
          >
            {
              this.props.user.data !== null ?
                <div
                  style={{
                    padding: '0.5em'
                  }}
                >
                  <div>
                    {this.props.user.data.name}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      fontSize: '0.8em'
                    }}
                  >
                    <div
                      style={{
                        color: '#787878',
                        flex: '1 1 100%'
                      }}
                    >
                      {this.props.user.data.username}
                    </div>
                    <div>
                      <span
                        className='link linker'
                        onClick={()=>{
                          this.props.unsetAuthentication();
                          if (_.isFunction(handleModeChange)) {
                            handleModeChange('viewer');
                          }
                          // Clear cache
                          // window.location.reload(true);
                        }}
                      >
                        Logout
                      </span>
                    </div>
                  </div>
                </div> : ''
            }
            <List
              divided
              relaxed
              selection
              style={{
                marginTop: '0px'
              }}
            >
              <List.Item
                onClick={() => {
                  if (_.isFunction(handleModeChange)) {
                    handleModeChange('viewer');
                  }
                }}
                style={{
                  padding: '0.5em'
                }}
              >
                <List.Icon
                  name='binoculars'
                  verticalAlign='middle'
                />
                <List.Content>
                  <List.Header as='h4'>
                    Viewer mode
                  </List.Header>
                  <List.Description>
                    Search and display
                  </List.Description>
                </List.Content>
              </List.Item>
              {
                this.props.user.data !== null
                && (
                  this.props.user.data.roles.indexOf('VIEW') >= 0
                  || this.props.user.data.roles.indexOf('EDIT') >= 0
                  || this.props.user.data.roles.indexOf('CONTROL') >= 0
                  || this.props.user.data.roles.indexOf('VALID') >= 0
                  || this.props.user.data.roles.indexOf('PUBLIC') >= 0
                )?
                  <List.Item
                    onClick={() => {
                      if (_.isFunction(handleModeChange)) {
                        handleModeChange('editor');
                      }
                    }}
                    style={{
                      padding: '0.5em'
                    }}
                  >
                    <List.Icon
                      name='edit'
                      verticalAlign='middle'
                    />
                    <List.Content>
                      <List.Header as='h4'>
                        Editor mode
                      </List.Header>
                      <List.Description>
                        Create or modify
                      </List.Description>
                    </List.Content>
                  </List.Item>: null
              }
              <List.Item
                onClick={() => {
                  if (_.isFunction(handleModeChange)) {
                    handleModeChange('setting/explorer');
                  }
                }}
                style={{
                  padding: '0.5em'
                }}
              >
                <List.Icon
                  name='cog'
                  verticalAlign='middle'
                />
                <List.Content>
                  <List.Header as='h4'>
                    Settings
                  </List.Header>
                  <List.Description>
                    Update your preferences
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
            <div
              style={{
                fontSize: '0.9em',
                textAlign: 'center'
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
        </Popup>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    checkout: state.checkout,
    user: state.core_user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    unsetAuthentication: (username, password) => {
      dispatch(unsetAuthentication(username, password));
    }
  };
};

MenuComponent.propTypes = {
  handleModeChange: PropTypes.func,
  i18n: PropTypes.shape({
    changeLanguage: PropTypes.func,
    language: PropTypes.string
  }),
  mode: PropTypes.string,
  unsetAuthentication: PropTypes.func,
  user: PropTypes.object
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation(['common', 'header', 'borehole_form'])(MenuComponent));
