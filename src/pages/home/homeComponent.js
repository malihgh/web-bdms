import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import {
    withRouter
} from 'react-router-dom'

import BoreholeTable from '../../commons/table/boreholeTable'
import DetailsContainer from '../../commons/detail/detailsContainer'
import MapComponent from '../../commons/map/mapComponent'
import MenuExplorer from '../../commons/menu/explorer/menuExplorer'
import MenuContainer from '../../commons/menu/menuContainer'

class HomeComponent extends React.Component {
    render() {
      const {
        home,
        search
      } = this.props
      return (
        <div style={{
          flex: '1 1 0%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row'
        }}>
          {
            false? null:
            <div style={{
              flex: '0 0 300px',
              boxShadow: '2px 0px 5px 0px rgba(0,0,0,0.75)',
              marginRight: '10px'
            }}>
              <MenuContainer>
                <MenuExplorer/>
              </MenuContainer>
            </div>
          }
          <div style={{
            flex: '1 1 0%',
            display: 'flex',
            flexDirection: 'row'
          }}>
            <div style={{
              flex: '1 1.5 100%',
              padding: "1em 0.5em",
              // boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 8px 0px inset',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {
                home.selected?
                <div>
                  <DetailsContainer
                    id={home.selected.id}/>
                </div>:
                <BoreholeTable
                  onSelected={(borehole)=>{
                    this.props.boreholeSeleced(borehole)
                    // history.push(
                    //   process.env.PUBLIC_URL + '/detail/' + borehole.id
                    // )
                  }}
                  onHover={(item)=>{
                    this.props.boreholeHover(item)
                  }}
                  filter={{
                    ...search.filter
                  }}
                />
              }
            </div>
            <div style={{
              flex: '1 1 100%',
              // padding: "1em",
              display: 'flex',
              flexDirection: 'column'
            }}>
              <MapComponent
                highlighted={
                  home.selected?
                    [home.selected.id]:
                    home.hover?
                      [home.hover.id]: []}
                moveend={(features, extent)=>{
                  this.props.filterByExtent(extent)
                  // if(search.mapfilter===true){
                  //   this.props.filterByExtent(extent)
                  // }
                }}
              />
            </div>
          </div>
      </div>
      )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    leftmenu: state.leftmenu,
    home: state.home,
    search: state.search
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    setIndex: (e, titleProps) => {
      const { index } = titleProps
      dispatch({
        type: 'LFMSELECTED',
        index: index
      })
    },
    boreholeSeleced: (borehole) => {
      dispatch({
        type: 'HOME_BOREHOLE_SELECTED',
        borehole: borehole
      })
    },
    boreholeHover: (borehole) => {
      dispatch({
        type: 'HOME_BOREHOLE_HOVER',
        borehole: borehole
      })
    },
    filterByExtent: (extent) => {
      dispatch({
        type: 'SEARCH_EXTENT_CHANGED',
        extent: extent
      })
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(translate('home')(withRouter(HomeComponent)))
