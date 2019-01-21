import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import {
  loadDomains
} from '@ist-supsi/bmsjs'


class DomainText extends React.Component {

  componentDidMount(){
    const {
      domains,
      schema
    } = this.props
    if(!domains.data.hasOwnProperty(schema) && domains.isFetching === false){
      console.log('loading: ' + domains + " / " + this.props.schema);
      this.props.loadDomains()
    }
  }

  render() {
    const {
      domains,
      schema,
      id,
      i18n
    } = this.props
    if(id === null) return ''
    if(!domains.data.hasOwnProperty(schema)){
      if(domains.isFetching === true){
        return 'loading translations'
      }
      return ''
    }
    return (
      domains.data[schema].find(function(element) {
        return element.id === id
      })[i18n.language].text
    )
  }
}

DomainText.propTypes = {
  schema: PropTypes.string,
  id: PropTypes.number
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
)(
  translate('search')(DomainText)
)
