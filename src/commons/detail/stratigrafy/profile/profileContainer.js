import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import {
  loadLayers
} from '@ist-supsi/bmsjs'
import ProfileView from './view/profileViewComponent'

class ProfileContainer extends React.Component {
  componentDidMount(){
    const {
      id
    } = this.props
    console.log(id);
    if(id !== null){
      this.props.loadLayers(id)
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.props.loadLayers(this.props.id);
    }
  }
  render() {
    const {
      layers
    } = this.props
    if (layers.data.length === 0){
      return null
    }
    return (
      <ProfileView
        data={layers.data}/>
    )
  }
}

ProfileContainer.propTypes = {
  id: PropTypes.number
}

const mapStateToProps = (state, ownProps) => {
  return {
    layers: state.core_layers_list,
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    loadLayers: (id) => {
      dispatch(loadLayers(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate('borehole_form')(ProfileContainer))
