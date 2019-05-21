import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import _ from 'lodash';
import LayerForm from '../layer/layerForm';
import LayersList from '../../layers/layerList';
import DateField from '../dateField';
// import DomainDropdown from '../domain/dropdown/domainDropdown';
import {
  Button,
  Checkbox,
  Input,
  Segment,
  Form
} from 'semantic-ui-react';
import {
  // getStratigraphies,
  getStratigraphy,
  getLayers,
  deleteLayer,
  gapLayer,
  createLayer,
  patchStratigraphy,
  deleteStratigraphy,
  cloneStratigraphy
} from '@ist-supsi/bmsjs';


class StratigraphyFormContainer extends React.Component {

  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
    this.updateAttributeDelay = {};
    this.state = {
      stratigraphy: null,
      isPatching: false,
      stratigraphyEmpty: false,
      fetchingStratigraphy: false,
      layers: null,
      layer: null
    };
  }
 
  componentDidMount() {
    const { id } = this.props;
    if (!_.isNil(id)) {
      this.load(id);
    }
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props;
    if (id !== prevProps.id) {
      this.load(id);
    }
  }

  load(id) {
    // Get Stratigraphy by borehole and stratigraphy kind
    this.setState({
      stratigraphy: null,
      stratigraphyEmpty: false,
      fetchingStratigraphy: true,
      layers: null,
      layer: null
    }, function(){
      
      getStratigraphy(id).then(
        function(response){
          if (
            response.data.success
          ) {
            this.setState({
              stratigraphy: response.data.data
            }, function(){
              // Load Stratigraphy Layers
              getLayers(
                this.state.stratigraphy.id
              ).then(
                function(response){
                  if (response.data.success){
                    this.setState({
                      layers: response.data.data
                    });
                  }
                }.bind(this)
              ).catch((error) => {
                console.log(error);
              });
            }.bind(this));
          } else {
            // Stratigraphy not created yet
            this.setState({
              stratigraphyEmpty: true
            });
          }
        }.bind(this)
      ).catch((err) => {
        console.log(err);
      });
    }.bind(this));
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
      stratigraphy: {
        ...this.state.stratigraphy
      }
    };
    _.set(state.stratigraphy, attribute, value);
    this.setState(state, () => {
      if (
        this.updateAttributeDelay.hasOwnProperty(attribute) &&
        this.updateAttributeDelay[attribute]
      ){
        clearTimeout(this.updateAttributeDelay[attribute]);
        this.updateAttributeDelay[attribute] = false;
      }
      this.updateAttributeDelay[attribute] = setTimeout(function(){
        patchStratigraphy(
          this.state.stratigraphy.id,
          attribute,
          value
        ).then(function(response) {
          if (response.data.success){
            this.setState({
              isPatching: false
            }, () => {
              if (_.isFunction(onUpdated)){
                onUpdated(this.state.stratigraphy.id, attribute, value);
              }
            });
          }
        }.bind(this)).catch(function (error) {
          console.error(error);
        });
      }.bind(this), to? 500: 0);
    });
  }

  render() {
    const { stratigraphy } = this.state;
    const {
      domains,
      t,
      onDeleted,
      onClone
    } = this.props;
    
    if (this.state.stratigraphyEmpty || _.isNil(stratigraphy)) {
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
            Nothing selected
          </div>
        </div>
      );
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '100%'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: '0 0 0%'
            }}
          >
            <Form
              size='small'
              style={{
                marginBottom: '1em'
              }}
            >
              <Form.Group widths='equal'>
                <Form.Field
                  required
                  style={{
                    width: '50%'
                  }}
                >
                  <label>{t('stratigraphy_name')}</label>
                  <Input
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={(e)=>{
                      this.updateChange(
                        'name', e.target.value
                      );
                    }}
                    ref={this.depthToRef}
                    spellCheck="false"
                    value={stratigraphy.name}
                  />
                </Form.Field>
                {/* <Form.Field
                  required
                  style={{
                    width: '50%'
                  }}
                >
                  <label>{t('meta_stratigraphy')}</label>
                  <DomainDropdown
                    onSelected={(selected)=>{
                      this.updateChange(
                        'kind', selected.id, false
                      );
                    }}
                    reset={false}
                    schema='layer_kind'
                    selected={stratigraphy.kind}
                  />
                </Form.Field> */}
                <Form.Field
                  error={_.isNil(stratigraphy.date)}
                  required
                  style={{
                    width: '50%'
                  }}
                >
                  <label>Date</label>
                  <DateField
                    date={stratigraphy.date}
                    onChange={(selected)=>{
                      this.updateChange(
                        'date', selected, false
                      );
                    }} />
                </Form.Field>
              </Form.Group>
              <Checkbox
                checked={stratigraphy.primary}
                label='This is the main stratigraphy'
                onChange={(ev, data)=>{
                  this.updateChange(
                    'primary', data.checked, false
                  );
                }}
                toggle
              />
            </Form>
            {
              _.isNil(this.state.layers)?
                null:
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {
                    this.props.borehole.data.lock === null
                    || this.props.borehole.data.lock.username !==
                        this.props.user.data.username?
                      null:
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginBottom: '0.5em'
                        }}
                      >
                        <Button
                          fluid
                          negative
                          onClick={()=>{
                            cloneStratigraphy(
                              stratigraphy.id
                            ).then((response)=>{
                              if (_.isFunction(onClone)){
                                onClone(stratigraphy.id);
                              }
                              this.setState({
                                stratigraphy: null
                              });
                            });
                          }}
                          size='tiny'
                        >
                          Clone
                        </Button>
                        <Button
                          fluid
                          negative
                          onClick={()=>{
                            deleteStratigraphy(
                              stratigraphy.id
                            ).then((response)=>{
                              if (_.isFunction(onDeleted)){
                                onDeleted(stratigraphy.id);
                              }
                              this.setState({
                                stratigraphy: null
                              });
                            });
                          }}
                          size='tiny'
                        >
                          Delete stratigraphy
                        </Button>
                        <Button
                          fluid
                          onClick={()=>{
                            createLayer(
                              this.state.stratigraphy.id
                            ).then(
                              function(response) {
                                if (response.data.success){
                                  let layerId = response.data.id;
                                  getLayers(
                                    this.state.stratigraphy.id
                                  ).then(function(response) {
                                    if (response.data.success){
                                      this.setState({
                                        layers: response.data.data,
                                        layer: layerId
                                      });
                                    }
                                  }.bind(this)).catch(function (error) {
                                    console.log(error);
                                  });
                                }
                              }.bind(this)
                            ).catch(function (error) {
                              console.log(error);
                            });
                          }}
                          positive
                          size='tiny'
                        >
                          Add layer
                        </Button>
                      </div>
                  }
                  <div
                    style={{
                      flex: 1,
                      overflowY: 'auto'
                    }}
                  >
                    <LayersList
                      layers={this.state.layers}
                      onDelete={(layer, precess, value = null) => {
                        deleteLayer(
                          layer.id, precess, value
                        ).then(
                          function(response) {
                            if (response.data.success){
                              getLayers(
                                this.state.stratigraphy.id
                              ).then(function(response) {
                                if (response.data.success){
                                  this.setState({
                                    layers: response.data.data,
                                    layer: null
                                  });
                                }
                              }.bind(this)).catch(function (error) {
                                console.log(error);
                              });
                            }
                          }.bind(this)).catch(function (error) {
                          console.log(error);
                        });
                      }}
                      onResolveGap={(layer, precess) => {
                        gapLayer(
                          layer.id, precess
                        ).then(
                          function(response) {
                            if (response.data.success){
                              getLayers(
                                this.state.stratigraphy.id
                              ).then(function(response) {
                                if (response.data.success){
                                  this.setState({
                                    layers: response.data.data,
                                    layer: null
                                  });
                                }
                              }.bind(this)).catch(function (error) {
                                console.log(error);
                              });
                            }
                          }.bind(this)).catch(function (error) {
                          console.log(error);
                        });
                      }}
                      onSelected={layer => {
                        this.setState({
                          layer: layer.id
                        });
                      }}
                      selected={this.state.layer}
                    />
                  </div>
                </div>
            }
          </div>
          <Segment
            style={{
              flex: '1 1 0%',
              overflowY: 'auto',
              margin: '0px 1em'
            }}
          >
            {
              this.state.layer !== null?
                <LayerForm
                  borehole={this.props.borehole}
                  conf={
                    (()=>{
                      const element = domains.data.layer_kind.find(function(element) {
                        return element.id === stratigraphy.kind;
                      });
                      return element.conf;
                    })()
                  }
                  id={this.state.layer}
                  onUpdated={(id, attribute, value) => {
                    const layers = [...this.state.layers];
                    for (var i = 0; i < layers.length; i++) {
                      if (id === layers[i].id){
                        layers[i][attribute] = value;
                        break;
                      }
                    }
                    this.setState({
                      layers: layers
                    });
                  }}
                  user={this.props.user}
                />: null
            }
          </Segment>
        </div>
      </div>
    );
  }
}

StratigraphyFormContainer.propTypes = {
  id: PropTypes.number,
  onClone: PropTypes.func,
  onDeleted: PropTypes.func,
  onUpdated: PropTypes.func
};

StratigraphyFormContainer.defaultProps = {
  borehole: undefined,
  kind: undefined,
  id: undefined
};

const mapStateToProps = (state) => {
  return {
    borehole: state.core_borehole,
    domains: state.core_domain_list,
    user: state.core_user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((
  translate('borehole_form')(StratigraphyFormContainer)
));
