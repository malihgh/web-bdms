import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';
import { Icon, Form, Radio } from 'semantic-ui-react';
import StratigraphyFilter from '../components/stratigraphyFilter';
import TranslationText from '../../form/translationText';
import WorkgroupRadioGroup from '../../form/workgroup/radio';
import BoreholeFilter from '../components/boreholeFilter';
import LocationFilter from '../components/locationFilter';
import * as Styled from './searchEditorStyles';
import CompletionFilter from '../components/completionFilter';
import { casingData } from '../../form/profile/data/casingdata';
import { InstrumentAttributes } from '../../form/profile/components/profileInstrument/data/InstrumentAttributes';
import { fillingData } from '../../form/profile/data/fillingdata';

class SearchEditorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accordionIdx: 0,
      isBoreholeSelectorOpen: false,
      isStratigraphySelectorOpen: false,
      searchList: [
        {
          id: 0,
          name: 'location',
          translationId: 'location',
          isSelected: false,
        },
        {
          id: 1,
          name: 'borehole',
          translationId: 'searchFiltersBoreholes',
          isSelected: false,
        },
        {
          id: 2,
          name: 'stratigraphy',
          translationId: 'searchFiltersLayers',
          isSelected: false,
        },
        {
          id: 3,
          name: 'casing',
          translationId: 'casing',
          isSelected: false,
        },
        {
          id: 4,
          name: 'instrument',
          translationId: 'instrument',
          isSelected: false,
        },
        {
          id: 5,
          name: 'filling',
          translationId: 'filling',
          isSelected: false,
        },
      ],
    };
  }
  componentDidUpdate(prevProps) {
    const { search, onChange } = this.props;
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
    if (_.get(settings.data.efilter, filter) === true) {
      return true;
    }
    return false;
  }
  render() {
    const { search, t, user } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 100%',
          overflow: 'auto',
        }}>
        <WorkgroupRadioGroup
          filter={search.filter.workgroup}
          onChange={workgroup => {
            this.props.setFilter('workgroup', workgroup);
          }}
          workgroups={user.data.workgroups}
        />
        <Form
          size="tiny"
          style={{
            marginBottom: '1em',
          }}>
          <Form.Field>
            <label>
              <TranslationText firstUpperCase id="status" />
            </label>
            <Radio
              checked={search.filter.role === 'all'}
              label={''}
              name="radioGroup"
              onChange={() => {
                this.props.setFilter('role', 'all');
              }}
            />
            <span
              style={{
                color: 'black',
                fontSize: '1.1em',
                fontWeight: 'bold',
              }}>
              <TranslationText firstUpperCase id="alls" />
            </span>
          </Form.Field>
          {['statusedit', 'statuscontrol', 'statusvalid', 'statuspublic'].map(
            (role, idx) => (
              <Form.Field key={'sec-' + role}>
                <Radio
                  checked={
                    search.filter.role ===
                    role.replace('status', '').toUpperCase()
                  }
                  label={''}
                  name="radioGroup"
                  onChange={() => {
                    this.props.setFilter(
                      'role',
                      role.replace('status', '').toUpperCase(),
                    );
                  }}
                />
                <span
                  style={{
                    color: 'black',
                    fontSize: '1.1em',
                  }}>
                  <TranslationText firstUpperCase id={role} />
                </span>
              </Form.Field>
            ),
          )}
        </Form>
        <div>
          {this.state?.searchList?.map((filter, idx) => (
            <Styled.FilterContainer key={idx}>
              <Styled.FilterButton
                isSelected={filter?.isSelected}
                onClick={() => {
                  this.setState(prevState => ({
                    ...prevState,
                    // update an array of objects:
                    searchList: prevState.searchList.map(obj =>
                      obj.id === idx
                        ? { ...obj, isSelected: !obj.isSelected }
                        : { ...obj, isSelected: false },
                    ),
                  }));
                }}>
                <Icon name={`caret ${filter?.isSelected ? 'down' : 'right'}`} />{' '}
                <span>
                  <TranslationText id={filter?.translationId} />
                </span>
              </Styled.FilterButton>
              {this.state?.searchList?.[idx]?.name === 'location' &&
                this.state?.searchList?.[idx]?.isSelected && (
                  <Styled.FormFilterContainer>
                    <LocationFilter
                      onChange={this.props.onChange}
                      resetBoreInc={this.props.resetBoreInc}
                      resetBoreIncDir={this.props.resetBoreIncDir}
                      resetDrillDiameter={this.props.resetDrillDiameter}
                      resetDrilling={this.props.resetDrilling}
                      resetElevation={this.props.resetElevation}
                      resetRestriction={this.props.resetRestriction}
                      resetTotBedrock={this.props.resetTotBedrock}
                      search={this.props.search}
                      setFilter={this.props.setFilter}
                      settings={this.props.settings.data.efilter}
                    />
                  </Styled.FormFilterContainer>
                )}
              {this.state?.searchList?.[idx]?.name === 'borehole' &&
                this.state?.searchList?.[idx]?.isSelected && (
                  <Styled.FormFilterContainer>
                    <BoreholeFilter
                      onChange={this.props.onChange}
                      resetBoreInc={this.props.resetBoreInc}
                      resetBoreIncDir={this.props.resetBoreIncDir}
                      resetDrillDiameter={this.props.resetDrillDiameter}
                      resetDrilling={this.props.resetDrilling}
                      resetElevation={this.props.resetElevation}
                      resetRestriction={this.props.resetRestriction}
                      resetTotBedrock={this.props.resetTotBedrock}
                      search={this.props.search}
                      setFilter={this.props.setFilter}
                      settings={this.props.settings.data.efilter}
                    />
                  </Styled.FormFilterContainer>
                )}
              {this.state?.searchList?.[idx]?.name === 'stratigraphy' &&
                this.state?.searchList?.[idx]?.isSelected && (
                  <Styled.FormFilterContainer>
                    <StratigraphyFilter
                      search={this.props.search}
                      settings={this.props.settings.data.efilter}
                      setFilter={this.props.setFilter}
                    />
                  </Styled.FormFilterContainer>
                )}
              {this.state?.searchList?.[idx]?.name === 'casing' &&
                this.state?.searchList?.[idx]?.isSelected && (
                  <Styled.FormFilterContainer>
                    <CompletionFilter
                      data={{
                        id: 1,
                        isEditable: true,
                        // onUpdated,
                        // reloadAttribute,
                        attribute: casingData.profileInfo.concat(
                          casingData.profileAttribute,
                        ),
                      }}
                    />
                  </Styled.FormFilterContainer>
                )}
              {this.state?.searchList?.[idx]?.name === 'instrument' &&
                this.state?.searchList?.[idx]?.isSelected && (
                  <Styled.FormFilterContainer>
                    <CompletionFilter
                      data={{
                        id: 1,
                        isEditable: true,
                        // onUpdated,
                        // reloadAttribute,
                        attribute: InstrumentAttributes,
                      }}
                    />
                  </Styled.FormFilterContainer>
                )}
              {this.state?.searchList?.[idx]?.name === 'filling' &&
                this.state?.searchList?.[idx]?.isSelected && (
                  <Styled.FormFilterContainer>
                    <CompletionFilter
                      data={{
                        id: 1,
                        isEditable: true,
                        // onUpdated,
                        // reloadAttribute,
                        attribute: fillingData.profileInfo.concat(
                          fillingData.profileAttribute,
                        ),
                      }}
                    />
                  </Styled.FormFilterContainer>
                )}
            </Styled.FilterContainer>
          ))}
        </div>
      </div>
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
  settings: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  return {
    developer: state.developer,
    search: state.searchEditor,
    settings: state.setting,
    user: state.core_user,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    setFilter: (key, value) => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_CHANGED',
        key: key,
        value: value,
      });
    },
    resetIdentifier: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_RESET_IDENTIFIER',
      });
    },
    resetRestriction: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_RESET_RESTRICTION',
      });
    },
    resetElevation: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_RESET_ELEVATION',
      });
    },
    resetTotBedrock: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_RESET_TOP_BEDROCK',
      });
    },
    resetDrilling: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_RESET_DRILLING',
      });
    },
    resetDrillDiameter: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_RESET_DRILL_DIAMETER',
      });
    },
    resetBoreInc: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_RESET_BORE_INC',
      });
    },
    resetBoreIncDir: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_RESET_BORE_INC_DIR',
      });
    },

    setCompletness: completness => {
      dispatch({
        type: 'SEARCH_EDITOR_COMPLETNESS_CHANGED',
        completness: completness,
      });
    },
    setProject: id => {
      dispatch({
        type: 'SEARCH_EDITOR_PROJECT_CHANGED',
        id: id,
      });
    },
    setLastUpdate: date => {
      dispatch({
        type: 'SEARCH_EDITOR_LASTUPDATE_CHANGED',
        date: date,
      });
    },
    setCreation: date => {
      dispatch({
        type: 'SEARCH_EDITOR_CREATION_CHANGED',
        date: date,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation(['common'])(SearchEditorComponent));
