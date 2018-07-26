import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import _ from 'lodash'
import moment from 'moment'

import {
  getBorehole,
  checkBorehole,
  createBorehole,
  patchBorehole,
  createStratigraphy,
  createLayer,
  getLayers,
  deleteLayer
} from '@ist-supsi/bmsjs'

import DomainDropdown from '../domain/dropdown/domainDropdown'
import MunicipalityDropdown from '../municipality/dropdown/municipalityDropdown'
import StartigraphyTable from '../../table/stratigraphyTable'
import CantonDropdown from '../cantons/dropdown/cantonDropdown'
import DateField from '../dateField'
import StratigraphyForm from '../stratigraphy/stratigraphyForm'
import LayerForm from '../layer/layerForm'
import LayersList from '../../layers/layerList'

import {
  Tab,
  Form,
  Input,
  Segment,
  Message,
  Dimmer,
  Loader,
  Divider,
  // Button,
  Icon,
  Menu
} from 'semantic-ui-react'

class BoreholeForm extends React.Component {

  constructor(props) {
    super(props)
    this.checkattribute = false
    this.updateAttributeDelay = {}
    this.empty = {
      id: props.hasOwnProperty('id')? props.id: null,
      kind: null,
      restriction: null,
      restriction_until: null,
      location_x: '',
      location_y: '',
      srs: null,
      qt_location: null,
      elevation_z: '',
      hrs: null,
      qt_elevation: null,
      drilling_date: null,
      bore_inc: null,
      bore_inc_dir: null,
      length: null,
      extended: {
        original_name: '',
        method: null,
        purpose: null,
        status: null,
        top_bedrock: null,
        groundwater: null
      },
      custom: {
        public_name: '',
        project_name: '',
        country: 'Switzerland',
        canton: null,
        city: null,
        address: '',
        landuse: null,
        cuttings: null,
        drill_diameter: '',
        qt_bore_inc_dir: null,
        qt_length: null,
        qt_top_bedrock: null,
        lit_pet_top_bedrock: [],
        lit_str_top_bedrock: [],
        chro_str_top_bedrock: []
      }
    }
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
      layerUpdated: null,
      borehole: {
        ...this.empty
      }
    }
  }

  componentDidMount(){
    const {
      id
    } = this.props
    if(!_.isNil(id)) this.loadOrCreate(id)
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.loadOrCreate(this.props.id);
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
        })
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
              })
            }
          }).catch(function (error) {
            console.log(error)
          })
        }, 100)
      })
    }
  }

  check(attribute, value){
    // Check for uniqueness and patch
    const state = {
      ...this.state,
      patch_fetch: true,
      borehole: {
        ...this.state.borehole
      }
    }
    _.set(state.borehole, attribute, value)
    state[attribute+"_fetch"] = true

    const self = this
    this.setState(state, () => {
      if(self.checkattribute){
        clearTimeout(self.checkattribute);
        self.checkattribute = false
      }
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
                self.state.borehole.id,
                attribute,
                value
              ).then(function(response) {
                if(response.data.success){
                  self.setState({
                    patch_fetch: false
                  })
                }
              }).catch(function (error) {
                console.error(error)
              })
            }
          }
        }).catch(function (error) {
          console.error(error)
        })
      }, 250)
    })
  }

  updateChange(attribute, value, to = true){
    const state = {
      ...this.state,
      patch_fetch: true,
      borehole: {
        ...this.state.borehole
      }
    }
    _.set(state.borehole, attribute, value)
    const self = this
    this.setState(state, () => {
      if(
        self.updateAttributeDelay.hasOwnProperty(attribute) &&
        self.updateAttributeDelay[attribute]
      ){
        clearTimeout(self.updateAttributeDelay[attribute]);
        self.updateAttributeDelay[attribute] = false
      }
      self.updateAttributeDelay[attribute] = setTimeout(function(){
        patchBorehole(
          self.state.borehole.id,
          attribute,
          value
        ).then(function(response) {
          if(response.data.success){
            self.setState({
              patch_fetch: false
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
    } = this.props
    const size = null // 'small'

    return (
      <Dimmer.Dimmable
        as={Segment}
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
        <Tab
          menu={{
            secondary: true,
            pointing: true
          }}
          panes={[
            {
              menuItem: t('meta_location'),
              render: () => null
            },
            {
              menuItem: t('meta_borehole'),
              render: () => null
            },
            {
              menuItem: t('form_admin'),
              render: () => null
            },
            {
              menuItem: t('meta_stratigraphy'),
              render: () => null
            }
          ]}
          activeIndex={this.state.tab}
          onTabChange={(e, d, i) => {
            this.setState({
                tab: d.activeIndex
            })
          }}/>
          {(()=>{
            if(this.state.tab===0){
              return (
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
                      <Form.Field>
                        <label>{t('original_name')}</label>
                        <Input
                          loading={this.state['extended.original_name_fetch']}
                          iconPosition='left'
                          icon={
                            this.state[
                              'extended.original_name_check'] === true
                            && this.state[
                              'extended.original_name_fetch'] === false?
                            'check': 'delete'
                          }
                          onChange={(e)=>{
                            this.check(
                              'extended.original_name',
                              e.target.value
                            )
                          }}
                          value={this.state.borehole.extended.original_name}
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="off"
                          spellCheck="false"/>
                      </Form.Field>
                      {
                        this.state.original_name_check === false
                        && this.state.original_name_fetch === false?
                          <Message
                              error
                              size={size}
                              content={t('duplicate')}
                            />: null
                      }
                      <Form.Group widths='equal'>
                        <Form.Field>
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
                            value={this.state.borehole.custom.public_name}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"/>
                        </Form.Field>
                        <Form.Field>
                          <label>{t('kind')}</label>
                          <DomainDropdown
                            schema='kind'
                            selected={this.state.borehole.kind}
                            onSelected={(selected)=>{
                              this.updateChange('kind', selected.id, false)
                            }}/>
                        </Form.Field>
                      </Form.Group>
                      <Form.Field>
                        <label>{t('project_name')}</label>
                        <Input
                          onChange={(e)=>{
                            this.updateChange(
                              'custom.project_name', e.target.value
                            )
                          }}
                          value={this.state.borehole.custom.project_name}
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="off"
                          spellCheck="false"/>
                      </Form.Field>
                    </Form>
                  </Segment>

                  <Segment>
                    <Form
                      size={size}>
                      <Form.Group widths='equal'>
                        <Form.Field>
                          <label>{t('restriction')}</label>
                          <DomainDropdown
                            schema='restriction'
                            selected={this.state.borehole.restriction}
                            onSelected={(selected)=>{
                              this.updateChange('restriction', selected.id, false)
                            }}/>
                        </Form.Field>
                        <Form.Field
                          error={
                            _.isString(this.state.borehole.restriction_until) &&
                            this.state.borehole.restriction_until !== '' &&
                            !moment(this.state.borehole.restriction_until).isValid()
                          }>
                          <label>{t('restriction_until')} ({t('date_format')})</label>
                          <DateField
                            date={this.state.borehole.restriction_until}
                            onChange={(selected)=>{
                              this.updateChange(
                                'restriction_until', selected, false
                              )
                            }} />
                        </Form.Field>
                      </Form.Group>
                    </Form>
                  </Segment>

                  <Segment>
                    <Form size={size}>
                      <Form.Group widths='equal'>
                        <Form.Field>
                          <label>{t('location_x')}</label>
                          <Input
                            type='number'
                            value={
                              _.isNil(this.state.borehole.location_x)?
                              '': this.state.borehole.location_x
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
                        <Form.Field>
                          <label>{t('location_y')}</label>
                          <Input
                            type='number'
                            value={
                              _.isNil(this.state.borehole.location_y)?
                              '': this.state.borehole.location_y
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
                        <Form.Field>
                          <label>{t('srs')}</label>
                          <DomainDropdown
                            schema='srs'
                            selected={this.state.borehole.srs}
                            onSelected={(selected)=>{
                              this.updateChange('srs', selected.id, false)
                            }}/>
                        </Form.Field>
                        <Form.Field>
                          <label>{t('qt_location')}</label>
                          <DomainDropdown
                            schema='qt_location'
                            selected={this.state.borehole.qt_location}
                            onSelected={(selected)=>{
                              this.updateChange('qt_location', selected.id, false)
                            }}/>
                        </Form.Field>
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Field>
                          <label>{t('elevation_z')}</label>
                          <Input
                            type='number'
                            value={
                              _.isNil(this.state.borehole.elevation_z)?
                              '': this.state.borehole.elevation_z
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
                        <Form.Field>
                          <label>{t('hrs')}</label>
                          <DomainDropdown
                            schema='hrs'
                            selected={this.state.borehole.hrs}
                            onSelected={(selected)=>{
                              this.updateChange('hrs', selected.id, false)
                            }}/>
                        </Form.Field>
                        <Form.Field>
                          <label>{t('qt_elevation')}</label>
                          <DomainDropdown
                            schema='qt_elevation'
                            selected={this.state.borehole.qt_elevation}
                            onSelected={(selected)=>{
                              this.updateChange('qt_elevation', selected.id, false)
                            }}/>
                        </Form.Field>
                      </Form.Group>
                    </Form>
                  </Segment>

                  <Segment>
                    <Form
                      size={size}>
                      <Form.Group widths='equal'>
                        <Form.Field>
                          <label>{t('country')}</label>
                          <Input
                            value={'Switzerland'}/>
                        </Form.Field>
                        <Form.Field>
                          <label>{t('canton')}</label>
                          <CantonDropdown
                            selected={this.state.borehole.custom.canton}
                            onSelected={(selected)=>{
                              if(this.state.borehole.custom.city !== null){
                                this.updateChange(
                                  'custom.city', null, false
                                )
                              }
                              this.updateChange(
                                'custom.canton', selected.id, false
                              )
                            }}/>
                        </Form.Field>
                        <Form.Field>
                          <label>{t('city')}</label>
                          <MunicipalityDropdown
                            disabled={this.state.borehole.custom.canton===null}
                            canton={this.state.borehole.custom.canton}
                            selected={this.state.borehole.custom.city}
                            onSelected={(selected)=>{
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
                            value={this.state.borehole.custom.address}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"/>
                        </Form.Field>
                        <Form.Field>
                          <label>{t('landuse')}</label>
                          <DomainDropdown
                            schema='custom.landuse'
                            selected={this.state.borehole.custom.landuse}
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
              )
            } else if (this.state.tab === 1) {
              return (
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
                        <Form.Field>
                          <label>{t('method')}</label>
                          <DomainDropdown
                            schema='extended.method'
                            selected={this.state.borehole.extended.method}
                            onSelected={(selected)=>{
                              this.updateChange(
                                'extended.method', selected.id, false)
                            }}/>
                        </Form.Field>
                        <Form.Field
                          error={
                            _.isString(this.state.borehole.drilling_date) &&
                            this.state.borehole.drilling_date !== '' &&
                            !moment(this.state.borehole.drilling_date).isValid()
                          }>
                          <label>{t('drilling_date')} ({t('date_format')})</label>
                          <DateField
                            date={this.state.borehole.drilling_date}
                            onChange={(selected)=>{
                              this.updateChange(
                                'drilling_date', selected, false
                              )
                            }} />
                        </Form.Field>
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Field>
                          <label>{t('cuttings')}</label>
                          <DomainDropdown
                            schema='custom.cuttings'
                            selected={this.state.borehole.custom.cuttings}
                            onSelected={(selected)=>{
                              this.updateChange(
                                'custom.cuttings', selected.id, false)
                            }}/>
                        </Form.Field>
                        <Form.Field>
                          <label>{t('purpose')}</label>
                          <DomainDropdown
                            schema='extended.purpose'
                            selected={this.state.borehole.extended.purpose}
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
                              _.isNil(this.state.borehole.custom.drill_diameter)?
                              '': this.state.borehole.custom.drill_diameter
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
                        <Form.Field>
                          <label>{t('status')}</label>
                          <DomainDropdown
                            schema='extended.status'
                            selected={this.state.borehole.extended.status}
                            onSelected={(selected)=>{
                              this.updateChange(
                                'extended.status', selected.id, false)
                            }}/>
                        </Form.Field>
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Field>
                          <label>{t('bore_inc')}</label>
                          <Input
                            type='number'
                            value={
                              _.isNil(this.state.borehole.bore_inc)?
                              '': this.state.borehole.bore_inc
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
                        <Form.Field>
                          <label>{t('bore_inc_dir')}</label>
                          <Input
                            type='number'
                            value={
                              _.isNil(this.state.borehole.bore_inc_dir)?
                              '': this.state.borehole.bore_inc_dir
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
                        <Form.Field>
                          <label>{t('qt_bore_inc_dir')}</label>
                          <DomainDropdown
                            schema='custom.qt_bore_inc_dir'
                            selected={this.state.borehole.custom.qt_bore_inc_dir}
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
                        <Form.Field>
                          <label>{t('length')}</label>
                          <Input
                            type='number'
                            value={
                              _.isNil(this.state.borehole.length)?
                              '': this.state.borehole.length
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
                        <Form.Field>
                          <label>{t('qt_length')}</label>
                          <DomainDropdown
                            schema='custom.qt_length'
                            selected={this.state.borehole.custom.qt_length}
                            onSelected={(selected)=>{
                              this.updateChange(
                                'custom.qt_length', selected.id, false
                              )
                            }}/>
                        </Form.Field>
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Field>
                          <label>{t('top_bedrock')}</label>
                          <Input
                            type='number'
                            value={
                              _.isNil(this.state.borehole.extended.top_bedrock)?
                              '': this.state.borehole.extended.top_bedrock
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
                        <Form.Field>
                          <label>{t('qt_top_bedrock')}</label>
                          <DomainDropdown
                            schema='custom.qt_top_bedrock'
                            selected={this.state.borehole.custom.qt_top_bedrock}
                            onSelected={(selected)=>{
                              this.updateChange(
                                'custom.qt_top_bedrock', selected.id, false)
                            }}/>
                        </Form.Field>
                      </Form.Group>
                      <Form.Field>
                        <label>{t('groundwater')}</label>
                        <Form.Group inline>
                          <Form.Radio
                            label='Yes'
                            checked={this.state.borehole.extended.groundwater === true}
                            onChange={(e, d)=>{
                              this.updateChange(
                                'extended.groundwater', true, false)
                            }}
                          />
                          <Form.Radio
                            label='No'
                            checked={this.state.borehole.extended.groundwater === false}
                            onChange={(e, d)=>{
                              this.updateChange(
                                'extended.groundwater', false, false)
                            }}
                          />
                        </Form.Group>
                      </Form.Field>
                      <Form.Field>
                        <label>{t('lit_pet_top_bedrock')}</label>
                        <DomainDropdown
                          schema='custom.lit_pet_top_bedrock'
                          selected={this.state.borehole.custom.lit_pet_top_bedrock}
                          multiple={true}
                          search={true}
                          onSelected={(selected)=>{
                            this.updateChange(
                              'custom.lit_pet_top_bedrock',
                              selected.map(lptb=>lptb.id),
                              false
                            )
                          }}/>
                      </Form.Field>
                      <Form.Field>
                        <label>{t('lit_str_top_bedrock')}</label>
                        <DomainDropdown
                          schema='custom.lit_str_top_bedrock'
                          selected={
                            this.state.borehole.custom.lit_str_top_bedrock
                          }
                          multiple={true}
                          search={true}
                          onSelected={(selected)=>{
                            this.updateChange(
                              'custom.lit_str_top_bedrock',
                              selected.map(lptb=>lptb.id),
                              false
                            )
                          }}/>
                      </Form.Field>
                      <Form.Field>
                        <label>{t('chro_str_top_bedrock')}</label>
                        <DomainDropdown
                          schema='custom.chro_str_top_bedrock'
                          selected={
                            this.state.borehole.custom.chro_str_top_bedrock
                          }
                          multiple={true}
                          search={true}
                          onSelected={(selected)=>{
                            this.updateChange(
                              'custom.chro_str_top_bedrock',
                              selected.map(lptb=>lptb.id),
                              false
                            )
                          }}/>
                      </Form.Field>
                    </Form>
                  </Segment>
                </div>
              )
            } else if (this.state.tab === 3) {
              return (
                <div style={{
                    flex: "1 1 0%",
                    padding: "1em",
                    overflowY: "hidden"
                  }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      height: '100%'
                    }}>
                    <div style={{
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flex: '0.3 1 0%',
                      flexDirection: 'column',
                      // maxWidth: '400px',
                      padding: '1em'
                    }}>
                      <div>
                        <Form
                          error
                          autoComplete="off">
                          <Form.Group widths='equal'>
                            <Form.Field>
                              <DomainDropdown
                                schema='layer_kind'
                                selected={
                                  this.state.layer_kind
                                }
                                onSelected={(selected)=>{
                                  this.setState({
                                    layer_kind: selected.id
                                  })
                                }}/>
                            </Form.Field>
                            <Form.Button
                              fluid
                              disabled={
                                this.state.layer_kind === null
                              }
                              content={t('create')}
                              secondary
                              onClick={()=>{
                                createStratigraphy(
                                  this.props.id,
                                  this.state.layer_kind
                                ).then(
                                  function(response) {
                                    if(response.data.success){
                                      // let bh = response.data.data
                                      this.setState({
                                        layer_kind: null,
                                        stratigraphy_id: response.data.id
                                      })
                                    }
                                }.bind(this)).catch(function (error) {
                                  console.log(error)
                                })
                              }}/>
                          </Form.Group>
                        </Form>
                      </div>
                      <div style={{
                          flex: "0.6 1 0%",
                          overflowY: "auto"
                        }}>
                        <StartigraphyTable
                          filter={{
                            borehole: this.state.borehole.id
                          }}
                          onSelected={selected => {
                            this.setState({
                              stratigraphy_id: selected.id,
                              layers: [],
                              layer: null
                            }, () => {
                              getLayers(selected.id).then(function(response) {
                                if(response.data.success){
                                  this.setState({
                                    layers: response.data.data
                                  })
                                }
                              }.bind(this)).catch(function (error) {
                                console.log(error)
                              })
                            })
                          }}/>
                      </div>
                    </div>
                    {
                      this.state.stratigraphy_id === null?
                      <div style={{
                          flex: "0.7 1 0%",
                          padding: "1em",
                          overflowY: "auto"
                        }}>
                        Stratigraphy not selected
                      </div>: <Segment style={{
                          flex: "0.7 1 0%",
                          padding: "1em",
                          overflowY: "auto",
                          display: "flex",
                          flexDirection: "column"
                        }}>
                        <StratigraphyForm
                          id={this.state.stratigraphy_id}/>
                        <Divider/>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: '100%'
                          }}>
                          <div style={{
                            width: '250px'
                          }}>
                            <Menu secondary>
                              <Menu.Item
                                onClick={(e) => {
                                  createLayer(
                                    this.state.stratigraphy_id
                                  ).then(
                                    function(response) {
                                      if(response.data.success){
                                        let layer_id = response.data.id
                                        getLayers(
                                          this.state.stratigraphy_id
                                        ).then(function(response) {
                                          if(response.data.success){
                                            this.setState({
                                              layers: response.data.data,
                                              layer: layer_id
                                            })
                                          }
                                        }.bind(this)).catch(function (error) {
                                          console.log(error)
                                        })
                                      }
                                    }.bind(this)
                                  ).catch(function (error) {
                                    console.log(error)
                                  })
                                }}>
                                <Icon name='add' />
                                Add layer
                              </Menu.Item>
                            </Menu>
                            <LayersList
                              // id={this.state.stratigraphy_id}
                              onSelected={layer => {
                                this.setState({
                                  layer: layer.id
                                })
                              }}
                              onDelete={layer => {
                                deleteLayer(
                                  layer.id
                                ).then(
                                  function(response) {
                                    if(response.data.success){
                                      getLayers(
                                        this.state.stratigraphy_id
                                      ).then(function(response) {
                                        if(response.data.success){
                                          this.setState({
                                            layers: response.data.data,
                                            layer: null
                                          })
                                        }
                                      }.bind(this)).catch(function (error) {
                                        console.log(error)
                                      })
                                    }
                                }.bind(this)).catch(function (error) {
                                  console.log(error)
                                })
                              }}
                              selected={this.state.layer}
                              layers={this.state.layers}
                              update={this.state.layerUpdated}/>
                          </div>
                          <Segment style={{
                            flex: '1 1 0%',
                            marginLeft: '1em'
                          }}>
                            {
                              this.state.layer !== null?
                              <LayerForm
                                id={this.state.layer}
                                onUpdated={(id, attribute, value) => {
                                  const layers = this.state.layers
                                  for (var i = 0; i < layers.length; i++) {
                                    if(id === layers[i].id){
                                      layers[i][attribute] = value
                                      break
                                    }
                                  }
                                  this.setState({
                                    layers: layers
                                  })
                                }}/>: null
                            }
                          </Segment>
                        </div>
                      </Segment>
                    }
                  </div>
                </div>
              )
            }
          })()}
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

export default translate('borehole_form')(BoreholeForm)
