import React from 'react';
import { translate } from 'react-i18next';
import {
  withRouter
} from 'react-router-dom';

import {
  Menu,
  Dropdown,
  Icon
} from 'semantic-ui-react';

const HeaderComponent = (props) => {
  const { t, i18n, location, history } = props;
  return (
    <Menu
      inverted
      stackable
      style={{
        margin: '0px',
        borderRadius: '0'
      }}
    >
      <Menu.Item>
        BMS
      </Menu.Item>
      <Menu.Item
        active={location === process.env.PUBLIC_URL + '/'}
        onClick={(e) => {
          history.push(
            process.env.PUBLIC_URL + '/'
          );
        }}
      >
        <Icon name='binoculars' />
        {t('explore')}
      </Menu.Item>
      <Menu.Item
        active={location === process.env.PUBLIC_URL + '/editor'}
        onClick={(e) => {
          history.push(
            process.env.PUBLIC_URL + '/editor'
          );
        }}
      >
        <Icon name='add circle' />
        {t('borehole')}
      </Menu.Item>
      <Menu.Item
        active={false}
      >
        <Icon name='tasks' />
        {t('check')}
      </Menu.Item>
      <Menu.Item
        active={false}
      >
        <Icon name='check circle outline' />
        {t('validation')}
      </Menu.Item>
      <Menu.Menu position='right'>
        <Dropdown
          className='link item'
          icon="ellipsis vertical"
          item
          pointing
          text={t('settings') + ' '}
        >
          <Dropdown.Menu>
            <Dropdown.Header>
              {t('view_preferences')}
            </Dropdown.Header>
            <Dropdown.Item>
              {t('hide_map')}
            </Dropdown.Item>
            <Dropdown.Header>
              {t('user_preferences')}
            </Dropdown.Header>
            <Dropdown.Item>
              <Dropdown text={t('language') + ' '}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={()=>{
                      i18n.changeLanguage('en');
                    }}>English</Dropdown.Item>
                  <Dropdown.Item
                    onClick={()=>{
                      i18n.changeLanguage('en');
                    }}>Deutsch</Dropdown.Item>
                  <Dropdown.Item
                    onClick={()=>{
                      i18n.changeLanguage('en');
                    }}>Français</Dropdown.Item>
                  <Dropdown.Item
                    onClick={()=>{
                      i18n.changeLanguage('it');
                    }}>Italiano</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
};

export default translate('header')(withRouter(HeaderComponent));
