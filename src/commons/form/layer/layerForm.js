import React, { createRef }  from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import _ from 'lodash';

import {
  getLayer,
  patchLayer
  // createLayer
} from '@ist-supsi/bmsjs';

// import DomainText from '../domain/domainText'
import DomainDropdown from '../domain/dropdown/domainDropdown';

import {
  // Segment,
  Dimmer,
  Loader,
  Form,
  Input,
  TextArea,
  Checkbox
} from 'semantic-ui-react';

class LayerForm extends React.Component {

  constructor(props) {
    super(props);
    this.isVisible = this.isVisible.bind(this);
    this.depthToRef = createRef();
    this.empty = {
      id: props.hasOwnProperty('id')? props.id: null,
      kind: null,
      depth_from: null,
      depth_to: null,
      description: '',
      geology: '',
      last: null,
      qt_description: null,
      lithology: null,
      lithostratigraphy: null,
      chronostratigraphy: null,
      tectonic_unit: null,
      // symbol: null,
      color: [],
      plasticity: null,
      humidity: null,
      consistance: null,
      alteration: null,
      compactness: null,
      jointing: [],
      soil_state: null,
      organic_component: [],
      striae: null,
      grain_size_1: null,
      grain_size_2: null,
      grain_shape: [],
      grain_granularity: [],
      cohesion: null,
      further_properties: [],
      uscs_1: null,
      uscs_2: null,
      uscs_3: [],
      uscs_original: '',
      uscs_determination: [],
      unconrocks: null,
      debris: [],
      lit_pet_deb: [],
      lithok: null,
      kirost: null,
      notes: '',
    };
    this.checkattribute = false;
    this.updateAttributeDelay = {};
    this.state = {
      isFetching: false,
      isPatching: false,
      allfields: false,
      layer: {
        ...this.empty
      }
    };
  }

  componentDidMount(){
    const {
      id
    } = this.props;
    this.load(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.load(this.props.id);
    }
  }

  load(id){
    if (_.isInteger(id)){
      this.setState({
        isFetching: true,
        layer: this.empty
      }, () => {
        getLayer(id).then(function(response) {
          if (response.data.success){
            this.setState({
              isFetching: false,
              layer: response.data.data
            }, () => {
              if (_.isNil(this.state.layer.depth_to)){
                this.depthToRef.current.focus();
              }
            });
          }
        }.bind(this)).catch(function (error) {
          console.log(error);
        });
      });
    }
  }

  updateChange(attribute, value, to = true){

    if (
      this.props.borehole.data.lock === null
      || this.props.borehole.data.lock.username !== this.props.user.data.username
    ){
      alert("Borehole not locked");
      return;
    }

    const {
      onUpdated
    } = this.props;
    const state = {
      ...this.state,
      isPatching: true,
      layer: {
        ...this.state.layer
      }
    };
    _.set(state.layer, attribute, value);
    this.setState(state, () => {
      if (
        this.updateAttributeDelay.hasOwnProperty(attribute) &&
        this.updateAttributeDelay[attribute]
      ){
        clearTimeout(this.updateAttributeDelay[attribute]);
        this.updateAttributeDelay[attribute] = false;
      }
      this.updateAttributeDelay[attribute] = setTimeout(function(){
        patchLayer(
          this.state.layer.id,
          attribute,
          value
        ).then(function(response) {
          if (response.data.success){
            this.setState({
              isPatching: false
            }, () => {
              if (_.isFunction(onUpdated)){
                onUpdated(this.state.layer.id, attribute, value);
              }
            });
          }
        }.bind(this)).catch(function (error) {
          console.error(error);
        });
      }.bind(this), to? 500: 0);
    });
  }

  isVisible(name, field){
    const {
      conf
    } = this.props;
    if (
      this.state.allfields === false
      && conf!==null
      && conf.hasOwnProperty('fields')
    ){
      if (conf.fields.indexOf(name)>=0){
        return field;
      }
      return null;
    }
    return field;
  }

