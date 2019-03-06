import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
// import {
//   Redirect
// } from "react-router-dom";

import {
  Button,
  Checkbox,
  Divider,
  Header,
  // Icon,
  Segment,
} from 'semantic-ui-react';

import {
  patchSettings
} from '@ist-supsi/bmsjs';

class ExplorerSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_filter: false,
      map: false
    };
    console.log("constructor..")
  }
  
  render() {
    const {
      setting, t, toggleFilter
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
            style={{
              margin: '0px'
            }}
          >
            Map
          </Header>
          <div
            style={{
              flex: 1,
              textAlign: 'right'
            }}
          >
            <Button
              onClick={()=>{
                this.setState({
                  map: !this.state.map
                })
              }}
              color='red'
              size='small'
            >
              {
                this.state.map === true?
                  'Collapse': 'Expand'
              }
            </Button>
          </div>
        </div>
        <div>
          Pellentesque scelerisque orci dolor, vel posuere nisi imperdiet ut
          Nunc condimentum erat risus, in dictum erat rhoncus sit amet.
        </div>
        {
          this.state.map === true?
            <Segment.Group>
              <Segment>
                <Checkbox
                  checked={setting.data.filter.mapfilter}
                  label='Filter by Map'
                  onChange={(e, d)=>{
                    toggleFilter(
                      'mapfilter',
                      d.checked
                    );
                  }}/>
                  <div
                    style={{
                      paddingTop: '0.5em',
                      paddingLeft: '1.85714em',
                      color: '#787878'
                    }
                  }>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                    Class aptent taciti sociosqu ad litora torquent per conubia nostra
                  </div>
              </Segment>
            </Segment.Group>
            : <Divider />
        }
        <div
          style={{
            flexDirection: 'row',
            display: 'flex'
          }}
        >
          <Header
            as='h3'
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
              onClick={()=>{
                this.setState({
                  search_filter: !this.state.search_filter
                })
              }}
              color='red'
              size='small'
            >
              {
                this.state.search_filter === true?
                  'Collapse': 'Expand'
              }
            </Button>
          </div>
        </div>
        <div>
          Pellentesque scelerisque orci dolor, vel posuere nisi imperdiet ut
          Nunc condimentum erat risus, in dictum erat rhoncus sit amet.
        </div>
        {
          this.state.search_filter === true?
            <Segment.Group>
              <Segment>
                <Checkbox
                  checked={setting.data.filter.mapfilter}
                  label='Filter by Map'
                  onChange={(e, d)=>{
                    toggleFilter(
                      'mapfilter',
                      d.checked
                    );
                  }}/>
                  <div
                    style={{
                      paddingTop: '0.5em',
                      paddingLeft: '1.85714em',
                      color: '#787878'
                    }
                  }>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                    Class aptent taciti sociosqu ad litora torquent per conubia nostra
                  </div>
              </Segment>
              <Segment>
                <Checkbox
                  checked={setting.data.filter.zoom2selected}
                  label='Zoom to selected'
                  onChange={(e, d)=>{
                    toggleFilter(
                      'zoom2selected',
                      d.checked
                    );
                  }}/>
                  <div
                    style={{
                      paddingTop: '0.5em',
                      paddingLeft: '1.85714em',
                      color: '#787878'
                    }
                  }>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                    Class aptent taciti sociosqu ad litora torquent per conubia nostra
                  </div>
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.kind
                  }
                  label={t('kind')}
                  onChange={(e, d)=>{
                    toggleFilter(
                      'kind',
                      d.checked
                    );
                  }}/>
                  <div
                    style={{
                      paddingTop: '0.5em',
                      paddingLeft: '1.85714em',
                      color: '#787878'
                    }
                  }>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                    Class aptent taciti sociosqu ad litora torquent per conubia nostra
                  </div>
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.restriction
                  }
                  label={t('restriction') + "/" + t('restriction_until')}
                  onChange={(e, d)=>{
                    toggleFilter(
                      'restriction',
                      d.checked
                    )
                  }}/>
                  <div
                    style={{
                      paddingTop: '0.5em',
                      paddingLeft: '1.85714em',
                      color: '#787878'
                    }
                  }>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                    Class aptent taciti sociosqu ad litora torquent per conubia nostra
                  </div>
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.custom.canton
                  }
                  label={t('canton') + "/" + t('city')}
                  onChange={(e, d)=>{
                    toggleFilter(
                      'custom.canton',
                      d.checked
                    )
                  }}/>
                  <div
                    style={{
                      paddingTop: '0.5em',
                      paddingLeft: '1.85714em',
                      color: '#787878'
                    }
                  }>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                    Class aptent taciti sociosqu ad litora torquent per conubia nostra
                  </div>
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.elevation_z
                  }
                  label={t('elevation_z')}
                  onChange={(e, d)=>{
                    toggleFilter(
                      'elevation_z',
                      d.checked
                    )
                  }}/>
                  <div
                    style={{
                      paddingTop: '0.5em',
                      paddingLeft: '1.85714em',
                      color: '#787878'
                    }
                  }>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                    Class aptent taciti sociosqu ad litora torquent per conubia nostra
                  </div>
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.length
                  }
                  label={t('length')}
                  onChange={(e, d)=>{
                    toggleFilter(
                      'length',
                      d.checked
                    )
                  }}/>
                  <div
                    style={{
                      paddingTop: '0.5em',
                      paddingLeft: '1.85714em',
                      color: '#787878'
                    }
                  }>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                    Class aptent taciti sociosqu ad litora torquent per conubia nostra
                  </div>
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.extended.status
                  }
                  label={t('status')}
                  onChange={(e, d)=>{
                    toggleFilter(
                      'extended.status',
                      d.checked
                    )
                  }}/>
                  <div
                    style={{
                      paddingTop: '0.5em',
                      paddingLeft: '1.85714em',
                      color: '#787878'
                    }
                  }>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent cursus mauris a nisi tristique, quis euismod sapien porttitor.
                    Class aptent taciti sociosqu ad litora torquent per conubia nostra
                  </div>
              </Segment>
              <Segment>
                <Checkbox
                  checked={
                    setting.data.filter.drilling_date
                  }
                  label={t('drilling_date')}
                  onChange={(e, d)=>{
                    toggleFilter(
                      'drilling_date',
                      d.checked
                    );
                  }}/>
                  <div
                    style={{
                      paddingTop: '0.5em',
                      paddingLeft: '1.85714em',
                      color: '#787878'
                    }
                  }>
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

const mapStateToProps = (state, ownProps) => {
  return {
    setting: state.setting
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    toggleFilter: (filter, enabled) => {
      dispatch(patchSettings(`filter.${filter}`, enabled));
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
