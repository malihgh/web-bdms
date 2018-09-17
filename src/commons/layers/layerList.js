import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

// import {
//   getLayers
// } from '@ist-supsi/bmsjs'

import {
  List,
  Button,
  Icon
} from 'semantic-ui-react'

class LayersList extends React.Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     isFetching: false,
  //     // Stratigraphy id
  //     id: props.hasOwnProperty('id')? props.id: null,
  //     selected: this.props.selected !== undefined?
  //       this.props.selected: null,
  //     layers: []
  //   }
  // }

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

  render(){
    const {
      layers
    } = this.props
    return (
      <List divided relaxed selection={_.isFunction(this.props.onSelected)}>
        {
          layers.map((layer, idx) => (
            <List.Item
              key={'lli-'+idx}
              onClick={()=>{
                if(_.isFunction(this.props.onSelected)){
                  this.props.onSelected(layer)
                }
              }}
              active={layer.id === this.props.selected}>
              {
                _.isFunction(this.props.onDelete)?
                <List.Content floated='right'>
                  <Button icon size='mini' circular basic
                    onClick={(e)=>{
                      e.stopPropagation()
                      if(_.isFunction(this.props.onDelete)){
                        this.props.onDelete(layer)
                      }
                    }}>
                    <Icon name='trash alternate outline' />
                  </Button>
                </List.Content>: null
              }
              <List.Content>
                <List.Header>Layer Type</List.Header>
                <List.Description>
                  {layer.depth_from} - {layer.depth_to}
                </List.Description>
              </List.Content>
            </List.Item>
          ))
        }
        {this.props.children}
      </List>
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
}

export default LayersList
