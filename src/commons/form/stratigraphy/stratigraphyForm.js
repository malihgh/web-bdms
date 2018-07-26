import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import _ from 'lodash'

import {
  createStratigraphy,
  getStratigraphy
} from '@ist-supsi/bmsjs'

import DomainText from '../domain/domainText'
import DomainDropdown from '../domain/dropdown/domainDropdown'
import StartigraphyTable from '../../table/stratigraphyTable'
import LayerForm from '../layer/layerForm'

import {
  Form
} from 'semantic-ui-react'

class StratigraphyForm extends React.Component {

  constructor(props) {
    super(props)
    this.empty = {
      id: props.hasOwnProperty('id')? props.id: null,
      kind: null
    }
    this.checkattribute = false
    this.updateAttributeDelay = {}
    this.state = {
      isFetching: false,
      isPatching: false,
      stratigraphy: {
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
        stratigraphy: this.empty
      }, () => {
        getStratigraphy(id).then(function(response) {
          if(response.data.success){
            this.setState({
              isFetching: false,
              stratigraphy: response.data.data
            })
          }
        }.bind(this)).catch(function (error) {
          console.log(error)
        })
      })
    }
  }

  render() {
    const size = null // 'small'
    return (
      <Form
        error
        size={size}
        autoComplete="off">
        <Form.Field>
          <label>Stratigraphy type</label>
          <DomainText
            schema='layer_kind'
            id={this.state.stratigraphy.kind}/>
        </Form.Field>
      </Form>
    )
  }

  _render() {
    const {
      t
    } = this.props

    return (
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
          flex: '0.4 1 0%',
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
                        debugger
                        if(response.data.success){
                          // let bh = response.data.data
                          this.setState({
                            layer_kind: null,
                            stratigraphy: response.data.id
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
                borehole: this.props.hasOwnProperty(
                  'id'
                )? this.props.id: undefined
              }}
              onSelected={selected => {
                this.setState({
                  stratigraphy: selected.id
                })
              }}/>
          </div>
        </div>
        <div style={{
            flex: "0.6 1 0%",
            padding: "1em",
            overflowY: "auto"
          }}>
          {
            this.state.stratigraphy === null ?
            'Please select an inserted stratigraphy or create a new one':
            <LayerForm
              id={this.state.stratigraphy}/>
          }
        </div>
      </div>
    )
  }
}

StratigraphyForm.propTypes = {
  id: PropTypes.number
}

StratigraphyForm.defaultProps = {
  id: undefined
}

export default translate('borehole_form')(StratigraphyForm)
