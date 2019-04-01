import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import _ from 'lodash';
import moment from 'moment';
import {
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import {
  updateBorehole,
  loadBorehole,
  checkBorehole,
  createBorehole,
  createStratigraphy,
  patchBorehole
} from '@ist-supsi/bmsjs';

import PointComponent from '../../map/pointComponent';
import DomainDropdown from '../domain/dropdown/domainDropdown';
import MunicipalityDropdown from '../municipality/dropdown/municipalityDropdown';
// import DomainTabs from '../domain/domainTabs';
import CantonDropdown from '../cantons/dropdown/cantonDropdown';
import DateField from '../dateField';
import DateText from '../dateText';
// import StratigraphyForm from '../stratigraphy/stratigraphyForm';
import StratigraphyFormContainer from '../stratigraphy/stratigraphyFormContainer';
import DomainText from '../domain/domainText';

import {
  Tab,
  Form,
  Input,
  Segment,
  Message,
  Dimmer,
  Loader,
  TextArea,
  Progress,
  Button,
  Icon,
  Image
} from 'semantic-ui-react';

class BoreholeForm extends React.Component {

  constructor(props) {
    super(props);
    this.checkattribute = false;
    this.updateAttributeDelay = {};
    this.state = {
      tab: 0,
      loading_fetch: false,
      patch_fetch: false,
      creation_fetch: false,
      "extended.original_name_check": true,
      "extended.original_name_fetch": false,
      "custom.public_name_check": true,
      "custom.public_name_fetch": false,

      // Stratigraphy
      layer_kind: null,
      stratigraphy_id: null,
      layer: null,
      layers: [],
      layerUpdated: null
    };
  }

  componentDidMount(){
    const {
      match
    } = this.props;
    if(!_.isNil(match.params.id)) this.loadOrCreate(parseInt(match.params.id,10));
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.id !== null
      && this.props.match.params.id !== prevProps.match.params.id
    ) {
      this.loadOrCreate(parseInt(this.props.match.params.id,10));
      // this.loadOrCreate(this.props.match.params.id);
    }
  }

  loadOrCreate(id){
    const self = this;
    if(_.isInteger(id)){
      // request to edit a borehole
      this.setState({
        loading_fetch: true,
        layer_kind: null,
        stratigraphy_id: null,
        layers: [],
        layer: null,
        borehole: this.empty
      }, () => {
        this.props.loadBorehole(id).then(function(response) {
          if(response.success){
            self.setState({
              loading_fetch: false,
              stratigraphy_id: (
                _.isArray(response.data.stratigraphy)
                && response.data.stratigraphy.length>0?
                  response.data.stratigraphy[0].id: null
              )
            });
          }
        }).catch(function (error) {
          console.log(error);
        })
        /*
        getBorehole(id).then(function(response) {
          if(response.data.success){
            let bh = response.data.data
            self.setState({
              loading_fetch: false,
              borehole: {
                ...self.empty,
                ...bh,
                extended: {
                  ...self.empty.extended,
                  ...bh.extended
                }
              }
            })
          }
        }).catch(function (error) {
          console.log(error)
        })*/
      })
    }else{
      // request the creation of a new borehole if id is not given
      this.setState({
        creation_fetch: true
      }, () => {
        setTimeout(function(){
          createBorehole().then(function(response) {
            if(response.data.success){
              self.setState({
                creation_fetch: false,
                borehole: {
                  ...self.state.borehole,
                  id: response.data.id
                }
              });
            }
          }).catch(function (error) {
            console.log(error);
          })
        }, 100)
      });
    }
  }

  check(attribute, value){
    // Check for uniqueness and patch
    const state = {
      ...this.state,
      patch_fetch: true,
      // borehole: {
      //   ...this.state.borehole
      // }
    };
    const borehole = {
      ...this.props.borehole.data
    };
    _.set(borehole, attribute, value)
    // _.set(state.borehole, attribute, value)
    state[attribute+"_fetch"] = true;

    const self = this;
    // update state
    this.setState(state, () => {
      if(self.checkattribute){
        clearTimeout(self.checkattribute);
        self.checkattribute = false;
      }
      this.props.updateBorehole(borehole);

      self.checkattribute = setTimeout(function(){
        checkBorehole(
          attribute, value
        ).then(function(response) {
          if(response.data.success){
            let state = {}
            state[attribute + '_check'] = response.data.check
            state[attribute + '_fetch'] = false
            self.setState(state)
            if(response.data.check){
              // patch attribute
              patchBorehole(
                borehole.id,
                attribute,
                value
              ).then(function(response) {
                if(response.data.success){
                  self.setState({
                    patch_fetch: false
                  }, () => {
                    borehole.percentage = response.data.data;
                    self.props.updateBorehole(borehole);
                  })
                }
              }).catch(function (error) {
                console.error(error);
              })
            }
            // if(response.data.check){
            //   // patch attribute
            //   patchBorehole(
            //     borehole.id,
            //     attribute,
            //     value
            //   ).then(function(response) {
            //     if(response.data.success){
            //       self.setState({
            //         patch_fetch: false
            //       })
            //     }
            //   }).catch(function (error) {
            //     console.error(error)
            //   })
            // }
          }
        }).catch(function (error) {
          console.error(error);
        })
      }, 250);
    })
  }

  updateChange(attribute, value, to = true){
    const state = {
      ...this.state,
      patch_fetch: true,
      // borehole: {
      //   ...this.state.borehole
      // }
    };
    const borehole = {
      ...this.props.borehole.data
    };
    if(attribute === 'location'){
      _.set(borehole, 'location_x', value[0]);
      _.set(borehole, 'location_y', value[1]);
      _.set(borehole, 'custom.canton', value[2]);
      _.set(borehole, 'custom.city', value[3]);
      if(value[4] !== null){
        _.set(borehole, 'elevation_z', value[4]);
      }
    }else if(attribute === 'geocoding'){
      _.set(borehole, 'custom.canton', value[0]);
      _.set(borehole, 'custom.city', value[1]);
    }else{
      _.set(borehole, attribute, value);
    }
    const self = this
    this.setState(state, () => {
      this.props.updateBorehole(borehole)
      if(
        self.updateAttributeDelay.hasOwnProperty(attribute) &&
        self.updateAttributeDelay[attribute]
      ){
        clearTimeout(self.updateAttributeDelay[attribute]);
        self.updateAttributeDelay[attribute] = false
      }
      self.updateAttributeDelay[attribute] = setTimeout(function(){
        patchBorehole(
          borehole.id,
          attribute,
          value
        ).then(function(response) {
          if(response.data.success){
            self.setState({
              patch_fetch: false
            }, () => {
              borehole.percentage = response.data.data
              self.props.updateBorehole(borehole)
            })
          }
        }).catch(function (error) {
          console.error(error)
        })
      }, to? 500: 0)
    })
  }

  render() {
    const {
      t
    } = this.props;
    const borehole = this.props.borehole.data;
    const size = null; // 'small'
    return (
      <Dimmer.Dimmable
        as={'div'}
        style={{
          flex: 1,
          overflowY: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        dimmed={
          this.state.loading_fetch === true ||
          this.state.creation_fetch === true
        }>
        <Dimmer
          active={
            this.state.loading_fetch === true ||
            this.state.creation_fetch === true
          }
          inverted>
          <Loader>
          {(()=>{
            if(this.state.loading_fetch === true){
              return (t('loading_fetch'))
            }else if(this.state.creation_fetch === true){
              return (t('creation_fetch'))
            }
          })()}
          </Loader>
        </Dimmer>
            <Switch>
              <Route
                exact={true}
                path={process.env.PUBLIC_URL + "/editor/:id"}
                render={()=>(
                  <div style={{
                      flex: "1 1 0%",
                      padding: "1em",
                      overflowY: "auto",
                      display: "flex",
                      flexDirection: "column"
                    }}>
                    <Segment>
                      <Form
                        error
                        size={size}
                        autoComplete="off">
                        <Form.Group widths='equal'>
                          <Form.Field
                            required
                            error={
                              borehole.extended.original_name === ''
                              || (
                                this.state['extended.original_name_check'] === false
                                && this.state['extended.original_name_fetch'] === false
                              )
                            }
                          >
                            <label>{t('original_name')}</label>
                            <Input
                              loading={this.state['extended.original_name_fetch']}
                              iconPosition='left'
                              icon={
                                this.state['extended.original_name_check'] === true
                                  && this.state['extended.original_name_fetch'] === false?
                                'check': 'delete'
                              }
                              onChange={(e)=>{
                                this.check(
                                  'extended.original_name',
                                  e.target.value
                                )
                              }}
                              value={borehole.extended.original_name}
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="off"
                              spellCheck="false"/>
                          </Form.Field>
                          <Form.Field>
                            <label>{t('project_name')}</label>
                            <Input
                              onChange={(e)=>{
                                this.updateChange(
                                  'custom.project_name', e.target.value
                                )
                              }}
                              value={borehole.custom.project_name}
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="off"
                              spellCheck="false"/>
                          </Form.Field>
                        </Form.Group>
                        {
                          this.state['extended.original_name_check'] === false
                          && this.state['extended.original_name_fetch'] === false?
                            <Message
                                error
                                size={size}
                                content={
                                  t('original_name') + ', ' 
                                  + t('duplicate')
                                }
                              />: null
                        }
                        <Form.Group widths='equal'>
                          <Form.Field
                            required
                            error={
                              borehole.custom.public_name === ''
                              || (
                                this.state['custom.public_name_check'] === false
                                && this.state['custom.public_name_fetch'] === false
                              )
                            }
                          >
                            <label>{t('public_name')}</label>
                            <Input
                              loading={this.state.public_name_fetch}
                              iconPosition='left'
                              icon={
                                this.state[
                                  'custom.public_name_check'] === true
                                && this.state[
                                  'custom.public_name_fetch'] === false?
                                'check': 'delete'
                              }
                              onChange={(e)=>{
                                this.check(
                                  'custom.public_name',
                                  e.target.value
                                )
                              }}
                              value={borehole.custom.public_name}
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="off"
                              spellCheck="false"/>
                          </Form.Field>
                          <Form.Field
                            error={borehole.kind === null}
                            required
                          >
                            <label>{t('kind')}</label>
                            <DomainDropdown
                              schema='kind'
                              selected={borehole.kind}
                              onSelected={(selected)=>{
                                this.updateChange('kind', selected.id, false)
                              }}/>
                          </Form.Field>
                        </Form.Group>
                        {
                          this.state['custom.public_name_check'] === false
                          && this.state['custom.public_name_fetch'] === false?
                            <Message
                                error
                                size={size}
                                content={
                                  t('public_name') + ', ' 
                                  + t('duplicate')
                                }
                              />: null
                        }
                      </Form>
                    </Segment>

                    <Segment>
                      <Form
                        size={size}>
                        <Form.Group widths='equal'>
                          <Form.Field
                            required
                          >
                            <label>{t('restriction')}</label>
                            <DomainDropdown
                              schema='restriction'
                              selected={borehole.restriction}
                              onSelected={(selected)=>{
                                this.updateChange('restriction', selected.id, false)
                              }}/>
                          </Form.Field>
                          <Form.Field
                            required={borehole.restriction === 29}
                            error={
                              (
                                borehole.restriction === 29 &&
                                !moment(borehole.restriction_until).isValid()
                              ) || (
                                borehole.restriction !== 29 &&
                                _.isString(borehole.restriction_until) &&
                                  borehole.restriction_until !== '' &&
                                    moment(borehole.restriction_until).isValid()
                              )
                            }>
                            <label>{t('restriction_until')} ({t('date_format')})</label>
                            <DateField
                              date={borehole.restriction_until}
                              onChange={(selected)=>{
                                this.updateChange(
                                  'restriction_until', selected, false
                                )
                              }} />
                          </Form.Field>
                        </Form.Group>
                      </Form>
                    </Segment>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row'
                      }}
                    >
                      <div
                        style={{
                          flex: '1'
                        }}
                      >
                        <Segment>
                          <Form size={size}>
                            <Form.Group widths='equal'>
                              <Form.Field
                                required
                              >
                                <label>{t('srs')}</label>
                                <DomainDropdown
                                  schema='srs'
                                  selected={borehole.srs}
                                  onSelected={(selected)=>{
                                    this.updateChange('srs', selected.id, false)
                                  }}/>
                              </Form.Field>
                              <Form.Field
                                required
                              >
                                <label>{t('location_x')}</label>
                                <Input
                                  disabled={borehole.srs===null}
                                  type='number'
                                  value={
                                    _.isNil(borehole.location_x)?
                                    '': borehole.location_x
                                  }
                                  onChange={(e)=>{
                                    this.updateChange(
                                      'location_x',
                                      e.target.value === ''?
                                      null: _.toNumber(e.target.value)
                                    )
                                  }}
                                  autoComplete="off"
                                  autoCorrect="off"
                                  autoCapitalize="off"
                                  spellCheck="false"/>
                              </Form.Field>
                              <Form.Field
                                required
                              >
                                <label>{t('location_y')}</label>
                                <Input
                                  disabled={borehole.srs===null}
                                  type='number'
                                  value={
                                    _.isNil(borehole.location_y)?
                                    '': borehole.location_y
                                  }
                                  onChange={(e)=>{
                                    this.updateChange(
                                      'location_y',
                                      e.target.value === ''?
                                      null: _.toNumber(e.target.value)
                                    )
                                  }}
                                  autoComplete="off"
                                  autoCorrect="off"
                                  autoCapitalize="off"
                                  spellCheck="false"/>
                              </Form.Field>
                              <Form.Field
                                required
                              >
                                <label>{t('qt_location')}</label>
                                <DomainDropdown
                                  schema='qt_location'
                                  selected={borehole.qt_location}
                                  onSelected={(selected)=>{
                                    this.updateChange('qt_location', selected.id, false)
                                  }}/>
                              </Form.Field>
                            </Form.Group>
                            <Form.Group widths='equal'>
                              <Form.Field
                                required
                              >
                                <label>{t('elevation_z')}</label>
                                <Input
                                  type='number'
                                  value={
                                    _.isNil(borehole.elevation_z)?
                                    '': borehole.elevation_z
                                  }
                                  onChange={(e)=>{
                                    this.updateChange(
                                      'elevation_z',
                                      e.target.value === ''?
                                      null: _.toNumber(e.target.value)
                                    )
                                  }}
                                  autoComplete="off"
                                  autoCorrect="off"
                                  autoCapitalize="off"
                                  spellCheck="false"/>
                              </Form.Field>
                              <Form.Field
                                required
                              >
                                <label>{t('hrs')}</label>
                                <DomainDropdown
                                  schema='hrs'
                                  selected={borehole.hrs}
                                  onSelected={(selected)=>{
                                    this.updateChange('hrs', selected.id, false)
                                  }}/>
                              </Form.Field>
                              <Form.Field
                                required
                              >
                                <label>{t('qt_elevation')}</label>
                                <DomainDropdown
                                  schema='qt_elevation'
                                  selected={borehole.qt_elevation}
                                  onSelected={(selected)=>{
                                    this.updateChange('qt_elevation', selected.id, false)
                                  }}/>
                              </Form.Field>
                            </Form.Group>
                          </Form>
                        </Segment>

                        <Segment>
                          <Form
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            size={size}>
                            <Form.Group widths='equal'>
                              <Form.Field
                                required
                              >
                                <label>{t('country')}</label>
                                <Input
                                  value={'Switzerland'}/>
                              </Form.Field>
                              <Form.Field
                                required
                              >
                                <label>
                                  {t('canton')} {
                                    borehole.custom.canton !== null?
                                      <span
                                        className='link'
                                        onClick={()=>{
                                          for (let index = 0; index < this.props.cantons.length; index++) {
                                            const canton = this.props.cantons[index];
                                            if (canton.id === borehole.custom.canton){
                                              this.map.zoomtopoly(
                                                canton.geom.coordinates
                                              )
                                              break;
                                            }
                                          }
                                        }}
                                      >
                                        <Icon name='map marker' />
                                        {/* <Icon.Group>
                                          <Icon name='map marker' />
                                          <Icon corner name='search' />
                                        </Icon.Group> */}
                                      </span>: null
                                  }
                                </label>
                                <CantonDropdown
                                  selected={borehole.custom.canton}
                                  onSelected={(selected)=>{
                                    if(borehole.custom.city !== null){
                                      this.updateChange(
                                        'custom.city', null, false
                                      )
                                    }
                                    this.updateChange(
                                      'custom.canton', selected.id, false
                                    )
                                  }}/>
                              </Form.Field>
                              <Form.Field
                                required
                              >
                                <label>
                                  {t('city')} {
                                    borehole.custom.city !== null?
                                      <span
                                        className='link'
                                        onClick={()=>{
                                          for (let index = 0; index < this.props.municipalities.length; index++) {
                                            const municipality = this.props.municipalities[index];
                                            if (municipality.id === borehole.custom.city){
                                              this.map.zoomtopoly(
                                                municipality.geom.coordinates
                                              )
                                              break;
                                            }
                                          }
                                        }}
                                      >
                                        {/* <Image
                                          avatar
                                          src={
                                            process.env.PUBLIC_URL
                                            + '/img/map-search-outline.svg'
                                          }
                                          style={{
                                            height: '1.5em',
                                            width: 'auto'                                      
                                          }}
                                        /> */}
                                        <Icon name='map marker' />
                                      </span>: null
                                  }
                                </label>
                                <MunicipalityDropdown
                                  disabled={borehole.custom.canton===null}
                                  canton={borehole.custom.canton}
                                  selected={borehole.custom.city}
                                  onSelected={(selected)=>{
                                    console.log(selected)
                                    this.updateChange(
                                      'custom.city', selected.id, false
                                    )
                                  }}/>
                              </Form.Field>
                            </Form.Group>
                            <Form.Group widths='equal'>
                              <Form.Field>
                                <label>{t('address')}</label>
                                <Input
                                  onChange={(e)=>{
                                    this.updateChange(
                                      'custom.address', e.target.value
                                    )
                                  }}
                                  value={
                                      _.isNil(borehole.custom.address)?
                                      '': borehole.custom.address
                                  }
                                  autoComplete="off"
                                  autoCorrect="off"
                                  autoCapitalize="off"
                                  spellCheck="false"/>
                              </Form.Field>
                              <Form.Field>
                                <label>{t('landuse')}</label>
                                <DomainDropdown
                                  schema='custom.landuse'
                                  selected={borehole.custom.landuse}
                                  onSelected={(selected)=>{
                                    this.updateChange(
                                      'custom.landuse', selected.id, false
                                    )
                                  }}/>
                              </Form.Field>
                            </Form.Group>
                          </Form>
                        </Segment>
                      </div>
                      <div
                        style={{
                          flex: '1',
                          marginLeft: '1em'
                        }}
                      >
                        <PointComponent
                          id={this.props.id}
                          ref={ pmap => this.map = pmap}
                          x={
                            borehole.location_x === ''?
                              null:
                              _.toNumber(borehole.location_x)
                          }
                          y={
                            borehole.location_y === ''?
                              null:
                              _.toNumber(borehole.location_y)
                          }
                          srs={
                            borehole.srs !== null?
                              'EPSG:' + this.props.domains.data['srs'].find(function(element) {
                                return element.id === borehole.srs
                              })['code']:
                              null
                          }
                          applyChange={(x, y, height, cid, mid)=>{
                            this.updateChange(
                              'location', [x, y, cid, mid, height], false);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              />
              <Route
                exact={true}
                path={process.env.PUBLIC_URL + "/editor/:id/borehole"}
                render={()=>(
                  <div style={{
                    flex: "1 1 0%",
                    padding: "1em",
                    overflowY: "auto"
                  }}>
                    <Segment>
                      <Form
                        error
                        size={size}
                        autoComplete="off">
                        <Form.Group widths='equal'>
                          <Form.Field
                            required
                          >
                            <label>{t('method')}</label>
                            <DomainDropdown
                              schema='extended.method'
                              selected={borehole.extended.method}
                              onSelected={(selected)=>{
                                this.updateChange(
                                  'extended.method', selected.id, false)
                              }}/>
                          </Form.Field>
                          <Form.Field
                            required
                            error={
                              _.isString(borehole.drilling_date) &&
                              borehole.drilling_date !== '' &&
                              !moment(borehole.drilling_date).isValid()
                            }>
                            <label>{t('drilling_date')} ({t('date_format')})</label>
                            <DateField
                              date={borehole.drilling_date}
                              onChange={(selected)=>{
                                this.updateChange(
                                  'drilling_date', selected, false
                                )
                              }} />
                          </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                          <Form.Field
                            required
                          >
                            <label>{t('cuttings')}</label>
                            <DomainDropdown
                              schema='custom.cuttings'
                              selected={borehole.custom.cuttings}
                              onSelected={(selected)=>{
                                this.updateChange(
                                  'custom.cuttings', selected.id, false)
                              }}/>
                          </Form.Field>
                          <Form.Field
                            required
                          >
                            <label>{t('purpose')}</label>
                            <DomainDropdown
                              schema='extended.purpose'
                              selected={borehole.extended.purpose}
                              onSelected={(selected)=>{
                                this.updateChange(
                                  'extended.purpose', selected.id, false)
                              }}/>
                          </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                          <Form.Field>
                            <label>{t('drill_diameter')}</label>
                            <Input
                              type='number'
                              value={
                                _.isNil(borehole.custom.drill_diameter)?
                                '': borehole.custom.drill_diameter
                              }
                              onChange={(e)=>{
                                this.updateChange(
                                  'custom.drill_diameter',
                                  e.target.value === ''?
                                  null: _.toNumber(e.target.value)
                                )
                              }}
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="off"
                              spellCheck="false"/>
                          </Form.Field>
                          <Form.Field
                            required
                          >
                            <label>{t('status')}</label>
                            <DomainDropdown
                              schema='extended.status'
                              selected={borehole.extended.status}
                              onSelected={(selected)=>{
                                this.updateChange(
                                  'extended.status', selected.id, false)
                              }}/>
                          </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                          <Form.Field
                            required
                          >
                            <label>{t('bore_inc')}</label>
                            <Input
                              type='number'
                              value={
                                _.isNil(borehole.bore_inc)?
                                '': borehole.bore_inc
                              }
                              onChange={(e)=>{
                                this.updateChange(
                                  'bore_inc',
                                  e.target.value === ''?
                                  null: _.toNumber(e.target.value)
                                )
                              }}
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="off"
                              spellCheck="false"/>
                          </Form.Field>
                          <Form.Field
                            required
                          >
                            <label>{t('bore_inc_dir')}</label>
                            <Input
                              type='number'
                              value={
                                _.isNil(borehole.bore_inc_dir)?
                                '': borehole.bore_inc_dir
                              }
                              onChange={(e)=>{
                                this.updateChange(
                                  'bore_inc_dir',
                                  e.target.value === ''?
                                  null: _.toNumber(e.target.value)
                                )
                              }}
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="off"
                              spellCheck="false"/>
                          </Form.Field>
                          <Form.Field
                            required
                          >
                            <label>{t('qt_bore_inc_dir')}</label>
                            <DomainDropdown
                              schema='custom.qt_bore_inc_dir'
                              selected={borehole.custom.qt_bore_inc_dir}
                              onSelected={(selected)=>{
                                this.updateChange(
                                  'custom.qt_bore_inc_dir', selected.id, false)
                              }}/>
                          </Form.Field>
                        </Form.Group>
                      </Form>
                    </Segment>
                    <Segment>
                      <Form
                        error
                        size={size}
                        autoComplete="off">
                        <Form.Group widths='equal'>
                          <Form.Field
                            required
                          >
                            <label>{t('length')}</label>
                            <Input
                              type='number'
                              value={
                                _.isNil(borehole.length)?
                                '': borehole.length
                              }
                              onChange={(e)=>{
                                this.updateChange(
                                  'length',
                                  e.target.value === ''?
                                  null: _.toNumber(e.target.value)
                                )
                              }}
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="off"
                              spellCheck="false"/>
                          </Form.Field>
                          <Form.Field
                            required
                          >
                            <label>{t('qt_length')}</label>
                            <DomainDropdown
                              schema='custom.qt_length'
                              selected={borehole.custom.qt_length}
                              onSelected={(selected)=>{
                                this.updateChange(
                                  'custom.qt_length', selected.id, false
                                )
                              }}/>
                          </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                          <Form.Field
                            required
                          >
                            <label>{t('top_bedrock')}</label>
                            <Input
                              type='number'
                              value={
                                _.isNil(borehole.extended.top_bedrock)?
                                '': borehole.extended.top_bedrock
                              }
                              onChange={(e)=>{
                                this.updateChange(
                                  'extended.top_bedrock',
                                  e.target.value === ''?
                                  null: _.toNumber(e.target.value)
                                )
                              }}
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="off"
                              spellCheck="false"/>
                          </Form.Field>
                          <Form.Field
                            required
                          >
                            <label>{t('qt_top_bedrock')}</label>
                            <DomainDropdown
                              schema='custom.qt_top_bedrock'
                              selected={borehole.custom.qt_top_bedrock}
                              onSelected={(selected)=>{
                                this.updateChange(
                                  'custom.qt_top_bedrock',
                                  selected.id,
                                  false
                                )
                              }}/>
                          </Form.Field>
                        </Form.Group>
                        <Form.Field
                          required
                        >
                          <label>{t('groundwater')}</label>
                          <Form.Group inline>
                            <Form.Radio
                              label={t('common:yes')}
                              checked={borehole.extended.groundwater === true}
                              onChange={(e, d)=>{
                                this.updateChange(
                                  'extended.groundwater', true, false)
                              }}
                            />
                            <Form.Radio
                              label={t('common:no')}
                              checked={borehole.extended.groundwater === false}
                              onChange={(e, d)=>{
                                this.updateChange(
                                  'extended.groundwater', false, false)
                              }}
                            />
                            <Form.Radio
                              label={t('common:np')}
                              checked={borehole.extended.groundwater === null}
                              onChange={(e, d)=>{
                                this.updateChange(
                                  'extended.groundwater', null, false)
                              }}
                            />
                          </Form.Group>
                        </Form.Field>
                        <Form.Field
                          required
                        >
                          <label>{t('lit_pet_top_bedrock')}</label>
                          <DomainDropdown
                            schema='custom.lit_pet_top_bedrock'
                            selected={borehole.custom.lit_pet_top_bedrock}
                            onSelected={(selected)=>{
                              this.updateChange(
                                'custom.lit_pet_top_bedrock',
                                selected.id,
                                false
                              )
                            }}/>
                        </Form.Field>
                        <Form.Field
                          required
                        >
                          <label>{t('lit_str_top_bedrock')}</label>
                          <DomainDropdown
                            schema='custom.lit_str_top_bedrock'
                            selected={borehole.custom.lit_str_top_bedrock}
                            onSelected={(selected)=>{
                              this.updateChange(
                                'custom.lit_str_top_bedrock',
                                selected.id,
                                false
                              )
                            }}/>
                        </Form.Field>
                        <Form.Field
                          required
                        >
                          <label>{t('chro_str_top_bedrock')}</label>
                          <DomainDropdown
                            schema='custom.chro_str_top_bedrock'
                            selected={borehole.custom.chro_str_top_bedrock}
                            onSelected={(selected)=>{
                              this.updateChange(
                                'custom.chro_str_top_bedrock',
                                selected.id,
                                false
                              )
                            }}/>
                        </Form.Field>
                      </Form>
                    </Segment>
                  </div>
                )}
              />

              <Route
                exact={true}
                path={process.env.PUBLIC_URL + "/editor/:id/stratigraphy"}
                render={()=>(
                  <div style={{
                    flex: "1 1 0%",
                    padding: "1em",
                    overflowY: "hidden"
                  }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                      }}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row'
                        }}
                      >
                        <Button
                          content={t('meta_stratigraphy')}
                          icon='add'
                          onClick={()=>{
                            createStratigraphy(
                              borehole.id
                            ).then(
                              (response)=>{
                                if(response.data.success){
                                  this.setState({
                                    stratigraphy_id: response.data.id
                                  }, ()=>{
                                    this.loadOrCreate(borehole.id);
                                  });
                                }
                              }
                            ).catch(function (error) {
                              console.log(error);
                            });
                          }}
                          secondary
                          size='small'
                        />
                        {
                          _.isArray(borehole.stratigraphy)? 
                            borehole.stratigraphy.map((stratigraphy, sx)=>(
                              <div
                                key={'str-tab-'+sx}
                                onClick={()=>{
                                  this.setState({
                                    stratigraphy_id: stratigraphy.id
                                  })
                                }}
                                style={{
                                  margin: '0px 1em',
                                  cursor: 'pointer',
                                  borderBottom: 
                                    this.state.stratigraphy_id === stratigraphy.id?
                                      '2px solid black': '2px solid transparent',
                                  padding: '0px 0.5em 3px 0.5em'
                                }}
                              >
                                <span
                                  style={{
                                    fontWeight: 'bold'
                                  }}
                                >
                                  <DomainText
                                    schema={'layer_kind'}
                                    id={stratigraphy.kind}
                                  />
                                </span>
                                <br/>
                                <span
                                  style={{
                                    color: '#787878',
                                    fontSize: '0.8em'
                                  }}
                                >
                                  <DateText
                                    date={stratigraphy.date}
                                  />
                                </span>
                              </div>
                            )): null
                        }
                      </div>
                      <StratigraphyFormContainer
                        borehole={borehole.id}
                        kind={this.state.layer_kind}
                        id={this.state.stratigraphy_id}
                        onUpdated={(id, attribute, value)=>{
                          const bh = {
                            ...borehole
                          };
                          for (var i = 0; i < bh.stratigraphy.length; i++) {
                            if(id === bh.stratigraphy[i].id){
                              bh.stratigraphy[i][attribute] = value;
                              break;
                            }
                          }
                          this.props.updateBorehole(bh);
                        }}
                        onDeleted={(id)=>{
                          const bh = {
                            ...borehole
                          };
                          const strt = [];
                          for (var i = 0; i < bh.stratigraphy.length; i++) {
                            if(id !== bh.stratigraphy[i].id){
                              strt.push(bh.stratigraphy[i]);
                            }
                          }
                          bh.stratigraphy = strt;
                          this.props.updateBorehole(bh);
                        }}
                      />
                    </div>
                  </div>
                )}
              />
          </Switch>
          <Progress
            progress
            percent={borehole.percentage}
            size='medium'
            color={
              borehole.percentage === 100? 'green': 'black'
            }/>
        </Dimmer.Dimmable>
    )
  }
}

BoreholeForm.propTypes = {
  id: PropTypes.number
}

BoreholeForm.defaultProps = {
  id: undefined
}

const mapStateToProps = (state, ownProps) => {
  return {
    borehole: state.core_borehole,
    domains: state.core_domain_list,
    cantons: state.core_canton_list.data,
    municipalities: state.core_municipality_list.data
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    loadBorehole: (id) => {
      return dispatch(loadBorehole(id))
    },
    updateBorehole: (data) => {
      return dispatch(updateBorehole(data))
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    translate(['borehole_form', 'common'])(BoreholeForm)
  )
);