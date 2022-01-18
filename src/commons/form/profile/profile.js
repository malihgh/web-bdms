import React, { useState, useEffect } from 'react';
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
  const [selectedItemID, setSelectedItemID] = useState(null);
  const [selectedStratigraphy, setSelectedStratigraphy] = useState(null);

  useEffect(() => {
    if (
      props.borehole.data.stratigraphy &&
      props.borehole.data.stratigraphy.length > 0
    ) {
      setSelectedItemID(props.borehole.data.stratigraphy[0].id);
      setSelectedStratigraphy(props.borehole.data.stratigraphy[0]);
    }
  }, [props]);

  const dataBorhole = {
    data: props.borehole.data,
    user: props.user.data,
    selectedStratigraphyID: selectedItemID,
    setSelectedStratigraphyID: id => {
      setSelectedItemID(id);

      var elementPos = props.borehole.data.stratigraphy
        .map(function (x) {
          return x.id;
        })
        .indexOf(id);
      setSelectedStratigraphy(props.borehole.data.stratigraphy[elementPos]);

      console.log(
        'hey',
        props.borehole.data.stratigraphy,
        selectedItemID,
        selectedStratigraphy,
      );
    },
    selectedStratigraphy: selectedStratigraphy,
  };

  return (
    <Style.MainContainer>
      <ProfileHeader data={dataBorhole} />
      <Style.Container>
        <div style={{ width: '60%' }}>
          <ProfileInfo data={dataBorhole} />
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
