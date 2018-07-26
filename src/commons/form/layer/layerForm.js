import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import _ from 'lodash'

import {
  getLayer,
  patchLayer
  // createLayer
} from '@ist-supsi/bmsjs'

// import DomainText from '../domain/domainText'
// import DomainDropdown from '../domain/dropdown/domainDropdown'

import {
  // Segment,
  Dimmer,
  Loader,
  Form,
  Input,
  TextArea
} from 'semantic-ui-react'

class LayerForm extends React.Component {

  constructor(props) {
    super(props)
    this.empty = {
      id: props.hasOwnProperty('id')? props.id: null,
      kind: null,
      depth_from: null,
      depth_to: null,
    }
    this.checkattribute = false
    this.updateAttributeDelay = {}
    this.state = {
      isFetching: false,
      isPatching: false,
      layer: {
        ...this.empty
      }
    }
  }

  componentDidMount(){
    const {
      id
    } = this.props
    this.load(id)
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.load(this.props.id);
    }
  }

  load(id){
    if(_.isInteger(id)){
      this.setState({
        isFetching: true,
        layer: this.empty
      }, () => {
        getLayer(id).then(function(response) {
          if(response.data.success){
            this.setState({
              isFetching: false,
              layer: response.data.data
            })
          }
        }.bind(this)).catch(function (error) {
          console.log(error)
        })
      })
    }
  }

  updateChange(attribute, value, to = true){
    const {
      onUpdated
    } = this.props
    const state = {
      ...this.state,
      isPatching: true,
      layer: {
        ...this.state.layer
      }
    }
    _.set(state.layer, attribute, value)
    this.setState(state, () => {
      if(
        this.updateAttributeDelay.hasOwnProperty(attribute) &&
        this.updateAttributeDelay[attribute]
      ){
        clearTimeout(this.updateAttributeDelay[attribute]);
        this.updateAttributeDelay[attribute] = false
      }
      this.updateAttributeDelay[attribute] = setTimeout(function(){
        patchLayer(
          this.state.layer.id,
          attribute,
          value
        ).then(function(response) {
          if(response.data.success){
            this.setState({
              isPatching: false
            }, () => {
              if(_.isFunction(onUpdated)){
                onUpdated(this.state.layer.id, attribute, value)
              }
            })
          }
        }.bind(this)).catch(function (error) {
          console.error(error)
        })
      }.bind(this), to? 500: 0)
    })
  }

  render() {
    const {
      t
    } = this.props
    const size = 'small'

    return (
      <Dimmer.Dimmable
        dimmed={
          this.state.isFetching === true
        }>
        <Dimmer
          active={
            this.state.isFetching === true
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
        <Form
          error
          size={size}
          autoComplete="off">
          <Form.Field>
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
          <Form.Field>
            <label>{t('depth_to')}</label>
            <Input
              type='number'
              value={
                _.isNil(this.state.layer.depth_to)?
                '': this.state.layer.depth_to
              }
              onChange={(e)=>{
                this.updateChange(
                  'depth_to',
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
            <label>{t('description')}</label>
            <TextArea
              autoHeight
              value={''}/>
          </Form.Field>
          <Form.Field>
            <label>{t('geo_description')}</label>
            <TextArea
              autoHeight
              value={''}/>
          </Form.Field>
        </Form>
      </Dimmer.Dimmable>
    )
  }
}

LayerForm.propTypes = {
  id: PropTypes.number,
  onUpdated: PropTypes.func
}

LayerForm.defaultProps = {
  id: undefined
}

export default translate('layer_form')(LayerForm)
