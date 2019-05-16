import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// import _ from 'lodash';

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
  patchSettings
} from '@ist-supsi/bmsjs';


// import Scroller from '../../commons/scroller';

class EditorSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "search": false
    };
  }

  render() {
    const {
      setting,
      t,
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
        <div>
          Pellentesque scelerisque orci dolor, vel posuere nisi imperdiet ut
          Nunc condimentum erat risus, in dictum erat rhoncus sit amet.
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
                <div
                  style={{
                    paddingTop: '0.5em',
                    paddingLeft: '1.85714em',
                    color: '#787878'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </div>
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
                <div
                  style={{
                    paddingTop: '0.5em',
                    paddingLeft: '1.85714em',
                    color: '#787878'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </div>
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
                <div
                  style={{
                    paddingTop: '0.5em',
                    paddingLeft: '1.85714em',
                    color: '#787878'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </div>
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
                <div
                  style={{
                    paddingTop: '0.5em',
                    paddingLeft: '1.85714em',
                    color: '#787878'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </div>
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
                <div
                  style={{
                    paddingTop: '0.5em',
                    paddingLeft: '1.85714em',
                    color: '#787878'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </div>
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
                <div
                  style={{
                    paddingTop: '0.5em',
                    paddingLeft: '1.85714em',
                    color: '#787878'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </div>
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
                <div
                  style={{
                    paddingTop: '0.5em',
                    paddingLeft: '1.85714em',
                    color: '#787878'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </div>
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
                <div
                  style={{
                    paddingTop: '0.5em',
                    paddingLeft: '1.85714em',
                    color: '#787878'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </div>
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
                <div
                  style={{
                    paddingTop: '0.5em',
                    paddingLeft: '1.85714em',
                    color: '#787878'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </div>
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
                <div
                  style={{
                    paddingTop: '0.5em',
                    paddingLeft: '1.85714em',
                    color: '#787878'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </div>
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
                <div
                  style={{
                    paddingTop: '0.5em',
                    paddingLeft: '1.85714em',
                    color: '#787878'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </div>
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
                <div
                  style={{
                    paddingTop: '0.5em',
                    paddingLeft: '1.85714em',
                    color: '#787878'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </div>
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
                <div
                  style={{
                    paddingTop: '0.5em',
                    paddingLeft: '1.85714em',
                    color: '#787878'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </div>
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
                <div
                  style={{
                    paddingTop: '0.5em',
                    paddingLeft: '1.85714em',
                    color: '#787878'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </div>
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
                <div
                  style={{
                    paddingTop: '0.5em',
                    paddingLeft: '1.85714em',
                    color: '#787878'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </div>
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
                <div
                  style={{
                    paddingTop: '0.5em',
                    paddingLeft: '1.85714em',
                    color: '#787878'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </div>
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
                <div
                  style={{
                    paddingTop: '0.5em',
                    paddingLeft: '1.85714em',
                    color: '#787878'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </div>
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
                <div
                  style={{
                    paddingTop: '0.5em',
                    paddingLeft: '1.85714em',
                    color: '#787878'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </div>
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
                <div
                  style={{
                    paddingTop: '0.5em',
                    paddingLeft: '1.85714em',
                    color: '#787878'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </div>
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
                <div
                  style={{
                    paddingTop: '0.5em',
                    paddingLeft: '1.85714em',
                    color: '#787878'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </div>
              </Segment>

            </Segment.Group>
            : <Divider />
        }
      </div>
    );
  }
};

EditorSettings.propTypes = {
  setting: PropTypes.object,
  t: PropTypes.func,
  toggleFilter: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    setting: state.setting
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    toggleFilter: (filter, enabled) => {
      dispatch(patchSettings(`efilter.${filter}`, enabled));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate(['borehole_form', 'common'])(EditorSettings));
