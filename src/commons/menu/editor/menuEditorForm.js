import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import {
  withRouter
} from "react-router-dom";

import {
  Button,
  Divider,
  Icon,
  List,
  Menu
} from 'semantic-ui-react';

import DomainText from '../../form/domain/domainText';
import DateText from '../../form/dateText';
import moment from 'moment';

import {
  deleteBorehole,
  lockBorehole,
  unlockBorehole
} from '@ist-supsi/bmsjs';

import Scroller from '../../scroller';

class MenuEditorForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      delete: false
    };
  }

  render() {
    const {
      borehole,
      history,
      location,
      match,
      t,
      user
    } = this.props;
    if (borehole.isFetching === true) {
      return 'Loading..';
    }
    return (
      [
        <Scroller
          key='sb-em-2'
          style={{
            flex: '1 1 100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <List
            divided
            relaxed
            selection
          >
            <List.Item
              onClick={() => {
                this.setState({
                  delete: false
                }, () => {
                  history.push(
                    process.env.PUBLIC_URL + "/editor"
                  );
                });
              }}
              style={{
                padding: '1em'
              }}
            >
              <List.Icon
                name='arrow left'
                size='large'
                verticalAlign='middle'
              />
              <List.Content>
                <List.Header as='h3'>
                  {t('common:done')}
                </List.Header>
              </List.Content>
            </List.Item>
            <List.Item
              active={
                location.pathname ===
                process.env.PUBLIC_URL + "/editor/"
                + match.params.id
              }
              onClick={() => {
                console.log(match);
                history.push(
                  process.env.PUBLIC_URL + "/editor/"
                  + match.params.id
                );
              }}
              style={{
                padding: '1em',
                borderLeft: location.pathname ===
                  process.env.PUBLIC_URL + "/editor/"
                  + match.params.id ?
                  '0.25em solid rgb(237, 29, 36)' : null
              }}
            >
              <List.Icon
                name='map marker'
                size='large'
                verticalAlign='middle'
              />
              <List.Content>
                <List.Header as='h3'>
                  {t('borehole_form:meta_location')}
                </List.Header>
              </List.Content>
            </List.Item>
            <List.Item
              active={
                location.pathname ===
                process.env.PUBLIC_URL + "/editor/"
                + match.params.id + "/borehole"
              }
              onClick={() => {
                console.log(match);
                history.push(
                  process.env.PUBLIC_URL + "/editor/"
                  + match.params.id + "/borehole"
                );
              }}
              style={{
                padding: '1em',
                borderLeft: location.pathname ===
                  process.env.PUBLIC_URL + "/editor/"
                  + match.params.id + "/borehole" ?
                  '0.25em solid rgb(237, 29, 36)' : null
              }}
            >
              <List.Icon
                name='info'
                size='large'
                verticalAlign='middle'
              />
              <List.Content>
                <List.Header as='h3'>
                  {t('borehole_form:meta_borehole')}
                </List.Header>
              </List.Content>
            </List.Item>
            <List.Item
              active={
                location.pathname ===
                process.env.PUBLIC_URL + "/editor/"
                + match.params.id + "/stratigraphy"
              }
              onClick={() => {
                // console.log(match);
                history.push(
                  process.env.PUBLIC_URL + "/editor/"
                  + match.params.id + "/stratigraphy"
                );
              }}
              style={{
                padding: '1em',
                borderLeft: location.pathname ===
                  process.env.PUBLIC_URL + "/editor/"
                  + match.params.id + "/stratigraphy" ?
                  '0.25em solid rgb(237, 29, 36)' : null
              }}
            >
              <List.Icon
                name='align justify'
                size='large'
                verticalAlign='middle'
              />
              <List.Content>
                <List.Header as='h3'>
                  {t('borehole_form:meta_stratigraphy')}
                </List.Header>
              </List.Content>
            </List.Item>
            <List.Item
              onClick={() => {

              }}
              style={{
                padding: '1em'
              }}
            >
              <List.Icon
                name='cloud upload'
                size='large'
                verticalAlign='middle'
              />
              <List.Content>
                <List.Header as='h3'>
                  Publish
                </List.Header>
              </List.Content>
            </List.Item>
          </List>
        </Scroller>,
        <div
          key='ciao-ciao'
          style={{
            padding: '2em'
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.7em',
                color: '#787878'
              }}
            >
              {t('editor:locked_status')}:
            </div>
            <div
              style={{
                fontWeight: 'bold'
              }}
            >
              {
                borehole.data.lock !== null?
                  <span
                    style={{
                      color: 'red'
                    }}
                  >
                    Locked
                  </span>:
                  <DomainText
                    id={borehole.data.version.code}
                    schema={'version'}
                  />
              }
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: '0.7em',
                color: '#787878'
              }}
            >
              {
                borehole.data.lock !== null?
                  t('editor:locked_by'):
                  t('common:creator')
              }:
            </div>
            <div
              style={{
                fontWeight: 'bold'
              }}
            >
              {
                borehole.data.lock !== null?
                  borehole.data.lock.username === this.props.user.data.username?
                    t('common:you'): borehole.data.lock.fullname:
                  borehole.data.updater.username === this.props.user.data.username?
                    t('common:you'): borehole.data.updater.fullname
              }
            </div>
            <div
              style={{
                fontSize: '0.7em',
                color: '#787878'
              }}
            >
              {
                borehole.data.lock !== null?
                  t('editor:locked_at'):
                  t('common:updateDate')
              }:
            </div>
            <div
              style={{
                fontWeight: 'bold'
              }}
            >
              {
                borehole.data.lock !== null?
                  <DateText
                    date={borehole.data.lock.date}
                    hours
                  />:
                  <DateText
                    date={borehole.data.updater.date}
                    hours
                  />
              }
            </div>
            <div
              style={{
                fontSize: '0.8em'
              }}
            >
              {
                borehole.data.lock !== null?
                  <DateText
                    date={borehole.data.lock.date}
                    fromnow
                  />:
                  <DateText
                    date={borehole.data.updater.date}
                    fromnow
                  />
              }
            </div>
          </div>
        </div>,
        <Menu
          icon='labeled'
          key='sb-em-3'
          size='mini'
          style={{
            margin: '0px',
            minHeight: '60px'
          }}
        >
          <Menu.Item
            onClick={() => {
              deleteBorehole(borehole.data.id).then(
                function () {
                  history.push(
                    process.env.PUBLIC_URL + "/editor"
                  );
                }
              );
            }}
            style={{
              flex: 1
            }}
          >
            <Icon
              name='trash alternate'
            />
            {t('common:delete')}
          </Menu.Item>
          <Menu.Item
            disabled={
              borehole.data.lock !== null
              && borehole.data.lock.username !== user.data.username
              // && moment().diff(
              //   moment(borehole.data.lock.date),
              //   'minutes'
              // ) < 10
            }
            onClick={() => {
              if (
                borehole.data.lock !== null
                && borehole.data.lock.username === user.data.username
              ){
                this.props.unlock(
                  borehole.data.id
                );
              } else if (
                borehole.data.lock === null
              ) {
                this.props.lock(
                  borehole.data.id
                );
              }
            }}
            style={{
              flex: 1
            }}
          >
            <Icon
              name={
                borehole.data.lock !== null
                && moment().diff(
                  moment(borehole.data.lock.date),
                  'minutes'
                ) < 10?
                  'lock': 'lock open'
              }
            />
            {
              borehole.data.lock !== null
              && moment().diff(
                moment(borehole.data.lock.date),
                'minutes'
              ) < 10?
                'Lock': 'Unlock'
            }
          </Menu.Item>
        </Menu>
        /*
        <Button
          color={this.state.delete === true ? 'black' : 'red'}
          fluid
          icon={
            this.state.delete === true ? false : true
          }
          key='sb-em-3'
          onClick={e => {
            if (this.state.delete === false) {
              this.setState({
                delete: true
              });
            } else {
              this.setState({
                delete: false
              }, () => {
                deleteBorehole(borehole.data.id).then(
                  function (response) {
                    history.push(
                      process.env.PUBLIC_URL + "/editor"
                    );
                  }
                );
              });
            }
          }}
        >
          {
            this.state.delete === true ?
              null :
              <Icon name='trash alternate' />
          }

          {
            this.state.delete === true ?
              t('common:sure') :
              t('common:delete')
          }
        </Button>
        */
      ]
    );
  }
}

MenuEditorForm.propTypes = {
  borehole: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  lock: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  t: PropTypes.func,
  unlock: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    borehole: state.core_borehole,
    editor: state.editor,
    user: state.core_user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    boreholeSelected: (borehole) => {
      dispatch({
        path: '/borehole',
        type: 'CLEAR'
      });
      dispatch({
        type: 'EDITOR_BOREHOLE_SELECTED',
        selected: borehole
      });
    },
    lock: (id) => {
      dispatch(
        lockBorehole(id)
      );
    },
    refresh: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_REFRESH'
      });
    },
    reset: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_RESET'
      });
    },
    unlock: (id) => {
      return dispatch(unlockBorehole(id));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(translate(['common', 'borehole_form', 'editor'])(MenuEditorForm))
);
