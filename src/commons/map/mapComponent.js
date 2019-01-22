import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import LayerGroup from 'ol/layer/Group';
import WMTS from 'ol/source/WMTS';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import RegularShape from 'ol/style/RegularShape';
import Text from 'ol/style/Text';
import Select from 'ol/interaction/Select';
import Overlay from 'ol/Overlay.js';
import {defaults as defaultControls} from 'ol/control/util';
import { click, pointerMove } from 'ol/events/condition';

import { translate } from 'react-i18next';
import DomainText from '../form/domain/domainText';

import {
  getGeojson
} from '@ist-supsi/bmsjs';

import {
  Button,
  Dropdown
} from 'semantic-ui-react';

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.moveEnd = this.moveEnd.bind(this);
    this.selected = this.selected.bind(this);
    this.hover = this.hover.bind(this);
    this.timeoutFilter = null;
    this.state = {
      counter: 0,
      basemap: 'colormap',
      colormap: true,
      greymap: false,
      satellite: false,
      geologie500: false,
      hover: null
    };
  }
  componentDidMount(){
    console.log("Map: componentDidMount");
    var resolutions = [
      4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000, 1750, 1500, 1250,
      1000, 750, 650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5
    ];
    const extent = [2420000, 1030000, 2900000, 1350000];
    const center = [
      (extent[2]-extent[0])/2 + extent[0],
      (extent[3]-extent[1])/2 + extent[1]
    ];
    // const projection = getProjection(this.srs);
    // projection.setExtent(extent);
    const matrixIds = [];
    for (var i = 0; i < resolutions.length; i++) {
      matrixIds.push(i);
    }
    var tileGrid = new WMTSTileGrid({
      origin: [extent[0], extent[3]],
      // origin: [420000, 350000],
      resolutions: resolutions,
      matrixIds: matrixIds
    });
    const attribution = '&copy; Data: <a style="color: black; text-decoration: underline;" href="https://www.swisstopo.admin.ch">swisstopo</a>';
    this.map = new Map({
      controls: defaultControls({
        attribution: true,
        attributionOptions: {
          collapsed: false,
          collapsible: false,
          collapseLabel: 'tettine'
        }
      }),
      layers: [
        new LayerGroup({
          visible: this.state.basemap==='colormap',
          name: 'colormap',
          layers: [
            new TileLayer({
              minResolution: 2.5,
              // preload: Infinity,
              source: new WMTS({
                crossOrigin: 'anonymous',
                attributions: attribution,
                url: 'https://wmts10.geo.admin.ch/1.0.0/{Layer}/default/current/2056/{TileMatrix}/{TileCol}/{TileRow}.jpeg',
                tileGrid: tileGrid,
                // projection: getProjection(this.srs),
                layer: "ch.swisstopo.pixelkarte-farbe",
                requestEncoding: 'REST'
              })
            }),
            new TileLayer({
              maxResolution: 2.5,
              // preload: Infinity,
              source: new WMTS({
                crossOrigin: 'anonymous',
                attributions: attribution,
                url: 'https://wmts10.geo.admin.ch/1.0.0/{Layer}/default/current/2056/{TileMatrix}/{TileCol}/{TileRow}.png',
                tileGrid: tileGrid,
                // projection: getProjection(this.srs),
                layer: "ch.swisstopo.swisstlm3d-karte-farbe",
                requestEncoding: 'REST'
              })
            })
          ]
        }),
        new TileLayer({
          visible: this.state.basemap==='greymap',
          name: 'greymap',
          source: new WMTS({
            crossOrigin: 'anonymous',
            attributions: attribution,
            url: 'https://wmts10.geo.admin.ch/1.0.0/{Layer}/default/current/2056/{TileMatrix}/{TileCol}/{TileRow}.jpeg',
            tileGrid: tileGrid,
            layer: "ch.swisstopo.pixelkarte-grau",
            requestEncoding: 'REST'
          })
        }),
        new TileLayer({
          visible: this.state.basemap==='satellite',
          name: 'satellite',
          source: new WMTS({
            crossOrigin: 'anonymous',
            attributions: attribution,
            url: 'https://wmts10.geo.admin.ch/1.0.0/{Layer}/default/current/2056/{TileMatrix}/{TileCol}/{TileRow}.jpeg',
            tileGrid: tileGrid,
            layer: "ch.swisstopo.swissimage",
            requestEncoding: 'REST'
          })
        }),
        new TileLayer({
          visible: this.state.basemap==='geologie500',
          name: 'geologie500',
          source: new WMTS({
            crossOrigin: 'anonymous',
            attributions: attribution,
            url: 'https://wmts10.geo.admin.ch/1.0.0/{Layer}/default/20080630/2056/{TileMatrix}/{TileCol}/{TileRow}.png',
            tileGrid: tileGrid,
            layer: "ch.swisstopo.geologie-geologische_karte",
            requestEncoding: 'REST'
          })
        })
      ],
      target: 'map',
      view: new View({
        maxResolution: 305,
        minResolution: 0.5,
        resolution: 500,
        center: center,
        extent: extent
      })
    });
    this.points = new VectorSource()
    this.map.addLayer(new VectorLayer({
      source: this.points,
      style: this.styleFunction.bind(this)
    }));

    this.popup = new Overlay({
      position: undefined,
      positioning: 'bottom-center',
      element: document.getElementById('popup-overlay'),
      stopEvent: false
    });
    this.map.addOverlay(this.popup);

    // Register map events
    this.map.on('moveend', this.moveEnd);

    // On point over interaction
    const selectPointerMove = new Select({
      condition: pointerMove,
      // style: this.styleHover.bind(this)
    });
    selectPointerMove.on('select', this.hover);
    this.map.addInteraction(selectPointerMove);

    this.selectClick = new Select({
      condition: click,
      style: this.styleFunction.bind(this)
    });
    this.selectClick.on('select', this.selected);
    this.map.addInteraction(this.selectClick);

    getGeojson().then(function(response) {
      if(response.data.success){
        this.points.addFeatures(
          (
            new GeoJSON()
          ).readFeatures(response.data.data)
        );
        this.map.getView().fit(
          this.points.getExtent()
        );
        this.moveEnd();
      }
    }.bind(this)).catch(function (error) {
      console.log(error);
    });
  }

  styleHover(feature, resolution){
    const {
      highlighted
    } = this.props;

    // let selected = (highlighted !== undefined)
    //   && highlighted.indexOf(feature.get('id'))>-1;

    // if(selected){
    //   return[];
    // }

    let conf = {
      image: new Circle({
        radius: 6,
        fill: new Fill({color: 'rgba(255, 0, 255, 0.8)'}),
        stroke: new Stroke({color: 'black', width: 1})
      }),
      text: new Text({
        textAlign: "center",
        textBaseline: 'middle',
        fill: new Fill({color: 'white'}),
        font: "bold 20px arial sans-serif",
        text: feature.get('original_name'),
        stroke: new Stroke({
          color: 'black',
          width: 3
        }),
        offsetY: -22
      })
    };

    return [new Style(conf)];
  }

  styleFunction(feature, resolution){
    const {
      highlighted
    } = this.props;

    let selected = (highlighted !== undefined)
      && highlighted.indexOf(feature.get('id'))>-1;

    /*
      "f" "free"
      "b" "limited until"
      "g" "closed"
    */
    let res = feature.get('restriction_code');
    let fill = null, stroke = new Stroke({color: 'black', width: 2});
    let fcolor = null;
    if(res === 'f'){
      fcolor = 'rgb(33, 186, 69)';
    }else if(['b', 'g'].indexOf(res)>=0){
      fcolor = 'rgb(220, 0, 24)';
    }else{
      fcolor = 'rgb(0, 0, 0)';
    }
    fill = new Fill({color: fcolor});

    let conf = null;
    /*
      "a"   "Other"
      "SS"  "Sondierschlitz"
      "B"   "Drilling"
      "RS"  "Dynamic probing"
    */
    let kind = feature.get('kind_code');
    if(kind==='a'){ // deep boreholes
      return [
        new Style({
          image: new Circle({
            radius: 6,
            stroke: new Stroke({color: fcolor, width: 2}),
            fill: new Fill({color: 'white'})
          })
        }),
        new Style({
          image: new Circle({
            radius: 3,
            fill: fill
          })
        })
      ];
    } else if(kind==='SS'){ // boreholes
      conf = {
        image: new Circle({
          radius: 6,
          stroke: new Stroke({color: 'black', width: 1}),
          fill: new Fill({color: fcolor})
        })
      };
    } else if(kind==='B'){ // trial pits
      conf = {
        image: new RegularShape({
          fill: fill,
          stroke: new Stroke({color: 'black', width: 1}),
          points: 3,
          radius: 8,
          // rotation: Math.PI / 4,
          angle: 0
        })
      };
    } else if(kind==='RS'){ // dynamic probing
      conf = { 
        image: new RegularShape({
          fill: fill,
          stroke: new Stroke({color: 'black', width: 1}),
          points: 3,
          radius: 8,
          rotation: Math.PI,
          angle: 0
        })
      };
    }else{
      conf = {
        image: new Circle({
          radius: 6,
          fill: fill,
          stroke: new Stroke({color: 'black', width: 1})
        })
      };
    }

    // if(resolution<10 || selected){
    //   conf.text = new Text({
    //     textAlign: "center",
    //     textBaseline: 'middle',
    //     fill: new Fill({color: 'black'}),
    //     font: "bold 14px arial sans-serif",
    //     text: feature.get('original_name'),
    //     stroke: new Stroke({
    //       color: 'white',
    //       width: 3
    //     }),
    //     offsetY: 14
    //   });
    // }

    return [new Style(conf)];
  }

  /*
      Calculate which features are visible in actual map extent
      If moveend prop funtion is present then call it.
  */
  moveEnd(){
    const { moveend } = this.props;
    // console.log(this.map.getView().getResolution())
    if(moveend !== undefined){
      var extent = this.map.getView().calculateExtent(this.map.getSize());
      let features = [];
      this.points.forEachFeatureInExtent(extent, function(feature){
          features.push(feature.get('id'))
      });
      moveend(features, extent);
    }
  }

  selected(e) {
    const { selected } = this.props;
    // console.log('selected', e.selected)
    if(selected !== undefined){
      if(e.selected.length>0){
        selected(e.selected[0].getId())
      } else {
        selected(null)
      }
    }
  }

  hover(e) {
    const { hover } = this.props;
    if(hover !== undefined){
      if(e.selected.length>0){
        this.setState({
          hover: e.selected[0]
        }, ()=>{
          this.popup.setPosition(e.selected[0].getGeometry().getCoordinates());
          hover(e.selected[0].getId());
        });
      } else {
        this.setState({
          hover: null
        }, ()=>{
          this.popup.setPosition(undefined);
          hover(null);
        });
      }
    }
  }

  componentWillReceiveProps(nextProps){
    const {
        highlighted,
        filter,
        zoomto
    } = nextProps;
    let refresh = false;
    if(!_.isEqual(highlighted, this.props.highlighted)){
      refresh = true;
    }
    if(!_.isEqual(filter, this.props.filter)){
      if(
        !_.isEqual(
          filter.extent,
          this.props.filter.extent
        )
      ){
        console.log("extent changed..");
      }else{
        refresh = true;
        console.log("Applying filter?")
        if(this.timeoutFilter !== null){
          clearTimeout(this.timeoutFilter);
        }
        this.timeoutFilter = setTimeout(()=>{
          this.points.clear(true);
          getGeojson(filter).then(function(response) {
            if(response.data.success){
              this.points.addFeatures(
                (
                  new GeoJSON()
                ).readFeatures(response.data.data)
              );
              this.map.getView().fit(
                this.points.getExtent()
              );
              this.moveEnd();
            }
          }.bind(this)).catch(function (error) {
            console.log(error);
          });
        }, 500);
      }
    }
    if(zoomto !== null && zoomto !== this.props.zoomto){
      var feature = this.points.getFeatureById(zoomto);
      var point = feature.getGeometry();
      var size = this.map.getSize();
      this.map.getView().setCenter(point.getCoordinates());
    }
    if(refresh){
      this.selectClick.getFeatures().clear();
      this.points.refresh({force:true});
    }
  }

  render() {
    const { t } = this.props;
    const {
      satellite
    } = this.state;
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '0px',
          flex: '1 1 100%',
          // border: 'thin solid #cccccc'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '6px',
          right: '6px',
          zIndex: '1'
        }}>
          <Dropdown
            style={{
              minWidth: '10em'
            }}
            selection
            value={this.state.basemap}
            onChange={(ev, data)=>{
              this.setState({
                basemap: data.value
              }, (a) => {
                console.log(a);
                const layers = this.map.getLayers().getArray();
                for (let index = 0; index < layers.length; index++) {
                  const layer = layers[index];
                  console.log()
                  if([
                    'colormap',
                    'greymap',
                    'satellite',
                    'geologie500'
                  ].indexOf(layer.get('name'))>=0){
                    if(layer.get('name')===data.value){
                      layer.setVisible(true);
                    }else{
                      layer.setVisible(false);
                    }
                  }
                }
              });
            }}
            options={[
              {
                key: 'colormap',
                value: 'colormap',
                text: 'Color map'
              },
              {
                key: 'greymap',
                value: 'greymap',
                text: 'Grey map'
              },
              {
                key: 'satellite',
                value: 'satellite',
                text: 'Satellite'
              },
              {
                key: 'geologie500',
                value: 'geologie500',
                text: 'Geology'
              }
            ]}
          />
        </div>
        <div
          id='map'
          style={{
            width: '100%',
            height: '100%',
            padding: '0px',
            flex: '1 1 100%',
            cursor: this.state.hover === null? null: 'pointer'
            // border: 'thin solid #cccccc'
          }}
        />
        <div style={{
          display: 'none'
        }}>
          <div
            className="ol-popup"
            id={'popup-overlay'}
          >
            <div
              style={{
                flex: 1
              }}
            >
              <div
                style={{
                  fontWeight: 'bold'
                }}
              >
                {
                  this.state.hover !== null?
                    this.state.hover.get('original_name'): null
                }
              </div>
              <div
                style={{
                  whiteSpace: 'nowrap'
                }}
              >
                <span
                  style={{
                    color: 'rgb(120, 120, 120)',
                    fontSize: '0.8em'
                  }}
                >
                  {t('length')}
                </span>
              </div>
              <div
                style={{
                  fontWeight: 'bold'
                }}
              >
                {
                  this.state.hover === null
                  || _.isNil(this.state.hover.get('length'))?
                    'n/p': this.state.hover.get('length') + ' m'
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

MapComponent.propTypes = {
  moveend: PropTypes.func,
  highlighted: PropTypes.array,
  hover: PropTypes.func,
  selected: PropTypes.func,
  filter: PropTypes.object,
  zoomto: PropTypes.number
};

MapComponent.defaultProps = {
  highlighted: [],
  filter: {},
  zoomto: null
};

export default (translate('borehole_form')(MapComponent));
