import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { translate } from 'react-i18next';
import {
  withRouter
} from "react-router-dom";

import {
  Button,
  Header,
  Icon,
  Segment,
  Table,
  List
} from 'semantic-ui-react';

import {
  deleteBorehole
} from '@ist-supsi/bmsjs';

import DateText from '../../form/dateText';
import DomainText from '../../form/domain/domainText';

class MenuEditorForm extends React.Component {

  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.state = {
      scroller: false
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    if (!_.isNil(this.menu) && this.menu.children.length > 0) {
      const height = this.menu.clientHeight;
      const children_height = this.menu.children[0].clientHeight;
      this.setState({
        scroller: children_height > height
      });
    } else {
      this.setState({
        scroller: true
      });
    }
  }

  render() {
    const {
      t, boreholeSelected, borehole, history, match, location
    } = this.props;
    return (
      [
        <div
          className={
            this.state.scroller === true?
            'scroller': null
          }
          ref={ divElement => this.menu = divElement}
          key='sb-em-2'
          style={{
            flex: '1 1 100%',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'hidden',
            marginRight: this.state.scroller === true?
              this.props.setting.scrollbar: '0px'
          }}>
            <List divided relaxed selection>
              <List.Item
                onClick={() => {
                  this.setState({
                    delete: false
                  }, () => {
                    history.push(
                      process.env.PUBLIC_URL + "/editor"
                    )
                  })
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
                onClick={() => {
                  console.log(match);
                  history.push(
                    process.env.PUBLIC_URL + "/editor/"
                      + match.params.id
                  )
                }}
                active={
                  location.pathname === 
                    process.env.PUBLIC_URL + "/editor/"
                      + match.params.id
                }
                style={{
                  padding: '1em',
                  borderLeft: location.pathname === 
                    process.env.PUBLIC_URL + "/editor/"
                      + match.params.id?
                    '0.25em solid rgb(237, 29, 36)': null
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
                  )
                }}
                style={{
                  padding: '1em',
                  borderLeft: location.pathname === 
                    process.env.PUBLIC_URL + "/editor/"
                      + match.params.id + "/borehole"?
                    '0.25em solid rgb(237, 29, 36)': null
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
                  console.log(match);
                  history.push(
                    process.env.PUBLIC_URL + "/editor/"
                      + match.params.id + "/stratigraphy"
                  )
                }}
                style={{
                  padding: '1em',
                  borderLeft: location.pathname === 
                    process.env.PUBLIC_URL + "/editor/"
                      + match.params.id + "/stratigraphy"?
                    '0.25em solid rgb(237, 29, 36)': null
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
        </div>,
        <Button
          color={this.state.delete === true ? 'black': 'red'}
          fluid
          icon
          onClick={e => {
            if (this.state.delete === false) {
              this.setState({
                delete: true
              })
            } else {
              this.setState({
                delete: false
              }, () => {
                deleteBorehole(borehole.data.id).then(
                  function (response) {
                    history.push(
                      process.env.PUBLIC_URL + "/editor"
                    )
                  }
                );
              })
            }
          }}>
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
      ]
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    editor: state.editor,
    borehole: state.core_borehole
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
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
    refresh: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_REFRESH'
      });
    },
    reset: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_RESET'
      });
    }
  }
};

export default withRouter(
    connect(
    mapStateToProps,
    mapDispatchToProps
  )(translate(['home', 'common', 'borehole_form'])(MenuEditorForm))
);