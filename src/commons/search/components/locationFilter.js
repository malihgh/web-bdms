import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';
import { Form, Input } from 'semantic-ui-react';
import TranslationText from '../../form/translationText';
import LabelReset from '../../form/labelReset';
import DomainDropdown from '../../form/domain/dropdown/domainDropdown';
import MunicipalityDropdown from '../../form/municipality/dropdown/municipalityDropdown';
import CantonDropdown from '../../form/cantons/dropdown/cantonDropdown';
import DateField from '../../form/dateField';
import DomainText from '../../form/domain/domainText';

class LocationFilter extends Component {
  isVisible(filter) {
    const { settings } = this.props;
    if (_.get(settings, filter) === true) {
      return true;
    }
    return false;
  }
  render() {
    const { search, t } = this.props;
    return (
      <Form size="tiny">
        <Form.Field style={{ marginBottom: -10 }}>
          <label>
            <TranslationText id="borehole_identifier" />
          </label>
          <DomainDropdown
            // exclude={
            //   this.props.borehole.data.custom.identifiers?
            //   this.props.borehole.data.custom.identifiers.map(el => el.id): []
            // }
            onSelected={selected => {
              // this.setState({
              //   identifier: selected.id,
              // });
            }}
            schema="borehole_identifier"
            // selected={this.state.identifier}
          />
          <LabelReset
            onClick={() => {
              // this.props.setFilter('municipality', null);
            }}
          />
        </Form.Field>
        <Form.Field style={{ marginBottom: -10 }}>
          <label>
            <TranslationText id="original_name" />
          </label>
          <Input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            // icon={
            //   this.state['extended.original_name_check'] ===
            //     true &&
            //   this.state['extended.original_name_fetch'] === false
            //     ? 'check'
            //     : 'delete'
            // }
            iconPosition="left"
            // loading={this.state['extended.original_name_fetch']}
            onChange={e => {
              // this.check(
              //   'extended.original_name',
              //   e.target.value,
              // );
            }}
            spellCheck="false"
            // value={borehole.extended.original_name}
          />
          <LabelReset
            onClick={() => {
              // this.props.setFilter('municipality', null);
            }}
          />
        </Form.Field>
        <Form.Field
        // error={mentions.indexOf('project_name') >= 0}
        >
          <label>
            <TranslationText id="project_name" />
          </label>
          <Input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            // onChange={e => {
            //   this.updateChange(
            //     'custom.project_name',
            //     e.target.value,
            //   );
            // }}
            spellCheck="false"
            // value={borehole.custom.project_name}
          />
          <LabelReset
            onClick={() => {
              // this.props.setFilter('municipality', null);
            }}
          />
        </Form.Field>
        <Form.Field style={{ marginBottom: -10 }}>
          <label>
            <TranslationText id="alternate_name" />
          </label>
          <Input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            // icon={
            //   this.state['custom.alternate_name_check'] ===
            //     true &&
            //   this.state['custom.alternate_name_fetch'] === false
            //     ? 'check'
            //     : 'delete'
            // }
            iconPosition="left"
            // loading={this.state.alternate_name_fetch}
            onChange={e => {
              // this.check('custom.alternate_name', e.target.value);
            }}
            spellCheck="false"
            // value={borehole.custom.alternate_name}
          />
          <LabelReset
            onClick={() => {
              // this.props.setFilter('municipality', null);
            }}
          />
        </Form.Field>
        <Form.Field style={{ marginBottom: -10 }}>
          <label>
            <TranslationText id="restriction" />
          </label>
          <DomainDropdown
            onSelected={selected => {
              // this.updateChange('restriction', selected.id, false);
              // this.props.setFilter('restriction', selected);
            }}
            schema="restriction"
            selected={search.filter.restriction}
          />
          <LabelReset
            onClick={() => {
              // this.props.setFilter('municipality', null);
            }}
          />
        </Form.Field>
        <Form.Field style={{ marginBottom: -10 }}>
          <label>
            <TranslationText id="restriction_until" />
          </label>
          <DateField
            // date={borehole.restriction_until}
            onChange={selected => {
              // this.updateChange(
              //   'restriction_until',
              //   selected,
              //   false,
              // );
            }}
          />
          <LabelReset
            onClick={() => {
              // this.props.setFilter('municipality', null);
            }}
          />
        </Form.Field>

        <Form.Field style={{ marginBottom: -10 }}>
          <label>
            <TranslationText id="srs" />
          </label>

          <DomainText
            // id={borehole.srs}
            schema="srs"
          />
          <LabelReset
            onClick={() => {
              // this.props.setFilter('municipality', null);
            }}
          />
        </Form.Field>
        <Form.Field style={{ marginBottom: -10 }}>
          <label>
            <TranslationText id="qt_location" />
          </label>
          <DomainDropdown
            onSelected={selected => {
              // this.updateChange(
              //   'qt_location',
              //   selected.id,
              //   false,
              // );
            }}
            schema="qt_location"
            // selected={borehole.qt_location}
          />
          <LabelReset
            onClick={() => {
              // this.props.setFilter('municipality', null);
            }}
          />
        </Form.Field>

        <Form.Field style={{ marginBottom: -10 }}>
          <label>
            <TranslationText id="location_x" />
          </label>
          <Input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            // disabled={borehole.srs === null}
            onChange={e => {
              // this.updateNumber(
              //   'location_x',
              //   e.target.value === '' ? null : e.target.value,
              // );
            }}
            spellCheck="false"
            // value={
            //   _.isNil(borehole.location_x)
            //     ? ''
            //     : borehole.location_x
            // }
          />
          <LabelReset
            onClick={() => {
              // this.props.setFilter('municipality', null);
            }}
          />
        </Form.Field>
        <Form.Field style={{ marginBottom: -10 }}>
          <label>
            <TranslationText id="location_y" />
          </label>
          <Input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            // disabled={borehole.srs === null}
            // onChange={e => {

            // }}
            spellCheck="false"
            // value={
            //   _.isNil(borehole.location_y)
            //     ? ''
            //     : borehole.location_y
            // }
          />
          <LabelReset
            onClick={() => {
              // this.props.setFilter('municipality', null);
            }}
          />
        </Form.Field>

        <Form.Field style={{ marginBottom: -10 }}>
          <label>
            <TranslationText id="elevation_z" />
          </label>
          <Input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            // onChange={e => {

            // }}
            spellCheck="false"
            // value={
            //   _.isNil(borehole.elevation_z)
            //     ? ''
            //     : '' + borehole.elevation_z
            // }
          />
          <LabelReset
            onClick={() => {
              // this.props.setFilter('municipality', null);
            }}
          />
        </Form.Field>

        <Form.Field style={{ marginBottom: -10 }}>
          <label>
            <TranslationText id="qt_elevation" />
          </label>
          <DomainDropdown
            // onSelected={selected => {

            // }}
            schema="qt_elevation"
            // selected={borehole.qt_elevation}
          />
          <LabelReset
            onClick={() => {
              // this.props.setFilter('municipality', null);
            }}
          />
        </Form.Field>
        <Form.Field style={{ marginBottom: -10 }}>
          <label>
            <TranslationText id="reference_elevation" />
          </label>
          <Input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            // onChange={e => {
            //   this.updateNumber(
            //     'elevation_z',
            //     e.target.value === '' ? null : e.target.value,
            //   );

            // if (/^-?\d*[.,]?\d*$/.test(e.target.value)){
            //   this.updateChange(
            //     'elevation_z',
            //     e.target.value === '' ?
            //       null : _.toNumber(e.target.value)
            //   );
            // }
            // }}
            spellCheck="false"
            // value={
            //   _.isNil(borehole.elevation_z)
            //     ? ''
            //     : '' + borehole.elevation_z
            // }
          />
          <LabelReset
            onClick={() => {
              // this.props.setFilter('municipality', null);
            }}
          />
        </Form.Field>
        <Form.Field style={{ marginBottom: -10 }}>
          <label>
            <TranslationText id="reference_elevation_qt" />
          </label>
          <DomainDropdown
            onSelected={selected => {
              // this.updateChange(
              //   'qt_elevation',
              //   selected.id,
              //   false,
              // );
            }}
            schema="qt_elevation"
            // selected={borehole.qt_elevation}
          />
          <LabelReset
            onClick={() => {
              // this.props.setFilter('municipality', null);
            }}
          />
        </Form.Field>
        <Form.Field style={{ marginBottom: -10 }}>
          <label>
            <TranslationText id="reference_elevation_type" />
          </label>
          <DomainDropdown
            onSelected={selected => {
              // this.updateChange(
              //   'qt_elevation',
              //   selected.id,
              //   false,
              // );
            }}
            schema="qt_elevation"
            // selected={borehole.qt_elevation}
          />
          <LabelReset
            onClick={() => {
              // this.props.setFilter('municipality', null);
            }}
          />
        </Form.Field>
        <Form.Field style={{ marginBottom: -10 }}>
          <label>
            <TranslationText id="hrs" />
          </label>
          <DomainDropdown
            onSelected={selected => {
              // this.updateChange('hrs', selected.id, false);
            }}
            schema="hrs"
            // selected={borehole.hrs}
          />
          <LabelReset
            onClick={() => {
              // this.props.setFilter('municipality', null);
            }}
          />
        </Form.Field>

        <Form.Field style={{ marginBottom: -10 }}>
          <label>
            <TranslationText id="country" />
          </label>
          <Input value={'Switzerland'} />
          <LabelReset
            onClick={() => {
              // this.props.setFilter('municipality', null);
            }}
          />
        </Form.Field>
        <Form.Field style={{ marginBottom: -10 }}>
          <label>
            <TranslationText id="canton" />
          </label>
          <CantonDropdown
            onSelected={selected => {}}
            // selected={borehole.custom.canton}
          />
          <LabelReset
            onClick={() => {
              // this.props.setFilter('municipality', null);
            }}
          />
        </Form.Field>

        <Form.Field style={{ marginBottom: -10 }}>
          <label>
            <TranslationText id="city" />
          </label>
          <MunicipalityDropdown
          // canton={borehole.custom.canton}
          // disabled={borehole.custom.canton === null}
          // onSelected={selected => {
          //   this.updateChange(
          //     'custom.city',
          //     selected.id,
          //     false,
          //   );
          // }}
          // selected={borehole.custom.city}
          />
          <LabelReset
            onClick={() => {
              // this.props.setFilter('municipality', null);
            }}
          />
        </Form.Field>
      </Form>
    );
  }
}

LocationFilter.propTypes = {
  developer: PropTypes.object,
  setFilter: PropTypes.func,
  settings: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  return {
    developer: state.developer,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation(['common'])(LocationFilter));
