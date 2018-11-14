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
import Text from 'ol/style/Text';
import Select from 'ol/interaction/Select';
import {defaults as defaultControls} from 'ol/control/util';
import { click, pointerMove } from 'ol/events/condition';

import {
  getGeojson
} from '@ist-supsi/bmsjs';

import {
  Button
} from 'semantic-ui-react';

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.moveEnd = this.moveEnd.bind(this);
    this.selected = this.selected.bind(this);
    this.hover = this.hover.bind(this);
    this.state = {
      counter: 0,
      satellite: false
    };
  }
  componentDidMount(){
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
          visible: !this.state.satellite,
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
          visible: this.state.satellite,
          source: new WMTS({
            crossOrigin: 'anonymous',
            attributions: attribution,
            url: 'https://wmts10.geo.admin.ch/1.0.0/{Layer}/default/current/2056/{TileMatrix}/{TileCol}/{TileRow}.jpeg',
            tileGrid: tileGrid,
            layer: "ch.swisstopo.swissimage",
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
    })
    this.points = new VectorSource()
    this.map.addLayer(new VectorLayer({
      source: this.points,
      style: this.styleFunction.bind(this)
    }));

    // this.map.addControl(
    //   new Attribution({
    //     collapsed: false,
    //     collapsible: false,
    //     collapseLabel: 'tettine'
    //   })
    // );

    // Register map events
    this.map.on('moveend', this.moveEnd);

    // On point over interaction
    const selectPointerMove = new Select({
      condition: pointerMove
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

  styleFunction(feature, resolution){
    const {
      highlighted
    } = this.props;

    let selected = (highlighted !== undefined)
      && highlighted.indexOf(feature.get('id'))>-1;

    let conf = {
      image: new Circle({
        radius: selected? 10: 6,
        fill: selected?
          new Fill({color: 'rgba(255, 0, 0, 0.8)'}):
          new Fill({color: 'rgba(0, 255, 0, 1)'}),
        stroke: new Stroke({color: 'black', width: 1})
      })
    };

    if(resolution<10){
      conf.text = new Text({
        textAlign: "center",
        textBaseline: 'middle',
        fill: new Fill({color: 'black'}),
        font: '12px sans-serif',
        text: feature.get('name'),
        offsetY: 12
      });
    }

    return [new Style(conf)];
  }

  /*
      Calculate which features are visible in actual map extent
      If moveend prop funtion is present then call it.
  */
  moveEnd(){
    const { moveend } = this.props;
    console.log(this.map.getView().getResolution())
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
    console.log('selected', e.selected)
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
        hover(e.selected[0].getId())
      } else {
        hover(null)
      }
    }
  }

  componentWillReceiveProps(nextProps){
    const {
        highlighted
    } = nextProps;
    let refresh = false;
    if(!_.isEqual(highlighted, this.props.highlighted)){
      refresh = true;
    }
    if(refresh){
      this.selectClick.getFeatures().clear();
      this.points.refresh({force:true});
    }
  }

  render() {
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
          <Button
            color='black'
            size='mini'
            toggle
            active={satellite}
            onClick={(e)=>{
              this.setState({
                satellite: !satellite
              }, (a) => {
                console.log(a);
                const layers = this.map.getLayers().getArray();
                layers[0].setVisible(!this.state.satellite);
                layers[1].setVisible(this.state.satellite);
              })
            }}>
            Satellite
          </Button>
        </div>
        <div
          id='map'
          style={{
            width: '100%',
            height: '100%',
            padding: '0px',
            flex: '1 1 100%',
            // border: 'thin solid #cccccc'
          }}
        />
      </div>
    );
  }
};

MapComponent.propTypes = {
  moveend: PropTypes.func,
  highlighted: PropTypes.array,
  hover: PropTypes.func,
  selected: PropTypes.func
};

MapComponent.defaultProps = {
  highlighted: []
};

export default MapComponent;
