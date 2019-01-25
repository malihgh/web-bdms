import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import _ from 'lodash';
import {
  Form,
  Input,
  Radio
} from 'semantic-ui-react';

import LabelReset from '../../form/labelReset';
import DomainDropdown from '../../form/domain/dropdown/domainDropdown';
import DateField from '../../form/dateField';

class SearchEditorComponent extends React.Component {
  componentDidUpdate(prevProps){
    const {
      search,
      onChange
    } = this.props;
    if(
        onChange !== undefined
        && !_.isEqual(
          search.filter, prevProps.search.filter
        )
    ){
      onChange({...search.filter});
    }
  }
  render() {
    const {search, t} = this.props;
    return (
      <Form size='small'>
        {/*
        <Form.Field>
          <label>{t('borehole_form:project_name')}</label>
          <ProjectDropdown
            selected={search.filter.project}
            onSelected={(selected)=>{
              this.props.setProject(selected.id)
            }}
          />
          <LabelReset
            onClick={()=>{
              this.props.setProject('')
            }}
          />
        </Form.Field>
        */}
        <Form.Field >
          <label>{t('completness')}</label>
          <Radio
            label={t('all')}
            name='radioGroup'
            checked={search.filter.completness === 'all'}
            onChange={()=>{
              this.props.setCompletness('all')
            }}
          />
        </Form.Field>
        <Form.Field >
          <Radio
            label={t('complete')}
            name='radioGroup'
            checked={search.filter.completness === 'complete'}
            onChange={()=>{
              this.props.setCompletness('complete')
            }}
          />
        </Form.Field>
        <Form.Field >
          <Radio
            label={t('incomplete')}
            name='radioGroup'
            checked={search.filter.completness === 'incomplete'}
            onChange={()=>{
              this.props.setCompletness('incomplete')
            }}
          />
        </Form.Field>
        <Form.Field >
          <Radio
            label={t('empty')}
            name='radioGroup'
            checked={search.filter.completness === 'empty'}
            onChange={()=>{
              this.props.setCompletness('empty')
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Creation date</label>
          <DateField
            date={search.filter.creation}
            onChange={(selected)=>{
              this.props.setFilter(
                'creation', selected
              );
            }}
          />
          <LabelReset
            onClick={()=>{
              this.props.setFilter(
                'creation', ''
              );
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>{t('borehole_form:original_name')}</label>
          <Input
            placeholder={t('borehole_form:original_name')}
            value={search.filter.original_name}
            onChange={(e)=>{
              this.props.setOriginalName(e.target.value)
            }}/>
          <LabelReset onClick={()=>{
            this.props.setOriginalName('')
          }}/>
        </Form.Field>
        <Form.Field>
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
        <Form.Field>
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
        {/*
        <Form.Field>
          <label>{t('last_update')} ({t('borehole_form:date_format')})</label>
          <DateField
            date={search.filter.last_update}
            onChange={(selected)=>{
              this.props.setLastUpdate(selected)
            }} />
            <LabelReset
              onClick={()=>{
                this.props.setLastUpdate('')
              }}
            />
        </Form.Field>
        <Form.Field>
          <label>{t('creation')} ({t('borehole_form:date_format')})</label>
          <DateField
            date={search.filter.creation}
            onChange={(selected)=>{
              this.props.setCreation(selected)
            }} />
            <LabelReset
              onClick={()=>{
                this.props.setCreation('')
              }}
            />
        </Form.Field>
        */}
      </Form>
    )
  }
}

SearchEditorComponent.propTypes = {
  onChange: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    search: state.searchEditor
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    setFilter: (key, value) => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_CHANGED',
        key: key,
        value: value
      });
    },
    setCompletness: (completness) => {
      dispatch({
        type: 'SEARCH_EDITOR_COMPLETNESS_CHANGED',
        completness: completness
      })
    },
    setProject: (id) => {
      dispatch({
        type: 'SEARCH_EDITOR_PROJECT_CHANGED',
        id: id
      })
    },
    setOriginalName: (text) => {
      dispatch({
        type: 'SEARCH_EDITOR_ORIGINALNAME_CHANGED',
        original_name: text
      })
    },
    setLastUpdate: (date) => {
      dispatch({
        type: 'SEARCH_EDITOR_LASTUPDATE_CHANGED',
        date: date
      })
    },
    setCreation: (date) => {
      dispatch({
        type: 'SEARCH_EDITOR_CREATION_CHANGED',
        date: date
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate(['search', 'borehole_form'])(SearchEditorComponent))
