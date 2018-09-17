import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Map, View} from 'ol'
import TileLayer from 'ol/layer/Tile'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import LayerGroup from 'ol/layer/Group'
import WMTS from 'ol/source/WMTS'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import Stroke from 'ol/style/Stroke'
import Fill from 'ol/style/Fill'
import Style from 'ol/style/Style'
import Circle from 'ol/style/Circle'
import Text from 'ol/style/Text'

import {
  getGeojson
} from '@ist-supsi/bmsjs'

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.moveEnd = this.moveEnd.bind(this)
    this.state = {
      counter: 0
    }
  }
  componentDidMount(){
    var resolutions = [
      4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000, 1750, 1500, 1250,
      1000, 750, 650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5
    ]
    var tileGrid = new WMTSTileGrid({
      origin: [420000, 350000],
      resolutions: resolutions,
      matrixIds: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
          16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26
      ]
    })
    this.map = new Map({
      layers: [
        new LayerGroup({
          visible: true,
          layers: [
            new TileLayer({
              minResolution: 2.5,
              preload: Infinity,
              source: new WMTS({
                crossOrigin: 'anonymous',
                attributions: '&copy; Data: <a href="http://www.swisstopo.admin.ch/internet/swisstopo/en/home.html">swisstopo</a>',
                url: 'https://wmts{5-9}.geo.admin.ch/1.0.0/{Layer}/default/current/21781/{TileMatrix}/{TileRow}/{TileCol}.jpeg',
                tileGrid: tileGrid,
                layer: "ch.swisstopo.pixelkarte-farbe",
                requestEncoding: 'REST'
              })
            }),
            new TileLayer({
              maxResolution: 2.5,
              preload: Infinity,
              source: new WMTS({
                crossOrigin: 'anonymous',
                attributions: '&copy; Data: <a href="http://www.swisstopo.admin.ch/internet/swisstopo/en/home.html">swisstopo</a>',
                url: 'https://wmts{5-9}.geo.admin.ch/1.0.0/{Layer}/default/current/21781/{TileMatrix}/{TileRow}/{TileCol}.png',
                tileGrid: tileGrid,
                layer: "ch.swisstopo.swisstlm3d-karte-farbe",
                requestEncoding: 'REST'
              })
            })
          ]
        })
      ],
      target: 'map',
      view: new View({
        /*maxResolution: 340,
        minResolution: 1,*/
        resolution: 500,
        center: [661499, 181250],
        //extent: [708000, 115000, 727000, 143000]
      })
    })
    this.points = new VectorSource()
    this.map.addLayer(new VectorLayer({
      source: this.points,
      style: this.styleFunction.bind(this)
      // style: new Style({
      //   image: new Circle({
      //     radius: 5,
      //     fill: new Fill({color: 'rgba(255, 0, 0, 1)'}),
      //     stroke: new Stroke({color: 'black', width: 1})
      //   })
      // })
    }))

    // Register map events
    this.map.on('moveend', this.moveEnd)

    getGeojson().then(function(response) {
      if(response.data.success){
        this.points.addFeatures(
          (
            new GeoJSON()
          ).readFeatures(response.data.data)
        )
        this.map.getView().fit(
            this.points.getExtent()
        )
        this.moveEnd()
      }
    }.bind(this)).catch(function (error) {
      console.log(error)
    })
  }

  styleFunction(feature, resolution){
    const {
      highlighted
    } = this.props

    let selected = highlighted !== undefined
      && highlighted.indexOf(feature.get('id'))>-1

    let conf = {
      image: new Circle({
        radius: selected? 10: 6,
        fill: selected?
          new Fill({color: 'rgba(255, 0, 0, 0.8)'}):
          new Fill({color: 'rgba(0, 255, 0, 1)'}),
        stroke: new Stroke({color: 'black', width: 1})
      })
    }

    if(resolution<10){
      conf.text = new Text({
        textAlign: "center",
        textBaseline: 'middle',
        fill: new Fill({color: 'black'}),
        font: '12px sans-serif',
        text: feature.get('name'),
        offsetY: 12
      })
    }

    return [new Style(conf)];
  }

  /*
      Calculate which features are visible in actual map extent
      If  moveend prop funtion is present then call it.
  */
  moveEnd(){
    const { moveend } = this.props;
    if(moveend !== undefined){
      var extent = this.map.getView().calculateExtent(this.map.getSize())
      let features = []
      this.points.forEachFeatureInExtent(extent, function(feature){
          features.push(feature.get('id'))
      })
      moveend(features, extent)
    }
  }

  componentWillReceiveProps(nextProps){
    const {
        highlighted
    } = nextProps
    if(!_.isEqual(highlighted, this.props.highlighted)){
      this.points.refresh({force:true});
    }
  }

  render() {
    return (
      <div id='map' style={{
        width: '100%',
        height: '100%',
        padding: '0px',
        flex: '1 1 100%',
        // border: 'thin solid #cccccc'
      }}/>
    )
  }
}


MapComponent.propTypes = {
  moveend: PropTypes.func,
  highlighted: PropTypes.array
}

MapComponent.defaultProps = {
  highlighted: []
}

export default MapComponent;
