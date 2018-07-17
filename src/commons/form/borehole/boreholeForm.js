import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import _ from 'lodash'
import moment from 'moment'

import {
  checkBorehole,
  createBorehole,
  patchBorehole
} from '@ist-supsi/bmsjs'

import DomainDropdown from '../domain/dropdown/domainDropdown'
import MunicipalityDropdown from '../municipality/dropdown/municipalityDropdown'
import CantonDropdown from '../cantons/dropdown/cantonDropdown'
import DateField from '../dateField'

import {
  Tab,
  Form,
  Input,
  Segment,
  Icon,
  Message
} from 'semantic-ui-react'

class BoreholeForm extends React.Component {

  constructor(props) {
    super(props)
    this.checkattribute = false
    this.updateAttributeDelay = false
    this.state = {
      tab: 0,
      patch_fetch: false,
      creation_fetch: false,
      "extended.original_name_check": true,
      "extended.original_name_fetch": false,
      "custom.public_name_check": true,
      "custom.public_name_fetch": false,
      borehole: {
        id: props.hasOwnProperty('id')? props.id: null,
        kind: null,
        restriction: null,
        restriction_date: null,
        location_x: '',
        location_y: '',
        srs: null,
        qt_location: null,
        elevation_z: '',
        hrs: null,
        qt_elevation: null,

        extended: {
          original_name: '',
        },

        // Custom
        custom: {
          public_name: '',
          project_name: '',
          country: 'Switzerland',
          canton: null,
          city: null,
          address: '',
          landuse: null
        },

        // Metadata Borehole
        drilling_method: null,
        drilling_end: null,
        cuttings: null,
        purpose: null,
      }
    }
  }

