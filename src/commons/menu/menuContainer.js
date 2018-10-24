import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    withRouter
} from 'react-router-dom';


import MenuComponent from './menuComponent';

class MenuContainer extends React.Component {
  render() {
    const {
      history, location
    } = this.props;
    return(
      <MenuComponent
        mode={(()=>{
          if(
            location.pathname.indexOf('editor') >= 0
          ){
            console.log("editor mode")
            return 'editor';
          }else{
            console.log("viewer mode")
            return 'viewer';
          }
        })()}
        handleModeChange={(mode)=>{
          console.log(process.env.PUBLIC_URL, mode)
          if(mode==='editor'){
            history.push(
              process.env.PUBLIC_URL + '/editor'
            );
          }else if (mode === 'viewer'){
            history.push(
              process.env.PUBLIC_URL
            );
          }
        }}
      >
        {this.props.children}
      </MenuComponent>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MenuContainer));