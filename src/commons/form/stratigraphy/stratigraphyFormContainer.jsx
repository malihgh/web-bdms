import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import _ from 'lodash'
import LayerForm from '../layer/layerForm'
import LayersList from '../../layers/layerList'
import DomainText from '../domain/domainText'
import {
  Button,
  Icon,
  List,
  Segment
} from 'semantic-ui-react'
import {
  getStratigraphies,
  getLayers,
  deleteLayer,
  createLayer,
  createStratigraphy
} from '@ist-supsi/bmsjs'


class StratigraphyFormContainer extends React.Component {

  constructor(props) {
    super(props)
    this.load = this.load.bind(this)
    this.state = {
      stratigraphy: null,
      stratigraphyEmpty: false,
      fetchingStratigraphy: false,
      layers: null,
      layer: null
    }
  }
 
  componentDidMount() {
    const { borehole, kind } = this.props
    if (!_.isNil(borehole) && !_.isNil(kind)) {
      this.load(borehole, kind)
    }
  }

  componentDidUpdate(prevProps) {
    const { borehole, kind } = this.props
    if (kind !== prevProps.kind) {
      this.load(borehole, kind)
    }
  }

  load(borehole, kind) {
    // Get Stratigraphy by borehole and stratigraphy kind
    this.setState({
      stratigraphy: null,
      stratigraphyEmpty: false,
      fetchingStratigraphy: true,
      layers: null,
      layer: null
    }, function(){
      getStratigraphies(
        borehole, kind
      ).then(
        function(response){
          if (
            response.data.success &&
            response.data.data.length===1
          ) {
            this.setState({
                stratigraphy: response.data.data[0]
              }, function(){
                // Load Stratigraphy Layers
                getLayers(
                  this.state.stratigraphy.id
                ).then(
                  function(response){
                    if(response.data.success){
                      this.setState({
                        layers: response.data.data
                      })
                    }
                  }.bind(this)
                ).catch((error) => {
                  console.log(error)
                })
              }.bind(this)
            )
          } else{
            // Stratigraphy not created yet
            this.setState({
              stratigraphyEmpty: true
            })
          }
        }.bind(this)
      ).catch((err) => {
        console.log(err)
      })
    }.bind(this))
  }

  render() {
    const { stratigraphy } = this.state
    const { borehole, kind } = this.props
    if(this.state.stratigraphyEmpty){
      return (
        <div
          style={{
            flex: '1 1 0%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div>
            Stratigraphy not yet created.
            <div
              style={{
                padding: '1em',
                textAlign: 'center'
              }}
            >
              <Button
                secondary
                size='small'
                onClick={()=>{
                  const self = this
                  createStratigraphy(
                    borehole, kind
                  ).then(
                    function(response) {
                      if(response.data.success){
                        self.load(borehole, kind)
                      }
                    }/*.bind(this)*/).catch(function (error) {
                    console.log(error)
                  })
                }}
              >
                <Icon name='add' />
                Create <DomainText
                  schema='layer_kind'
                  id={kind}/>
              </Button>
            </div>
          </div>
        </div>
      )
    }else if (_.isNil(stratigraphy)) {
      return 'nothing selected'
    }
    return (
      <div
        style={{
          padding: '1em',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        {/*<StratigraphyForm id={stratigraphy.id}/>*/}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '100%'
          }}
        >
          <div style={{
              width: '250px'
            }}
          >
          {
            _.isNil(this.state.layers)?
              null:
              <div>
                <List divided relaxed >
                  <List.Item
                    onClick={()=>{
                      createLayer(
                        this.state.stratigraphy.id
                      ).then(
                        function(response) {
                          if(response.data.success){
                            let layer_id = response.data.id
                            getLayers(
                              this.state.stratigraphy.id
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
                    }}
                    style={{
                      backgroundColor: '#eaeaea',
                      padding: '0.5em 0.5em'
                    }}
                  >
                    <List.Content floated='right'>
                      <Button icon size='mini' circular basic primary>
                        <Icon name='add' />
                      </Button>
                    </List.Content>
                    <List.Content>
                      <List.Header>Add layer</List.Header>
                    <List.Description>
                      Click here to add a new layer
                    </List.Description>
                    </List.Content>
                  </List.Item>
                </List>

                <LayersList
                  layers={this.state.layers}
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
                            this.state.stratigraphy.id
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
                  selected={this.state.layer}>
                </LayersList>
              </div>
          }
          </div>
          <Segment style={{
              flex: '1 1 0%',
              overflowY: 'auto',
              margin: '0px 1em'
            }}
          >
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
      </div>
    )
  }
}

StratigraphyFormContainer.propTypes = {
  borehole: PropTypes.number,
  kind: PropTypes.number
}

StratigraphyFormContainer.defaultProps = {
  borehole: undefined,
  kind: undefined
}

const mapStateToProps = (state, ownProps) => {
  return {
    domains: state.core_domain_list
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((
  translate('borehole_form')(StratigraphyFormContainer)
))
