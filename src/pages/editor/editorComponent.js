import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import BoreholeForm from '../../commons/form/borehole/boreholeForm'


class EditorComponent extends React.Component {
  render() {
    return (
      <div style={{
          'overflow': 'hidden',
          'height': '100%',
          'display': 'flex',
          'flex': 1,
          'flexDirection': 'column'
        }}>
        <BoreholeForm/>
      </div>
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
)(translate('editor')(EditorComponent))
