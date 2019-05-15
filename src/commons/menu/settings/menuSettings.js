import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import {
    withRouter
} from 'react-router-dom';

import {
  // Icon,
  // Button,
  List
} from 'semantic-ui-react';


const MenuSettings = (props) => {
  const {
    history, t, location
  } = props;

  return (
    <div>
      <List
        divided
        relaxed
        selection
      >
        <List.Item
          onClick={()=>{
            history.push(
              process.env.PUBLIC_URL + '/'
            );
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
          onClick={()=>{
            history.push(
              process.env.PUBLIC_URL + '/setting/explorer'
            );
          }}
          style={{
            padding: '1em',
            borderLeft: location.pathname.indexOf('/setting/explorer') >= 0?
              '0.25em solid rgb(237, 29, 36)': null
          }}
        >
          <List.Icon
            name='binoculars'
            size='large'
            verticalAlign='middle'
          />
          <List.Content>
            <List.Header as='h3'>
              Viewer mode  
            </List.Header>
          </List.Content>
        </List.Item>
        <List.Item
          onClick={()=>{
            history.push(
              process.env.PUBLIC_URL + '/setting/editor'
            );
          }}
          style={{
            padding: '1em',
            borderLeft: location.pathname.indexOf('/setting/editor') >= 0?
              '0.25em solid rgb(237, 29, 36)': null
          }}
        >
          <List.Icon
            name='edit'
            size='large'
            verticalAlign='middle'
          />
          <List.Content>
            <List.Header as='h3'>
              Editor mode  
            </List.Header>
          </List.Content>
        </List.Item>
        <List.Item
          onClick={()=>{
            history.push(
              process.env.PUBLIC_URL + '/setting/account'
            );
          }}
          style={{
            padding: '1em',
            borderLeft: location.pathname.indexOf('/setting/account') >= 0?
              '0.5em solid rgb(237, 29, 36)': null
          }}
        >
          <List.Icon
            name='user outline'
            size='large'
            verticalAlign='middle'
          />
          <List.Content>
            <List.Header as='h3'>
              Account info
            </List.Header>
          </List.Content>
        </List.Item>
      </List>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    setting: state.setting
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    boreholeSelected: (borehole) => {
      dispatch({
        path: '/borehole',
        type: 'CLEAR'
      });
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    translate(['home','common', 'borehole_form'])(MenuSettings)
  )
);
