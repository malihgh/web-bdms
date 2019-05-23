import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';

// import {
//   getLayers
// } from '@ist-supsi/bmsjs'

import {
  Button,
  Form,
  Icon,
  Input,
  Radio,
  Table
} from 'semantic-ui-react';

import DomainText from '../form/domain/domainText';

class LayersList extends React.Component {

  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.getColor = this.getColor.bind(this);
    this.handleDeleteAction = this.handleDeleteAction.bind(this);
    this.handleResolvingAction = this.handleResolvingAction.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.getPattern = this.getPattern.bind(this);
    this.state = {
      resolving: null,
      resolvingAction: null,
      deleting: null,
      deleteAction: 0,
      value: null
    };
  }

  getPattern(id){
    const {
      domains
    } = this.props;
    let domain = domains.data['custom.lit_pet_top_bedrock'].find(function(element) {
      return element.id === id;
    });
    if (domain !== undefined && domain.conf !== null && domain.conf.hasOwnProperty('img')){
      return 'url("' + process.env.PUBLIC_URL + '/img/lit/' + domain.conf.img + '")';
    }
    else {
      return null;
    }
  }

  getColor(id){
    const {
      domains
    } = this.props;
    let domain = domains.data[
      'custom.lit_str_top_bedrock'
    ].find(function(element) {
      return element.id === id;
    });
    if (domain !== undefined && domain.conf !== null && domain.conf.hasOwnProperty('color')){
      const color = domain.conf.color;
      return 'rgb(' + color.join(',') + ')';
    }
    else {
      return null;
    }
  }

  handleDeleteAction (e, { value }) {
    this.setState({
      deleteAction: value,
      value: null
    }, () => {
      if (value === 3) {
        this.inputRef.current.focus();
      }
    });
  }

  handleResolvingAction (e, { value }) {
    this.setState({
      resolvingAction: value,
      value: null
    }/*, () => {
      if (value === 3) {
        this.inputRef.current.focus();
      }
    }*/);
  }

  handleValue (e, { value }) {
    this.setState({ 'value': value });
  }

  render(){
    const {
      consistency,
      layers
    } = this.props;
    const length = layers.length;
    return (
      <Table
        basic
        selectable
        structured
      >
        <Table.Body>
          {
            layers.map((item, idx) => {

              const ret = [];

              const resolving = this.state.resolving !== null
                && this.state.resolving.id === item.id;

              console.log(consistency);

              if (_.isFunction(this.props.onResolve)){

                if (
                  consistency.hasOwnProperty(item.id)
                ){
                  ret.push(
                    <Table.Row
                      active={false}
                      key={'ll-info-'+idx}
                      negative
                      style={{
                        cursor: 'pointer'
                      }}
                    >
                      <Table.Cell
                        colSpan={
                          resolving === true?
                            '3': _.isFunction(this.props.onDelete)?
                              '2': '1'
                        }
                        collapsing
                        style={{
                          width: '100%'
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 'bold'
                          }}
                        >
                          <Icon name='warning sign' /> {
                            consistency[item.id].message
                          }
                        </div>
                        {
                          resolving === true?
                            <div>
                              <div
                                style={{
                                  fontSize: '0.8em'
                                }}
                              >
                                How to resolve this issue?
                              </div>
                              <div
                                style={{
                                  marginTop: '0.5em'
                                }}
                              >
                                <Form>
                                  {
                                    consistency[item.id].errorGap === true
                                    || consistency[item.id].errorStartWrong === true?
                                      <Form.Field>
                                        <Radio
                                          checked={this.state.resolvingAction === 0}
                                          label='Fill gap with "undefined" layer'
                                          name='radioGroup'
                                          onChange={this.handleResolvingAction}
                                          value={0}
                                        />
                                      </Form.Field>: null
                                  }
                                  {
                                    idx > 0?
                                      <Form.Field>
                                        <Radio
                                          checked={
                                            this.state.resolvingAction === 1
                                          }
                                          label='Replace upper layer base with top from lower layer'
                                          name='radioGroup'
                                          onChange={this.handleResolvingAction}
                                          value={1}
                                        />
                                      </Form.Field>: null
                                  }
                                  {
                                    (idx + 1) <= length?
                                      <Form.Field>
                                        <Radio
                                          checked={this.state.resolvingAction === 2}
                                          label={
                                            consistency[item.id].errorStartWrong === true?
                                              'Replace lower layer top with 0 meters':
                                              'Replace lower layer top with base from upper layer'
                                          }
                                          name='radioGroup'
                                          onChange={this.handleResolvingAction}
                                          value={2}
                                        />
                                      </Form.Field>: null
                                  }
                                </Form>
                              </div>
                              <div
                                style={{
                                  marginTop: '0.5em',
                                  textAlign: 'right'
                                }}
                              >
                                <Button
                                  basic
                                  icon
                                  onClick={(e)=>{
                                    e.stopPropagation();
                                    this.setState({
                                      resolving: null,
                                      resolvingAction: null
                                    });
                                  }}
                                  size='mini'
                                >
                                  <Icon name='cancel' /> Cancel
                                </Button>
                                <Button
                                  disabled={this.state.resolvingAction === null}
                                  icon
                                  onClick={(e)=>{
                                    e.stopPropagation();
                                    const resolvingAction = this.state.resolvingAction;
                                    this.setState({
                                      resolving: null,
                                      resolvingAction: null
                                    }, () => {
                                      this.props.onResolve(
                                        item, resolvingAction
                                      );
                                    });
                                  }}
                                  secondary
                                  size='mini'
                                >
                                  <Icon name='check' /> Confirm
                                </Button>
                              </div>
                            </div>: null
                        }
                      </Table.Cell>
                      {
                        this.state.resolving === null
                        || this.state.resolving.id !== item.id?
                          <Table.Cell
                            collapsing
                          >
                            <Button
                              basic
                              icon
                              onClick={(e)=>{
                                e.stopPropagation();
                                this.setState({
                                  resolving: item,
                                  resolvingAction: null,
                                  deleting: null,
                                  deleteAction: 0,
                                  value: null
                                });
                              }}
                              size='mini'
                            >
                              <Icon name='question' />
                            </Button>
                          </Table.Cell>: null
                      }
                    </Table.Row>
                  );
                }
              }

              if (
                this.state.deleting !== null
                && this.state.deleting.id === item.id
              ){
                ret.push(
                  <Table.Row
                    active={false}
                    key={'ll-rw-'+idx}
                    negative
                    style={{
                      cursor: 'pointer'
                    }}
                  >
                    <Table.Cell
                      colSpan={
                        _.isFunction(this.props.onDelete)? '3': '2'
                      }
                      collapsing
                    >
                      <div
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        Attention:
                      </div>
                      <div
                        style={{
                          fontSize: '0.8em'
                        }}
                      >
                        You are about to delete this level, 
                        how do you want to procede?
                      </div>
                      <div
                        style={{
                          marginTop: '0.5em'
                        }}
                      >
                        <Form>
                          <Form.Field>
                            <Radio
                              checked={this.state.deleteAction === 0}
                              label='Just delete this layer'
                              name='radioGroup'
                              onChange={this.handleDeleteAction}
                              value={0}
                            />
                          </Form.Field>
                          {
                            idx > 0?
                              <Form.Field>
                                <Radio
                                  checked={this.state.deleteAction === 1}
                                  label='Extend upper layer to bottom'
                                  name='radioGroup'
                                  onChange={this.handleDeleteAction}
                                  value={1}
                                />
                              </Form.Field>: null
                          }
                          {
                            (idx + 1) < length?
                              <Form.Field>
                                <Radio
                                  checked={this.state.deleteAction === 2}
                                  label='Extend lower layer to top'
                                  name='radioGroup'
                                  onChange={this.handleDeleteAction}
                                  value={2}
                                />
                              </Form.Field>: null
                          }
                          {
                            idx > 0?
                              <Form.Field>
                                <Radio
                                  checked={this.state.deleteAction === 3}
                                  label='Set manually'
                                  name='radioGroup'
                                  onChange={this.handleDeleteAction}
                                  value={3}
                                />
                              </Form.Field>: null
                          }
                          {
                            idx > 0?
                              <Form.Field>
                                <Input
                                  disabled={this.state.deleteAction !== 3}
                                  onChange={this.handleValue}
                                  ref={this.inputRef}
                                  type="number"
                                />
                              </Form.Field>: null
                          }
                        </Form>
                      </div>
                      <div
                        style={{
                          marginTop: '0.5em',
                          textAlign: 'right'
                        }}
                      >
                        <Button
                          basic
                          icon
                          onClick={(e)=>{
                            e.stopPropagation();
                            this.setState({
                              deleting: null,
                              deleteAction: 0,
                              value: null
                            });
                          }}
                          size='mini'
                        >
                          <Icon name='cancel' /> Cancel
                        </Button>
                        <Button
                          icon
                          negative
                          onClick={(e)=>{
                            e.stopPropagation();
                            const deleteAction = this.state.deleteAction;
                            const value = _.isNil(this.state.value) === false?
                              parseFloat(this.state.value): null;
                            this.setState({
                              deleting: null,
                              deleteAction: 0,
                              value: value
                            }, () => {
                              this.props.onDelete(
                                item, deleteAction, value
                              );
                            });
                          }}
                          size='mini'
                        >
                          <Icon name='trash alternate outline' /> Confirm
                        </Button>
                      </div>
                    </Table.Cell>
                    
                  </Table.Row>
                );
              } else {
                ret.push(
                  (
                    <Table.Row
                      active={item.id === this.props.selected}
                      key={'ll-rw-'+idx}
                      onClick={()=>{
                        if (_.isFunction(this.props.onSelected)){
                          this.setState({
                            resolving: null,
                            resolvingAction: null,
                            deleting: null,
                            deleteAction: 0,
                            value: null
                          }, () => {
                            this.props.onSelected(item);
                          });
                        }
                      }}
                      style={{
                        cursor: 'pointer'
                      }}
                    >
                      <Table.Cell
                        collapsing
                        style={{
                          maxWidth: '40px',
                          width: '40px',
                          minWidth: '40px',
                          backgroundColor: item.unknown === true?
                            null: this.getColor(item.lithostratigraphy),
                          backgroundImage: item.unknown === true?
                            null: this.getPattern(item.lithology),
                          backgroundSize: 'cover'
                        }}
                      />
                      <Table.Cell
                        collapsing
                        style={{
                          width: '100%'
                        }}
                      >
                        <div
                          style={{
                            color: (
                              idx > 0 && layers[(idx-1)].depth_to !== item.depth_from?
                                'red': null // '#787878'
                            ),
                            // fontSize: '0.8em'
                          }}
                        >
                          {
                            idx > 0 && layers[(idx-1)].depth_to !== item.depth_from?
                              <Icon name='warning sign' />: null
                          } {item.depth_from} m
                        </div>
                        <div
                          style={{
                            fontWeight: 'bold'
                          }}
                        >
                          {
                            item.lithostratigraphy !== null?
                              <DomainText
                                id={item.lithostratigraphy}
                                schema='custom.lit_str_top_bedrock'
                              />: '-'
                          }
                        </div>
                        <div
                          style={{
                            color: '#787878',
                            fontSize: '0.8em'
                          }}
                        >
                          <DomainText
                            id={item.lithology}
                            schema='custom.lit_pet_top_bedrock'
                          />
                        </div>
                        <div
                          style={{
                            color: (
                              consistency.hasOwnProperty(item.id)
                              && consistency[item.id].errorInverted?
                                'red': null // '#787878'
                            )
                          }}
                        >
                          {
                            consistency.hasOwnProperty(item.id)
                            && consistency[item.id].errorInverted?
                              <Icon
                                name='warning sign'
                                title='Inverted depths'
                              />: null
                          } {item.depth_to} m
                        </div>
                      </Table.Cell>
                      {
                        _.isFunction(this.props.onDelete)?
                          <Table.Cell
                            collapsing
                          >
                            {
                              this.props.borehole.data.lock === null
                              || this.props.borehole.data.lock.username
                                 !== this.props.user.data.username?
                                null:
                                <Button
                                  basic
                                  icon
                                  onClick={(e)=>{
                                    e.stopPropagation();
                                    this.setState({
                                      resolving: null,
                                      resolvingAction: null,
                                      deleting: item,
                                      deleteAction: 0,
                                      value: null
                                    });
                                  }}
                                  size='mini'
                                >
                                  <Icon name='trash alternate outline' />
                                </Button>
                            }
                          </Table.Cell>: null
                      }
                    </Table.Row>
                  )
                );
              }
              return ret;
            })
          }
        </Table.Body>
      </Table>
    );
  }
}

LayersList.propTypes = {
  consistency: PropTypes.object,
  borehole: PropTypes.object,
  layers: PropTypes.array,
  onDelete: PropTypes.func,
  onResolve: PropTypes.func,
  onSelected: PropTypes.func,
  selected: PropTypes.number,
  user: PropTypes.object
};

LayersList.defaultProps = {
  consistency: {},
  layers: []
};

const mapStateToProps = (state) => {
  return {
    borehole: state.core_borehole,
    domains: state.core_domain_list,
    user: state.core_user,
  };
};

export default connect(
  mapStateToProps,
  null
)(LayersList); 