  componentDidMount(){
    const {
      id
    } = this.props
    if(_.isInteger(id)){
      // request to edit a borehole
      console.log("load borehole details")
    }else{
      // request the creation of a new borehole if id is not given
      const self = this;
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
        }, 500)
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
      if(self.updateAttributeDelay){
        clearTimeout(self.updateAttributeDelay);
        self.updateAttributeDelay = false
      }
      self.updateAttributeDelay = setTimeout(function(){
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
    const size = 'small'
    return (
      this.state.creation_fetch === true?
      <div style={{
          flex: "1 1 0%",
          padding: "1em"
        }}>
        <Icon loading name='asterisk' /> {t('creation_fetch')}
      </div>: <div style={{
          flex: "1 1 0%",
          display: "flex",
          flexDirection: "column"
        }}>
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
                    overflowY: "auto"
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
                            _.isString(this.state.borehole.restriction_date) &&
                            this.state.borehole.restriction_date !== '' &&
                            !moment(this.state.borehole.restriction_date).isValid()
                          }>
                          <label>{t('restriction_date')} ({t('date_format')})</label>
                          <DateField
                            date={this.state.borehole.restriction_date}
                            onChange={(selected)=>{
                              this.updateChange(
                                'restriction_date', selected, false
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
                            selected={this.state.srs}
                            onSelected={(selected)=>{
                              this.updateChange('srs', selected.id, false)
                            }}/>
                        </Form.Field>
                        <Form.Field>
                          <label>{t('qt_location')}</label>
                          <DomainDropdown
                            schema='qt_location'
                            selected={this.state.qt_location}
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
                            selected={this.state.hrs}
                            onSelected={(selected)=>{
                              this.updateChange('hrs', selected.id, false)
                            }}/>
                        </Form.Field>
                        <Form.Field>
                          <label>{t('qt_elevation')}</label>
                          <DomainDropdown
                            schema='qt_elevation'
                            selected={this.state.qt_elevation}
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
                            value={this.state.borehole.custom.country}/>
                        </Form.Field>
                        <Form.Field>
                          <label>{t('canton')}</label>
                          <CantonDropdown
                            selected={this.state.borehole.custom.canton}
                            onSelected={(selected)=>{
                              this.updateChange('custom.canton', selected.id, false)
                            }}/>
                        </Form.Field>
                        <Form.Field>
                          <label>{t('city')}</label>
                          <MunicipalityDropdown
                            disabled={this.state.borehole.canton===null}
                            canton={this.state.borehole.canton}
                            selected={this.state.borehole.city}
                            onSelected={(selected)=>{
                              console.log('city', selected)
                            }}/>
                        </Form.Field>
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Field>
                          <label>{t('address')}</label>
                          <Input
                            onChange={(e)=>{
                              this.updateChange(
                                'address', e.target.value
                              )
                            }}
                            value={this.state.borehole.address}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"/>
                        </Form.Field>
                        <Form.Field>
                          <label>{t('landuse')}</label>
                          <DomainDropdown
                            schema='landuse'
                            selected={this.state.borehole.kind}
                            onSelected={(selected)=>{
                              this.updateChange('landuse', selected.id, false)
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
                          <label>{t('drilling_method')}</label>
                          <DomainDropdown
                            schema='drilling_method'
                            selected={this.state.borehole.drilling_method}
                            onSelected={(selected)=>{
                              this.updateChange(
                                'drilling_method', selected.id, false)
                            }}/>
                        </Form.Field>
                        <Form.Field
                          error={
                            _.isString(this.state.borehole.drilling_end) &&
                            this.state.borehole.drilling_end !== '' &&
                            !moment(this.state.borehole.drilling_end).isValid()
                          }>
                          <label>{t('drilling_end')} ({t('date_format')})</label>
                          <DateField
                            date={this.state.borehole.drilling_end}
                            onChange={(selected)=>{
                              this.setState({
                                borehole: {
                                  ...this.state.borehole,
                                  drilling_end: selected
                                }
                              })
                            }} />
                        </Form.Field>
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Field>
                          <label>{t('cuttings')}</label>
                          <DomainDropdown
                            schema='cuttings'
                            selected={this.state.borehole.cuttings}
                            onSelected={(selected)=>{
                              this.updateChange(
                                'cuttings', selected.id, false)
                            }}/>
                        </Form.Field>
                        <Form.Field>
                          <label>{t('purpose')}</label>
                          <DomainDropdown
                            schema='purpose'
                            selected={this.state.borehole.purpose}
                            onSelected={(selected)=>{
                              this.updateChange(
                                'purpose', selected.id, false)
                            }}/>
                        </Form.Field>
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Field>
                          <label>{t('drill_diameter')}</label>
                          <Input
                            type='number'
                            onChange={(e)=>{
                              this.updateChange(
                                'drill_diameter',
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
                          <label>{t('borhole_status')}</label>
                          <DomainDropdown
                            schema='borhole_status'
                            selected={this.state.borehole.kind}
                            onSelected={(selected)=>{
                              this.updateChange('borhole_status', selected.id, false)
                            }}/>
                        </Form.Field>
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Field>
                          <label>{t('inclination')}</label>
                          <Input
                            type='number'
                            onChange={(e)=>{
                              this.updateChange(
                                'inclination',
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
                          <label>{t('inclination_direction')}</label>
                          <Input
                            type='number'
                            onChange={(e)=>{
                              this.updateChange(
                                'inclination_direction',
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
                          <label>{t('qt_inclination_direction')}</label>
                          <DomainDropdown
                            schema='qt_inclination_direction'
                            selected={this.state.borehole.kind}
                            onSelected={(selected)=>{
                              this.updateChange(
                                'qt_inclination_direction', selected.id, false)
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
                          <label>{t('depth')}</label>
                          <Input
                            type='number'
                            onChange={(e)=>{
                              this.updateChange(
                                'depth',
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
                          <label>{t('qt_depth')}</label>
                          <DomainDropdown
                            schema='qt_depth'
                            selected={this.state.borehole.kind}
                            onSelected={(selected)=>{
                              this.updateChange('qt_depth', selected.id, false)
                            }}/>
                        </Form.Field>
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Field>
                          <label>{t('top_bedrock')}</label>
                          <Input
                            type='number'
                            onChange={(e)=>{
                              this.updateChange(
                                'top_bedrock',
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
                            schema='qt_top_bedrock'
                            selected={this.state.borehole.kind}
                            onSelected={(selected)=>{
                              this.updateChange(
                                'qt_top_bedrock', selected.id, false)
                            }}/>
                        </Form.Field>
                      </Form.Group>
                      <Form.Field>
                        <label>{t('groundwater')}</label>
                        <Form.Group inline>
                          <Form.Radio
                            label='Yes'
                            value={true}
                            checked={true}
                            onChange={()=>{

                            }}
                          />
                          <Form.Radio
                            label='No'
                            value={false}
                            checked={false}
                            onChange={()=>{

                            }}
                          />
                        </Form.Group>
                      </Form.Field>
                      <Form.Field>
                        <label>{t('lit_pet_top_bedrock')}</label>
                        <DomainDropdown
                          schema='lit_pet_top_bedrock'
                          //selected={this.state.borehole.lit_pet_top_bedrock},
                          multiple={true}
                          search={true}
                          onSelected={(selected)=>{
                            // this.updateChange(
                            //   'lit_pet_top_bedrock', selected.id, false)
                          }}/>
                      </Form.Field>
                      <Form.Field>
                        <label>{t('lit_str_top_bedrock')}</label>
                        <DomainDropdown
                          schema='lit_str_top_bedrock'
                          //selected={this.state.borehole.lit_pet_top_bedrock},
                          multiple={true}
                          search={true}
                          onSelected={(selected)=>{
                            // this.updateChange(
                            //   'lit_pet_top_bedrock', selected.id, false)
                          }}/>
                      </Form.Field>
                      <Form.Field>
                        <label>{t('chro_str_top_bedrock')}</label>
                        <DomainDropdown
                          schema='chro_str_top_bedrock'
                          //selected={this.state.borehole.lit_pet_top_bedrock},
                          multiple={true}
                          search={true}
                          onSelected={(selected)=>{
                            // this.updateChange(
                            //   'lit_pet_top_bedrock', selected.id, false)
                          }}/>
                      </Form.Field>
                    </Form>
                  </Segment>
                </div>
              )
            }
          })()}
        </div>
    )
  }
}

BoreholeForm.propTypes = {
  id: PropTypes.string
}

BoreholeForm.defaultProps = {
  id: undefined
}

export default translate('borehole_form')(BoreholeForm)
