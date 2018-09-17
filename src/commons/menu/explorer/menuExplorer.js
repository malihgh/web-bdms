import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import {
    withRouter
} from 'react-router-dom'

import {
  Segment,
  Icon,
  Header,
  Button,
} from 'semantic-ui-react'

import SearchComponent from '../../search/searchComponent'

class MenuExplorer extends React.Component {
  render() {
    const {
      home,
      boreholes,
      t
    } = this.props
    return(
      home.selected?
      <div style={{
        padding: '1em'
      }}>
        <Button fluid icon primary
          onClick={e=>this.props.boreholeSeleced(null)}>
          <Icon name='caret left' />
          {t('back_to_list')}
        </Button>
        <Segment>
          <Header>
            {home.selected.original_name}
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
            {home.selected.author.username}
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
              home.selected.author.date === null?
              '-': home.selected.author.date
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
    home: state.home,
    search: state.search,
    boreholes: state.core_borehole_list
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    boreholeSeleced: (borehole) => {
      dispatch({
        type: 'HOME_BOREHOLE_SELECTED',
        borehole: borehole
      })
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(translate(['home','common'])(withRouter(MenuExplorer)))