import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import _ from 'lodash'

import {
  loadDomains
} from '@ist-supsi/bmsjs'

import {
  Form,
  Header,
} from 'semantic-ui-react'

class DomainDropdown extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: this.props.selected,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    const {
      domains,
      schema
    } = this.props
    if(!domains.data.hasOwnProperty(schema) && domains.isFetching === false){
      this.props.loadDomains()
    }
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log(this.props.i18n.language, nextProps.i18n.language);
  //   if (this.props.domains.isFetching !== nextProps.domains.isFetching) {
  //     return true
  //   }else if (this.props.selected !== nextProps.selected) {
  //     return true
  //   }else if (this.props.i18n.language !== nextProps.i18n.language) {
  //     return true
  //   }
  //   // else if (nextProps.domains.data.hasOwnProperty(nextProps.schema)) {
  //   //   return true
  //   // }
  //   return false
  // }

  static getDerivedStateFromProps(nextProps, prevState){
    if (_.isNil(nextProps.selected)){
      if(nextProps.multiple === true) return  {selected: []}
      return {selected: ''}
    }else if (nextProps.selected !== prevState.select){
      return {selected: nextProps.selected}
    }
    return null
  }

  handleChange(event, data) {
    const {
      onSelected,
      domains,
      schema,
      multiple
    } = this.props
    if(multiple===true){
      const selection = []
      for (let i = 0; i < domains.data[schema].length; i++) {
        let h = domains.data[schema][i]
        for (var f = 0; f < data.value.length; f++) {
          const s = data.value[f]
          if(h.id === s){
            selection.push({...h})
          }
        }
      }
      this.setState({selected: data.value})
      if(onSelected!==undefined){
        onSelected(selection)
      }
    }else{
      for (let i = 0; i < domains.data[schema].length; i++) {
        let h = domains.data[schema][i]
        if(h.id === data.value){
          this.setState({selected: h.id})
          if(onSelected!==undefined){
            onSelected({...h})
          }
          break
        }
      }
    }
  }

  render() {
    const {
      domains,
      schema,
      i18n,
      search,
      multiple
    } = this.props, {
        selected
    } = this.state
    if(!domains.data.hasOwnProperty(schema)){
      return (
        <div style={{color: 'red'}}>
          "{schema}" not in codelist
        </div>
      )
    }
    return (
      <Form.Select
        fluid={true}
        search={search}
        multiple={multiple}
        options={
          domains.data[schema].map((domain) => ({
            key: "dom-opt-" + domain.id,
            value: domain.id,
            text: domain[i18n.language].text,
            content: <Header
              content={
                domain[i18n.language].text
              }
              subheader={domain[i18n.language].descr}/>
          }))
        }
        value={selected}
        onChange={this.handleChange}/>
    )
  }
}

DomainDropdown.propTypes = {
  schema: PropTypes.string,
  selected: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  onSelected: PropTypes.func,
  search: PropTypes.bool,
  multiple: PropTypes.bool
}

DomainDropdown.defaultProps = {
  search: false,
  multiple: false
}

const mapStateToProps = (state, ownProps) => {
  return {
    domains: state.core_domain_list
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    loadDomains: () => {
      dispatch(loadDomains())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((
   translate('search')(DomainDropdown)
))
