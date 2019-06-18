import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import _ from 'lodash';
import Highlight from 'react-highlighter';

import {
  Button,
  Checkbox,
  Divider,
  Header,
  Input,
  // Icon,
  Segment,
} from 'semantic-ui-react';

import {
  patchSettings,
  // getWmts,
  getWms
} from '@ist-supsi/bmsjs';


// import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import WMSCapabilities from 'ol/format/WMSCapabilities';
// import { optionsFromCapabilities } from 'ol/source/WMTS';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';
const projections = {
  "EPSG:21781": "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.4,15.1,405.3,0,0,0,0 +units=m +no_defs",
  "EPSG:2056": "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs",
  "EPSG:21782": "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=0 +y_0=0 +ellps=bessel +towgs84=674.4,15.1,405.3,0,0,0,0 +units=m +no_defs",
  "EPSG:4149": "+proj=longlat +ellps=bessel +towgs84=674.4,15.1,405.3,0,0,0,0 +no_defs",
  "EPSG:4150": "+proj=longlat +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +no_defs"
};

// import Scroller from '../../commons/scroller';

class ExplorerSettings extends React.Component {
  constructor(props) {
    super(props);
    _.forEach(projections, function (proj, srs) {
      proj4.defs(srs, proj);
    });
    register(proj4);
    this.state = {
      "appearance": false,
      "search_filter": false,
      "map": false,

      "wmtsFetch": false,
      "searchWmts": '',
      "searchWmtsUser": '',
      "wmts": null,

      "wmsFetch": false,
      "searchWms": '',
      "searchWmsUser": '',
      "wms": null
    };
  }

