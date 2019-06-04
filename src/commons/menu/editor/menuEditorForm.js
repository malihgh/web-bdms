import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import {
  withRouter
} from "react-router-dom";

import {
  Icon,
  List,
  Menu,
  Progress
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

const timeout = 10;

class MenuEditorForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      delete: false,
      timeout: 0
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
              active={
                location.pathname ===
                process.env.PUBLIC_URL + "/editor/"
                + match.params.id + "/finish"
              }
              onClick={() => {
                history.push(
                  process.env.PUBLIC_URL + "/editor/"
                  + match.params.id + "/finish"
                );
              }}
              style={{
                padding: '1em',
                borderLeft: location.pathname ===
                  process.env.PUBLIC_URL + "/editor/"
                  + match.params.id + "/finish" ?
                  '0.25em solid rgb(237, 29, 36)' : null
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
          key='medf-prps'
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
              <span
                style={{
                  color: 'red'
                }}
              >
                {
                  borehole.data.lock !== null?
                    t('editor:editingEnabled'):
                    t(`version:${borehole.data.version.code}`)
                }
              </span>
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
                fontSize: '0.8em',
                marginBottom: '0.25em'
              }}
            >
              {
                borehole.data.lock !== null?
                  <span
                    style={{
                      color: this.state.timeout >= 90? 'red': null
                    }}
                  >
                    <DateText
                      date={borehole.data.lock.date}
                      fromnow
                      onTick={(d, m)=>{
                        this.setState({
                          timeout: (
                            moment().diff(m, 'seconds') / (timeout * 60) * 100
                          )
                        }, ()=>{
                          if (
                            this.state.timeout > 100
                          ) {
                            this.props.unlock(
                              borehole.data.id
                            );
                          }
                        });
                      }}
                      timer={1}
                    />
                  </span>:
                  <DateText
                    date={borehole.data.updater.date}
                    fromnow
                  />
              }
            </div>
            {
              borehole.data.lock !== null?
                <Progress
                  color={
                    this.state.timeout >= 90?
                      'red': this.state.timeout >= 80?
                        'orange': 'black'
                  }
                  percent={this.state.timeout}
                  size='tiny'
                  style={{
                    margin: '0.5em 0em 0.2em'
                  }}
                />: null
            }
            {
              borehole.data.lock !== null?
                <div
                  style={{
                    // textAlign: 'right'
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: '0.8em'
                  }}
                >
                  <div style={{ flex: '1 1 100%' }}>
                    {(()=>{
                      let d = moment.duration(
                        moment(
                          borehole.data.lock.date
                        ).add(10, 'minutes').diff(moment())
                      );
                      return (
                        d.minutes().toString().padStart(2, '0') + ':'
                        + d.seconds().toString().padStart(2, '0')
                      );
                    })()}
                  </div>
                  <div>
                    <span
                      className='linker'
                      onClick={()=>{
                        this.props.lock(
                          borehole.data.id
                        );
                      }}
                    >
                      {t('refresh')}
                    </span>
                  </div>
                </div>: null
            }
          </div>
        </div>,
        <Menu
          icon='labeled'
          key='sb-em-3'
          size='mini'
          style={{
            margin: '0py',
            minHeight: '70px'
          }}
        >
          <Menu.Item
            disabled={
              borehole.data.lock === null
              || borehole.data.lock.username !== user.data.username
            }
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
                  'seconds'
                ) < (timeout * 60)?
                  'stop': 'play'
              }
            />
            {
              borehole.data.lock !== null
              && moment().diff(
                moment(borehole.data.lock.date),
                'seconds'
              ) < (timeout * 60)?
                t('borehole_form:editingStop'): t('borehole_form:editingStart')
            }
          </Menu.Item>
        </Menu>
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
  )(translate(['common', 'borehole_form', 'editor', 'version'])(MenuEditorForm))
);
