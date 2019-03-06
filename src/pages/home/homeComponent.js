import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import _ from 'lodash';
import {
    withRouter
} from 'react-router-dom';
// import { Menu, Segment, Sidebar } from 'semantic-ui-react';

import BoreholeTable from '../../commons/table/boreholeTable';
import DetailsContainer from '../../commons/detail/detailsContainer';
import MapComponent from '../../commons/map/mapComponent';
import MenuExplorer from '../../commons/menu/explorer/menuExplorer';
import MenuContainer from '../../commons/menu/menuContainer';

class HomeComponent extends React.Component {
  render() {
    const {
      home,
      search
    } = this.props;
    return (

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <MenuContainer/>
        <div
          style={{
            flex: '1 1 100%',
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden'
          }}
        >
          <div style={{
            // borderRight: 'thin solid #dfe0e0',
            boxShadow: 'rgba(0, 0, 0, 0.17) 2px 6px 6px 0px',
            display: 'flex',
            flexDirection: 'column',
            width: '250px'
          }}>
            <MenuExplorer/>
          </div>

          {/* <div
            style={{
              flex: '1 1 100%',
              // height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            
          </div> */}

          <div style={{
                flex: '0.75 1 0%',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 1
              }}
            >
            {
              home.selected?
                <DetailsContainer
                  id={home.selected}
                />:
                <BoreholeTable
                  onSelected={(borehole)=>{
                    this.props.boreholeSeleced(borehole.id);
                  }}
                  onHover={(item)=>{
                    this.props.boreholeHover(item);
                  }}
                  filter={{
                    ...search.filter
                  }}
                  highlight={home.maphover}
                />
            }
          </div>

          <div
              className='stbg'
              style={{
              flex: '1 1 0%',
              // padding: "1em",
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #cccccc',
              // boxShadow: 'rgba(0, 0, 0, 0.75) -2px 0px 5px 0px',
              position: 'relative',
              zIndex: 1
            }}>
              <MapComponent
                highlighted={
                  !_.isNil(home.selected)?
                    [home.selected]:
                    home.hover?
                      [home.hover.id]: []
                }
                zoomto={
                  search.zoom2selected?
                    home.selected: null
                }
                moveend={(features, extent)=>{
                  this.props.filterByExtent(extent);
                  // if(search.mapfilter===true){
                  //   this.props.filterByExtent(extent)
                  // }
                }}
                hover={(id)=>{
                  if(_.isNil(home.selected)){
                    this.props.mapHover(id);
                  }
                }}
                selected={(id)=>{
                  this.props.boreholeSeleced(id);
                }}
                filter={{
                  ...search.filter
                }}
              />
            </div>
          
        </div>
      </div>
    )
  }

  _render() {
    const {
      home,
      search
    } = this.props;
    return (
      <div
        style={{
          flex: '1 1 0%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        {
          false? null:
          <div style={{
            width: '300px',
            borderRight: 'thin solid #c7c7c7',
            display: 'flex',
            flexDirection: 'column'
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
            flex: '1 1 100%',
            padding: "1em 0.5em",
            display: 'flex',
            flexDirection: 'column'
          }}>
            {
              home.selected?
                <DetailsContainer
                  id={home.selected}
                />:
                <BoreholeTable
                  onSelected={(borehole)=>{
                    this.props.boreholeSeleced(borehole.id);
                  }}
                  onHover={(item)=>{
                    this.props.boreholeHover(item);
                  }}
                  filter={{
                    ...search.filter
                  }}
                  highlight={home.maphover}
                />
            }
          </div>
          <div
            className='stbg'
            style={{
            flex: '1 1 100%',
            // padding: "1em",
            display: 'flex',
            flexDirection: 'column',
            // borderLeft: 'thin solid #c7c7c7',
            boxShadow: 'rgba(0, 0, 0, 0.75) -2px 0px 5px 0px'
          }}>
            <MapComponent
              highlighted={
                !_.isNil(home.selected)?
                  [home.selected]:
                  home.hover?
                    [home.hover.id]: []
              }
              zoomto={
                search.zoom2selected?
                  home.selected: null
              }
              moveend={(features, extent)=>{
                this.props.filterByExtent(extent);
                // if(search.mapfilter===true){
                //   this.props.filterByExtent(extent)
                // }
              }}
              hover={(id)=>{
                if(_.isNil(home.selected)){
                  this.props.mapHover(id);
                }
              }}
              selected={(id)=>{
                this.props.boreholeSeleced(id);
              }}
              filter={{
                ...search.filter
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
      const { index } = titleProps;
      dispatch({
        type: 'LFMSELECTED',
        index: index
      });
    },
    boreholeSeleced: (id) => {
      dispatch({
        type: 'HOME_BOREHOLE_SELECTED',
        id: id
      });
    },
    boreholeHover: (borehole) => {
      dispatch({
        type: 'HOME_BOREHOLE_HOVER',
        borehole: borehole
      });
    },
    mapHover: (id) => {
      dispatch({
        type: 'HOME_MAP_HOVER',
        id: id
      });
    },
    filterByExtent: (extent) => {
      dispatch({
        type: 'SEARCH_EXTENT_CHANGED',
        extent: extent
      });
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(translate('home')(withRouter(HomeComponent)));
