/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';
import { Icon, Form, Input, Checkbox } from 'semantic-ui-react';

import LabelReset from '../form/labelReset';
import DomainDropdown from '../form/domain/dropdown/domainDropdown';
import DomainTree from '../form/domain/tree/domainTree';
import MunicipalityDropdown from '../form/municipality/dropdown/municipalityDropdown';
import CantonDropdown from '../form/cantons/dropdown/cantonDropdown';
import DateField from '../form/dateField';
import TranslationText from '../form/translationText';

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBoreholeSelectorOpen: false,
      isStratigraphySelectorOpen: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { search, onChange } = this.props;
    this.isVisible = this.isVisible.bind(this);
    if (
      onChange !== undefined &&
      !_.isEqual(search.filter, prevProps.search.filter)
    ) {
      onChange({ ...search.filter });
    }
  }
  isVisible(filter) {
    const { search, settings } = this.props;
    if (search.advanced === true) {
      return true;
    }
    if (_.get(settings.data.filter, filter) === true) {
      return true;
    }
    return false;
  }
  render() {
    const { search, settings, t } = this.props;
    const filter = settings.data.filter;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 100%',
          overflow: 'hidden',
        }}>
        <Form size="tiny">
          {settings.data.appearance.explorer === 0
            ? null
            : [
                <Form.Field
                  key="msc-1"
                  style={{
                    display:
                      search.advanced === true || filter.mapfilter === true
                        ? null
                        : 'none',
                  }}>
                  <label>
                    <TranslationText id="filterbymap" />
                  </label>
                  <Checkbox
                    checked={search.mapfilter}
                    onChange={(e, d) => {
                      this.props.setmapfilter(d.checked);
                    }}
                    toggle
                  />
                </Form.Field>,
                <Form.Group
                  key="msc-2"
                  style={{
                    display:
                      search.advanced === true || filter.zoom2selected === true
                        ? null
                        : 'none',
                  }}
                  widths="equal">
                  <Form.Field>
                    <label
                      style={{
                        whiteSpace: 'nowrap',
                      }}>
                      <TranslationText id="centerselected" />
                    </label>
                    <Checkbox
                      checked={search.center2selected}
                      onChange={(e, d) => {
                        this.props.setcenter2filter(d.checked);
                      }}
                      toggle
                    />
                  </Form.Field>
                  <Form.Field
                    style={{
                      textAlign: 'right',
                      display: search.center2selected === true ? null : 'none',
                    }}>
                    <label>
                      <TranslationText id="andzoom" />
                    </label>
                    <Checkbox
                      checked={search.zoom2selected}
                      onChange={(e, d) => {
                        this.props.setzoom2filter(d.checked);
                      }}
                      toggle
                    />
                  </Form.Field>
                </Form.Group>,
              ]}
        </Form>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: this.state.isBoreholeSelectorOpen ? '1 1 100%' : null,
            overflow: 'hidden',
            cursor: 'pointer',
          }}>
          <div
            onClick={() => {
              this.setState({
                isBoreholeSelectorOpen: !this.state.isBoreholeSelectorOpen,
                isStratigraphySelectorOpen: false,
              });
            }}
            style={{
              padding: '0.5em 0px',
              backgroundColor: this.state.isBoreholeSelectorOpen && '#e0e0e0',
            }}>
            <Icon
              name={`caret ${
                this.state.isBoreholeSelectorOpen ? 'down' : 'right'
              }`}
            />{' '}
            <span>
              <TranslationText id="searchFiltersBoreholes" />
            </span>
          </div>
          <div
            style={{
              flex: '1 1 100%',
              overflow: 'auto',
              padding: '7px',
              paddingRight: '15px',
              display: this.state.isBoreholeSelectorOpen ? null : 'none',
              border: '1px solid #e0e0e0',
            }}>
            <Form size="tiny">
              {
                //Borehole filtering
              }
              {this.isVisible('custom.borehole_identifier') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="borehole_identifier" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('borehole_identifier', selected.id);
                    }}
                    reset={false}
                    schema="borehole_identifier"
                    selected={search.filter.borehole_identifier}
                  />
                  <Input
                    onChange={eve => {
                      this.props.setFilter(
                        'identifier_value',
                        eve.target.value,
                      );
                    }}
                    value={search.filter.identifier_value}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.resetIdentifier();
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('extended.original_name') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="original_name" />
                  </label>
                  <Input
                    onChange={eve => {
                      this.props.setFilter('identifier', eve.target.value);
                    }}
                    placeholder={t('original_name')}
                    value={search.filter.identifier}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                      }}>
                      trans=original_name
                    </div>
                  ) : null}
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('identifier', '');
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('custom.alternate_name') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="alternate_name" />
                  </label>
                  <Input
                    onChange={eve => {
                      this.props.setFilter('alternate_name', eve.target.value);
                    }}
                    placeholder={t('alternate_name')}
                    value={search.filter.alternate_name}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                      }}>
                      trans=alternate_name
                    </div>
                  ) : null}
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('alternate_name', '');
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('kind') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="kind" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('kind', selected.id);
                    }}
                    reset={false}
                    schema="kind"
                    selected={search.filter.kind}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('kind', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('extended.method') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="drillingmethod" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('method', selected.id);
                    }}
                    reset={false}
                    schema="extended.method"
                    selected={search.filter.method}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('method', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('custom.project_name') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="project_name" />
                  </label>
                  <Input
                    onChange={eve => {
                      this.props.setFilter('project_name', eve.target.value);
                    }}
                    placeholder={t('project_name')}
                    value={search.filter.project_name}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                      }}>
                      trans=project_name
                    </div>
                  ) : null}
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('project_name', '');
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('restriction') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="restriction" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('restriction', selected.id);
                    }}
                    reset={false}
                    schema="restriction"
                    selected={search.filter.restriction}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('restriction', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('custom.landuse') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="landuse" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('landuse', selected.id);
                    }}
                    reset={false}
                    schema="custom.landuse"
                    selected={search.filter.landuse}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('landuse', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('restriction') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="restriction_until" />
                  </label>
                  <DateField
                    date={search.filter.restriction_until_from}
                    onChange={selected => {
                      this.props.setFilter('restriction_until_from', selected);
                    }}
                    placeholder={t('afterdate')}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                      }}>
                      trans=afterdate
                    </div>
                  ) : null}
                  <div style={{ margin: '1em' }} />
                  <DateField
                    date={search.filter.restriction_until_to}
                    onChange={selected => {
                      this.props.setFilter('restriction_until_to', selected);
                    }}
                    placeholder={t('beforedate')}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                      }}>
                      trans=beforedate
                    </div>
                  ) : null}
                  <LabelReset
                    onClick={() => {
                      this.props.resetRestriction();
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('elevation_z') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="elevation_z" />
                  </label>
                  <Input
                    onChange={eve => {
                      this.props.setFilter(
                        'elevation_z_from',
                        eve.target.value,
                      );
                    }}
                    placeholder={t('fromelevation')}
                    type="number"
                    value={search.filter.elevation_z_from}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                      }}>
                      trans=fromelevation
                    </div>
                  ) : null}
                  <div style={{ margin: '1em' }} />
                  <Input
                    onChange={eve => {
                      this.props.setFilter('elevation_z_to', eve.target.value);
                    }}
                    placeholder={t('toelevation')}
                    type="number"
                    value={search.filter.elevation_z_to}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                      }}>
                      trans=toelevation
                    </div>
                  ) : null}
                  <LabelReset
                    onClick={() => {
                      this.props.resetElevation();
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('length') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="totaldepth" />
                  </label>
                  <Input
                    onChange={eve => {
                      this.props.setFilter('length_from', eve.target.value);
                    }}
                    placeholder={t('fromdepth')}
                    type="number"
                    value={search.filter.length_from}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                      }}>
                      trans=fromdepth
                    </div>
                  ) : null}
                  <div style={{ margin: '1em' }} />
                  <Input
                    onChange={eve => {
                      this.props.setFilter('length_to', eve.target.value);
                    }}
                    placeholder={t('todepth')}
                    type="number"
                    value={search.filter.length_to}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                      }}>
                      trans=todepth
                    </div>
                  ) : null}
                  <LabelReset
                    onClick={() => {
                      this.props.resetDepth();
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('extended.groundwater') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="groundwater" />
                  </label>
                  <Form.Group inline>
                    <Form.Radio
                      checked={search.filter.groundwater === true}
                      label={t('yes')}
                      onChange={(e, d) => {
                        this.props.setFilter('groundwater', true);
                      }}
                    />
                    <Form.Radio
                      checked={search.filter.groundwater === false}
                      label={t('no')}
                      onChange={(e, d) => {
                        this.props.setFilter('groundwater', false);
                      }}
                    />
                  </Form.Group>
                  <Form.Radio
                    checked={search.filter.groundwater === null}
                    label={t('np')}
                    onChange={(e, d) => {
                      this.props.setFilter('groundwater', null);
                    }}
                  />
                  {this.props.developer.debug === true ? (
                    <div>
                      <div
                        style={{
                          color: 'red',
                        }}>
                        trans=yes
                      </div>
                      <div
                        style={{
                          color: 'red',
                        }}>
                        trans=no
                      </div>
                      <div
                        style={{
                          color: 'red',
                        }}>
                        trans=np
                      </div>
                    </div>
                  ) : null}
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('groundwater', -1);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('extended.top_bedrock') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="top_bedrock" />
                  </label>
                  <Input
                    onChange={eve => {
                      this.props.setFilter(
                        'top_bedrock_from',
                        eve.target.value,
                      );
                    }}
                    placeholder={t('fromdepth')}
                    type="number"
                    value={search.filter.top_bedrock_from}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                      }}>
                      trans=fromdepth
                    </div>
                  ) : null}
                  <Input
                    onChange={eve => {
                      this.props.setFilter('top_bedrock_to', eve.target.value);
                    }}
                    placeholder={t('todepth')}
                    type="number"
                    value={search.filter.top_bedrock_to}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                      }}>
                      trans=todepth
                    </div>
                  ) : null}
                  <LabelReset
                    onClick={() => {
                      this.props.resetTotBedrock();
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('extended.status') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="boreholestatus" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('status', selected.id);
                    }}
                    reset={false}
                    schema="extended.status"
                    selected={search.filter.status}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('status', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('extended.purpose') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="purpose" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('purpose', selected.id);
                    }}
                    reset={false}
                    schema="extended.purpose"
                    selected={search.filter.purpose}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('purpose', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('custom.cuttings') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="cuttings" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('cuttings', selected.id);
                    }}
                    reset={false}
                    schema="custom.cuttings"
                    selected={search.filter.cuttings}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('cuttings', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('drilling_date') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="drilling_date" />
                  </label>
                  <DateField
                    date={search.filter.drilling_date_from}
                    onChange={selected => {
                      this.props.setFilter('drilling_date_from', selected);
                    }}
                    placeholder={t('afterdate')}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                        margin: '5px',
                      }}>
                      trans=afterdate
                    </div>
                  ) : null}
                  <div style={{ margin: '1em' }} />
                  <DateField
                    date={search.filter.drilling_date_to}
                    onChange={selected => {
                      this.props.setFilter('drilling_date_to', selected);
                    }}
                    placeholder={t('beforedate')}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                        margin: '5px',
                      }}>
                      trans=beforedate
                    </div>
                  ) : null}
                  <LabelReset
                    onClick={() => {
                      this.props.resetDrilling();
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('custom.drill_diameter') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="drilldiameter" />
                  </label>
                  <Input
                    onChange={eve => {
                      this.props.setFilter(
                        'drill_diameter_from',
                        eve.target.value,
                      );
                    }}
                    placeholder={t('fromdiameter')}
                    type="number"
                    value={search.filter.drill_diameter_from}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                        margin: '5px',
                      }}>
                      trans=fromdiameter
                    </div>
                  ) : null}
                  <div style={{ margin: '1em' }} />
                  <Input
                    onChange={eve => {
                      this.props.setFilter(
                        'drill_diameter_to',
                        eve.target.value,
                      );
                    }}
                    placeholder={t('todiameter')}
                    type="number"
                    value={search.filter.drill_diameter_to}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                        margin: '5px',
                      }}>
                      trans=todiameter
                    </div>
                  ) : null}
                  <LabelReset
                    onClick={() => {
                      this.props.resetDrillDiameter();
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('bore_inc') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="inclination" />
                  </label>
                  <Input
                    onChange={eve => {
                      this.props.setFilter('bore_inc_from', eve.target.value);
                    }}
                    placeholder={t('from') + ' ' + t('degree')}
                    type="number"
                    value={search.filter.bore_inc_from}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                        margin: '5px',
                      }}>
                      trans=from + degree
                    </div>
                  ) : null}
                  <div style={{ margin: '1em' }} />
                  <Input
                    onChange={eve => {
                      this.props.setFilter('bore_inc_to', eve.target.value);
                    }}
                    placeholder={t('to') + ' ' + t('degree')}
                    type="number"
                    value={search.filter.bore_inc_to}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                        margin: '5px',
                      }}>
                      trans=to + degree
                    </div>
                  ) : null}
                  <LabelReset
                    onClick={() => {
                      this.props.resetBoreInc();
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('bore_inc_dir') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="inclinationdirection" />
                  </label>
                  <Input
                    onChange={eve => {
                      this.props.setFilter(
                        'bore_inc_dir_from',
                        eve.target.value,
                      );
                    }}
                    placeholder={t('from') + ' ' + t('degree')}
                    type="number"
                    value={search.filter.bore_inc_dir_from}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                        margin: '5px',
                      }}>
                      trans=from + degree
                    </div>
                  ) : null}
                  <div style={{ margin: '1em' }} />
                  <Input
                    onChange={eve => {
                      this.props.setFilter('bore_inc_dir_to', eve.target.value);
                    }}
                    placeholder={t('to') + ' ' + t('degree')}
                    type="number"
                    value={search.filter.bore_inc_dir_to}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                        margin: '5px',
                      }}>
                      trans=to + degree
                    </div>
                  ) : null}
                  <LabelReset
                    onClick={() => {
                      this.props.resetBoreIncDir();
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('custom.lit_pet_top_bedrock') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="lit_pet_top_bedrock" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('lit_pet_top_bedrock', selected.id);
                    }}
                    reset={false}
                    schema="custom.lit_pet_top_bedrock"
                    selected={search.filter.lit_pet_top_bedrock}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('lit_pet_top_bedrock', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('custom.lit_str_top_bedrock') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="lit_str_top_bedrock" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('lit_str_top_bedrock', selected.id);
                    }}
                    reset={false}
                    schema="custom.lit_str_top_bedrock"
                    selected={search.filter.lit_str_top_bedrock}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('lit_str_top_bedrock', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('custom.chro_str_top_bedrock') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="chro_str_top_bedrock" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('chro_str_top_bedrock', selected.id);
                    }}
                    reset={false}
                    schema="custom.chro_str_top_bedrock"
                    selected={search.filter.chro_str_top_bedrock}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('chro_str_top_bedrock', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('custom.canton') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="canton" />
                  </label>
                  <CantonDropdown
                    onSelected={selected => {
                      if (search.filter.municipality !== null) {
                        this.props.setFilter('municipality', null);
                      }
                      this.props.setFilter('canton', selected.id);
                    }}
                    selected={search.filter.canton}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('canton', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('custom.canton') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="municipality" />
                  </label>
                  <MunicipalityDropdown
                    canton={search.filter.canton}
                    disabled={search.filter.canton === null}
                    onSelected={selected => {
                      this.props.setFilter('municipality', selected.id);
                    }}
                    selected={search.filter.municipality}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('municipality', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('custom.canton') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="address" />
                  </label>
                  <Input
                    onChange={eve => {
                      this.props.setFilter('address', eve.target.value);
                    }}
                    placeholder={t('address')}
                    value={search.filter.address}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                        margin: '5px',
                      }}>
                      trans=address
                    </div>
                  ) : null}
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('address', '');
                    }}
                  />
                </Form.Field>
              ) : null}
            </Form>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: this.state.isStratigraphySelectorOpen ? '1 1 100%' : null,
            overflow: 'hidden',
            cursor: 'pointer',
          }}>
          <div
            onClick={() => {
              this.setState({
                isBoreholeSelectorOpen: false,
                isStratigraphySelectorOpen:
                  !this.state.isStratigraphySelectorOpen,
              });
            }}
            style={{
              padding: '0.5em 0px',
              backgroundColor:
                this.state.isStratigraphySelectorOpen && '#e0e0e0',
            }}>
            <Icon
              name={`caret ${
                this.state.isStratigraphySelectorOpen ? 'down' : 'right'
              }`}
            />{' '}
            <span>
              <TranslationText id="searchFiltersLayers" />
            </span>
          </div>
          <div
            style={{
              flex: '1 1 100%',
              overflow: 'auto',
              padding: '7px',
              paddingRight: '15px',
              display: this.state.isStratigraphySelectorOpen ? null : 'none',
              border: '1px solid #e0e0e0',
            }}>
            <Form size="tiny">
              {this.isVisible('layer.depth') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_depth" />
                  </label>
                  <Input
                    onChange={eve => {
                      this.props.setFilter(
                        'layer_depth_from',
                        eve.target.value,
                      );
                    }}
                    placeholder={t('fromdepth')}
                    type="number"
                    value={search.filter.layer_depth_from}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                      }}>
                      trans=fromdepth
                    </div>
                  ) : null}
                  <div style={{ margin: '1em' }} />
                  <Input
                    onChange={eve => {
                      this.props.setFilter('layer_depth_to', eve.target.value);
                    }}
                    placeholder={t('todepth')}
                    type="number"
                    value={search.filter.layer_depth_to}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                      }}>
                      trans=todepth
                    </div>
                  ) : null}
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter(
                        ['layer_depth_from', 'layer_depth_to'],
                        '',
                      );
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.depth_from') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_depth_from" />
                  </label>
                  <Input
                    onChange={eve => {
                      this.props.setFilter(
                        'layer_depth_from_from',
                        eve.target.value,
                      );
                    }}
                    placeholder={t('fromdepth')}
                    type="number"
                    value={search.filter.layer_depth_from_from}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                      }}>
                      trans=fromdepth
                    </div>
                  ) : null}
                  <div style={{ margin: '1em' }} />
                  <Input
                    onChange={eve => {
                      this.props.setFilter(
                        'layer_depth_from_to',
                        eve.target.value,
                      );
                    }}
                    placeholder={t('todepth')}
                    type="number"
                    value={search.filter.layer_depth_from_to}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                      }}>
                      trans=todepth
                    </div>
                  ) : null}
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter(
                        ['layer_depth_from_from', 'layer_depth_from_to'],
                        '',
                      );
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.depth_to') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_depth_to" />
                  </label>
                  <Input
                    onChange={eve => {
                      this.props.setFilter(
                        'layer_depth_to_from',
                        eve.target.value,
                      );
                    }}
                    placeholder={t('fromdepth')}
                    type="number"
                    value={search.filter.layer_depth_to_from}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                      }}>
                      trans=fromdepth
                    </div>
                  ) : null}
                  <div style={{ margin: '1em' }} />
                  <Input
                    onChange={eve => {
                      this.props.setFilter(
                        'layer_depth_to_to',
                        eve.target.value,
                      );
                    }}
                    placeholder={t('todepth')}
                    type="number"
                    value={search.filter.layer_depth_to_to}
                  />
                  {this.props.developer.debug === true ? (
                    <div
                      style={{
                        color: 'red',
                      }}>
                      trans=todepth
                    </div>
                  ) : null}
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter(
                        ['layer_depth_to_from', 'layer_depth_to_to'],
                        '',
                      );
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.description') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="description" />
                  </label>
                  <Input
                    onChange={eve => {
                      this.props.setFilter(
                        'layer_description',
                        eve.target.value,
                      );
                    }}
                    value={search.filter.layer_description}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_description', '');
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.geology') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_geology" />
                  </label>
                  <Input
                    onChange={eve => {
                      this.props.setFilter('layer_geology', eve.target.value);
                    }}
                    value={search.filter.layer_geology}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_geology', '');
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.lithology') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_lithology" />
                  </label>
                  <DomainTree
                    levels={{
                      1: 'rock',
                      2: 'process',
                      3: 'type',
                    }}
                    onSelected={selected => {
                      this.props.setFilter('layer_lithology', selected.id);
                    }}
                    schema="custom.lit_pet_top_bedrock"
                    selected={search.filter.layer_lithology}
                    title={<TranslationText id="layer_lithology" />}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_lithology', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.lithostratigraphy') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_lithostratigraphy" />
                  </label>
                  <DomainTree
                    levels={{
                      1: 'super',
                      2: 'group',
                      3: 'subgroup',
                      4: 'superformation',
                      5: 'formation',
                    }}
                    onSelected={selected => {
                      this.props.setFilter(
                        'layer_lithostratigraphy',
                        selected.id,
                      );
                    }}
                    schema="custom.lit_str_top_bedrock"
                    selected={search.filter.layer_lithostratigraphy}
                    title={<TranslationText id="layer_lithostratigraphy" />}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_lithostratigraphy', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.chronostratigraphy') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_chronostratigraphy" />
                  </label>
                  <DomainTree
                    levels={{
                      1: '1st_order_eon',
                      2: '2nd_order_era',
                      3: '3rd_order_period',
                      4: '4th_order_epoch',
                      5: '5th_order_sub_epoch',
                      6: '6th_order_sub_stage',
                    }}
                    onSelected={selected => {
                      this.props.setFilter(
                        'layer_chronostratigraphy',
                        selected.id,
                      );
                    }}
                    schema="custom.chro_str_top_bedrock"
                    selected={search.filter.layer_chronostratigraphy}
                    title={<TranslationText id="layer_chronostratigraphy" />}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_chronostratigraphy', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.color') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_color" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('layer_color', selected.id);
                    }}
                    reset={false}
                    schema="mlpr112"
                    selected={search.filter.layer_color}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_color', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.plasticity') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_plasticity" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('layer_plasticity', selected.id);
                    }}
                    reset={false}
                    schema="mlpr101"
                    selected={search.filter.layer_plasticity}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_plasticity', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.humidity') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_humidity" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('layer_humidity', selected.id);
                    }}
                    reset={false}
                    schema="mlpr105"
                    selected={search.filter.layer_humidity}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_humidity', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.consistance') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_consistance" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('layer_consistance', selected.id);
                    }}
                    reset={false}
                    schema="mlpr103"
                    selected={search.filter.layer_consistance}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_consistance', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.alteration') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_alteration" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('layer_alteration', selected.id);
                    }}
                    reset={false}
                    schema="mlpr106"
                    selected={search.filter.layer_alteration}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_alteration', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.compactness') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_compactness" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('layer_compactness', selected.id);
                    }}
                    reset={false}
                    schema="mlpr102"
                    selected={search.filter.layer_compactness}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_compactness', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.organic_component') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_organic_component" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter(
                        'layer_organic_component',
                        selected.id,
                      );
                    }}
                    reset={false}
                    schema="mlpr108"
                    selected={search.filter.layer_organic_component}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_organic_component', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.striae') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_striae" />
                  </label>
                  <Form.Group inline>
                    <Form.Radio
                      checked={search.filter.layer_striae === true}
                      label={t('yes')}
                      onChange={(e, d) => {
                        this.props.setFilter('layer_striae', true);
                      }}
                    />
                    <Form.Radio
                      checked={search.filter.layer_striae === false}
                      label={t('no')}
                      onChange={(e, d) => {
                        this.props.setFilter('layer_striae', false);
                      }}
                    />
                  </Form.Group>
                  <Form.Radio
                    checked={search.filter.layer_striae === null}
                    label={t('np')}
                    onChange={(e, d) => {
                      this.props.setFilter('layer_striae', null);
                    }}
                  />
                  {this.props.developer.debug === true ? (
                    <div>
                      <div
                        style={{
                          color: 'red',
                        }}>
                        trans=yes
                      </div>
                      <div
                        style={{
                          color: 'red',
                        }}>
                        trans=no
                      </div>
                      <div
                        style={{
                          color: 'red',
                        }}>
                        trans=np
                      </div>
                    </div>
                  ) : null}
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_striae', -1);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.grain_size_1') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_grain_size_1" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('layer_grain_size_1', selected.id);
                    }}
                    reset={false}
                    schema="mlpr109"
                    selected={search.filter.layer_grain_size_1}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_grain_size_1', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.grain_size_2') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_grain_size_2" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('layer_grain_size_2', selected.id);
                    }}
                    reset={false}
                    schema="mlpr109"
                    selected={search.filter.layer_grain_size_2}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_grain_size_2', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.grain_shape') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_grain_shape" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('layer_grain_shape', selected.id);
                    }}
                    reset={false}
                    schema="mlpr110"
                    selected={search.filter.layer_grain_shape}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_grain_shape', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.grain_granularity') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_grain_granularity" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter(
                        'layer_grain_granularity',
                        selected.id,
                      );
                    }}
                    reset={false}
                    schema="mlpr115"
                    selected={search.filter.layer_grain_granularity}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_grain_granularity', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.cohesion') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_cohesion" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('layer_cohesion', selected.id);
                    }}
                    reset={false}
                    schema="mlpr116"
                    selected={search.filter.layer_cohesion}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_cohesion', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.further_properties') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_further_properties" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter(
                        'layer_further_properties',
                        selected.id,
                      );
                    }}
                    reset={false}
                    schema="mlpr117"
                    selected={search.filter.layer_further_properties}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_further_properties', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.uscs_1') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_uscs_1" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('layer_uscs_1', selected.id);
                    }}
                    reset={false}
                    schema="mcla101"
                    selected={search.filter.layer_uscs_1}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_uscs_1', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.uscs_2') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_uscs_2" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('layer_uscs_2', selected.id);
                    }}
                    reset={false}
                    schema="mcla101"
                    selected={search.filter.layer_uscs_2}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_uscs_2', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.uscs_3') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_uscs_3" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('layer_uscs_3', selected.id);
                    }}
                    reset={false}
                    schema="mcla101"
                    selected={search.filter.layer_uscs_3}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_uscs_3', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.uscs_determination') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_uscs_determination" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter(
                        'layer_uscs_determination',
                        selected.id,
                      );
                    }}
                    reset={false}
                    schema="mcla104"
                    selected={search.filter.layer_uscs_determination}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_uscs_determination', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.debris') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_debris" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter('layer_debris', selected.id);
                    }}
                    reset={false}
                    schema="mcla107"
                    selected={search.filter.layer_debris}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_debris', null);
                    }}
                  />
                </Form.Field>
              ) : null}
              {this.isVisible('layer.lithology_top_bedrock') ? (
                <Form.Field>
                  <label>
                    <TranslationText id="layer_lithology_top_bedrock" />
                  </label>
                  <DomainDropdown
                    onSelected={selected => {
                      this.props.setFilter(
                        'layer_lithology_top_bedrock',
                        selected.id,
                      );
                    }}
                    reset={false}
                    schema="custom.lit_pet_top_bedrock"
                    selected={search.filter.layer_lithology_top_bedrock}
                  />
                  <LabelReset
                    onClick={() => {
                      this.props.setFilter('layer_lithology_top_bedrock', null);
                    }}
                  />
                </Form.Field>
              ) : null}
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

