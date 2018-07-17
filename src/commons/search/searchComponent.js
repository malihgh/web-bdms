import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import _ from 'lodash'
import {
  Form,
  Input
} from 'semantic-ui-react'

import {
  setIdentifier
} from './searchActions'

import LabelReset from '../form/labelReset'

class SearchComponent extends React.Component {
  constructor(props) {
    super(props)
    this._setIdentifier = this._setIdentifier.bind(this)
  }
  _setIdentifier(event) {
    this.props.setIdentifier(event.target.value)
  }
  componentDidUpdate(prevProps){
    const {
      search,
      onChange
    } = this.props
    if(
        onChange !== undefined
        && !_.isEqual(
          search.filter, prevProps.search.filter
        )
    ){
      onChange({...search.filter})
    }
  }
  render() {
    const {search, t} = this.props;
    return (
      <Form size='small'>
        <Form.Field>
          <label>{t('identifier')}</label>
          <Input
            placeholder={t('identifier')}
            value={search.filter.identifier}
            onChange={this._setIdentifier}/>
          <LabelReset onClick={()=>{
            this.props.setIdentifier('')
          }}/>
        </Form.Field>
        <Form.Field>
          <label>Municipality</label>
          <Input placeholder='Last Name' />
          <LabelReset onClick={()=>{
            console.log('reset');
          }}/>
        </Form.Field>
      </Form>
    )
  }
}

SearchComponent.propTypes = {
  onChange: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    search: state.search
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    setIdentifier: (identifier) => {
      dispatch(setIdentifier(identifier))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate('search')(SearchComponent))
