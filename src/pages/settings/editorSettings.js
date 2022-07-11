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

import {
  patchCodeConfig,
  patchSettings
} from '@ist-supsi/bmsjs';

import IdentifierSettings from './editor/identifierSettings';
import TranslationText from '../../commons/form/translationText';
import SearchFiltersLayers from './searchFiltersLayers';

const fields = [
  {
    name: 'description'
  },
  {
    name: 'layer_geology'
  },
  {
    name: 'layer_qt_description'
  },
  {
    name: 'layer_lithology'
  },
  {
    name: 'layer_lithostratigraphy'
  },
  {
    name: 'layer_chronostratigraphy'
  },
  {
    name: 'layer_tectonic_unit'
  },
  {
    name: 'layer_color'
  },
  {
    name: 'layer_plasticity'
  },
  {
    name: 'layer_humidity'
  },
  {
    name: 'layer_consistance'
  },
  {
    name: 'layer_alteration'
  },
  {
    name: 'layer_compactness'
  },
  // {
  //   name: 'jointing'
  // },
  // {
  //   name: 'soil_state'
  // },
  {
    name: 'layer_organic_component'
  },
  {
    name: 'layer_striae'
  },
  {
    name: 'layer_grain_size_1'
  },
  {
    name: 'layer_grain_size_2'
  },
  {
    name: 'layer_grain_shape'
  },
  {
    name: 'layer_grain_granularity'
  },
  {
    name: 'layer_cohesion'
  },
  {
    name: 'layer_further_properties'
  },
  {
    name: 'layer_uscs_1'
  },
  {
    name: 'layer_uscs_2'
  },
  {
    name: 'layer_uscs_3'
  },
  {
    name: 'layer_uscs_original'
  },
  {
    name: 'layer_uscs_determination'
  },
  {
    name: 'layer_debris'
  },
  {
    name: 'layer_lit_pet_deb'
  },
  {
    name: 'layer_notes'
  }
];


class EditorSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "fields": false,
      "identifiers": false,
      "searchFiltersBoreholes": false,
      "searchFiltersLayers": false,
    };
  }

  isVisible(field){
    const {
      geocode,
      codes
    } = this.props;
    if(
      _.has(codes, 'data.layer_kind')
      && _.isArray(codes.data.layer_kind)
    ){
      for (let idx = 0; idx < codes.data.layer_kind.length; idx++) {
        const element = codes.data.layer_kind[idx];
        if (element.code === geocode){
          if (
            _.isObject(element.conf)
            && _.has(element.conf, `fields.${field}`)
          ){
            return  element.conf.fields[field];
          } else {
            return false;
          }
        }
      }
    }
    return false;
  }

  render() {
    const {
      setting,
      t,
      toggleField,
      toggleFilter
    } = this.props;
    return (
      <div
        style={{
          padding: '2em',
          flex: 1
        }}
      >
        {
          // SEARCH FILTER BOREHOLE
        }
        <div
          style={{
            flexDirection: 'row',
            display: 'flex'
          }}
        >
          <Header
            as='h3'
            className='link'
            onClick={() => {
              this.setState({
                "searchFiltersBoreholes": !this.state.searchFiltersBoreholes
              });
            }}
            style={{
              margin: '0px'
            }}
          >
            <TranslationText
              id="searchFiltersBoreholes"
            />
          </Header>
          <div
            style={{
              flex: 1,
              textAlign: 'right'
            }}
          >
            <Button
              color='red'
              onClick={() => {
                this.setState({
                  "searchFiltersBoreholes": !this.state.searchFiltersBoreholes
                });
              }}
              size='small'
            >
              {
                this.state.searchFiltersBoreholes === true ?
                  <TranslationText
                    id='collapse'
                  />:
                  <TranslationText
                    id='expand'
                  />
              }
            </Button>
          </div>
        </div>
        {
          this.state.searchFiltersBoreholes === true ?
            <Segment.Group>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.custom.borehole_identifier
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.borehole_identifier',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='borehole_identifier'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.extended.original_name
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.original_name',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='original_name'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.kind
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'kind',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='kind'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.extended.method
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.method',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='drillingmethod'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.custom.project_name
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.project_name',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='project_name'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.restriction
                  }
                  label={t('restriction') + "/" + t('restriction_until')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'restriction',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='project_name'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.custom.landuse
                  }
                  label=''
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.landuse',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='landuse'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.custom.canton
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.canton',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='canton'
                />
                &nbsp;/&nbsp;
                <TranslationText
                  id='city'
                />
                &nbsp;/&nbsp;
                <TranslationText
                  id='address'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.elevation_z
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'elevation_z',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='elevation_z'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.length
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'length',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='totaldepth'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.extended.groundwater
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.groundwater',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='groundwater'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.extended.top_bedrock
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.top_bedrock',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='top_bedrock'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.extended.status
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.status',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='status'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.extended.purpose
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.purpose',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='purpose'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.custom.cuttings
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.cuttings',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='cuttings'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.drilling_date
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'drilling_date',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='drilling_date'
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.custom.drill_diameter
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.drill_diameter',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='drilldiameter'
                />
              </Segment>

              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.bore_inc
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'bore_inc',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='inclination'
                />
              </Segment>

              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.custom.lithology_top_bedrock
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.lithology_top_bedrock',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='lithology_top_bedrock'
                />
              </Segment>

              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.custom.lithostratigraphy_top_bedrock
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.lithostratigraphy_top_bedrock',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='lithostratigraphy_top_bedrock'
                />
              </Segment>

              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.custom.chronostratigraphy_top_bedrock
                  }
                  label=""
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.chronostratigraphy_top_bedrock',
                      d.checked
                    );
                  }}
                />
                <TranslationText
                  id='chronostratigraphy_top_bedrock'
                />
              </Segment>

            </Segment.Group>
            : <Divider />
        }
        {
          // SEARCH FILTER LAYERS
        }
        <div
          style={{
            flexDirection: 'row',
            display: 'flex'
          }}
        >
          <Header
            as='h3'
            className='link'
            onClick={() => {
              this.setState({
                "searchFiltersLayers": !this.state.searchFiltersLayers
              });
            }}
            style={{
              margin: '0px'
            }}
          >
            <TranslationText
              id='searchFiltersLayers'
            />
          </Header>
          <div
            style={{
              flex: 1,
              textAlign: 'right'
            }}
          >
            <Button
              color='red'
              onClick={() => {
                this.setState({
                  "searchFiltersLayers": !this.state.searchFiltersLayers
                });
              }}
              size='small'
            >
              {
                this.state.searchFiltersLayers === true ?
                  <TranslationText
                    id='collapse'
                  />:
                  <TranslationText
                    id='expand'
                  />
              }
            </Button>
          </div>
        </div>

        {
                this.state.searchFiltersLayers === true ?
                  <SearchFiltersLayers
                    layer={setting.data.efilter.layer}
                    toggleFilter={this.props.toggleFilter}
                  />: <Divider />

        }
        {
          this.props.user.data.admin === true?
            <div>
              <div
                style={{
                  flexDirection: 'row',
                  display: 'flex'
                }}
              >
                <Header
                  as='h3'
                  className='link'
                  onClick={() => {
                    this.setState({
                      "fields": !this.state.fields
                    });
                  }}
                  style={{
                    margin: '0px'
                  }}
                >
                  <TranslationText
                    id='stratigraphyfields'
                  />
                </Header>
                <div
                  style={{
                    flex: 1,
                    textAlign: 'right'
                  }}
                >
                  <Button
                    color='red'
                    onClick={() => {
                      this.setState({
                        "fields": !this.state.fields
                      });
                    }}
                    size='small'
                  >
                    {
                      this.state.fields === true ?
                        <TranslationText
                          id='collapse'
                        />:
                        <TranslationText
                          id='expand'
                        />
                    }
                  </Button>
                </div>
              </div>
              {
                this.state.fields === true ?
                  <Segment.Group>
                    {
                      fields.map( (field, idx) => (
                        <Segment
                          key={'bms-es-fds-'+idx}
                        >
                          <Checkbox
                            checked={
                              this.isVisible(
                                field.name.replace("layer_","")
                              )
                            }
                            label=""
                            onChange={(e, d) => {
                              toggleField(field.name.replace("layer_",""), d.checked);
                            }}
                          />
                          <TranslationText
                            id={field.name}
                          />
                        </Segment>
                      ))
                    }
                  </Segment.Group>: <Divider />
              }
            </div>: null
        }
        {
          this.props.user.data.admin === true?
            <div>
              <div
                style={{
                  flexDirection: 'row',
                  display: 'flex'
                }}
              >
                <Header
                  as='h3'
                  className='link'
                  onClick={() => {
                    this.setState({
                      "identifiers": !this.state.identifiers
                    });
                  }}
                  style={{
                    margin: '0px'
                  }}
                >
                  <TranslationText
                    id='identifierManager'
                  />
                </Header>
                <div
                  style={{
                    flex: 1,
                    textAlign: 'right'
                  }}
                >
                  <Button
                    color='red'
                    onClick={() => {
                      this.setState({
                        "identifiers": !this.state.identifiers
                      });
                    }}
                    size='small'
                  >
                    {
                      this.state.identifiers === true ?
                        <TranslationText
                          id='collapse'
                        />:
                        <TranslationText
                          id='expand'
                        />
                    }
                  </Button>
                </div>
              </div>
              {
                this.state.identifiers === true ?
                  <Segment>
                    <IdentifierSettings />
                  </Segment>: <Divider />
              }
            </div>: null
        }
      </div>
    );
  }
};

EditorSettings.propTypes = {
  codes: PropTypes.object,
  geocode: PropTypes.string,
  setting: PropTypes.object,
  t: PropTypes.func,
  toggleField: PropTypes.func,
  toggleFilter: PropTypes.func
};

EditorSettings.defaultProps = {
  geocode: "Geol"
};

const mapStateToProps = (state) => {
  return {
    setting: state.setting,
    codes: state.core_domain_list,
    user: state.core_user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    toggleField: (filter, enabled) => {
      dispatch(patchCodeConfig(`fields.${filter}`, enabled));
    },
    toggleFilter: (filter, enabled) => {
      dispatch(patchSettings(`efilter.${filter}`, enabled));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('common')(EditorSettings));
