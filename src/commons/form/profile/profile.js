import React from 'react';
import PropTypes from 'prop-types';

import ProfileHeader from './components/profileHeader';
import ProfileLayers from './components/profileLayers';
import ProfileInfo from './components/profileInfo';
import ProfileAttributes from './components/profileAttributes';

// Take a look at the StratigraphyFormContainer

const Profile = props => {
  return (
    <div style={{ height: '100%' }}>
      <ProfileHeader />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '10px',
          paddingRight: '0px',
          flex: 1,
          height: '100%',
        }}>
        <div style={{ width: '60%' }}>
          <ProfileInfo />
          <ProfileLayers />
        </div>
        <div style={{ width: '40%' }}>
          <ProfileAttributes />
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  // id: PropTypes.number,
  // kind: PropTypes.number,
  // unlocked: PropTypes.bool,
};

export default Profile;
