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

export const fields = [
  {
    name: 'description',
  },
  {
    name: 'layer_geology',
  },
  {
    name: 'layer_qt_description',
  },
  {
    name: 'layer_lithology',
  },
  {
    name: 'layer_lithostratigraphy',
  },
  {
    name: 'layer_chronostratigraphy',
  },
  {
    name: 'layer_tectonic_unit',
  },
  {
    name: 'layer_color',
  },
  {
    name: 'layer_plasticity',
  },
  {
    name: 'layer_humidity',
  },
  {
    name: 'layer_consistance',
  },
  {
    name: 'layer_alteration',
  },
  {
    name: 'layer_compactness',
  },
  // {
  //   name: 'jointing'
  // },
  // {
  //   name: 'soil_state'
  // },
  {
    name: 'layer_organic_component',
  },
  {
    name: 'layer_striae',
  },
  {
    name: 'layer_grain_size_1',
  },
  {
    name: 'layer_grain_size_2',
  },
  {
    name: 'layer_grain_shape',
  },
  {
    name: 'layer_grain_granularity',
  },
  {
    name: 'layer_cohesion',
  },
  {
    name: 'layer_further_properties',
  },
  {
    name: 'layer_uscs_1',
  },
  {
    name: 'layer_uscs_2',
  },
  {
    name: 'layer_uscs_3',
  },
  {
    name: 'layer_uscs_original',
  },
  {
    name: 'layer_uscs_determination',
  },
  {
    name: 'layer_debris',
  },
  {
    name: 'layer_lithology_top_bedrock',
  },
  {
    name: 'layer_notes',
  },
];

class EditorSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: false,
      identifiers: false,
      searchFiltersBoreholes: false,
      searchFiltersLayers: false,
    };
  }

  isVisible(field) {
    const { geocode, codes } = this.props;
    if (_.has(codes, 'data.layer_kind') && _.isArray(codes.data.layer_kind)) {
      for (let idx = 0; idx < codes.data.layer_kind.length; idx++) {
        const element = codes.data.layer_kind[idx];
        if (element.code === geocode) {
          if (
            _.isObject(element.conf) &&
            _.has(element.conf, `fields.${field}`)
          ) {
            return element.conf.fields[field];
          } else {
            return false;
          }
        }
      }
    }
    return false;
  }

  render() {
    const { setting, t, toggleField, toggleFilter } = this.props;
    return (
      <div
        style={{
          padding: '2em',
          flex: 1,
        }}>
        {
          // SEARCH FILTER BOREHOLE
        }
        <div
          style={{
            flexDirection: 'row',
            display: 'flex',
          }}>
          <Header
            as="h3"
            className="link"
            onClick={() => {
              this.setState({
                searchFiltersBoreholes: !this.state.searchFiltersBoreholes,
              });
            }}
            style={{
              margin: '0px',
              textDecoration: 'none',
            }}>
            <TranslationText id="searchFiltersBoreholes" />
          </Header>
          <div
            style={{
              flex: 1,
              textAlign: 'right',
            }}>
            <Button
              color="red"
              onClick={() => {
                this.setState({
                  searchFiltersBoreholes: !this.state.searchFiltersBoreholes,
                });
              }}
              size="small">
              {this.state.searchFiltersBoreholes === true ? (
                <TranslationText id="collapse" />
              ) : (
                <TranslationText id="expand" />
              )}
            </Button>
          </div>
        </div>
        {this.state.searchFiltersBoreholes === true ? (
          <EditorSettingList
            attribute={boreholeEditorData}
            setting={setting}
            toggleFilter={toggleFilter}
          />
        ) : (
          <Divider />
        )}
        {
          // SEARCH FILTER LAYERS
        }
        <div
          style={{
            flexDirection: 'row',
            display: 'flex',
          }}>
          <Header
            as="h3"
            className="link"
            onClick={() => {
              this.setState({
                searchFiltersLayers: !this.state.searchFiltersLayers,
              });
            }}
            style={{
              margin: '0px',
              textDecoration: 'none',
            }}>
            <TranslationText id="searchFiltersLayers" />
          </Header>
          <div
            style={{
              flex: 1,
              textAlign: 'right',
            }}>
            <Button
              color="red"
              onClick={() => {
                this.setState({
                  searchFiltersLayers: !this.state.searchFiltersLayers,
                });
              }}
              size="small">
              {this.state.searchFiltersLayers === true ? (
                <TranslationText id="collapse" />
              ) : (
                <TranslationText id="expand" />
              )}
            </Button>
          </div>
        </div>

        {this.state.searchFiltersLayers === true ? (
          <EditorSettingList
            attribute={stratigraphyFilterEditorData}
            setting={setting}
            toggleFilter={toggleFilter}
          />
        ) : (
          <Divider />
        )}
        {this.props.user.data.admin === true ? (
          <div>
            <div
              style={{
                flexDirection: 'row',
                display: 'flex',
              }}>
              <Header
                as="h3"
                className="link"
                onClick={() => {
                  this.setState({
                    fields: !this.state.fields,
                  });
                }}
                style={{
                  margin: '0px',
                  textDecoration: 'none',
                }}>
                <TranslationText id="stratigraphyfields" />
              </Header>
              <div
                style={{
                  flex: 1,
                  textAlign: 'right',
                }}>
                <Button
                  color="red"
                  onClick={() => {
                    this.setState({
                      fields: !this.state.fields,
                    });
                  }}
                  size="small">
                  {this.state.fields === true ? (
                    <TranslationText id="collapse" />
                  ) : (
                    <TranslationText id="expand" />
                  )}
                </Button>
              </div>
            </div>
            {this.state.fields === true ? (
              <Segment.Group>
                {fields.map((field, idx) => (
                  <Segment key={'bms-es-fds-' + idx}>
                    <Checkbox
                      checked={this.isVisible(field.name.replace('layer_', ''))}
                      label=""
                      onChange={(e, d) => {
                        toggleField(
                          field.name.replace('layer_', ''),
                          d.checked,
                        );
                      }}
                    />
                    <TranslationText id={field.name} />
                  </Segment>
                ))}
              </Segment.Group>
            ) : (
              <Divider />
            )}
            {this.state.fields === true ? (
              <EditorSettingList
                attribute={stratigraphyFieldEditorData}
                setting={setting}
                toggleFilter={toggleFilter}
              />
            ) : (
              <Divider />
            )}
            casinggggggg
            {this.state.fields === true ? (
              <EditorSettingList
                attribute={casingEditorData}
                setting={setting}
                toggleFilter={toggleFilter}
              />
            ) : (
              <Divider />
            )}
            Locationnnnn
            {this.state.fields === true ? (
              <EditorSettingList
                attribute={locationEditorData}
                setting={setting}
                toggleFilter={toggleFilter}
              />
            ) : (
              <Divider />
            )}
            Instrumenttttt
            {this.state.fields === true ? (
              <EditorSettingList
                attribute={instrumentEditorData}
                setting={setting}
                toggleFilter={toggleFilter}
              />
            ) : (
              <Divider />
            )}
          </div>
        ) : null}

        {this.props.user.data.admin === true ? (
          <div>
            <div
              style={{
                flexDirection: 'row',
                display: 'flex',
              }}>
              <Header
                as="h3"
                className="link"
                onClick={() => {
                  this.setState({
                    identifiers: !this.state.identifiers,
                  });
                }}
                style={{
                  margin: '0px',
                  textDecoration: 'none',
                }}>
                <TranslationText id="identifierManager" />
              </Header>
              <div
                style={{
                  flex: 1,
                  textAlign: 'right',
                }}>
                <Button
                  color="red"
                  onClick={() => {
                    this.setState({
                      identifiers: !this.state.identifiers,
                    });
                  }}
                  size="small">
                  {this.state.identifiers === true ? (
                    <TranslationText id="collapse" />
                  ) : (
                    <TranslationText id="expand" />
                  )}
                </Button>
              </div>
            </div>
            {this.state.identifiers === true ? (
              <Segment>
                <IdentifierSettings />
              </Segment>
            ) : (
              <Divider />
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
