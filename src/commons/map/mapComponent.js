import React from 'react'
import {Map, View} from 'ol'
import TileLayer from 'ol/layer/Tile'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import LayerGroup from 'ol/layer/Group'
import WMTS from 'ol/source/WMTS'

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
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
};

export default MapComponent;
