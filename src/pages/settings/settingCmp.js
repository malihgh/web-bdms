import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import {
  // BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import {
    withRouter
} from 'react-router-dom';
import MenuSettings from '../../commons/menu/settings/menuSettings';
import MenuContainer from '../../commons/menu/menuContainer';
import ExplorerSettings from './explorerSettings';

class SettingCmp extends React.Component {
  render() {
    const {
      match
    } = this.props;

    return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <MenuContainer/>
          <div
            style={{
              flex: '1 1 100%',
              // height: '100%',
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <div style={{
              // borderRight: 'thin solid #dfe0e0',
              boxShadow: 'rgba(0, 0, 0, 0.17) 2px 6px 6px 0px',
              display: 'flex',
              flexDirection: 'column',
              width: '250px'
            }}>
              <MenuSettings/>
            </div>
            <div style={{
              flex: '1 1 0%',
              overflowY: 'auto'
            }}>
              {
                match.params.id === 'explorer'?
                  <ExplorerSettings/>: null
              }
              {
                match.params.id === 'editor'?
                  <div>
                    ciao
                  </div>: null
              }
              {/* <Switch>
                <Route
                  path={process.env.PUBLIC_URL + "/setting/explorer"}
                  component={ExplorerSettings}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/setting/editor"}
                  render={()=>(
                    <div>
                      ciao
                    </div>
                  )}
                />
              </Switch> */}
            </div>
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

export default withRouter(
  connect(
      mapStateToProps,
      mapDispatchToProps
  )(
    translate('common')(SettingCmp)
  )
);

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(
//   translate('common')(withRouter(SettingCmp))
// );
