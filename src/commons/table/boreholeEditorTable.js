import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';

// import TableComponent from './tableComponent';
import DomainText from '../form/domain/domainText';
import DateText from '../form/dateText';

import TTable from './table';

import {
  Button, Table, Icon, Checkbox, Segment, Modal, Header
} from 'semantic-ui-react';

import {
  loadEditingBoreholes, 
  getdBoreholeIds,
  deleteBoreholes,
} from '@ist-supsi/bmsjs';

class BoreholeEditorTable extends TTable {

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      deleting: false,
      confirmDelete: false,
    };
  }

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
  handleMultipleClick() {
    const {
      filter,
      onMultiple
    } = this.props;
    if (this.state.all === true || this.state.selected.length > 0) {
      // Load selected id if all is true
      if (onMultiple !== undefined) {
        if (this.state.all === true) {
          getdBoreholeIds(filter).then((response) => {
            if (
              response.data.success
            ) {
              //TODO check this part. Updating state is not incorrect!
              onMultiple(
                _.pullAll(response.data.data, this.state.selected)
              );
            }
          }).catch((err) => {
            console.log(err);
          });
        } else {
          onMultiple(this.state.selected);
        }
      }
    }
  }
  deleteList() {
    const {
      filter
    } = this.props;
    if (this.state.all === true || this.state.selected.length > 0) {
      if (this.state.all === true) {
        getdBoreholeIds(filter).then((response) => {
          if (
            response.data.success
          ) {
            deleteBoreholes(
              _.pullAll(response.data.data, this.state.selected)
            ).then(() => {
              this.setState({
                confirmDelete: false,
                deleting: false,
                selected: [],
                all: false
              }, () => {
                this.props.loadData(1, filter);
              });
            });
          }
        }).catch((err) => {
          console.log(err);
        });
      } else {
        deleteBoreholes(
          this.state.selected
        ).then(() => {
          this.setState({
            confirmDelete: false,
            deleting: false,
            selected: [],
            all: false
          }, () => {
            this.props.loadData(1, filter);
          });
        });
      }
    }
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
      <Table.Cell
        key={this.uid + "_" + idx + "_" + colIdx++}
      >
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
  render() {
    const {
      t
    } = this.props;
    const {
      selected,
      all
    } = this.state;
    return (
      <Segment
        basic
        loading={this.props.store.isFetching}
        style={{
          flex: "1 1 100%",
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          margin: '0px',
          padding: '0px'
        }}
      >
        {
          all === true || selected.length > 0 ?
            <div
              style={{
                backgroundColor: 'rgb(236, 236, 236)',
                color: 'black',
                textAlign: 'center',
                padding: '0.5em'
              }}
            >
              <span
                style={{
                  fontWeight: 'bold'
                }}
              >
                {
                  all === true ?
                    t('common:allSelected'):
                    selected.length === 1 ?
                      t('common:oneSelected'):
                      t(
                        'common:someSelected',
                        {
                          howMany: selected.length
                        }
                      )
                }
              </span> (
              <span
                onClick={() => {
                  this.setState({
                    selected: [],
                    all: false
                  });
                }}
                style={{
                  color: 'rgb(242, 113, 28)',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                {t('common:reset')}
              </span>)
              &nbsp;
              <Button
                color='black'
                onClick={() => {
                  this.handleMultipleClick();
                }}
                size='mini'
              >
                {t('common:bulkEditing')}
              </Button>
              &nbsp;
              {
                all === false
                && selected.length === 1?
                  <Button
                    onClick={() => {
                      console.log('clone click');
                    }}
                    primary
                    size='mini'
                  >
                    {t('common:copy')}
                  </Button>:
                  null
              }
              &nbsp;
              <Modal
                closeIcon
                onClose={this.handleClose}
                open={this.state.confirmDelete}
                size='mini'
                trigger={
                  <Button
                    loading={this.state.deleting}
                    negative
                    onClick={() => {
                      this.setState({
                        confirmDelete: true
                      });
                    }}
                    size='mini'
                  >
                    {t('common:delete')}
                  </Button>
                }
              >
                <Header
                  content={t('common:deleteForever')}
                  // icon='archive'
                />
                <Modal.Content>
                  <p>
                    {t('common:sure')}
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    loading={this.state.deleting}
                    negative
                    onClick={() => {
                      this.setState({
                        deleting: true
                      }, () => {
                        this.deleteList();
                      });
                    }}
                  >
                    <Icon
                      name='trash alternate'
                    /> {t('common:delete')}
                  </Button>
                </Modal.Actions>
              </Modal>
            </div> : null
        }
        {/* <div
          style={{
            backgroundColor: '#ececec',
            borderBottom: 'thin solid #c5c5c5',
            color: 'black',
            textAlign: 'center',
            padding: '0.5em'
          }}
        >
          {super.render()}
        </div> */}
        {super.render()}
      </Segment>
    );
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
)(
  withTranslation(
    ['borehole_form', 'version', 'common']
  )(BoreholeEditorTable));
