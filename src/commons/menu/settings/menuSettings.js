import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  withRouter
} from 'react-router-dom';

import {
  List
} from 'semantic-ui-react';


const MenuSettings = (props) => {
  const {
    history,
    t,
    location
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
              Viewer  
            </List.Header>
          </List.Content>
        </List.Item>
        {
          props.user.data !== null
          && props.user.data.roles.indexOf('EDIT') >= 0?
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
                  Editor  
                </List.Header>
              </List.Content>
            </List.Item>: null
        }
        {/* <List.Item
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
        </List.Item> */}
        {
          props.user.data.admin === true?
            <List.Item
              onClick={()=>{
                history.push(
                  process.env.PUBLIC_URL + '/setting/admin'
                );
              }}
              style={{
                padding: '1em',
                borderLeft: location.pathname.indexOf('/setting/admin') >= 0?
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
                  Admin
                </List.Header>
              </List.Content>
            </List.Item>: null
        }
        {
          props.user.data.admin === true?
            <List.Item
              onClick={()=>{
                history.push(
                  process.env.PUBLIC_URL + '/setting/term'
                );
              }}
              style={{
                padding: '1em',
                borderLeft: location.pathname.indexOf('/setting/term') >= 0?
                  '0.5em solid rgb(237, 29, 36)': null
              }}
            >
              <List.Icon
                name='pencil'
                size='large'
                verticalAlign='middle'
              />
              <List.Content>
                <List.Header as='h3'>
                  {t('common:terms')}
                </List.Header>
              </List.Content>
            </List.Item>: null
        }
        {
          props.user.data.admin === true?
            <List.Item
              onClick={()=>{
                history.push(
                  process.env.PUBLIC_URL + '/setting/login'
                );
              }}
              style={{
                padding: '1em',
                borderLeft: location.pathname.indexOf('/setting/login') >= 0?
                  '0.5em solid rgb(237, 29, 36)': null
              }}
            >
              <List.Icon
                name='sign-in'
                size='large'
                verticalAlign='middle'
              />
              <List.Content>
                <List.Header as='h3'>
                  {t('common:loginScreen')}
                </List.Header>
              </List.Content>
            </List.Item>: null
        }
        {
          // props.user.data.admin === true?
          //   <List.Item
          //     onClick={()=>{
          //       history.push(
          //         process.env.PUBLIC_URL + '/setting/database'
          //       );
          //     }}
          //     style={{
          //       padding: '1em',
          //       borderLeft: location.pathname.indexOf('/setting/database') >= 0?
          //         '0.5em solid rgb(237, 29, 36)': null
          //     }}
          //   >
          //     <List.Icon
          //       name='database'
          //       size='large'
          //       verticalAlign='middle'
          //     />
          //     <List.Content>
          //       <List.Header as='h3'>
          //         Database
          //       </List.Header>
          //     </List.Content>
          //   </List.Item>: null
        }
        <List.Item
          onClick={()=>{
            history.push(
              process.env.PUBLIC_URL + '/setting/resources'
            );
          }}
          style={{
            padding: '1em',
            borderLeft: location.pathname.indexOf('/setting/resources') >= 0?
              '0.5em solid rgb(237, 29, 36)': null
          }}
        >
          <List.Icon
            name='linkify' // barcode
            size='large'
            verticalAlign='middle'
          />
          <List.Content>
            <List.Header as='h3'>
              {t('common:resources')}
            </List.Header>
          </List.Content>
        </List.Item>
      </List>
    </div>
  );
};

MenuSettings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  t: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    setting: state.setting,
    user: state.core_user
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
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    withTranslation(['home','common', 'borehole_form'])(MenuSettings)
  )
);
