import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import _ from 'lodash';
import {
  Form,
  Input,
  Checkbox
} from 'semantic-ui-react';

import LabelReset from '../form/labelReset';
import DomainDropdown from '../form/domain/dropdown/domainDropdown';
import MunicipalityDropdown from '../form/municipality/dropdown/municipalityDropdown';

class SearchComponent extends React.Component {
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
    const {search, setting, t} = this.props;
    return (
      <Form size='small'>
        <Form.Field
          style={{
            display: (
              search.advanced === true
              || setting.mapfilter === true
            )? null: 'none'
          }}
        >
          <label>Filter by Map</label>
          <Checkbox
            toggle
            checked={search.mapfilter}
            onChange={(e, d)=>{
              this.props.setmapfilter(d.checked)
            }}/>
        </Form.Field>
        <Form.Field
          style={{
            display: (
              search.advanced === true
              || setting.zoom2selected === true
            )? null: 'none'
          }}
        >
          <label>Center to selected</label>
          <Checkbox
            toggle
            checked={search.zoom2selected}
            onChange={(e, d)=>{
              this.props.setzoom2filter(d.checked)
            }}/>
        </Form.Field>
        <Form.Field
          style={{
            display: (
              search.advanced === true
              || setting.extended.original_name === true
            )? null: 'none'
          }}
        >
          <label>{t('borehole_form:original_name')}</label>
          <Input
            placeholder={t('borehole_form:original_name')}
            value={search.filter.identifier}
            onChange={(eve)=>{
              this.props.setFilter(
                'identifier',
                eve.target.value
              )
            }}/>
          <LabelReset onClick={()=>{
              this.props.setFilter(
                'identifier', ''
              )
          }}/>
        </Form.Field>
        <Form.Field
          style={{
            display: (
              search.advanced === true
              || setting.kind === true
            )? null: 'none'
          }}
        >
          <label>{t('borehole_form:kind')}</label>
          <DomainDropdown
            schema='kind'
            selected={search.filter.kind}
            onSelected={(selected)=>{
              this.props.setFilter(
                'kind', selected.id
              );
            }}
            reset={false}
          />
          <LabelReset
            onClick={()=>{
              this.props.setFilter(
                'kind', null
              );
            }}
          />
        </Form.Field>
        <Form.Field
          style={{
            display: (
              search.advanced === true
              || setting.restriction === true
            )? null: 'none'
          }}
        >
          <label>{t('borehole_form:restriction')}</label>
          <DomainDropdown
            schema='restriction'
            selected={search.filter.restriction}
            onSelected={(selected)=>{
              this.props.setFilter(
                'restriction', selected.id
              );
            }}
            reset={false}
          />
          <LabelReset
            onClick={()=>{
              this.props.setFilter(
                'restriction', null
              );
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>{t('borehole_form:status')}</label>
          <DomainDropdown
            schema='extended.status'
            selected={search.filter.status}
            onSelected={(selected)=>{
              this.props.setFilter(
                'status', selected.id
              );
            }}
            reset={false}
          />
          <LabelReset
            onClick={()=>{
              this.props.setFilter(
                'status', null
              );
            }}
          />
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
    search: state.search,
    setting: state.setting.data.filter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    setmapfilter: (active) => {
      dispatch({
        type: 'SEARCH_MAPFILTER_CHANGED',
        active: active
      });
    },
    setzoom2filter: (active) => {
      dispatch({
        type: 'SEARCH_ZOOM2_CHANGED',
        active: active
      });
    },
    setFilter: (key, value) => {
      dispatch({
        type: 'SEARCH_FILTER_CHANGED',
        key: key,
        value: value
      });
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate(['search', 'borehole_form'])(SearchComponent))
