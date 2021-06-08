import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';
import Highlight from 'react-highlighter';

import {
  Button,
  Checkbox,
  Divider,
  Dropdown,
  Header,
  Input,
  Label,
  Popup,
  Segment,
} from 'semantic-ui-react';

import {
  patchSettings,
  // getWmts,
  getWms
} from '@ist-supsi/bmsjs';

import TranslationText from '../../commons/form/translationText';

import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import WMSCapabilities from 'ol/format/WMSCapabilities';
import { optionsFromCapabilities } from 'ol/source/WMTS';
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
            <TranslationText
              id='appearance'
            />
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
                  <TranslationText
                    id='collapse'
                  />:
                  <TranslationText
                    id='expand'
                  />
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
                    label=''
                    onChange={(e, d) => {
                      patchAppearance(0);
                    }}
                    radio
                  />
                  <TranslationText
                    id='appearanceBigMap'
                  />
                </div>
                <div>
                  <Checkbox
                    checked={setting.data.appearance.explorer === 1}
                    label=''
                    onChange={(e, d) => {
                      patchAppearance(1);
                    }}
                    radio
                  />
                  <TranslationText
                    id='appearanceFull'
                  />
                </div>
                <div>
                  <Checkbox
                    checked={setting.data.appearance.explorer === 2}
                    label=''
                    onChange={(e, d) => {
                      patchAppearance(2);
                    }}
                    radio
                  />
                  <TranslationText
                    id='appearanceMapListDetails'
                  />
                </div>
                <div>
                  <Checkbox
                    checked={setting.data.appearance.explorer === 3}
                    label=''
                    onChange={(e, d) => {
                      patchAppearance(3);
                    }}
                    radio
                  />
                  <TranslationText
                    id='appearanceListMapDetails'
                  />
                </div>

                <div>
                  <Checkbox
                    checked={setting.data.appearance.explorer === 4}
                    label=''
                    onChange={(e, d) => {
                      patchAppearance(4);
                    }}
                    radio
                  />
                  <TranslationText
                    id='appearanceMapDetailsList'
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
                  <TranslationText
                    id='appearanceListDetailsMap'
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
              });
            }}
            style={{
              margin: '0px'
            }}
          >
            <TranslationText
              id='map'
            />
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
                  <TranslationText
                    id='collapse'
                  />:
                  <TranslationText
                    id='expand'
                  />
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
                        <Dropdown
                          additionLabel=''
                          allowAdditions
                          fluid
                          onAddItem={(e, { value }) => {
                            this.setState({
                              wmsFetch: false,
                              wms: null,
                              wmts: null
                            }, () => {
                              this.props.handleAddItem(value);
                            });
                          }}
                          onChange={(e, { value }) => {
                            this.setState({
                              wmsFetch: false,
                              wms: null,
                              wmts: null
                            }, () => {
                              this.props.handleOnChange(value);
                            });
                          }}
                          options={setting.WMS}
                          placeholder=''
                          search
                          selection
                          value={setting.selectedWMS}
                        />
                      </div>
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
                              i18n.language,
                              setting.selectedWMS
                            ).then((response) => {
                              // Check if WMS or WMTS
                              let data = response.data;
                              if (
                                /<(WMT_MS_Capabilities|WMS_Capabilities)/.test(data)
                              ) {
                                const wms =  (
                                  new WMSCapabilities()
                                ).read(data);
                                this.setState({
                                  wmsFetch: false,
                                  wms: wms,
                                  wmts: null
                                });
                              } else if (
                                /<Capabilities/.test(data)
                              ) {
                                const wmts =  (
                                  new WMTSCapabilities()
                                ).read(data);
                                this.setState({
                                  wmsFetch: false,
                                  wms: null,
                                  wmts: wmts
                                });
                              } else {
                                this.setState({
                                  wmsFetch: false,
                                  wms: null,
                                  wmts: null
                                });
                                alert(
                                  "Sorry, only Web Map Services (WMS) and " +
                                  "Web Map Tile Service (WMTS) are supported"
                                );
                              }
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
                        style={{
                          marginLeft: '1em'
                        }}
                        // size='mini'
                      >
                        <TranslationText
                          id='load'
                        />
                      </Button>
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
                    <div
                      style={{
                        maxHeight: '300px',
                        overflowY: 'auto',
                        border: this.state.wms === null
                        && this.state.wmts === null?
                          null: 'thin solid #cecece',
                        marginTop: this.state.wms === null
                        && this.state.wmts === null?
                          null: '1em'
                      }}
                    >
                      {
                        this.state.wms === null?
                          null:
                          this.state.wms.Capability.Layer.Layer.map(
                            (layer, idx) => (
                              this.state.searchWms === ''
                              || (
                                (
                                  layer.hasOwnProperty('Title')
                                  && layer.Title.toLowerCase().search(
                                    this.state.searchWms
                                  ) >= 0
                                ) || (
                                  layer.hasOwnProperty('Abstract')
                                  && layer.Abstract.toLowerCase().search(
                                    this.state.searchWms
                                  ) >= 0
                                ) || (
                                  layer.hasOwnProperty('Name')
                                  && layer.Name.toLowerCase().search(
                                    this.state.searchWms
                                  ) >= 0
                                )
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
                                              'WMS',
                                              this.state.wms,
                                              _.values(setting.data.map.explorer).length
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
                                    {
                                      layer.queryable === true?
                                        <Popup
                                          content='Queryable'
                                          on='hover'
                                          trigger={
                                            <Label
                                              circular
                                              color='green'
                                              empty
                                              size='tiny'
                                              style={{
                                                marginRight: '0.5em'
                                              }}
                                            />
                                          }
                                        />: null
                                    }
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
                          this.state.wmts.Contents.Layer.map((layer, idx)=>{
                            return (
                              this.state.searchWmts === ''
                              || (
                                (
                                  layer.hasOwnProperty('Title')
                                  && layer.Title.toLowerCase().search(
                                    this.state.searchWmts
                                  ) >= 0
                                ) || (
                                  layer.hasOwnProperty('Abstract')
                                  && layer.Abstract.toLowerCase().search(
                                    this.state.searchWmts
                                  ) >= 0
                                ) || (
                                  layer.hasOwnProperty('Identifier')
                                  && layer.Identifier.toLowerCase().search(
                                    this.state.searchWmts
                                  ) >= 0
                                )
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
                                              'WMTS',
                                              this.state.wmts,
                                              _.values(setting.data.map.explorer).length
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
                            );
                          })
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
                        <TranslationText
                          id='usersMap'
                        />
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
                          _.values(
                            setting.data.map.explorer
                          ).sort(
                            (a, b) => {
                              if (a.position < b.position) {
                                return 1;
                              } else if (a.position > b.position) {
                                return -1;
                              }
                              return 0;
                            }
                          )
                        ).map((layer, idx)=>(
                          this.state.searchWmtsUser === ''
                          || (
                            (
                              layer.hasOwnProperty('Title')
                              && layer.Title.toLowerCase().search(
                                this.state.searchWmtsUser
                              ) >= 0
                            ) || (
                              layer.hasOwnProperty('Abstract')
                              && layer.Abstract.toLowerCase().search(
                                this.state.searchWmtsUser
                              ) >= 0
                            ) || (
                              layer.hasOwnProperty('Identifier')
                              && layer.Identifier.toLowerCase().search(
                                this.state.searchWmtsUser
                              ) >= 0
                            )
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
                                    search={this.state.searchWmtsUser}
                                  >
                                    {layer.Title}
                                  </Highlight>
                                </div>
                                <div>
                                  <Button
                                    color='grey'
                                    icon='trash alternate outline'
                                    onClick={(e)=>{
                                      e.stopPropagation();
                                      if (
                                        _.has(
                                          setting.data.map.explorer,
                                          layer.Identifier
                                        )
                                      ){
                                        rmExplorerMap(layer);
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
                                  search={this.state.searchWmtsUser}
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
                                  search={this.state.searchWmtsUser}
                                >
                                  {layer.Abstract}
                                </Highlight>
                              </div>
                            </div>: null
                        ))
                      }
                    </div>
                  </div>
                </div>
              </Segment>
              <Segment>
                <Checkbox
                  checked={setting.data.filter.mapfilter}
                  label={t('filterbymap')}
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
            <TranslationText
              id='searchfilters'
            />
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
                  <TranslationText
                    id='collapse'
                  />:
                  <TranslationText
                    id='expand'
                  />
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
                  label=''
                  onChange={(e, d) => {
                    toggleFilter(
                      'mapfilter',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='filterbymap'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={setting.data.filter.zoom2selected}
                  label=''
                  onChange={(e, d) => {
                    toggleFilter(
                      'zoom2selected',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='centerselected'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.custom.borehole_identifier
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.borehole_identifier',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='borehole_identifier'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.kind
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'kind',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='kind'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.extended.method
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.method',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='drillingmethod'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.custom.project_name
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.project_name',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='project_name'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.restriction
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'restriction',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='restriction'
                />
                &nbsp;/&nbsp;
                <TranslationText
                  id='restriction_until'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.custom.landuse
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.landuse',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='landuse'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.custom.canton
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.canton',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='canton'
                />
                &nbsp;/&nbsp;
                <TranslationText
                  id='city'
                />
                &nbsp;/&nbsp;
                <TranslationText
                  id='address'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.elevation_z
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'elevation_z',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='elevation_z'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.length
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'length',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='totaldepth'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.extended.groundwater
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.groundwater',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='groundwater'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.extended.top_bedrock
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.top_bedrock',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='top_bedrock'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.extended.status
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.status',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='status'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.extended.purpose
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.purpose',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='purpose'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.custom.cuttings
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.cuttings',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='cuttings'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.drilling_date
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'drilling_date',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='drilling_date'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.custom.drill_diameter
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.drill_diameter',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='drilldiameter'
                />
              </Segment>

              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.bore_inc
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'bore_inc',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='inclination'
                />
              </Segment>

              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.custom.lit_pet_top_bedrock
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.lit_pet_top_bedrock',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='lit_pet_top_bedrock'
                />
              </Segment>

              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.custom.lit_str_top_bedrock
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.lit_str_top_bedrock',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='lit_str_top_bedrock'
                />
              </Segment>

              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.custom.chro_str_top_bedrock
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.chro_str_top_bedrock',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='chro_str_top_bedrock'
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

const mapDispatchToProps = (dispatch, state) => {
  return {
    dispatch: dispatch,
    toggleFilter: (filter, enabled) => {
      dispatch(patchSettings(`filter.${filter}`, enabled));
    },
    patchAppearance: (mode) => {
      dispatch(patchSettings('appearance.explorer', mode));
    },
    addExplorerMap: (layer, type, result, position = 0) => {

      if (type === 'WMS') {
        if (!layer.CRS.includes('EPSG:2056')){
          alert("Only EPSG:2056 is supported");
        } else {
          dispatch(
            patchSettings(
              'map.explorer',
              {
                Identifier: layer.Name,
                Abstract: layer.Abstract,
                position: position,
                Title: layer.Title,
                transparency: 0,
                type: 'WMS',
                url: result.Service.OnlineResource,
                visibility: true,
                queryable: layer.queryable
              },
              layer.Name
            )
          );
        }
      } else if (type === 'WMTS'){
        const conf = optionsFromCapabilities(result, {
          layer: layer.Identifier,
          // projection: 'EPSG:2056'
        });
        if (
          conf.hasOwnProperty('matrixSet')
          && !conf.matrixSet.includes('2056')
        ) {
          alert("Only EPSG:2056 is supported");
        } else {
          dispatch(
            patchSettings(
              'map.explorer',
              {
                Identifier: layer.Identifier,
                Abstract: layer.Abstract,
                position: position,
                Title: layer.Title,
                transparency: 0,
                type: 'WMTS',
                url: conf.urls,
                visibility: true,
                queryable: false,
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
        }
      }
    },
    rmExplorerMap: (config) => {
      dispatch(patchSettings('map.explorer', null, config.Identifier));
    },
    patchSettings: (filter, enabled) => {
      dispatch(patchSettings(`filter.${filter}`, enabled));
    },
    handleAddItem: (value) => {
      dispatch({
        type: 'WMS_ADDED',
        url: value
      });
    },
    handleOnChange: (value) => {
      dispatch({
        type: 'WMS_SELECTED',
        url: value
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('common')(ExplorerSettings));
