import React from 'react';
import { translate } from 'react-i18next';
import {
  Route,
  Switch
} from "react-router-dom";
import {
  withRouter
} from 'react-router-dom';
import MenuSettings from '../../commons/menu/settings/menuSettings';
import MenuContainer from '../../commons/menu/menuContainer';
import ExplorerSettings from './explorerSettings';

const SettingCmp = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <MenuContainer />
      <div
        style={{
          flex: '1 1 100%',
          // height: '100%',
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            // borderRight: 'thin solid #dfe0e0',
            boxShadow: 'rgba(0, 0, 0, 0.17) 2px 6px 6px 0px',
            display: 'flex',
            flexDirection: 'column',
            width: '250px'
          }}
        >
          <MenuSettings />
        </div>
        <div
          style={{
            flex: '1 1 0%',
            overflowY: 'auto'
          }}
        >
          {/* {
              match.params.id === 'explorer'?
                <ExplorerSettings/>: null
            }
            {
              match.params.id === 'editor'?
                <div>
                  ciao
                </div>: null
            } */}
          <Switch>
            <Route
              component={ExplorerSettings}
              path={process.env.PUBLIC_URL + "/setting/explorer"}
            />
            <Route
              path={process.env.PUBLIC_URL + "/setting/editor"}
              render={() => (
                <div
                  style={{
                    padding: '2em',
                    flex: 1
                  }}
                >
                  coming soon
                </div>
              )}
            />
            <Route
              path={process.env.PUBLIC_URL + "/setting/account"}
              render={() => (
                <div
                  style={{
                    padding: '2em',
                    flex: 1
                  }}
                >
                  coming soon
                </div>
              )}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default withRouter(translate('common')(SettingCmp));
