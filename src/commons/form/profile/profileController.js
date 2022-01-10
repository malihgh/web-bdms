import React from 'react';
import PropTypes from 'prop-types';

import ProfileHeader from './profileHeader';

// Take a look at the StratigraphyFormContainer

const ProfileController = (props) => {
  return (
    <div>
      <ProfileHeader
        id={props.id}
      />
      <div
        style={{
          flex: "1 1 100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div>
          <div>
            Profile info
          </div>
          <div>
            Profile Layers
          </div>
        </div>
        <div>
          Profile Attributes
        </div>
      </div>
    </div>
  );
};

ProfileController.propTypes = {
  id: PropTypes.number,
  kind: PropTypes.number,
  unlocked: PropTypes.bool,
};

export default ProfileController;