  render() {
    const {
      t, conf
    } = this.props;
    const size = 'small';
    let fields = [];
    if (conf!==null && conf.hasOwnProperty('fields')){
      fields = conf.fields;
    }

    return (
      <Dimmer.Dimmable
        dimmed={
          this.state.isFetching === true
        }>
        <Dimmer
          active={
            this.state.isFetching === true
          }
          inverted
        >
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
        {
          fields.length<30?
          <div
            style={{
              textAlign: 'right'
            }}
          >
            <Checkbox
              label='Show all fields'
              toggle
              checked={this.state.allfields}
              onChange={(ev, data)=>{
                this.setState({
                  allfields: data.checked
                })
              }}
            />
          </div>: null
        }
        <Form
          error
          size={size}
          autoComplete="off">
          <Form.Field
            error={this.state.layer.depth_from===null}
            required
          >
            <label>{t('depth_from')}</label>
            <Input
              type='number'
              value={
                _.isNil(this.state.layer.depth_from)?
                '': this.state.layer.depth_from
              }
              onChange={(e)=>{
                this.updateChange(
                  'depth_from',
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
            error={
              this.state.layer.depth_to===null
              || (
                this.state.layer.depth_from!==null
                && this.state.layer.depth_from>=this.state.layer.depth_to
              )
            }
            required
          >
            <label>{t('depth_to')}</label>
            <Input
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              onChange={(e)=>{
                this.updateChange(
                  'depth_to',
                  e.target.value === ''?
                    null: _.toNumber(e.target.value)
                );
              }}
              ref={this.depthToRef}
              spellCheck="false"
              type='number'
              value={
                _.isNil(this.state.layer.depth_to)?
                  '': this.state.layer.depth_to
              }
            />
          </Form.Field>
          {
            this.isVisible(
              'description',
              <Form.Field>
                <label>{t('description')}</label>
                <TextArea
                  autoHeight
                  onChange={(e)=>{
                    this.updateChange(
                      'description', e.target.value
                    )
                  }}
                  value={this.state.layer.description}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'geology',
              <Form.Field>
                <label>{t('geology')}</label>
                <TextArea
                  autoHeight
                  onChange={(e)=>{
                    this.updateChange(
                      'geology', e.target.value
                    )
                  }}
                  value={this.state.layer.geology}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'last',
              <Form.Field>
                <label>{t('last')}</label>
                <Form.Group inline>
                  <Form.Radio
                    label={
                      t('common:yes')
                    }
                    checked={this.state.layer.last === true}
                    onChange={(e, d)=>{
                      this.updateChange(
                        'last', true, false)
                    }}
                  />
                  <Form.Radio
                    label={
                      t('common:no')
                    }
                    checked={this.state.layer.last === false}
                    onChange={(e, d)=>{
                      this.updateChange(
                        'last', false, false)
                    }}
                  />
                </Form.Group>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'qt_description',
              <Form.Field>
                <label>{t('qt_description')}</label>
                <DomainDropdown
                  schema='qt_description'
                  selected={this.state.layer.qt_description}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'qt_description', selected.id, false
                    )
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'lithology',
              <Form.Field
                required
              >
                <label>{t('lithology')}</label>
                <DomainDropdown
                  schema='custom.lit_pet_top_bedrock'
                  selected={this.state.layer.lithology}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'lithology', selected.id, false
                    )
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'lithostratigraphy',
              <Form.Field
                required
              >
                <label>{t('lithostratigraphy')}</label>
                <DomainDropdown
                  schema='custom.lit_str_top_bedrock'
                  selected={this.state.layer.lithostratigraphy}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'lithostratigraphy', selected.id, false
                    )
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'chronostratigraphy',
              <Form.Field>
                <label>{t('chronostratigraphy')}</label>
                <DomainDropdown
                  schema='custom.chro_str_top_bedrock'
                  selected={this.state.layer.chronostratigraphy}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'chronostratigraphy', selected.id, false
                    )
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'tectonic_unit',
              <Form.Field>
                <label>{t('tectonic_unit')}</label>
                <DomainDropdown
                  schema='vtec404'
                  selected={this.state.layer.tectonic_unit}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'tectonic_unit', selected.id, false
                    )
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'color',
              <Form.Field>
                <label>{t('color')}</label>
                <DomainDropdown
                  schema='mlpr112'
                  selected={this.state.layer.color}
                  multiple={true}
                  search={true}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'color',
                      selected.map(mlpr=>mlpr.id),
                      false
                    )
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'plasticity',
              <Form.Field>
                <label>{t('plasticity')}</label>
                <DomainDropdown
                  schema='mlpr101'
                  selected={this.state.layer.plasticity}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'plasticity', selected.id, false
                    )
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'humidity',
              <Form.Field>
                <label>{t('humidity')}</label>
                <DomainDropdown
                  schema='mlpr105'
                  selected={this.state.layer.humidity}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'humidity', selected.id, false
                    )
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'consistance',
              <Form.Field>
                <label>{t('consistance')}</label>
                <DomainDropdown
                  schema='mlpr103'
                  selected={this.state.layer.consistance}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'consistance', selected.id, false
                    )
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'alteration',
              <Form.Field>
                <label>{t('alteration')}</label>
                <DomainDropdown
                  schema='mlpr106'
                  selected={this.state.layer.alteration}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'alteration', selected.id, false
                    )
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'compactness',
              <Form.Field>
                <label>{t('compactness')}</label>
                <DomainDropdown
                  schema='mlpr102'
                  selected={this.state.layer.compactness}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'compactness', selected.id, false
                    )
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'jointing',
              <Form.Field>
                <label>{t('jointing')}</label>
                <DomainDropdown
                  schema='mlpr113'
                  selected={this.state.layer.jointing}
                  multiple={true}
                  search={true}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'jointing',
                      selected.map(jng=>jng.id),
                      false
                    )
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'soil_state',
              <Form.Field>
                <label>{t('soil_state')}</label>
                <DomainDropdown
                  schema='mlpr108'
                  selected={this.state.layer.soil_state}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'soil_state', selected.id, false
                    )
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'organic_component',
              <Form.Field>
                <label>{t('organic_component')}</label>
                <DomainDropdown
                  schema='mlpr108'
                  selected={this.state.layer.organic_component}
                  multiple={true}
                  search={true}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'organic_component',
                      selected.map(jng=>jng.id),
                      false
                    )
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'striae',
              <Form.Field>
                <label>{t('striae')}</label>
                <Form.Group inline>
                  <Form.Radio
                    label={
                      t('common:yes')
                    }
                    checked={this.state.layer.striae === true}
                    onChange={(e, d)=>{
                      this.updateChange(
                        'striae', true, false)
                    }}
                  />
                  <Form.Radio
                    label={
                      t('common:no')
                    }
                    checked={this.state.layer.striae === false}
                    onChange={(e, d)=>{
                      this.updateChange(
                        'striae', false, false)
                    }}
                  />
                </Form.Group>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'grain_size_1',
              <Form.Field>
                <label>{t('grain_size_1')}</label>
                <DomainDropdown
                  schema='mlpr109'
                  selected={this.state.layer.grain_size_1}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'grain_size_1', selected.id, false
                    )
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'grain_size_2',
              <Form.Field>
                <label>{t('grain_size_2')}</label>
                <DomainDropdown
                  schema='mlpr109'
                  selected={this.state.layer.grain_size_2}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'grain_size_2', selected.id, false
                    )
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'grain_shape',
              <Form.Field>
                <label>{t('grain_shape')}</label>
                <DomainDropdown
                  schema='mlpr110'
                  selected={this.state.layer.grain_shape}
                  multiple={true}
                  search={true}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'grain_shape',
                      selected.map(gsh=>gsh.id),
                      false
                    );
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'grain_granularity',
              <Form.Field>
                <label>{t('grain_granularity')}</label>
                <DomainDropdown
                  schema='mlpr115'
                  selected={this.state.layer.grain_granularity}
                  multiple={true}
                  search={true}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'grain_granularity',
                      selected.map(ggr=>ggr.id),
                      false
                    );
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'cohesion',
              <Form.Field>
                <label>{t('cohesion')}</label>
                <DomainDropdown
                  schema='mlpr116'
                  selected={this.state.layer.cohesion}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'cohesion', selected.id, false
                    );
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'further_properties',
              <Form.Field>
                <label>{t('further_properties')}</label>
                <DomainDropdown
                  schema='mlpr117'
                  selected={this.state.layer.further_properties}
                  multiple={true}
                  search={true}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'further_properties',
                      selected.map(ftp=>ftp.id),
                      false
                    );
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'uscs_1',
              <Form.Field>
                <label>{t('uscs_1')}</label>
                <DomainDropdown
                  schema='mcla101'
                  selected={this.state.layer.uscs_1}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'uscs_1', selected.id, false
                    );
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'uscs_2',
              <Form.Field>
                <label>{t('uscs_2')}</label>
                <DomainDropdown
                  schema='mcla101'
                  selected={this.state.layer.uscs_2}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'uscs_2', selected.id, false
                    );
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'uscs_3',
              <Form.Field>
                <label>{t('uscs_3')}</label>
                <DomainDropdown
                  schema='mcla101'
                  selected={this.state.layer.uscs_3}
                  multiple={true}
                  search={true}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'uscs_3',
                      selected.map(ftp=>ftp.id),
                      false
                    );
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'uscs_original',
              <Form.Field>
                <label>{t('uscs_original')}</label>
                <Input
                  onChange={(e)=>{
                    this.updateChange(
                      'uscs_original', e.target.value
                    );
                  }}
                  value={this.state.layer.uscs_original}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'uscs_determination',
              <Form.Field>
                <label>{t('uscs_determination')}</label>
                <DomainDropdown
                  schema='mcla104'
                  selected={this.state.layer.uscs_determination}
                  multiple={true}
                  search={true}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'uscs_determination',
                      selected.map(ftp=>ftp.id),
                      false
                    );
                  }}/>
              </Form.Field>
            )
          }
          {/*<Form.Field>
            <label>{t('unconrocks')}</label>
            <DomainDropdown
              schema='mcla102'
              selected={this.state.layer.unconrocks}
              onSelected={(selected)=>{
                this.updateChange(
                  'unconrocks', selected.id, false
                )
              }}/>
          </Form.Field>
          */}
          {
            this.isVisible(
              'debris',
              <Form.Field>
                <label>{t('debris')}</label>
                <DomainDropdown
                  schema='mcla107'
                  selected={this.state.layer.debris}
                  multiple={true}
                  search={true}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'debris',
                      selected.map(gsh=>gsh.id),
                      false
                    );
                  }}/>
              </Form.Field>
            )
          }
          {
            this.isVisible(
              'lit_pet_deb',
              <Form.Field>
                <label>{t('lit_pet_deb')}</label>
                <DomainDropdown
                  schema='custom.lit_pet_top_bedrock'
                  selected={this.state.layer.lit_pet_deb}
                  multiple={true}
                  search={true}
                  onSelected={(selected)=>{
                    this.updateChange(
                      'lit_pet_deb',
                      selected.map(gsh=>gsh.id),
                      false
                    );
                  }}/>
              </Form.Field>
            )
          }
          {
            /*
            <Form.Field>
              <label>{t('lithok')}</label>
              <DomainDropdown
                schema='mcla105'
                selected={this.state.layer.lithok}
                onSelected={(selected)=>{
                  this.updateChange(
                    'lithok', selected.id, false
                  )
                }}/>
            </Form.Field>
            <Form.Field>
              <label>{t('kirost')}</label>
              <DomainDropdown
                schema='mcla106'
                selected={this.state.layer.kirost}
                onSelected={(selected)=>{
                  this.updateChange(
                    'kirost', selected.id, false
                  )
                }}/>
            </Form.Field>
            */
          }
          {
            this.isVisible(
              'notes',
              <Form.Field>
                <label>{t('notes')}</label>
                <TextArea
                  autoHeight
                  onChange={(e)=>{
                    this.updateChange(
                      'notes', e.target.value
                    );
                  }}
                  value={this.state.layer.notes}
                />
              </Form.Field>
            )
          }
        </Form>
      </Dimmer.Dimmable>
    );
  }
}

LayerForm.propTypes = {
  borehole: PropTypes.object,
  conf: PropTypes.object,
  id: PropTypes.number,
  onUpdated: PropTypes.func,
  user: PropTypes.object
};

LayerForm.defaultProps = {
  id: undefined,
  conf: {}
};

export default translate(['layer_form', 'common'])(LayerForm);
