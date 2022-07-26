import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';

import {
  Button,
  Checkbox,
  Divider,
  Header,
  // Input,
  // Icon,
  Segment,
} from 'semantic-ui-react';

import { patchCodeConfig, patchSettings } from '@ist-supsi/bmsjs';

import IdentifierSettings from './editor/identifierSettings';
import TranslationText from '../../commons/form/translationText';
import EditorSettingList from './components/editorSettingList/editorSettingList';
import { boreholeEditorData } from './data/boreholeEditorData';
import { stratigraphyFilterEditorData } from './data/stratigraphyFilterEditorData';
import { stratigraphyFieldEditorData } from './data/stratigraphyFieldEditorData';
import { casingEditorData } from './data/casingEditorData';
import { locationEditorData } from './data/locationEditorData';
import { instrumentEditorData } from './data/instrumentEditorData';
import { fillingEditorData } from './data/fillingEditorData';

export const fields = [];

class EditorSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: false,
      identifiers: false,
      searchList: [
        {
          id: 0,
          name: 'location',
          translationId: 'searchFilterLocation',
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
          translationId: 'searchFilterCasing',
          isSelected: false,
        },
        {
          id: 4,
          name: 'instrument',
          translationId: 'searchFilterInstrument',
          isSelected: false,
        },
        {
          id: 5,
          name: 'filling',
          translationId: 'searchFilterFilling',
          isSelected: false,
        },
        {
          id: 6,
          name: 'stratigraphyfields',
          translationId: 'stratigraphyfields',
          isSelected: false,
        },
      ],
    };
  }
  handleButtonSelected() {
    let selectedData = null;
    if (
      this.state?.searchList?.[0]?.name === 'location' &&
      this.state?.searchList?.[0]?.isSelected
    ) {
      selectedData = locationEditorData;
    } else if (
      this.state?.searchList?.[1]?.name === 'borehole' &&
      this.state?.searchList?.[1]?.isSelected
    ) {
      selectedData = boreholeEditorData;
    } else if (
      this.state?.searchList?.[2]?.name === 'stratigraphy' &&
      this.state?.searchList?.[2]?.isSelected
    ) {
      selectedData = stratigraphyFilterEditorData;
    } else if (
      this.state?.searchList?.[3]?.name === 'casing' &&
      this.state?.searchList?.[3]?.isSelected
    ) {
      selectedData = casingEditorData;
    } else if (
      this.state?.searchList?.[4]?.name === 'instrument' &&
      this.state?.searchList?.[4]?.isSelected
    ) {
      selectedData = instrumentEditorData;
    } else if (
      this.state?.searchList?.[5]?.name === 'filling' &&
      this.state?.searchList?.[5]?.isSelected
    ) {
      selectedData = fillingEditorData;
    } else if (
      this.state?.searchList?.[6]?.name === 'stratigraphyfields' &&
      this.state?.searchList?.[6]?.isSelected
    ) {
      selectedData = stratigraphyFieldEditorData;
    } else {
      selectedData = null;
    }
    return selectedData;
  }
  render() {
    const { setting, t, toggleField, toggleFilter } = this.props;
    return (
      <div
        style={{
          padding: '2em',
          flex: 1,
        }}>
        {this.state?.searchList?.map((filter, idx) => (
          <div
            key={idx}
            onClick={() => {
              this.setState(prevState => ({
                ...prevState,
                // update an array of objects:
                searchList: prevState.searchList.map(
                  obj =>
                    obj.id === idx
                      ? { ...obj, isSelected: !obj.isSelected }
                      : { ...obj },
                  // : { ...obj, isSelected: false }, if you want to select only one filter
                ),
              }));
            }}>
            <div
              style={{
                flexDirection: 'row',
                display: 'flex',
                cursor: 'pointer',
                backgroundColor: filter.isSelected ? '#f5f5f5' : '#fff',
                padding: 10,
              }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                <TranslationText id={filter.translationId} />
              </div>
              <div
                style={{
                  flex: 1,
                  textAlign: 'right',
                }}>
                <Button color="red" size="small">
                  {filter.isSelected === true ? (
                    <TranslationText id="collapse" />
                  ) : (
                    <TranslationText id="expand" />
                  )}
                </Button>
              </div>
            </div>
            {filter.isSelected === true &&
            this.handleButtonSelected() !== null ? (
              <EditorSettingList
                attribute={this.handleButtonSelected()}
                setting={setting}
                toggleFilter={toggleFilter}
              />
            ) : (
              <Divider style={{ margin: 0 }} />
            )}
          </div>
        ))}

        {this.props.user.data.admin === true ? (
          <div>
            <div
              onClick={() => {
                this.setState({
                  identifiers: !this.state.identifiers,
                });
              }}
              style={{
                flexDirection: 'row',
                display: 'flex',
                cursor: 'pointer',
                backgroundColor: this.state.identifiers ? '#f5f5f5' : '#fff',
                padding: 10,
              }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                <TranslationText id="identifierManager" />
              </div>
              <div
                style={{
                  flex: 1,
                  textAlign: 'right',
                }}>
                <Button color="red" size="small">
                  {this.state.identifiers === true ? (
                    <TranslationText id="collapse" />
                  ) : (
                    <TranslationText id="expand" />
                  )}
                </Button>
              </div>
            </div>
            {this.state.identifiers === true ? (
              <Segment style={{ margin: 0 }}>
                <IdentifierSettings />
              </Segment>
            ) : (
              <Divider style={{ margin: 0 }} />
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

EditorSettings.propTypes = {
  codes: PropTypes.object,
  geocode: PropTypes.string,
  setting: PropTypes.object,
  t: PropTypes.func,
  toggleField: PropTypes.func,
  toggleFilter: PropTypes.func,
};

EditorSettings.defaultProps = {
  geocode: 'Geol',
};

const mapStateToProps = state => {
  return {
    setting: state.setting,
    codes: state.core_domain_list,
    user: state.core_user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
    toggleField: (filter, enabled) => {
      dispatch(patchCodeConfig(`fields.${filter}`, enabled));
    },
    toggleFilter: (filter, enabled) => {
      dispatch(patchSettings(`efilter.${filter}`, enabled));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(EditorSettings));
