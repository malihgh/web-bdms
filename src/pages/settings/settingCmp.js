import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import _ from 'lodash';
import {
    withRouter
} from 'react-router-dom';
import MenuSettings from '../../commons/menu/settings/menuSettings';
import MenuContainer from '../../commons/menu/menuContainer';
import ExplorerSettings from './explorerSettings';

class SettingCmp extends React.Component {
  render() {
    const {
      setting,
      match
    } = this.props;
    return (
      <div
        style={{
          flex: '1 1 0%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <div style={{
          flex: '0 0 300px',
          // boxShadow: '2px 0px 5px 0px rgba(0,0,0,0.75)',
          borderRight: 'thin solid #c7c7c7',
          marginRight: '10px'
        }}>
          <MenuContainer>
            <MenuSettings/>
          </MenuContainer>
        </div>
        <div style={{
          flex: '1 1 0%',
          display: 'flex',
          flexDirection: 'row'
        }}>
           <Router>
            <Route
              path={process.env.PUBLIC_URL + "/setting/explorer"}
              component={ExplorerSettings}
            />
           </Router>
        </div>
    </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    setting: state.setting
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(translate('common')(withRouter(SettingCmp)));
