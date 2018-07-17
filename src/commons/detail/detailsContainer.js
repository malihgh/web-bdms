import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DetailsComponent from './detailsComponent'

import {
  getBorehole
} from '@ist-supsi/bmsjs'

class DetailsContainer extends React.Component {
  componentDidMount(){
    const {
      id
    } = this.props
    this.props.getBorehole(id)
  }
  render() {
    const {
      detail
    } = this.props
    return (
      detail.borehole?
        <DetailsComponent
          data={detail.borehole}/>:
        <div>
          Nothing selected
        </div>
    )
  }
}

DetailsContainer.propTypes = {
  detail: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    detail: state.detail_borehole,
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    getBorehole: (id) => {
      dispatch({
        type: 'GETBOREHOLEDETAILS'
      })
      getBorehole(
        id
      ).then(function(response) {
        if(response.data.success){
          dispatch({
            type: 'GETBOREHOLEDETAILS_OK',
            borehole: response.data.data
          })
        }else{
          dispatch({
            type: 'GETBOREHOLEDETAILS_ERROR',
            message: response.message
          })
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((DetailsContainer))