SearchComponent.propTypes = {
  onChange: PropTypes.func,
  resetBoreInc: PropTypes.func,
  resetBoreIncDir: PropTypes.func,
  resetDrillDiameter: PropTypes.func,
  resetDrilling: PropTypes.func,
  resetTotBedrock: PropTypes.func,
  setFilter: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  return {
    developer: state.developer,
    search: state.search,
    settings: state.setting,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    setmapfilter: active => {
      dispatch({
        type: 'SEARCH_MAPFILTER_CHANGED',
        active: active,
      });
    },
    setzoom2filter: active => {
      dispatch({
        type: 'SEARCH_ZOOM2_CHANGED',
        active: active,
      });
    },
    setcenter2filter: active => {
      dispatch({
        type: 'SEARCH_CENTER2_CHANGED',
        active: active,
      });
    },
    // Borehole filtering
    setFilter: (key, value) => {
      dispatch({
        type: 'SEARCH_FILTER_CHANGED',
        key: key,
        value: value,
      });
    },
    resetIdentifier: () => {
      dispatch({
        type: 'SEARCH_FILTER_RESET_IDENTIFIER',
      });
    },
    resetRestriction: () => {
      dispatch({
        type: 'SEARCH_FILTER_RESET_RESTRICTION',
      });
    },
    resetElevation: () => {
      dispatch({
        type: 'SEARCH_FILTER_RESET_ELEVATION',
      });
    },
    resetDepth: () => {
      dispatch({
        type: 'SEARCH_FILTER_RESET_DEPTH',
      });
    },
    resetTotBedrock: () => {
      dispatch({
        type: 'SEARCH_FILTER_RESET_TOP_BEDROCK',
      });
    },
    resetDrilling: () => {
      dispatch({
        type: 'SEARCH_FILTER_RESET_DRILLING',
      });
    },
    resetDrillDiameter: () => {
      dispatch({
        type: 'SEARCH_FILTER_RESET_DRILL_DIAMETER',
      });
    },
    resetBoreInc: () => {
      dispatch({
        type: 'SEARCH_FILTER_RESET_BORE_INC',
      });
    },
    resetBoreIncDir: () => {
      dispatch({
        type: 'SEARCH_FILTER_RESET_BORE_INC_DIR',
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation(['common'])(SearchComponent));
