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
import MunicipalityDropdown from '../../form/municipality/dropdown/municipalityDropdown';
import CantonDropdown from '../../form/cantons/dropdown/cantonDropdown';
import DateField from '../../form/dateField';

class SearchEditorComponent extends React.Component {
  componentDidUpdate(prevProps){
    const {
      search,
      onChange
    } = this.props;
    if (
      onChange !== undefined
      && !_.isEqual(
        search.filter, prevProps.search.filter
      )
    ){
      onChange({ ...search.filter });
    }
  }
  isVisible(filter) {
    const { search, settings } = this.props;
    if (search.advanced === true) {
      return true;
    }
    if (_.get(settings.data.efilter, filter) === true) {
      return true;
    }
    return false;
  }
  render() {
    const { search, t } = this.props;
    return (
      <Form size='tiny'>
        <Form.Field >
          <label>{t('completness')}</label>
          <Radio
            checked={search.filter.completness === 'all'}
            label={t('all')}
            name='radioGroup'
            onChange={()=>{
              this.props.setCompletness('all');
            }}
          />
        </Form.Field>
        <Form.Field >
          <Radio
            checked={search.filter.completness === 'complete'}
            label={t('complete')}
            name='radioGroup'
            onChange={()=>{
              this.props.setCompletness('complete');
            }}
          />
        </Form.Field>
        <Form.Field >
          <Radio
            checked={search.filter.completness === 'incomplete'}
            label={t('incomplete')}
            name='radioGroup'
            onChange={()=>{
              this.props.setCompletness('incomplete');
            }}
          />
        </Form.Field>
        <Form.Field >
          <Radio
            checked={search.filter.completness === 'empty'}
            label={t('empty')}
            name='radioGroup'
            onChange={()=>{
              this.props.setCompletness('empty');
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
        {
          this.isVisible('extended.original_name') ?
            <Form.Field>
              <label>{t('borehole_form:original_name')}</label>
              <Input
                onChange={(e)=>{
                  this.props.setFilter(
                    'original_name',
                    e.target.value
                  );
                }}
                placeholder={t('borehole_form:original_name')}
                value={search.filter.original_name}
              />
              <LabelReset
                onClick={()=>{
                  this.props.setFilter('original_name', '');
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('custom.public_name') ?
            <Form.Field>
              <label>{t('borehole_form:public_name')}</label>
              <Input
                onChange={(eve) => {
                  this.props.setFilter(
                    'public_name',
                    eve.target.value
                  );
                }}
                placeholder={t('borehole_form:public_name')}
                value={search.filter.public_name}
              />
              <LabelReset
                onClick={() => {
                  this.props.setFilter(
                    'public_name', ''
                  );
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('kind') ?
            <Form.Field>
              <label>{t('borehole_form:kind')}</label>
              <DomainDropdown
                onSelected={(selected)=>{
                  this.props.setFilter(
                    'kind', selected.id
                  );
                }}
                reset={false}
                schema='kind'
                selected={search.filter.kind}
              />
              <LabelReset
                onClick={()=>{
                  this.props.setFilter(
                    'kind', null
                  );
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('extended.method') ?
            <Form.Field>
              <label>{t('borehole_form:method')}</label>
              <DomainDropdown
                onSelected={(selected) => {
                  this.props.setFilter(
                    'method', selected.id
                  );
                }}
                reset={false}
                schema='extended.method'
                selected={search.filter.method}
              />
              <LabelReset
                onClick={() => {
                  this.props.setFilter(
                    'method', null
                  );
                }}
              />
            </Form.Field> : null
        }
        {
          this.isVisible('custom.project_name') ?
            <Form.Field>
              <label>{t('borehole_form:project_name')}</label>
              <Input
                onChange={(eve) => {
                  this.props.setFilter(
                    'project_name',
                    eve.target.value
                  );
                }}
                placeholder={t('borehole_form:project_name')}
                value={search.filter.project_name}
              />
              <LabelReset
                onClick={() => {
                  this.props.setFilter(
                    'project_name', ''
                  );
                }}
              />
            </Form.Field> : null
        }
        {
          this.isVisible('restriction') ?
            <Form.Field>
              <label>{t('borehole_form:restriction')}</label>
              <DomainDropdown
                onSelected={(selected) => {
                  this.props.setFilter(
                    'restriction', selected.id
                  );
                }}
                reset={false}
                schema='restriction'
                selected={search.filter.restriction}
              />
              <LabelReset
                onClick={() => {
                  this.props.setFilter(
                    'restriction', null
                  );
                }}
              />
            </Form.Field> : null
        }
        {
          this.isVisible('custom.landuse') ?
            <Form.Field>
              <label>{t('borehole_form:landuse')}</label>
              <DomainDropdown
                onSelected={(selected) => {
                  this.props.setFilter(
                    'landuse', selected.id
                  );
                }}
                reset={false}
                schema='custom.landuse'
                selected={search.filter.landuse}
              />
              <LabelReset
                onClick={() => {
                  this.props.setFilter(
                    'landuse', null
                  );
                }}
              />
            </Form.Field> : null
        }
        {
          this.isVisible('restriction') ?
            <Form.Field>
              <label>{t('borehole_form:restriction_until')} (
                {t('borehole_form:date_format')})</label>
              <DateField
                date={search.filter.restriction_until_from}
                onChange={(selected) => {
                  this.props.setFilter(
                    'restriction_until_from', selected
                  );
                }}
                placeholder='After this date'
              />
              <DateField
                date={search.filter.restriction_until_to}
                onChange={(selected) => {
                  this.props.setFilter(
                    'restriction_until_to', selected
                  );
                }}
                placeholder='Before this date'
              />
              <LabelReset
                onClick={() => {
                  this.props.resetRestriction();
                }}
              />
            </Form.Field> : null
        }
        {
          this.isVisible('elevation_z') ?
            <Form.Field>
              <label>{t('borehole_form:elevation_z')}</label>
              <Input
                onChange={(eve) => {
                  this.props.setFilter(
                    'elevation_z_from',
                    eve.target.value
                  );
                }}
                placeholder='Elevation from meters'
                type='number'
                value={search.filter.elevation_z_from}
              />
              <Input
                onChange={(eve) => {
                  this.props.setFilter(
                    'elevation_z_to',
                    eve.target.value
                  );
                }}
                placeholder='Elevation to meters'
                type='number'
                value={search.filter.elevation_z_to}
              />
              <LabelReset
                onClick={() => {
                  this.props.resetElevation();
                }}
              />
            </Form.Field> : null
        }
        {
          this.isVisible('length') ?
            <Form.Field>
              <label>{t('borehole_form:length')}</label>
              <Input
                onChange={(eve) => {
                  this.props.setFilter(
                    'length_from',
                    eve.target.value
                  );
                }}
                placeholder='Depth from meters'
                type='number'
                value={search.filter.length_from}
              />
              <Input
                onChange={(eve) => {
                  this.props.setFilter(
                    'length_to',
                    eve.target.value
                  );
                }}
                placeholder='Depth to meters'
                type='number'
                value={search.filter.length_to}
              />
              <LabelReset
                onClick={() => {
                  this.props.resetDepth();
                }}
              />
            </Form.Field> : null
        }
        {
          this.isVisible('extended.groundwater') ?
            <Form.Field>
              <label>{t('borehole_form:groundwater')}</label>
              <Form.Group inline>
                <Form.Radio
                  checked={search.filter.groundwater === true}
                  label={t('common:yes')}
                  onChange={(e, d) => {
                    this.props.setFilter('groundwater', true);
                  }}
                />
                <Form.Radio
                  checked={search.filter.groundwater === false}
                  label={t('common:no')}
                  onChange={(e, d) => {
                    this.props.setFilter('groundwater', false);
                  }}
                />
              </Form.Group>
              <Form.Radio
                checked={search.filter.groundwater === null}
                label={t('common:np')}
                onChange={(e, d) => {
                  this.props.setFilter('groundwater', null);
                }}
              />
              <LabelReset
                onClick={() => {
                  this.props.setFilter('groundwater', -1);
                }}
              />
            </Form.Field> : null
        }
        {
          this.isVisible('extended.top_bedrock') ?
            <Form.Field>
              <label>{t('borehole_form:top_bedrock')}</label>
              <Input
                onChange={(eve) => {
                  this.props.setFilter(
                    'top_bedrock_from',
                    eve.target.value
                  );
                }}
                placeholder='From meters'
                type='number'
                value={search.filter.top_bedrock_from}
              />
              <Input
                onChange={(eve) => {
                  this.props.setFilter(
                    'top_bedrock_to',
                    eve.target.value
                  );
                }}
                placeholder='To meters'
                type='number'
                value={search.filter.top_bedrock_to}
              />
              <LabelReset
                onClick={() => {
                  this.props.resetTotBedrock();
                }}
              />
            </Form.Field> : null
        }
        {
          this.isVisible('extended.status') ?
            <Form.Field>
              <label>{t('borehole_form:status')}</label>
              <DomainDropdown
                onSelected={(selected) => {
                  this.props.setFilter(
                    'status', selected.id
                  );
                }}
                reset={false}
                schema='extended.status'
                selected={search.filter.status}
              />
              <LabelReset
                onClick={() => {
                  this.props.setFilter(
                    'status', null
                  );
                }}
              />
            </Form.Field> : null
        }
        {
          this.isVisible('extended.purpose') ?
            <Form.Field>
              <label>{t('borehole_form:purpose')}</label>
              <DomainDropdown
                onSelected={(selected) => {
                  this.props.setFilter(
                    'purpose', selected.id
                  );
                }}
                reset={false}
                schema='extended.purpose'
                selected={search.filter.purpose}
              />
              <LabelReset
                onClick={() => {
                  this.props.setFilter(
                    'purpose', null
                  );
                }}
              />
            </Form.Field> : null
        }
        {
          this.isVisible('custom.cuttings') ?
            <Form.Field>
              <label>{t('borehole_form:cuttings')}</label>
              <DomainDropdown
                onSelected={(selected) => {
                  this.props.setFilter(
                    'cuttings', selected.id
                  );
                }}
                reset={false}
                schema='custom.cuttings'
                selected={search.filter.cuttings}
              />
              <LabelReset
                onClick={() => {
                  this.props.setFilter(
                    'cuttings', null
                  );
                }}
              />
            </Form.Field> : null
        }
        {
          this.isVisible('drilling_date') ?
            <Form.Field>
              <label>{t('borehole_form:drilling_date')} (
                {t('borehole_form:date_format')})</label>
              <DateField
                date={search.filter.drilling_date_from}
                onChange={(selected) => {
                  this.props.setFilter(
                    'drilling_date_from', selected
                  );
                }}
                placeholder='After this date'
              />
              <DateField
                date={search.filter.drilling_date_to}
                onChange={(selected) => {
                  this.props.setFilter(
                    'drilling_date_to', selected
                  );
                }}
                placeholder='Before this date'
              />
              <LabelReset
                onClick={() => {
                  this.props.resetDrilling();
                }}
              />
            </Form.Field> : null
        }
        {
          this.isVisible('custom.drill_diameter') ?
            <Form.Field>
              <label>{t('borehole_form:drill_diameter')}</label>
              <Input
                onChange={(eve) => {
                  this.props.setFilter(
                    'drill_diameter_from',
                    eve.target.value
                  );
                }}
                placeholder='From meters'
                type='number'
                value={search.filter.drill_diameter_from}
              />
              <Input
                onChange={(eve) => {
                  this.props.setFilter(
                    'drill_diameter_to',
                    eve.target.value
                  );
                }}
                placeholder='To meters'
                type='number'
                value={search.filter.drill_diameter_to}
              />
              <LabelReset
                onClick={() => {
                  this.props.resetDrillDiameter();
                }}
              />
            </Form.Field> : null
        }
        {
          this.isVisible('bore_inc') ?
            <Form.Field>
              <label>{t('borehole_form:bore_inc')}</label>
              <Input
                onChange={(eve) => {
                  this.props.setFilter(
                    'bore_inc_from',
                    eve.target.value
                  );
                }}
                placeholder={t('common:from') + " " + t('common:degree')}
                type='number'
                value={search.filter.bore_inc_from}
              />
              <Input
                onChange={(eve) => {
                  this.props.setFilter(
                    'bore_inc_to',
                    eve.target.value
                  );
                }}
                placeholder={t('common:to') + " " + t('common:degree')}
                type='number'
                value={search.filter.bore_inc_to}
              />
              <LabelReset
                onClick={() => {
                  this.props.resetBoreInc();
                }}
              />
            </Form.Field> : null
        }
        {
          this.isVisible('bore_inc_dir') ?
            <Form.Field>
              <label>{t('borehole_form:bore_inc_dir')}</label>
              <Input
                onChange={(eve) => {
                  this.props.setFilter(
                    'bore_inc_dir_from',
                    eve.target.value
                  );
                }}
                placeholder={t('common:from') + " " + t('common:degree')}
                type='number'
                value={search.filter.bore_inc_dir_from}
              />
              <Input
                onChange={(eve) => {
                  this.props.setFilter(
                    'bore_inc_dir_to',
                    eve.target.value
                  );
                }}
                placeholder={t('common:to') + " " + t('common:degree')}
                type='number'
                value={search.filter.bore_inc_dir_to}
              />
              <LabelReset
                onClick={() => {
                  this.props.resetBoreIncDir();
                }}
              />
            </Form.Field> : null
        }
        {
          this.isVisible('custom.lit_pet_top_bedrock') ?
            <Form.Field>
              <label>{t('borehole_form:lit_pet_top_bedrock')}</label>
              <DomainDropdown
                onSelected={(selected) => {
                  this.props.setFilter(
                    'lit_pet_top_bedrock', selected.id
                  );
                }}
                reset={false}
                schema='custom.lit_pet_top_bedrock'
                selected={search.filter.lit_pet_top_bedrock}
              />
              <LabelReset
                onClick={() => {
                  this.props.setFilter(
                    'lit_pet_top_bedrock', null
                  );
                }}
              />
            </Form.Field> : null
        }
        {
          this.isVisible('custom.lit_str_top_bedrock') ?
            <Form.Field>
              <label>{t('borehole_form:lit_str_top_bedrock')}</label>
              <DomainDropdown
                onSelected={(selected) => {
                  this.props.setFilter(
                    'lit_str_top_bedrock', selected.id
                  );
                }}
                reset={false}
                schema='custom.lit_str_top_bedrock'
                selected={search.filter.lit_str_top_bedrock}
              />
              <LabelReset
                onClick={() => {
                  this.props.setFilter(
                    'lit_str_top_bedrock', null
                  );
                }}
              />
            </Form.Field> : null
        }
        {
          this.isVisible('custom.chro_str_top_bedrock') ?
            <Form.Field>
              <label>{t('borehole_form:chro_str_top_bedrock')}</label>
              <DomainDropdown
                onSelected={(selected) => {
                  this.props.setFilter(
                    'chro_str_top_bedrock', selected.id
                  );
                }}
                reset={false}
                schema='custom.chro_str_top_bedrock'
                selected={search.filter.chro_str_top_bedrock}
              />
              <LabelReset
                onClick={() => {
                  this.props.setFilter(
                    'chro_str_top_bedrock', null
                  );
                }}
              />
            </Form.Field> : null
        }
        {
          this.isVisible('custom.canton') ?
            <Form.Field>
              <label>{t('borehole_form:canton')}</label>
              <CantonDropdown
                onSelected={(selected) => {
                  if (search.filter.municipality !== null) {
                    this.props.setFilter(
                      'municipality', null
                    );
                  }
                  this.props.setFilter(
                    'canton', selected.id
                  );
                }}
                selected={search.filter.canton}
              />
              <LabelReset
                onClick={() => {
                  this.props.setFilter(
                    'canton', null
                  );
                }}
              />
            </Form.Field> : null
        }
        {
          this.isVisible('custom.canton') ?
            <Form.Field>
              <label>Municipality</label>
              <MunicipalityDropdown
                canton={search.filter.canton}
                disabled={search.filter.canton === null}
                onSelected={(selected) => {
                  this.props.setFilter(
                    'municipality', selected.id
                  );
                }}
                selected={search.filter.municipality}
              />
              <LabelReset
                onClick={() => {
                  this.props.setFilter(
                    'municipality', null
                  );
                }}
              />
            </Form.Field>: null
        }
        {
          this.isVisible('custom.canton') ?
            <Form.Field>
              <label>{t('borehole_form:address')}</label>
              <Input
                onChange={(eve) => {
                  this.props.setFilter(
                    'address',
                    eve.target.value
                  );
                }}
                placeholder={t('borehole_form:address')}
                value={search.filter.address}
              />
              <LabelReset
                onClick={() => {
                  this.props.setFilter(
                    'address', ''
                  );
                }}
              />
            </Form.Field> : null
        }
      </Form>
    );
  }
}

SearchEditorComponent.propTypes = {
  onChange: PropTypes.func,
  resetBoreInc: PropTypes.func,
  resetBoreIncDir: PropTypes.func,
  resetDrillDiameter: PropTypes.func,
  resetDrilling: PropTypes.func,
  resetElevation: PropTypes.func,
  resetRestriction: PropTypes.func,
  resetTotBedrock: PropTypes.func,
  search: PropTypes.object,
  setFilter: PropTypes.func,
  settings: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    search: state.searchEditor,
    settings: state.setting
  };
};

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
    resetRestriction: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_RESET_RESTRICTION'
      });
    },
    resetElevation: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_RESET_ELEVATION'
      });
    },
    resetTotBedrock: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_RESET_TOP_BEDROCK'
      });
    },
    resetDrilling: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_RESET_DRILLING'
      });
    },
    resetDrillDiameter: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_RESET_DRILL_DIAMETER'
      });
    },
    resetBoreInc: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_RESET_BORE_INC'
      });
    },
    resetBoreIncDir: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_RESET_BORE_INC_DIR'
      });
    },

    setCompletness: (completness) => {
      dispatch({
        type: 'SEARCH_EDITOR_COMPLETNESS_CHANGED',
        completness: completness
      });
    },
    setProject: (id) => {
      dispatch({
        type: 'SEARCH_EDITOR_PROJECT_CHANGED',
        id: id
      });
    },
    setLastUpdate: (date) => {
      dispatch({
        type: 'SEARCH_EDITOR_LASTUPDATE_CHANGED',
        date: date
      });
    },
    setCreation: (date) => {
      dispatch({
        type: 'SEARCH_EDITOR_CREATION_CHANGED',
        date: date
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate(['search', 'borehole_form'])(SearchEditorComponent));
