import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import _ from 'lodash';

import {
  List,
  Icon,
  Dropdown
} from 'semantic-ui-react';

class MenuComponent extends React.Component {
  render() {
    const {
      i18n, t, handleModeChange, mode
    } = this.props;
    return (
      <div style={{
        flex: '1 1 0%',
        display: 'flex',
        height: '100%',
        flexDirection: 'column'
      }}>
      <List divided verticalAlign='middle'>
          <List.Item
            style={{
              padding: '1em',
              backgroundColor: 'black',
              color: 'white'
            }}>
            <List.Content floated='right'>
              <Dropdown trigger={
                <span
                  style={{
                    color: 'rgb(222, 222, 222)'
                  }}
                >
                  change
                </span>
              } options={(()=>{
                let opts = [];
                if (mode !== 'viewer'){
                  opts.push({
                    key: 'viewer',
                    text: 'Exporer Mode',
                    icon: 'binoculars',
                    onClick: () => {
                      if(_.isFunction(handleModeChange)){
                        handleModeChange('viewer');
                      }
                    }
                  });
                }
                if (mode !== 'editor'){
                  opts.push({
                    key: 'editor',
                    text: 'Editor Mode',
                    icon: 'edit',
                    onClick: () => {
                      if(_.isFunction(handleModeChange)){
                        handleModeChange('editor');
                      }
                    }
                  });
                }
                return opts;
              })()} />
            </List.Content>
            {
              (()=>{
                switch (mode) {
                  case 'viewer':
                    return (
                      <List.Content>
                        <Icon name='binoculars' />
                        Explorer Mode
                      </List.Content>
                    )
                  case 'edit':
                    return (
                      <List.Content>
                        <Icon name='edit' />
                        Editor Mode
                      </List.Content>
                    )
                  case 'setting':
                    return (
                      <List.Content>
                        <Icon name='setting' />
                        Settings
                      </List.Content>
                    )
                
                  default:
                    break;
                }
              })()
            }
          </List.Item>
        </List>
        <div style={{ flex: 1 }}>
          {this.props.children}
        </div>
        <List
          divided
          verticalAlign='middle'
        >
          <List.Item
            style={{
              padding: '1em',
              backgroundColor: '#dedede',
              // color: 'white'
            }}>
            <List.Content floated='right'>
              <Dropdown
                  trigger={
                    <span>
                      {t('header:language')} ({i18n.language})
                    </span>
                  }
                >
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={()=>{
                        i18n.changeLanguage('en');
                      }}
                      selected={
                        i18n.language === 'en'
                      }
                    >
                      English
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={()=>{
                        i18n.changeLanguage('de');
                      }}
                      selected={
                        i18n.language === 'de'
                      }
                    >
                      Deutsch
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={()=>{
                        i18n.changeLanguage('fr');
                      }}
                      selected={
                        i18n.language === 'fr'
                      }
                    >
                      Français
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={()=>{
                        i18n.changeLanguage('it');
                      }}
                      selected={
                        i18n.language === 'it'
                      }
                    >
                      Italiano
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
            </List.Content>
            <List.Content
              as='a'
              onClick={(e)=>{
                e.stopPropagation();
                if(_.isFunction(handleModeChange)){
                  handleModeChange('setting/explorer');
                }
              }}
            >
              <Icon name='setting' />
              Settings
            </List.Content>
          </List.Item>
        </List>
    </div>
    );
  }
}

MenuComponent.propTypes = {
  handleModeChange: PropTypes.func,
  mode: PropTypes.string
};

export default translate(['common', 'header'])(MenuComponent);
