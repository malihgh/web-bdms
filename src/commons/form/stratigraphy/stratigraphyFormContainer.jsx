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
  Form,
  Icon,
  Popup
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
      consistency: {},
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
    const { id, refresh } = this.props;
    if (
      id !== null 
      && (
        id !== prevProps.id
        || refresh !== prevProps.refresh
      )
    ) {
      this.load(id);
    }
  }

  load(id) {
    // Get Stratigraphy by borehole and stratigraphy kind
    this.setState({
      consistency: {},
      stratigraphy: null,
      stratigraphyEmpty: false,
      fetchingStratigraphy: true,
      layers: null,
      layer: null
    },() => {
      
      getStratigraphy(id).then(
        (response) => {
          if (
            response.data.success
          ) {
            this.setState({
              stratigraphy: response.data.data
            }, () => {
              // Load Stratigraphy Layers
              getLayers(
                this.state.stratigraphy.id
              ).then(
                (response) => {
                  if (response.data.success){
                    this.setState({
                      layers: response.data.data
                    }, ()=>{
                      this.checkConsistency();
                    });
                  }
                }
              ).catch((error) => {
                console.log(error);
              });
            });
          } else {
            // Stratigraphy not created yet
            this.setState({
              stratigraphyEmpty: true
            });
          }
        }
      ).catch((err) => {
        console.log(err);
      });
    });
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

  checkConsistency(){
    const {
      layers
    } = this.state;

    const consistency = {};

    for (let idx = 0; idx < layers.length; idx++) {
      const item = layers[idx];

      // First layer not starting from 0 meters
      const errorStartWrong = (
        idx === 0 && item.depth_from !== 0
      );

      // Bottom higher then top
      const errorInverted = (
        item.depth_from > item.depth_to
      );

      // There is a gap between two layers
      const errorGap = (
        idx > 0
        && layers[(idx-1)].depth_to < item.depth_from
      );

      // There is an overlapping between two layers
      const errorOverlap = (
        idx > 0
        && errorInverted === false
        && item.depth_from < layers[(idx-1)].depth_to
      );

      const error = (
        errorStartWrong
        || errorGap
        || errorOverlap
      );

      const message = (
        errorStartWrong === true?
          'First layer not starting from the surface':
          errorOverlap === true?
            'Overlapping layers':
            'Non continuos data found'
      );

      if (error === true){
        consistency[item.id] = {
          errorStartWrong: errorStartWrong,
          errorInverted: errorInverted,
          errorGap: errorGap,
          errorOverlap: errorOverlap,
          message: message
        };
      }

    }

    this.setState({
      consistency: consistency,
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
              flex: '0 0 0%',
            }}
          >
            <Form
              size='small'
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
            </Form>
            <div
              style={{
                alignItems: 'baseline',
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '0.5em'
              }}
            >
              <div
                style={{
                  flex: '1 1 100%'
                }}
              >
                <Form
                  size='small'
                  style={{
                    marginBottom: '1em'
                  }}
                >
                  <Checkbox
                    checked={stratigraphy.primary}
                    label={t('mainStratigraphy')}
                    onChange={(ev, data)=>{
                      if (data.checked===true){
                        this.updateChange(
                          'primary', data.checked, false
                        );
                      }
                    }}
                    toggle
                  />
                </Form>
              </div>
              {
                this.props.borehole.data.lock === null
                || this.props.borehole.data.lock.username !==
                    this.props.user.data.username?
                  null:
                  <div
                    style={{
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Button
                      disabled={!_.isEmpty(this.state.consistency)}
                      icon
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
                      <Icon name='clone outline' />
                    </Button>
                    <Popup
                      flowing
                      hoverable
                      on='click'
                      position='right center'
                      trigger={
                        <Button
                          icon
                          size='tiny'
                        >
                          <Icon name='trash alternate' />
                        </Button>
                      }
                    >
                      Delete?
                      <br />
                      <Button
                        icon
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
                        Confirm
                      </Button>
                    </Popup>
                  </div>
              }
            </div>
            {
              _.isNil(this.state.layers)?
                null:
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
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
                          disabled={!_.isEmpty(this.state.consistency)}
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
                                        consistency: {},
                                        layers: response.data.data,
                                        layer: layerId
                                      }, ()=>{
                                        this.checkConsistency();
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
                          secondary
                          size='tiny'
                        >
                          Add layer
                        </Button>
                      </div>
                  }
                  {
                    _.isEmpty(this.state.consistency)?
                      null:
                      <div
                        style={{
                          color: 'red',
                          fontSize: '0.9em',
                          paddingBottom: '0.5em',
                          textAlign: 'right',
                        }}
                      >
                        <Icon
                          name='warning sign'
                        /> {(()=>{
                          const l = Object.keys(this.state.consistency).length;
                          if (l === 1) {
                            return 'One error found.';
                          }
                          return `${l} errors found.`;
                        })()}
                      </div>
                  }
                  <div
                    style={{
                      flex: 1,
                      overflowY: 'auto'
                    }}
                  >
                    
                    <LayersList
                      consistency={this.state.consistency}
                      layers={this.state.layers}
                      onDelete={(layer, solution, value = null) => {
                        if (
                          this.props.borehole.data.lock === null
                          || this.props.borehole.data.lock.username !== this.props.user.data.username
                        ){
                          alert("Borehole not locked");
                          return;
                        }
                        deleteLayer(
                          layer.id, solution, value
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
                                  }, () => {
                                    this.checkConsistency();
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
                      onResolve={(layer, solution) => {
                        if (
                          this.props.borehole.data.lock === null
                          || this.props.borehole.data.lock.username !== this.props.user.data.username
                        ){
                          alert("Borehole not locked");
                          return;
                        }
                        gapLayer(
                          layer.id, solution
                        ).then(
                          function(response) {
                            if (response.data.success){
                              getLayers(
                                this.state.stratigraphy.id
                              ).then(function(response) {
                                if (response.data.success){
                                  this.setState({
                                    consistency: {},
                                    layers: response.data.data,
                                    layer: null
                                  }, () => {
                                    this.checkConsistency();
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
                    }, () => {
                      if (
                        attribute === 'depth_to'
                        || attribute === 'depth_from'
                      ){
                        this.checkConsistency();
                      }
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
  borehole: PropTypes.object,
  id: PropTypes.number,
  onClone: PropTypes.func,
  onDeleted: PropTypes.func,
  onUpdated: PropTypes.func,
  refresh: PropTypes.number,
  user: PropTypes.object,
};

StratigraphyFormContainer.defaultProps = {
  borehole: undefined,
  kind: undefined,
  id: undefined,
  refresh: undefined
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
  translate(['borehole_form', 'common'])(StratigraphyFormContainer)
));
