import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  Icon
} from 'semantic-ui-react';

import {
  loadDomains,
  loadCantons,
  loadSettings,
  loadUser,
} from '@ist-supsi/bmsjs';


class DataLoader extends React.Component {

  componentDidMount(){
    this.props.loadUser();
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.user.data, prevProps.user.data)) {
      this.props.loadSettings();
      this.props.loadDomains();
      this.props.loadCantons();
    }
  }

  // isFetching() {
  //   const {
  //     cantons,
  //     domains,
  //     user
  //   } = this.props;
  //   if (
  //     user.data === null
  //     || user.isFetching === true
  //   ) {
  //     return true;
  //   }
  //   if (
  //     Object.keys(domains.data).length === 0
  //     || domains.isFetching === true
  //   ) {
  //     return true;
  //   }
  //   if (
  //     cantons.data.length === 0
  //     || cantons.isFetching === true
  //   ) {
  //     return true;
  //   }
  //   return false;
  // }

  render() {
    return (
      <div
        style={{
          flex: '1 1 0%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <img
              alt="Swiss Logo"
              src={process.env.PUBLIC_URL + '/img/ch.png'}
              style={{
                height: '30px',
                width: 'auto'
              }}
            />
            <div
              style={{
                marginLeft: '1em'
              }}
            >
              <div>
                <div>
                  Borehole Management System
                </div>
                <div
                  style={{
                    fontSize: '0.8em',
                    textAlign: 'left'
                  }}
                >
                  {
                    this.props.user.data === null?
                      <span>
                        <span
                          className='linker link'
                          onClick={()=>{
                            this.props.loadUser();
                          }}
                        >
                          Please login
                        </span> <Icon
                          name='lock'
                          size='small'
                        />
                      </span>:
                      <span>
                        Initialization <Icon
                          loading
                          name='spinner'
                          size='small'
                        />
                      </span>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

DataLoader.propTypes = {
  loadCantons: PropTypes.func,
  loadDomains: PropTypes.func,
  loadSettings: PropTypes.func,
  loadUser: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    user: state.core_user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    loadDomains: () => {
      dispatch(loadDomains());
    },
    loadCantons: () => {
      dispatch(loadCantons());
    },
    loadSettings: () => {
      dispatch(loadSettings());
    },
    loadUser: () => {
      dispatch(loadUser());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataLoader);
