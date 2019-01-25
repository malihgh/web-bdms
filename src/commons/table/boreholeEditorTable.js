import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import _ from 'lodash';

import TableComponent from './tableComponent';
import DomainText from '../form/domain/domainText';
import DateText from '../form/dateText';

import {
  Table, Icon, Checkbox
} from 'semantic-ui-react';

import {
  loadEditingBoreholes
} from '@ist-supsi/bmsjs';

class BoreholeEditorTable extends TableComponent {
  reorder(orderby){
    const { filter, loadData, store } = this.props;
    let dir = store.direction === 'DESC'? 'ASC': 'DESC';
    loadData(
      store.page,
      filter,
      orderby,
      dir
    );
  }
  getHeaderLabel(key, disableOrdering = false){
    const { store, t } = this.props
    return (
      <Table.HeaderCell
        onClick={()=>{
          if(disableOrdering === false){
            this.reorder(key);
          }
        }}
        style={{
          cursor: disableOrdering === true? null: 'pointer'
        }}
        verticalAlign='top'
      >
        {
            disableOrdering === false && store.orderby === key?
              <Icon
                name={
                  store.direction === 'DESC'?
                    'sort down': 'sort up'
                }
              />: null
          } {t(key)}
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
  _getHeader(){
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
  _getCols(item, idx){
    let colIdx = 0
    return ([
      // <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
      //   {item.id}
      // </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        {
          item.percentage < 100?
            <Icon name='exclamation circle' color='red'/>:
            <Icon name='check circle' color='green'/>
        } {item.percentage}%
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
  getHeader(){
    const {
      all
    } = this.state;
    return (
      <Table.Row>
        <Table.HeaderCell style={{width: '2em'}}>
          <Checkbox
            checked={all === true}
            onClick={(e)=>{
              e.stopPropagation();
              this.setState({
                all: !all,
                selected: []
              });
            }}
          />
        </Table.HeaderCell>
        {this.getHeaderLabel('completness')}
        {this.getHeaderLabel('creation')}
        {this.getHeaderLabel('author')}
        {this.getHeaderLabel('original_name')}
        {this.getHeaderLabel('kind')}
        {this.getHeaderLabel('restriction')}
        {/*this.getHeaderLabel('location_x', true)}
        {this.getHeaderLabel('location_y', true)}
          {this.getHeaderLabel('srs', true)*/}
        {this.getHeaderLabel('elevation_z')}
        {this.getHeaderLabel('hrs', true)}
        {this.getHeaderLabel('drilling_date')}
        {this.getHeaderLabel('status')}
        {this.getHeaderLabel('length')}
      </Table.Row>
    )
  }
  getCols(item, idx){
    let colIdx = 0
    return ([
      <Table.Cell
        key={this.uid + "_" + idx + "_" + colIdx++}
        onClick={(e)=>{
          e.stopPropagation();
          this.add2selection(item.id);
        }}
        style={{width: '2em'}}
      >
        <Checkbox checked={this.inSelection(item.id)}/>
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        {
          item.percentage < 100?
            null: //<Icon name='exclamation circle' color='red'/>:
            <Icon name='check circle' color='green'/>
        } {item.percentage}%
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        <span
          style={{
            fontSize: '0.8em',
            color: '#787878'
          }}
        >
          <DateText fromnow={true} date={item.author.date}/>
        </span><br/>
        <DateText date={item.author.date}/>
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        {item.author.username}
      </Table.Cell>,
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
      /*<Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        {item.location_x}
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        {item.location_y}
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        <DomainText id={item.srs} schema='srs'/>
      </Table.Cell>,*/
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
};

const mapStateToProps = (state, ownProps) => {
  return {
    store: state.core_borehole_editor_list,
    ...ownProps
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    loadData: (page, filter = {}, orderby = null, direction = null) => {
      dispatch(
        loadEditingBoreholes(
          page, 100, filter, orderby, direction
        )
      );
    }
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(translate('borehole_form')(BoreholeEditorTable));
