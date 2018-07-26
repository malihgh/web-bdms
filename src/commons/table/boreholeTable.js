import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import TableComponent from './tableComponent'

import {
  Table
} from 'semantic-ui-react'

import {
  loadBoreholes
} from '@ist-supsi/bmsjs'

class BoreholeTable extends TableComponent {
  getHeader(){
    return (
      <Table.Row>
        <Table.HeaderCell>id</Table.HeaderCell>
        <Table.HeaderCell>name</Table.HeaderCell>
      </Table.Row>
    )
  }
  getCols(item, idx){
    return ([
      <Table.Cell key={this.uid + "_" + idx + "_1"}>
        {item.id}
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_2"}>
        {item.name}
      </Table.Cell>
    ])
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    store: state.core_borehole_list,
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch: dispatch,
        loadData: (page, filter = {}) => {
          dispatch(loadBoreholes(page, 100, filter))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(translate('grid')(BoreholeTable))
