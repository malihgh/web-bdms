import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import _ from 'lodash'
import {
  Form,
  Input,
  Checkbox
} from 'semantic-ui-react'

import {
  setIdentifier,
  setKind,
  setRestriction,
  setStatus
} from './searchActions'

import LabelReset from '../form/labelReset'
import DomainDropdown from '../form/domain/dropdown/domainDropdown'
import MunicipalityDropdown from '../form/municipality/dropdown/municipalityDropdown'

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
        <Form.Field >
          <label>Filter by Map</label>
          <Checkbox
            toggle
            checked={search.mapfilter}
            onChange={(e, d)=>{
              this.props.setmapfilter(d.checked)
            }}/>
        </Form.Field>
        <Form.Field>
          <label>{t('borehole_form:original_name')}</label>
          <Input
            placeholder={t('borehole_form:original_name')}
            value={search.filter.identifier}
            onChange={this._setIdentifier}/>
          <LabelReset onClick={()=>{
            this.props.setIdentifier('')
          }}/>
        </Form.Field>
        <Form.Field>
          <label>{t('borehole_form:kind')}</label>
          <DomainDropdown
            schema='kind'
            selected={search.filter.kind}
            onSelected={(selected)=>{
              this.props.setKind(selected.id)
            }}/>
          <LabelReset onClick={()=>{
            this.props.setKind(null)
          }}/>
        </Form.Field>
        <Form.Field>
          <label>{t('borehole_form:restriction')}</label>
          <DomainDropdown
            schema='restriction'
            selected={search.filter.restriction}
            onSelected={(selected)=>{
              this.props.setRestriction(selected.id)
            }}/>
          <LabelReset onClick={()=>{
            this.props.setRestriction(null)
          }}/>
        </Form.Field>
        <Form.Field>
          <label>{t('borehole_form:status')}</label>
          <DomainDropdown
            schema='extended.status'
            selected={search.filter.status}
            onSelected={(selected)=>{
              this.props.setStatus(selected.id)
            }}/>
          <LabelReset onClick={()=>{
            this.props.setStatus(null)
          }}/>
        </Form.Field>
        <Form.Field>
          <label>Municipality</label>
          <MunicipalityDropdown/>
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
    setmapfilter: (active) => {
      dispatch({
        type: 'SEARCH_MAPFILTER_CHANGED',
        active: active
      })
      // if(active === false){
      //   dispatch({
      //     type: 'SEARCH_EXTENT_CHANGED',
      //     extent: null
      //   })
      // }
    },
    setIdentifier: (identifier) => {
      dispatch(setIdentifier(identifier))
    },
    setKind: (id) => {
      dispatch(setKind(id))
    },
    setRestriction: (id) => {
      dispatch(setRestriction(id))
    },
    setStatus: (id) => {
      dispatch(setStatus(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate(['search', 'borehole_form'])(SearchComponent))
