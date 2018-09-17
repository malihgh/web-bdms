import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import _ from 'lodash'

import TableComponent from './tableComponent'
import DomainText from '../form/domain/domainText'
import DateText from '../form/dateText'

import {
  Table
} from 'semantic-ui-react'

import {
  loadEditingBoreholes
} from '@ist-supsi/bmsjs'

class BoreholeEditorTable extends TableComponent {
  getHeaderLabel(key){
    const { t } = this.props
    return (
      <Table.HeaderCell
        // singleLine
        verticalAlign='top'>
        {t(key)}
        <br/>
        <span style={{
          fontSize: '0.8em',
          color: '#787878'
        }}>
          {key}
        </span>
      </Table.HeaderCell>
    )
  }
  getHeader(){
    const { t } = this.props
    return (
      <Table.Row>
        <Table.HeaderCell
          verticalAlign='top'>
          Status
          <br/>
          <span
            style={{
              color: '#787878',
              fontSize: '0.8em'
            }}>
            Completness
          </span>
        </Table.HeaderCell>
        <Table.HeaderCell
          verticalAlign='top'>
          {t('original_name')}
          <br/>
          <span
            style={{
              color: '#787878',
              fontSize: '0.8em'
            }}>
            {t('kind')}
          </span>
        </Table.HeaderCell>
        <Table.HeaderCell
          verticalAlign='top'>
          {t('restriction')}
          <br/>
          <span
            style={{
              color: '#787878',
              fontSize: '0.8em'
            }}>
            {t('restriction_until')}
          </span>
        </Table.HeaderCell>
        {/*<Table.HeaderCell
          verticalAlign='top'>
          {t('coordinates')}
          <br/>
          <span
            style={{
              color: '#787878',
              fontSize: '0.8em'
            }}>
            {t('srs')}
          </span>
        </Table.HeaderCell>*/}
        <Table.HeaderCell
          verticalAlign='top'>
          {t('elevation_z')} ({t('hrs')})
          <br/>
          <span
            style={{
              color: '#787878',
              fontSize: '0.8em'
            }}>
            {t('length')}
          </span>
        </Table.HeaderCell>
        <Table.HeaderCell
          verticalAlign='top'>
          {t('status')}
          <br/>
          <span
            style={{
              color: '#787878',
              fontSize: '0.8em'
            }}>
            {t('drilling_date')}
          </span>
        </Table.HeaderCell>
      </Table.Row>
    )
  }
  getCols(item, idx){
    let colIdx = 0
    return ([
      // <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
      //   {item.id}
      // </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        Ready
        <br/>
        <span
          style={{
            color: '#787878',
            fontSize: '0.8em'
          }}>
            100%
        </span>
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        {item.original_name}
        <br/>
        <span
          style={{
            color: '#787878',
            fontSize: '0.8em'
          }}>
            <DomainText id={item.kind} schema='kind'/>
        </span>
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        <DomainText id={item.restriction} schema='restriction'/>
        <br/>
        <span
          style={{
            color: '#787878',
            fontSize: '0.8em'
          }}>
          <DateText date={item.restriction_until}/>
        </span>
      </Table.Cell>,
      // <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
      //   {item.location_x}, {item.location_y}
      //   <br/>
      //   <span
      //     style={{
      //       color: '#787878',
      //       fontSize: '0.8em'
      //     }}>
      //     <DomainText id={item.srs} schema='srs'/>
      //   </span>
      // </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        {
          _.isNil(item.elevation_z)?
          null:
          item.elevation_z + ' m'
        } {
          _.isNil(item.hrs)?
          null: <span>(<DomainText id={item.hrs} schema='hrs'/>)</span>
        }
        <br/>
        <span
          style={{
            color: '#787878',
            fontSize: '0.8em'
          }}>
            {_.isNil(item.length)? 'n/p': item.length + ' m'}
        </span>
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        <DomainText id={item.extended.status} schema='extended.status'/>
        <br/>
        <span
          style={{
            color: '#787878',
            fontSize: '0.8em'
          }}>
            <DateText date={item.drilling_date}/>
        </span>
      </Table.Cell>,
    ])
  }
  _getHeader(){
    return (
      <Table.Row>
        {/*<Table.HeaderCell>id</Table.HeaderCell>*/}
        {this.getHeaderLabel('original_name')}
        {this.getHeaderLabel('kind')}
        {this.getHeaderLabel('restriction')}
        {this.getHeaderLabel('location_x')}
        {this.getHeaderLabel('location_y')}
        {this.getHeaderLabel('srs')}
        {this.getHeaderLabel('elevation_z')}
        {this.getHeaderLabel('hrs')}
        {this.getHeaderLabel('drilling_date')}
        {this.getHeaderLabel('status')}
        {this.getHeaderLabel('length')}
      </Table.Row>
    )
  }
  _getCols(item, idx){
    let colIdx = 0
    return ([
      // <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
      //   {item.id}
      // </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        {item.original_name}
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        <DomainText id={item.kind} schema='kind'/>
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        <DomainText id={item.restriction} schema='restriction'/>
        <br/>
        <span style={{
          fontSize: '0.9em',
          color: 'rgb(60, 137, 236)'
        }}>
          <DateText date={item.restriction_until}/>
        </span>
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        {item.location_x}
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        {item.location_y}
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        <DomainText id={item.srs} schema='srs'/>
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        {_.isNil(item.elevation_z)? null: item.elevation_z + ' m'}
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        <DomainText id={item.hrs} schema='hrs'/>
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        <DateText date={item.drilling_date}/>
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        <DomainText id={item.extended.status} schema='extended.status'/>
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        {_.isNil(item.length)? null: item.length + ' m'}
      </Table.Cell>,
    ])
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    store: state.core_borehole_editor_list,
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch: dispatch,
        loadData: (page, filter = {}) => {
          dispatch(loadEditingBoreholes(page, 100, filter))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(translate('borehole_form')(BoreholeEditorTable))
