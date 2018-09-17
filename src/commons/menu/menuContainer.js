import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
    withRouter
} from 'react-router-dom'


import MenuComponent from './menuComponent'

class MenuContainer extends React.Component {
  render() {
    const {
      history, location
    } = this.props
    return(
      <MenuComponent
        mode={(()=>{
          if(
            _.indexOf([
              '', '/'
            ], location.pathname) >= 0
          ){
            return 'viewer'
          }else{
            return 'editor'
          }
        })()}
        handleModeChange={(mode)=>{
          if(mode==='editor'){
            history.push(
              process.env.PUBLIC_URL + '/editor'
            )
          }else if (mode === 'viewer'){
            history.push(
              process.env.PUBLIC_URL
            )
          }
        }}
      >
        {this.props.children}
      </MenuComponent>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MenuContainer))