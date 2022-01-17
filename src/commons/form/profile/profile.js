import React from 'react';
import * as Style from './styles';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import ProfileHeader from './components/profileHeader';
import ProfileLayers from './components/profileLayers';
import ProfileInfo from './components/profileInfo';
import ProfileAttributes from './components/profileAttributes';

// Take a look at the StratigraphyFormContainer

const Profile = props => {
  const dataBorhole = {
    data: props.borehole.data,
    user: props.user.data,
  };

  return (
    <Style.MainContainer>
      <ProfileHeader data={dataBorhole} />
      <Style.Container>
        <div style={{ width: '60%' }}>
          <ProfileInfo />
          <ProfileLayers />
        </div>
        <div style={{ width: '40%' }}>
          <ProfileAttributes />
        </div>
      </Style.Container>
    </Style.MainContainer>
  );
};

Profile.propTypes = {
  borehole: PropTypes.object,
  // id: PropTypes.number,
  // kind: PropTypes.number,
  // unlocked: PropTypes.bool,
};

Profile.defaultProps = {
  id: undefined,
};

const mapStateToProps = state => {
  return {
    borehole: state.core_borehole,
    user: state.core_user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withTranslation(['common'])(Profile)),
);
