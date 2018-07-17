import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import _ from 'lodash'

import {
  Table,
  Pagination
} from 'semantic-ui-react'

import {
  loadBoreholes
} from '@ist-supsi/bmsjs'

class BoreholeGridComponent extends React.Component {
  constructor(props) {
    super(props)
    this.delay = false
    const {
      activeItem,
      filter
    } = this.props
    this.state = {
      activeItem: activeItem !== undefined? activeItem: null,
      filter: filter !== undefined? filter: {}
    }
  }
  componentDidMount(){
    const {
      filter
    } = this.props
    this.props.loadBoreholes(1, filter)
  }
  componentDidUpdate(prevProps){
    const {
      filter
    } = this.props
    if(!_.isEqual(filter, prevProps.filter)){
      // delay grid reload waiting for user typing
      if(this.delay){
        clearTimeout(this.delay)
        this.delay = false
      }
      console.log('timeout')
      this.delay = setTimeout(function(){
        this.props.loadBoreholes(1, filter)
        console.log('called')
      }.bind(this), 500)
      console.log('finish')
    }
  }
  handleClick(borehole) {
    const {
      onSelected
    } = this.props
    this.setState({activeItem: borehole.id})
    if(onSelected!==undefined){
      onSelected(borehole)
    }
  }
  render() {
    const {
      boreholes,
      filter
    } = this.props, {
      activeItem
    } = this.state
    return (
      <div style={{
          flex: "1 1 0%",
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
        <div style={{
          textAlign: 'center',
          padding: '0px 1em 0px 1em'
        }}>
          <Table fixed compact='very' basic='very' selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  id
                </Table.HeaderCell>
                <Table.HeaderCell>name</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>
        </div>
        <div style={{
            flex: "1 1 0%",
            overflowY: 'auto',
            // border: 'thin solid #d2d2d2',
            padding: '0px 1em'
          }}>
          <Table fixed compact='very' basic='very' selectable>
            <Table.Body>
              {
                boreholes.data.map((borehole, idx) => (
                  <Table.Row
                      style={{
                        cursor: 'pointer'
                      }}
                      key={"bhlg-"+idx}
                      active={activeItem === borehole.id}
                      onClick={e=>this.handleClick(borehole)}>
                    <Table.Cell>
                      {borehole.id}
                    </Table.Cell>
                    <Table.Cell>
                      {borehole.name}
                    </Table.Cell>
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table>
        </div>
        <div style={{
          textAlign: 'center',
          padding: '1em 0px 0px 1em'
        }}>
          <Pagination
              activePage={boreholes.page}
              onPageChange={(ev, data)=>{
                this.props.loadBoreholes(data.activePage, filter)
              }}
              totalPages={boreholes.pages}
            />
        </div>
      </div>

    )
  }
}

BoreholeGridComponent.propTypes = {
    onSelected: PropTypes.func,
    filter: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
    return {
        boreholes: state.core_borehole_list,
        ...ownProps
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch: dispatch,
        loadBoreholes: (page, filter = {}) => {
          dispatch(loadBoreholes(page, 100, filter))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(translate('grid')(BoreholeGridComponent))
