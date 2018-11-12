import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import _ from 'lodash';
import {
    withRouter
} from 'react-router-dom'

import {
  Segment,
  Icon,
  Header,
  Button,
} from 'semantic-ui-react'

import DateText from '../../form/dateText'

import SearchComponent from '../../search/searchComponent'

class MenuExplorer extends React.Component {
  render() {
    const {
      home,
      boreholes,
      t,
      detail
    } = this.props
    return(
      home.selected?
      <div style={{
        padding: '1em'
      }}>
        <Button fluid icon primary
          onClick={e=>this.props.boreholeSeleced()}>
          <Icon name='caret left' />
          {t('back_to_list')}
        </Button>
        <Segment
          loading={detail.isFetching}
        >
          <Header>
            {
              _.hasIn(detail.borehole, 'extended.original_name')?
                detail.borehole.extended.original_name:
                null
            }
          </Header>
          <div style={{
              marginTop: '0.5em'  
            }}>
            <span
              style={{
                color: '#787878',
                fontSize: '0.8em'
              }}>
              {t('common:creator')}
            </span>
            <br/>
            {
              _.hasIn(detail.borehole, 'author.username')?
                detail.borehole.author.username:
                null
            }
          </div>
          <div style={{
              marginTop: '0.5em'  
            }}>
            <span
              style={{
                color: '#787878',
                fontSize: '0.8em'
              }}>
              {t('common:creation_date')}
            </span>
            <br/>
            {
              _.hasIn(detail.borehole, 'author.date')?
                <DateText
                  date={detail.borehole.author.date}
                  hours={true}
                />:
                null
            }
          </div>
        </Segment>
      </div>:
      <div
        style={{
          margin: '1em'
        }}>
        <Header size='medium' color='blue'>
          Boreholes: {
            boreholes.isFetching?
            ' searching...':
            boreholes.dlen + ' founds'
          }
        </Header>
        <SearchComponent
          onChange={(filter)=>{
            //console.log(filter)
          }}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    leftmenu: state.leftmenu,
    detail: state.detail_borehole,
    home: state.home,
    search: state.search,
    boreholes: state.core_borehole_list
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    boreholeSeleced: () => {
      dispatch({
        type: 'HOME_BOREHOLE_SELECTED',
        id: null
      })
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(translate(['home','common'])(withRouter(MenuExplorer)))