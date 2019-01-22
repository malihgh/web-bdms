import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import _ from 'lodash';

import TableComponent from './tableComponent';
import DomainText from '../form/domain/domainText';
import DateText from '../form/dateText';

import {
  Icon,
  Table
} from 'semantic-ui-react';

import {
  loadBoreholes
} from '@ist-supsi/bmsjs';

class BoreholeTable extends TableComponent {
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
  getIcon(orderby, sub = false){
    const { store, t } = this.props;
    let style = {
      cursor: 'pointer'
    }
    if(sub === true){
      style = {
        ...style,
        color: '#787878',
        fontSize: '0.8em'
      }
    }
    return (
        <div
          onClick={()=>{
            this.reorder(orderby);
          }}
          style={style}
        >
          {
            store.orderby === orderby?
              <Icon
                name={
                  store.direction === 'DESC'?
                    'sort down': 'sort up'
                }
              />: null
          }
          {t(orderby)}
        </div>
    );
  }
  getHeader(){
    const { t } = this.props;
    return (
      <Table.Row>
        <Table.HeaderCell
          style={{width: '1.5em'}}
          verticalAlign='top'>
          
        </Table.HeaderCell>
        <Table.HeaderCell
          verticalAlign='top'>
          {this.getIcon('original_name')}
          {this.getIcon('kind', true)}
        </Table.HeaderCell>
        <Table.HeaderCell
          verticalAlign='top'>
          {this.getIcon('restriction')}
          {this.getIcon('restriction_until', true)}
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
          {this.getIcon('elevation_z')} ({t('hrs')})
          {this.getIcon('length', true)}
        </Table.HeaderCell>
        <Table.HeaderCell
          verticalAlign='top'>
          {this.getIcon('status')}
          {this.getIcon('drilling_date', true)}
        </Table.HeaderCell>
      </Table.Row>
    );
  }
  getCols(item, idx){
    let colIdx = 0
    return ([
      // <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
      //   {item.id}
      // </Table.Cell>,
      <Table.Cell
        style={{width: '1.5em'}}
        key={this.uid + "_" + idx + "_" + colIdx++}>
        {(()=>{
          const kind = this.props.domains.data[
            'kind'
          ].find(function(element) {
            return element.id === item.kind
          });
          if(kind !== undefined){

            const restriction = this.props.domains.data[
              'restriction'
            ].find(function(element) {
              return element.id === item.restriction
            });

            let color = 'black';
            if(restriction !== undefined){
              if(restriction.code === 'f'){
                color = 'green';
              }else if(['b', 'g'].indexOf(restriction.code)>=0){
                color = 'red';
              }
            }

            return (
              <img
                src={
                  process.env.PUBLIC_URL
                  + '/img/'
                  + kind.code
                  + '-'
                  + color
                  + '.svg'
                }
                style={{
                  height: '0.8em',
                  width: '0.8em'
                }}
              />
            );
          }else{
            return (null);
          }
        })()}
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
        <DomainText
          id={item.extended.status}
          schema='extended.status'
        />
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
};

const mapStateToProps = (state, ownProps) => {
  return {
    store: state.core_borehole_list,
    domains: state.core_domain_list,
    ...ownProps
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    loadData: (page, filter = {}, orderby = null, direction = null) => {
      dispatch(loadBoreholes(page, 100, filter, orderby, direction));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate('borehole_form')(BoreholeTable));
