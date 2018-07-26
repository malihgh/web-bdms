import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import TableComponent from './tableComponent'

import {
  Table
} from 'semantic-ui-react'

import {
  loadStratigraphies
} from '@ist-supsi/bmsjs'

class StartigraphyTable extends TableComponent {
  getHeader(){
    return (
      <Table.Row>
        <Table.HeaderCell>id</Table.HeaderCell>
        <Table.HeaderCell>name</Table.HeaderCell>
      </Table.Row>
    )
  }
  getCols(item, idx){
    const {
      i18n,
      domains
    } = this.props
    return ([
      <Table.Cell key={this.uid + "_" + idx + "_1"}>
        {item.id}
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_2"}>
        {
          domains.data['layer_kind'].find(function(element) {
            return element.id === item.kind
          })[i18n.language].text
        }
      </Table.Cell>
    ])
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    store: state.core_stratigraphy_list,
    domains: state.core_domain_list,
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    loadData: (page = 1, filter = undefined) => {
      dispatch(loadStratigraphies(page, 100, filter))
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(translate('stratigraphy_table')(StartigraphyTable))
