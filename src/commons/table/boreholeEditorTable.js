import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
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
  componentDidMount(){
    const {
      filter
    } = this.props;
    this.props.clear();
    this.props.loadData(1, filter); //, setting.orderby, setting.direction);
  }
  reorder(orderby) {
    const { filter, loadData, store } = this.props;
    let dir = store.direction === 'DESC' ? 'ASC' : 'DESC';
    loadData(
      store.page,
      filter,
      orderby,
      dir
    );
  }
  add2selection(id) {
    const {
      selected
    } = this.state;
    const {
      store
    } = this.props;
    for (let index = 0; index < store.data.length; index++) {
      const item = store.data[index];
      if (item.id === id && item.lock !== null){
        return;
      }
    }
    const tmp = [...selected];
    const index = tmp.indexOf(id);
    if (index >= 0) {
      tmp.splice(index, 1);
    } else {
      tmp.push(id);
    }
    this.setState({
      selected: tmp
    });
  }
  getHeaderLabel(key, disableOrdering = false) {
    const { store, t } = this.props;
    return (
      <Table.HeaderCell
        onClick={() => {
          if (disableOrdering === false) {
            this.reorder(key);
          }
        }}
        style={{
          cursor: disableOrdering === true ? null : 'pointer',
          whiteSpace: 'nowrap'
        }}
        verticalAlign='top'
      >
        {
          disableOrdering === false && store.orderby === key ?
            <Icon
              name={
                store.direction === 'DESC' ?
                  'sort down' : 'sort up'
              }
            /> : null
        } {
          key === 'workgroup'?
            <span
              key={'betjs-2-'+key}
              style={{
                fontSize: '0.8em',
                color: '#787878'
              }}
            >
              {t('common:workgroup')}
            </span>:
            t(key)
        }
        {
          key === 'workgroup'?
            [
              <br
                key={'betjs-1-'+key}
              />,
              <span
                key={'betjs-2-'+key}
              >
                {key === 'workgroup'? 'Status': key}
              </span>
            ]: null
        }
      </Table.HeaderCell>
    );
  }
  getHeader() {
    const {
      all
    } = this.state;
    return (
      <Table.Row>
        <Table.HeaderCell style={{ width: '2em' }}>
          <Checkbox
            checked={all === true}
            onClick={(e) => {
              e.stopPropagation();
              this.setState({
                all: !all,
                selected: []
              });
            }}
          />
        </Table.HeaderCell>
        {this.getHeaderLabel('workgroup')}
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
    );
  }
  getCols(item, idx) {
    let colIdx = 0;
    return ([
      <Table.Cell
        key={this.uid + "_" + idx + "_" + colIdx++}
        onClick={(e) => {
          e.stopPropagation();
          if (item.lock === null){
            this.add2selection(item.id);
          }
        }}
        style={{ width: '2em' }}
      >
        {
          item.lock === null?
            <Checkbox
              checked={this.inSelection(item.id)}
            />:
            <Icon
              color='red'
              name='lock'
              size='small'
            />
        }
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        <span
          style={{
            fontSize: '0.8em',
            color: '#787878'
          }}
        >
          {
            item.workgroup !== null? item.workgroup.name: null
          }
        </span><br />
        {/* {
          item.percentage < 100 ?
            null :
            <Icon
              color='green'
              name='check circle'
            />
        } {item.percentage}% */}
        {
          this.props.t(`version:${item.role}`)
        } {
          // item.role === 'EDIT'?
          //   <span>
          //     ({
          //       item.percentage < 100 ?
          //         null :
          //         <Icon
          //           color='green'
          //           name='check circle'
          //           style={{
          //             marginRight: '0.2em'
          //           }}
          //         />
          //     }{item.percentage}%)
          //   </span>: null
        }
      </Table.Cell>,
      <Table.Cell
        key={this.uid + "_" + idx + "_" + colIdx++}
      >
        <span
          style={{
            fontSize: '0.8em',
            color: '#787878'
          }}
        >
          <DateText
            date={item.author.date}
            fromnow
          />
        </span><br />
        <DateText date={item.author.date} />
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        {item.author.username}
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        {item.original_name}
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        <DomainText
          id={item.kind}
          schema='kind'
        />
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        <DomainText
          id={item.restriction}
          schema='restriction'
        />
        <br />
        <span
          style={{
            fontSize: '0.9em',
            color: 'rgb(60, 137, 236)'
          }}
        >
          <DateText date={item.restriction_until} />
        </span>
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        {_.isNil(item.elevation_z) ? null : item.elevation_z + ' m'}
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        <DomainText
          id={item.hrs}
          schema='hrs'
        />
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        <DateText date={item.drilling_date} />
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        <DomainText
          id={item.extended.status}
          schema='extended.status'
        />
      </Table.Cell>,
      <Table.Cell key={this.uid + "_" + idx + "_" + colIdx++}>
        {_.isNil(item.length) ? null : item.length + ' m'}
      </Table.Cell>,
    ]);
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    store: state.core_borehole_editor_list,
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    clear: () => {
      dispatch({
        type: 'CLEAR',
        path: '/borehole'
      });
    },
    loadData: (page, filter = {}, orderby = 'creation', direction = null) => {
      dispatch(
        loadEditingBoreholes(
          page, 100, filter, orderby, direction
        )
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation(['borehole_form', 'version', 'common'])(BoreholeEditorTable));
