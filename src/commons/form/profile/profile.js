import React from "react";
import PropTypes from "prop-types";

import ProfileHeader from "./components/profileHeader";
import ProfileLayers from "./components/profileLayers";

// Take a look at the StratigraphyFormContainer

const Profile = (props) => {
  return (
    <div>
      <ProfileHeader />
      <div
        style={{
          flex: "1 1 100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div>
          <div>Profile info</div>
          <ProfileLayers />
        </div>
        <div>Profile Attributes</div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  id: PropTypes.number,
  kind: PropTypes.number,
  unlocked: PropTypes.bool,
};

export default Profile;
