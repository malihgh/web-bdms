import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux';

// import {
//   getLayers
// } from '@ist-supsi/bmsjs'

import {
  List,
  Button,
  Icon,
  Image,
  Table
} from 'semantic-ui-react';

import DomainText from '../form/domain/domainText';

class LayersList extends React.Component {

  constructor(props) {
    super(props);
    this.getColor = this.getColor.bind(this);
    this.getPattern = this.getPattern.bind(this);
    // this.state = {
    //   isFetching: false,
    //   // Stratigraphy id
    //   id: props.hasOwnProperty('id')? props.id: null,
    //   selected: this.props.selected !== undefined?
    //     this.props.selected: null,
    //   layers: []
    // }
  }

  // componentDidMount(){
  //   this.load(this.state.id)
  // }
  //
  // componentDidUpdate(prevProps) {
  //   if (this.props.id !== prevProps.id) {
  //     this.load(this.props.id);
  //   }
  // }

  // static getDerivedStateFromProps(nextProps, prevState){
  //   if (
  //     !_.isNil(nextProps.selected) &&
  //     nextProps.selected !== prevState.select
  //   ){
  //     return {selected: nextProps.selected}
  //   }
  //   return null
  // }

  // load(id){
  //   if(_.isInteger(id)){
  //     this.setState({
  //       id: id,
  //       isFetching: true,
  //       stratigraphy: this.empty
  //     }, () => {
  //       getLayers(id).then(function(response) {
  //         if(response.data.success){
  //           this.setState({
  //             isFetching: false,
  //             layers: response.data.data
  //           })
  //         }
  //       }.bind(this)).catch(function (error) {
  //         console.log(error)
  //       })
  //     })
  //   }
  // }

  getPattern(id){
    const {
      domains
    } = this.props;
    let domain = domains.data['custom.lit_pet_top_bedrock'].find(function(element) {
      return element.id === id
    });
    if (domain !== undefined && domain.conf !== null && domain.conf.hasOwnProperty('img')){
      return 'url("' + process.env.PUBLIC_URL + '/img/lit/' + domain.conf.img + '")'
    }
    else return null;
  }

  getColor(id){
    const {
      domains
    } = this.props;
    let domain = domains.data['custom.lit_str_top_bedrock'].find(function(element) {
      return element.id === id
    });
    if (domain !== undefined && domain.conf !== null && domain.conf.hasOwnProperty('color')){
      const color = domain.conf.color;
      return 'rgb(' + color.join(',') + ')'
    }
    else return null;
  }

  render(){
    const {
      layers
    } = this.props
    return (
      <Table basic selectable structured>
        <Table.Body>
          {
            layers.map((item, idx) => (
              <Table.Row
                active={item.id === this.props.selected}
                style={{
                  cursor: 'pointer'
                }}
                onClick={()=>{
                  if(_.isFunction(this.props.onSelected)){
                    this.props.onSelected(item);
                  }
                }}>
                <Table.Cell
                  collapsing
                  style={{
                    width: '4em',
                    backgroundColor: this.getColor(item.lithostratigraphy),
                    backgroundImage: this.getPattern(item.lithology),
                    backgroundSize: 'cover'
                  }}
                >
                </Table.Cell>
                <Table.Cell collapsing>
                  <span
                    style={{
                      fontWeight: 'bold'
                    }}
                  >
                    <DomainText
                        schema='custom.lit_str_top_bedrock'
                        id={item.lithostratigraphy}/>
                  </span>
                  <br/>
                  <span
                    style={{
                      color: '#787878',
                      fontSize: '0.8em'
                    }}>
                    <DomainText
                      schema='custom.lit_pet_top_bedrock'
                      id={item.lithology}/>
                  </span>
                  <br/>
                  <span
                    style={{
                      color: '#787878',
                      fontSize: '0.8em'
                    }}>
                    {item.depth_from} m ({item.msm_from} m)
                  </span>
                  <br/>
                  {item.depth_to} m ({item.msm_to} m)
                </Table.Cell>
                {
                _.isFunction(this.props.onDelete)?
                  <Table.Cell
                    collapsing
                  >
                    <Button icon size='mini' circular basic
                      onClick={(e)=>{
                        e.stopPropagation()
                        if(_.isFunction(this.props.onDelete)){
                          this.props.onDelete(item)
                        }
                      }}>
                      <Icon name='trash alternate outline' />
                    </Button>
                  </Table.Cell>: null
                }
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    )
  }
}

LayersList.propTypes = {
  // id: PropTypes.number,
  onSelected: PropTypes.func,
  onDelete: PropTypes.func,
  layers: PropTypes.array
}

LayersList.defaultProps = {
  layers: []
};


const mapStateToProps = (state, ownProps) => {
  return {
    domains: state.core_domain_list
  }
};

export default connect(
  mapStateToProps,
  null
)(LayersList); 
