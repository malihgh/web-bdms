import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import {
  Sidebar,
  Segment,
  Menu,
  // Icon,
  // List,
  // Header
} from 'semantic-ui-react'

import MenuExplorer from '../../commons/menu/explorer/menuExplorer'

class SidebarComponent extends React.Component {
  render() {
    return(
      <Sidebar.Pushable as={Segment}>
        <Sidebar
            as={Menu}
            animation='slide along'
            vertical
            visible
            width='wide'
          >
          <MenuExplorer/>
        </Sidebar>
        <Sidebar.Pusher
          style={{
            'height': '100%'
          }}>
            <div id="appBody" style={{
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flex: 1,
                flexDirection: 'column'
              }}>
              {this.props.children}
            </div>
          {/*
          <div style={{
            'overflow': 'hidden',
            'height': '100%',
            'display': 'flex',
            'flex': 1,
            'flexDirection': 'column'
          }}>
            <HeaderComponent/>
            <div id="appBody" style={{
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flex: 1,
                flexDirection: 'column'
              }}>
              {this.props.children}
            </div>
          </div>
          */}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    leftmenu: state.leftmenu,
    home: state.home,
    search: state.search
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    setIndex: (e, titleProps) => {
      const { index } = titleProps
      dispatch({
        type: 'LFMSELECTED',
        index: index
      })
    },
    boreholeSeleced: (borehole) => {
      dispatch({
        type: 'HOME_BOREHOLE_SELECTED',
        borehole: borehole
      })
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(translate('home')(SidebarComponent))