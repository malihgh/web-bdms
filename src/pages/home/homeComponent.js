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
import { Button, Checkbox, Icon } from 'semantic-ui-react';

class HomeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pdf: true,
      csv: false,
      shp: false
    };
  }
  
  render() {
    const {
      checkout,
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
              checkout.cart.length > 0?
                <div
                  style={{
                    backgroundColor: '#ececec',
                    borderBottom: 'thin solid #c5c5c5',
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
                      checkout.cart.length === 1?
                        'One':
                        checkout.cart.length
                    } borehole{
                      checkout.cart.length>1?
                        's': null
                    } selected.
                  </span> (<span
                  style={{
                    color: '#f2711c',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                  onClick={()=>{
                    this.props.resetCart();
                  }}
                >Reset selection</span>)
                &nbsp;
                Export as: &nbsp;<Checkbox
                  checked={this.state.pdf}
                  onChange={()=>{
                    this.setState({
                      pdf: !this.state.pdf
                    })
                  }}
                  label='PDF'
                /> &nbsp;&nbsp;
                <Checkbox
                  checked={this.state.csv}
                  onChange={()=>{
                    this.setState({
                      csv: !this.state.csv
                    })
                  }}
                  label='CSV'
                /> &nbsp;&nbsp;
                <Checkbox
                  checked={this.state.shp}
                  onChange={()=>{
                    this.setState({
                      shp: !this.state.shp
                    })
                  }}
                  label='Shape File'
                /> &nbsp;
                <a
                  style={{
                    color: '#2196f3',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                  target='export'
                  href={(()=>{
                    let frmt = [];
                    if(this.state.pdf === true){
                      frmt.push("pdf")
                    }
                    if(this.state.shp === true){
                      frmt.push("shape")
                    }
                    if(this.state.csv === true){
                      frmt.push("csv")
                    }
                    return(
                      // process.env.PUBLIC_URL
                      'http://localhost:8888'
                      + '/api/v1/borehole/download?format='
                      + frmt.join(',') + "&id="
                      + checkout.cart.map((k)=>{
                          return k.id
                        }).join(',')
                    );
                  })()}
                  // onClick={()=>{
                  //   let frmt = [];
                  //   if(this.state.pdf === true){
                  //     frmt.push("pdf")
                  //   }
                  //   if(this.state.shp === true){
                  //     frmt.push("shape")
                  //   }
                  //   if(this.state.csv === true){
                  //     frmt.push("csv")
                  //   }
                  //   window.open(
                  //     process.env.PUBLIC_URL
                  //     + '/api/v1/borehole/download?format='
                  //     + frmt.join(',') + "&id="
                  //     + checkout.cart.map((k)=>{
                  //         return k.id
                  //       }).join(',')
                  //   );
                  // }}
                >Download</a>
{/*                 
                <br/>
                <div
                  style={{
                    margin: '0.5em 3em'
                  }}
                >
                  <Button.Group
                    color='blue'
                    size='mini'
                    widths='3'
                  >
                    <Button
                      icon
                    >
                      <Icon
                        name='file pdf outline'
                        style={{
                          paddingRight: '1em'
                        }}
                      />
                      PDF
                    </Button>
                    <Button.Or text='or' />
                    <Button
                      icon
                    >
                      <Icon
                        name='file excel outline'
                        style={{
                          paddingRight: '1.5em'
                        }}  
                      />
                      CSV
                    </Button>
                    <Button.Or text='or' />
                    <Button
                      icon
                    >
                      <Icon
                        name='map outline'
                        style={{
                          paddingRight: '1.5em'
                        }}  
                      />
                      Shape File
                    </Button>
                  </Button.Group>
                </div> */}
                </div>: null
            }
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
                // zoomto={
                //   search.zoom2selected?
                //     home.selected: null
                // }
                zoomto={
                  search.zoom2selected
                }
                centerto={
                  search.center2selected?
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
    checkout: state.checkout,
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
    },
    resetCart: (extent) => {
      dispatch({
        type: 'CHECKOUT_RESET_CART'
      });
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(translate('home')(withRouter(HomeComponent)));
