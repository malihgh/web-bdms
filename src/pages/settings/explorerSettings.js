import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import {
  Checkbox,
  Form,
  Header,
  Segment,
} from 'semantic-ui-react';

import {
  patchSettings
} from '@ist-supsi/bmsjs';

class ExplorerSettings extends React.Component {
  render() {
    const {
      setting, t, toggleFilter
    } = this.props;
    return (
      <div>
        <Header as='h3' attached='top'>
          Location
        </Header>
        <Segment attached>
          <Form>
            <Form.Field inline>
              <Checkbox
                checked={setting.filter.mapfilter}
                onChange={(e, d)=>{
                  toggleFilter(
                    'mapfilter',
                    d.checked
                  );
                }}/>
              <label>Filter by Map</label>
            </Form.Field>
            <Form.Field inline>
              <Checkbox
                checked={
                  setting.filter.extended.original_name
                }
                onChange={(e, d)=>{
                  toggleFilter(
                    'extended.original_name',
                    d.checked
                  );
                }}/>
              <label>{t('original_name')}</label>
            </Form.Field>
            <Form.Field inline>
              <Checkbox
                checked={
                  setting.filter.custom.public_name
                }
                onChange={(e, d)=>{
                  toggleFilter(
                    'custom.public_name',
                    d.checked
                  );
                }}/>
              <label>{t('public_name')}</label>
            </Form.Field>
            <Form.Field inline>
              <Checkbox
                checked={
                  setting.filter.kind
                }
                onChange={(e, d)=>{
                  toggleFilter(
                    'kind',
                    d.checked
                  );
                }}/>
              <label>{t('kind')}</label>
            </Form.Field>
            <Form.Field inline>
              <Checkbox
                checked={
                  setting.filter.custom.project_name
                }
                onChange={(e, d)=>{
                  toggleFilter(
                    'custom.project_name',
                    d.checked
                  )
                }}/>
              <label>{t('project_name')}</label>
            </Form.Field>
            <Form.Field inline>
              <Checkbox
                checked={
                  setting.filter.restriction
                }
                onChange={(e, d)=>{
                  toggleFilter(
                    'restriction',
                    d.checked
                  )
                }}/>
              <label>{t('restriction')}</label>
            </Form.Field>
            <Form.Field inline>
              <Checkbox
                checked={
                  setting.filter.restriction_until
                }
                onChange={(e, d)=>{
                  toggleFilter(
                    'restriction_until',
                    d.checked
                  )
                }}/>
              <label>{t('restriction_until')}</label>
            </Form.Field>
            <Form.Field inline>
              <Checkbox
                checked={
                  setting.filter.custom.canton
                }
                onChange={(e, d)=>{
                  toggleFilter(
                    'custom.canton',
                    d.checked
                  )
                }}/>
              <label>{t('canton')}</label>
            </Form.Field>
            <Form.Field inline>
              <Checkbox
                checked={
                  setting.filter.custom.city
                }
                onChange={(e, d)=>{
                  toggleFilter(
                    'custom.city',
                    d.checked
                  )
                }}/>
              <label>{t('city')}</label>
            </Form.Field>
            <Form.Field inline>
              <Checkbox
                checked={
                  setting.filter.custom.landuse
                }
                onChange={(e, d)=>{
                  toggleFilter(
                    'custom.landuse',
                    d.checked
                  )
                }}/>
              <label>{t('landuse')}</label>
            </Form.Field>
          </Form>
        </Segment>
        <Header as='h3' attached='top'>
          Borehole
        </Header>
        <Segment attached>
          <Form>
            <Form.Field inline>
              <Checkbox
                checked={
                  setting.filter.extended.method
                }
                onChange={(e, d)=>{
                  toggleFilter(
                    'extended.method',
                    d.checked
                  );
                }}/>
                <label>{t('method')}</label>
            </Form.Field>
            <Form.Field inline>
              <Checkbox
                checked={
                  setting.filter.drilling_date
                }
                onChange={(e, d)=>{
                  toggleFilter(
                    'drilling_date',
                    d.checked
                  );
                }}/>
                <label>{t('drilling_date')}</label>
            </Form.Field>
            <Form.Field inline>
              <Checkbox
                checked={
                  setting.filter.custom.cuttings
                }
                onChange={(e, d)=>{
                  toggleFilter(
                    'custom.cuttings',
                    d.checked
                  );
                }}/>
                <label>{t('cuttings')}</label>
            </Form.Field>
            <Form.Field inline>
              <Checkbox
                checked={
                  setting.filter.extended.purpose
                }
                onChange={(e, d)=>{
                  toggleFilter(
                    'extended.purpose',
                    d.checked
                  );
                }}/>
                <label>{t('purpose')}</label>
            </Form.Field>
          </Form>
        </Segment>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    setting: state.setting.data
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    toggleFilter: (filter, enabled) => {
      
      dispatch(patchSettings(`filter.${filter}`, enabled));

      // dispatch({
      //   type: 'SETTING_TOGGLE_FILTER',
      //   filter: filter,
      //   enabled: enabled
      // })
    },
    patchSettings: (filter, enabled) => {
      dispatch(patchSettings(`filter.${filter}`, enabled));
    }
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(translate(['borehole_form', 'common'])(ExplorerSettings));
