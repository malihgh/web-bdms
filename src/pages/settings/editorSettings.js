import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
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

const fields = [
  {
    name: 'description'
  },
  {
    name: 'geology'
  },
  {
    name: 'qt_description'
  },
  {
    name: 'lithology'
  },
  {
    name: 'lithostratigraphy'
  },
  {
    name: 'chronostratigraphy'
  },
  {
    name: 'tectonic_unit'
  },
  {
    name: 'color'
  },
  {
    name: 'plasticity'
  },
  {
    name: 'humidity'
  },
  {
    name: 'consistance'
  },
  {
    name: 'alteration'
  },
  {
    name: 'compactness'
  },
  {
    name: 'jointing'
  },
  {
    name: 'soil_state'
  },
  {
    name: 'organic_component'
  },
  {
    name: 'striae'
  },
  {
    name: 'grain_size_1'
  },
  {
    name: 'grain_size_2'
  },
  {
    name: 'grain_shape'
  },
  {
    name: 'grain_granularity'
  },
  {
    name: 'cohesion'
  },
  {
    name: 'further_properties'
  },
  {
    name: 'uscs_1'
  },
  {
    name: 'uscs_2'
  },
  {
    name: 'uscs_3'
  },
  {
    name: 'uscs_original'
  },
  {
    name: 'uscs_determination'
  },
  {
    name: 'debris'
  },
  {
    name: 'lit_pet_deb'
  },
  {
    name: 'notes'
  }
];


class EditorSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "fields": false,
      "search": false
    };
  }

  isVisible(field){
    const {
      geocode,
      codes
    } = this.props;
    if (
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
                "search": !this.state.search
              });
            }}
            style={{
              margin: '0px'
            }}
          >
            Search filters
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
                  "search": !this.state.search
                });
              }}
              size='small'
            >
              {
                this.state.search === true ?
                  t('common:collapse') : t('common:expand')
              }
            </Button>
          </div>
        </div>
        {
          this.state.search === true ?
            <Segment.Group>

              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.extended.original_name
                  }
                  label={t('original_name')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.original_name',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.kind
                  }
                  label={t('kind')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'kind',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.extended.method
                  }
                  label={t('method')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.method',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.custom.project_name
                  }
                  label={t('project_name')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.project_name',
                      d.checked
                    );
                  }}
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
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.custom.landuse
                  }
                  label={t('landuse')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.landuse',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.custom.canton
                  }
                  label={t('canton') + "/" + t('city') + "/" + t('address')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.canton',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.elevation_z
                  }
                  label={t('elevation_z')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'elevation_z',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.length
                  }
                  label={t('length')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'length',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.extended.groundwater
                  }
                  label={t('groundwater')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.groundwater',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.extended.top_bedrock
                  }
                  label={t('top_bedrock')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.top_bedrock',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.extended.status
                  }
                  label={t('status')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.status',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.extended.purpose
                  }
                  label={t('purpose')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'extended.purpose',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.custom.cuttings
                  }
                  label={t('cuttings')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.cuttings',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.drilling_date
                  }
                  label={t('drilling_date')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'drilling_date',
                      d.checked
                    );
                  }}
                />
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.custom.drill_diameter
                  }
                  label={t('drill_diameter')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.drill_diameter',
                      d.checked
                    );
                  }}
                />
              </Segment>

              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.bore_inc
                  }
                  label={t('bore_inc')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'bore_inc',
                      d.checked
                    );
                  }}
                />
              </Segment>

              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.custom.lit_pet_top_bedrock
                  }
                  label={t('lit_pet_top_bedrock')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.lit_pet_top_bedrock',
                      d.checked
                    );
                  }}
                />
              </Segment>

              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.custom.lit_str_top_bedrock
                  }
                  label={t('lit_str_top_bedrock')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.lit_str_top_bedrock',
                      d.checked
                    );
                  }}
                />
              </Segment>

              <Segment>
                <Checkbox
                  checked={
                    setting.data.efilter.custom.chro_str_top_bedrock
                  }
                  label={t('chro_str_top_bedrock')}
                  onChange={(e, d) => {
                    toggleFilter(
                      'custom.chro_str_top_bedrock',
                      d.checked
                    );
                  }}
                />
              </Segment>

            </Segment.Group>
            : <Divider />
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
                  Stratigraphy fields
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
                        t('common:collapse') : t('common:expand')
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
                              this.isVisible(field.name)
                            }
                            label={t(`layer_form:${field.name}`)}
                            onChange={(e, d) => {
                              toggleField(field.name, d.checked);
                            }}
                          />
                        </Segment>
                      ))
                    }
                  </Segment.Group>
                  : <Divider />
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
  geocode: "Or"
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
)(translate(['borehole_form', 'common', 'layer_form'])(EditorSettings));