  render() {
    const {
      addExplorerMap,
      patchAppearance,
      rmExplorerMap,
      setting,
      t,
      toggleFilter,
      i18n,
    } = this.props;
    return (
      <div
        style={{
          padding: '2em',
          flex: 1
        }}
      >
        <div
          style={{
            flexDirection: 'row',
            display: 'flex'
          }}
        >
          <Header
            as='h3'
            className='link'
            onClick={() => {
              this.setState({
                appearance: !this.state.appearance
              });
            }}
            style={{
              margin: '0px'
            }}
          >
            Appearance
          </Header>
          <div
            style={{
              flex: 1,
              textAlign: 'right'
            }}
          >
            <Button
              color='red'
              onClick={() => {
                this.setState({
                  appearance: !this.state.appearance
                });
              }}
              size='small'
            >
              {
                this.state.appearance === true ?
                  'Collapse' : 'Expand'
              }
            </Button>
          </div>
        </div>
        {
          this.state.appearance === true ?
            <Segment.Group>
              <Segment>
                <div>
                  <Checkbox
                    checked={setting.data.appearance.explorer === 0}
                    label='Big map'
                    onChange={(e, d) => {
                      patchAppearance(0);
                    }}
                    radio
                  />
                </div>
                <div>
                  <Checkbox
                    checked={setting.data.appearance.explorer === 1}
                    label='Full'
                    onChange={(e, d) => {
                      patchAppearance(1);
                    }}
                    radio
                  />
                </div>


                <div>
                  <Checkbox
                    checked={setting.data.appearance.explorer === 2}
                    label='Map + List/Details'
                    onChange={(e, d) => {
                      patchAppearance(2);
                    }}
                    radio
                  />
                </div>
                <div>
                  <Checkbox
                    checked={setting.data.appearance.explorer === 3}
                    label='List + Map/Details'
                    onChange={(e, d) => {
                      patchAppearance(3);
                    }}
                    radio
                  />
                </div>


                <div>
                  <Checkbox
                    checked={setting.data.appearance.explorer === 4}
                    label='Map/Details + List'
                    onChange={(e, d) => {
                      patchAppearance(4);
                    }}
                    radio
                  />
                </div>
                <div>
                  <Checkbox
                    checked={setting.data.appearance.explorer === 5}
                    label='List/Details + Map'
                    onChange={(e, d) => {
                      patchAppearance(5);
                    }}
                    radio
                  />
                </div>

              </Segment>
            </Segment.Group>
            : <Divider />
        }
        <div
          style={{
            flexDirection: 'row',
            display: 'flex'
          }}
        >
          <Header
            as='h3'
            className='link'
            onClick={() => {
              this.setState({
                map: !this.state.map
              })
            }}
            style={{
              margin: '0px'
            }}
          >
            Map
          </Header>
          <div
            style={{
              flex: 1,
              textAlign: 'right'
            }}
          >
            <Button
              color='red'
              onClick={() => {
                this.setState({
                  map: !this.state.map
                });
              }}
              size='small'
            >
              {
                this.state.map === true ?
                  'Collapse' : 'Expand'
              }
            </Button>
          </div>
        </div>
        {
          this.state.map === true ?
            <Segment.Group>
              <Segment>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <div
                    style={{
                      flex: '1 1 100%'
                    }}
                  >
                    <div
                      style={{
                        alignItems: 'center',
                        marginBottom: '1em',
                        display: 'flex',
                        flexDirection: 'row'
                      }}
                    >
                      <div
                        style={{
                          flex: 1
                        }}
                      >
                        <Button
                          compact
                          loading={this.state.wmsFetch === true}
                          onClick={()=>{
                            this.setState({
                              wmsFetch: true,
                              wms: null,
                              wmts: null
                            }, () => {
                              getWms(
                                i18n.language
                              ).then((response) => {
                                const wms =  (
                                  new WMSCapabilities()
                                ).read(response.data);
                                console.log(wms);
                                this.setState({
                                  wmsFetch: false,
                                  wms: wms
                                }, () => {
                                  console.log(this.state.wms);
                                });
                              });
                              // getWmts(i18n.language).then((response) => {
                              //   this.setState({
                              //     wmtsFetch: false,
                              //     wmts: (
                              //       new WMTSCapabilities()
                              //     ).read(response.data)
                              //   }, () => {
                              //     console.log(this.state.wmts);
                              //   });
                              // }).catch((error) => {
                              //   console.log(error);
                              // });
                            });
                          }}
                          secondary
                          size='mini'
                        >
                          Load
                        </Button>
                        &nbsp; Swisstopo WMTS Layers
                      </div>
                      {
                        this.state.wmts !== null?
                          <div>
                            <Input
                              icon='search'
                              onChange={(e) => {
                                this.setState({
                                  'searchWmts': e.target.value.toLowerCase()
                                });
                              }}
                              placeholder='Search...'
                            />
                          </div>: null
                      }
                      {
                        this.state.wms !== null?
                          <div>
                            <Input
                              icon='search'
                              onChange={(e) => {
                                this.setState({
                                  'searchWms': e.target.value.toLowerCase()
                                });
                              }}
                              placeholder='Search...'
                            />
                          </div>: null
                      }
                    </div>
                    <div
                      style={{
                        maxHeight: '300px',
                        overflowY: 'auto',
                        border: this.state.wmts === null?
                          null: 'thin solid #cecece'
                      }}
                    >
                      {
                        this.state.wms === null?
                          null:
                          this.state.wms.Capability.Layer.Layer.map(
                            (layer, idx) => (
                              this.state.searchWms === ''
                              || (
                                layer.Title.toLowerCase().search(
                                  this.state.searchWms
                                ) >= 0
                                || layer.Abstract.toLowerCase().search(
                                  this.state.searchWms
                                ) >= 0
                                || layer.Name.toLowerCase().search(
                                  this.state.searchWms
                                ) >= 0
                              )?
                                <div
                                  className='selectable unselectable'
                                  key={'wmts-list-'+idx}
                                  style={{
                                    padding: '0.5em'
                                  }}
                                >
                                  <div
                                    style={{
                                      fontWeight: 'bold',
                                      display: 'flex',
                                      flexDirection: 'row',
                                      alignItems: 'center'
                                    }}
                                  >
                                    <div
                                      style={{
                                        flex: 1
                                      }}
                                    >
                                      <Highlight
                                        search={this.state.searchWms}
                                      >
                                        {layer.Title}
                                      </Highlight>
                                    </div>
                                    <div>
                                      <Button
                                        color={
                                          _.has(
                                            setting.data.map.explorer,
                                            layer.Name
                                          )?
                                            'grey':
                                            'blue'
                                        }
                                        icon={
                                          _.has(
                                            setting.data.map.explorer,
                                            layer.Name
                                          )?
                                            'trash alternate outline':
                                            'add'
                                        }
                                        onClick={(e)=>{
                                          e.stopPropagation();
                                          if (
                                            _.has(
                                              setting.data.map.explorer,
                                              layer.Name
                                            )
                                          ){
                                            rmExplorerMap(layer);
                                          } else {
                                            addExplorerMap(
                                              layer,
                                              this.state.wms
                                            );
                                          }
                                        }}
                                        size='mini'
                                      />
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      color: '#787878',
                                      fontSize: '0.8em'
                                    }}
                                  >
                                    <Highlight
                                      search={this.state.searchWms}
                                    >
                                      {layer.Name}
                                    </Highlight>
                                  </div>
                                  <div
                                    style={{
                                      fontSize: '0.8em'
                                    }}
                                  >
                                    <Highlight
                                      search={this.state.searchWms}
                                    >
                                      {layer.Abstract}
                                    </Highlight>
                                  </div>
                                </div>: null
                            )
                          )
                      }
                      {
                        this.state.wmts === null?
                          null:
                          this.state.wmts.Contents.Layer.map((layer, idx)=>(
                            this.state.searchWmts === ''
                            || (
                              layer.Title.toLowerCase().search(
                                this.state.searchWmts
                              ) >= 0
                              || layer.Abstract.toLowerCase().search(
                                this.state.searchWmts
                              ) >= 0
                              || layer.Identifier.toLowerCase().search(
                                this.state.searchWmts
                              ) >= 0
                            )?
                              <div
                                className='selectable unselectable'
                                key={'wmts-list-'+idx}
                                style={{
                                  padding: '0.5em'
                                }}
                              >
                                <div
                                  style={{
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                  }}
                                >
                                  <div
                                    style={{
                                      flex: 1
                                    }}
                                  >
                                    <Highlight
                                      search={this.state.searchWmts}
                                    >
                                      {layer.Title}
                                    </Highlight>
                                  </div>
                                  <div>
                                    <Button
                                      color={
                                        _.has(
                                          setting.data.map.explorer,
                                          layer.Identifier
                                        )?
                                          'grey':
                                          'blue'
                                      }
                                      icon={
                                        _.has(
                                          setting.data.map.explorer,
                                          layer.Identifier
                                        )?
                                          'trash alternate outline':
                                          'add'
                                      }
                                      onClick={(e)=>{
                                        e.stopPropagation();
                                        if (
                                          _.has(
                                            setting.data.map.explorer,
                                            layer.Identifier
                                          )
                                        ){
                                          rmExplorerMap(layer);
                                        } else {
                                          addExplorerMap(
                                            layer,
                                            this.state.wmts
                                          );
                                        }
                                      }}
                                      size='mini'
                                    />
                                  </div>
                                </div>
                                <div
                                  style={{
                                    color: '#787878',
                                    fontSize: '0.8em'
                                  }}
                                >
                                  <Highlight
                                    search={this.state.searchWmts}
                                  >
                                    {layer.Identifier}
                                  </Highlight>
                                </div>
                                <div
                                  style={{
                                    fontSize: '0.8em'
                                  }}
                                >
                                  <Highlight
                                    search={this.state.searchWmts}
                                  >
                                    {layer.Abstract}
                                  </Highlight>
                                </div>
                              </div>: null
                          ))
                      }
                    </div>
                  </div>
                  <div
                    style={{
                      flex: '1 1 100%',
                      marginLeft: '1em'
                    }}
                  >
                    <div
                      style={{
                        alignItems: 'center',
                        marginBottom: '1em',
                        display: 'flex',
                        flexDirection: 'row'
                      }}
                    >
                      <div
                        style={{
                          flex: 1
                        }}
                      >
                        User's maps
                      </div>
                      <div>
                        <Input
                          icon='search'
                          onChange={(e) => {
                            this.setState({
                              'searchWmtsUser': e.target.value.toLowerCase()
                            });
                          }}
                          placeholder='Search...'
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        maxHeight: '300px',
                        overflowY: 'auto',
                        flex: '1 1 100%',
                        border: 'thin solid #cecece'
                      }}
                    >
                      {
                        (
                          _.values(setting.data.map.explorer)
                        ).map((layer, idx)=>(
                          <div
                            className='selectable unselectable'
                            key={'wmts-list-'+idx}
                            style={{
                              padding: '0.5em'
                            }}
                          >
                            <div
                              style={{
                                fontWeight: 'bold',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                              }}
                            >
                              <div
                                style={{
                                  flex: 1
                                }}
                              >
                                {layer.Title}
                              </div>
                              <div>
                                <Button
                                  color={
                                    _.has(
                                      setting.data.map.explorer,
                                      layer.Identifier
                                    )?
                                      'grey':
                                      'blue'
                                  }
                                  icon={
                                    _.has(
                                      setting.data.map.explorer,
                                      layer.Identifier
                                    )?
                                      'trash alternate outline':
                                      'add'
                                  }
                                  onClick={(e)=>{
                                    e.stopPropagation();
                                    if (
                                      _.has(
                                        setting.data.map.explorer,
                                        layer.Identifier
                                      )
                                    ){
                                      rmExplorerMap(layer);
                                    } else {
                                      addExplorerMap(layer, this.state.wmts);
                                    }
                                  }}
                                  size='mini'
                                />
                              </div>
                            </div>
                            <div
                              style={{
                                color: '#787878',
                                fontSize: '0.8em'
                              }}
                            >
                              {layer.Identifier}
                            </div>
                            <div
                              style={{
                                fontSize: '0.8em'
                              }}
                            >
                              {layer.Abstract}
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </Segment>
              <Segment>
                <Checkbox
                  checked={setting.data.filter.mapfilter}
                  label='Filter by Map'
                  onChange={(e, d) => {
                    toggleFilter(
                      'mapfilter',
                      d.checked
                    );
                  }}
                />
              </Segment>
            </Segment.Group>
            : <Divider />
        }
        <div
          style={{
            flexDirection: 'row',
            display: 'flex'
          }}
        >
          <Header
            as='h3'
            className='link'
            onClick={() => {
              this.setState({
                "search_filter": !this.state.search_filter
              });
            }}
            style={{
              margin: '0px'
            }}
          >
            Search filters
          </Header>
          <div
            style={{
              flex: 1,
              textAlign: 'right'
            }}
          >
            <Button
              color='red'
              onClick={() => {
                this.setState({
                  "search_filter": !this.state.search_filter
                });
              }}
              size='small'
            >
              {
                this.state.search_filter === true ?
                  'Collapse' : 'Expand'
              }
            </Button>
          </div>
        </div>
        {
          this.state.search_filter === true ?
            <Segment.Group>
              <Segment>
                <Checkbox
                  checked={setting.data.filter.mapfilter}
                  label='Filter by Map'
                  onChange={(e, d) => {
                    toggleFilter(
                      'mapfilter',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={setting.data.filter.zoom2selected}
                  label='Zoom to selected'
                  onChange={(e, d) => {
                    toggleFilter(
                      'zoom2selected',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.kind
                  }
                  label={t('kind')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'kind',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.extended.method
                  }
                  label={t('method')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.method',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.custom.project_name
                  }
                  label={t('project_name')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.project_name',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.restriction
                  }
                  label={t('restriction') + "/" + t('restriction_until')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'restriction',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.custom.landuse
                  }
                  label={t('landuse')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.landuse',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.custom.canton
                  }
                  label={t('canton') + "/" + t('city') + "/" + t('address')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.canton',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.elevation_z
                  }
                  label={t('elevation_z')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'elevation_z',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.length
                  }
                  label={t('length')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'length',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.extended.groundwater
                  }
                  label={t('groundwater')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.groundwater',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.extended.top_bedrock
                  }
                  label={t('top_bedrock')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.top_bedrock',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.extended.status
                  }
                  label={t('status')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.status',
                      d.checked
                    );
                  }}
                />>
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.extended.purpose
                  }
                  label={t('purpose')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.purpose',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.custom.cuttings
                  }
                  label={t('cuttings')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.cuttings',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.drilling_date
                  }
                  label={t('drilling_date')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'drilling_date',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.custom.drill_diameter
                  }
                  label={t('drill_diameter')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.drill_diameter',
                      d.checked
                    );
                  }}
                />
              </Segment>

              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.bore_inc
                  }
                  label={t('bore_inc')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'bore_inc',
                      d.checked
                    );
                  }}
                />
              </Segment>

              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.custom.lit_pet_top_bedrock
                  }
                  label={t('lit_pet_top_bedrock')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.lit_pet_top_bedrock',
                      d.checked
                    );
                  }}
                />
              </Segment>

              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.custom.lit_str_top_bedrock
                  }
                  label={t('lit_str_top_bedrock')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.lit_str_top_bedrock',
                      d.checked
                    );
                  }}
                />
              </Segment>

              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.custom.chro_str_top_bedrock
                  }
                  label={t('chro_str_top_bedrock')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.chro_str_top_bedrock',
                      d.checked
                    );
                  }}
                />
              </Segment>

            </Segment.Group>
            : <Divider />
        }
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    setting: state.setting
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    toggleFilter: (filter, enabled) => {
      dispatch(patchSettings(`filter.${filter}`, enabled));
    },
    patchAppearance: (mode) => {
      dispatch(patchSettings('appearance.explorer', mode));
    },
    addExplorerMap: (layer, result) => {

      dispatch(
        patchSettings(
          'map.explorer',
          {
            Identifier: layer.Name,
            Abstract: layer.Abstract,
            Title: layer.Title,
            type: 'WMS'
          },
          layer.Name
        )
      );

      /*
      // WMTS
      const conf = optionsFromCapabilities(result, {
        layer: layer.Identifier,
        // projection: 'EPSG:2056'
      });
      console.log(conf);
      dispatch(
        patchSettings(
          'map.explorer',
          {
            Identifier: layer.Identifier,
            Abstract: layer.Abstract,
            Title: layer.Title,
            type: 'WMTS',
            conf: {
              ...conf,
              projection: {
                code: conf.projection.code_,
                units: conf.projection.units_,
                extent: conf.projection.extent_,
                axisOrientation: conf.projection.axisOrientation_,
                global: conf.projection.global_,
                metersPerUnit: conf.projection.metersPerUnit_,
                worldExtent: conf.projection.worldExtent_
              },
              tileGrid: {
                extent: conf.tileGrid.extent_,
                origin: conf.tileGrid.origin_,
                origins: conf.tileGrid.origins_,
                resolutions: conf.tileGrid.resolutions_,
                matrixIds: conf.tileGrid.matrixIds_,
                // sizes: conf.tileGrid.sizes,
                tileSize: conf.tileGrid.tileSize_,
                tileSizes: conf.tileGrid.tileSizes_,
                // widths: conf.tileGrid.widths
              }
            }
          },
          layer.Identifier
        )
      );
      */
    },
    rmExplorerMap: (config) => {
      dispatch(patchSettings('map.explorer', null, config.Identifier));
    },
    patchSettings: (filter, enabled) => {
      dispatch(patchSettings(`filter.${filter}`, enabled));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate(['borehole_form', 'common'])(ExplorerSettings));
