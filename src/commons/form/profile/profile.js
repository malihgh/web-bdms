import React, { useState, useEffect } from 'react';
import * as Style from './styles';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ProfileHeader from './components/profileHeader';
import ProfileLayers from './components/profileLayers';
import ProfileInfo from './components/profileHeader/components/profileInfo';
import ProfileAttributes from './components/profileAttributes';

// Take a look at the StratigraphyFormContainer

const Profile = () => {
  const { user, borehole } = useSelector(state => ({
    borehole: state.core_borehole,
    user: state.core_user,
  }));

  const [isEditable, setIsEditable] = useState(false);
  const [selectedStratigraphy, setSelectedStratigraphy] = useState(null);

  useEffect(() => {
    if (
      !(
        borehole?.data?.lock === null ||
        borehole?.data?.lock.username !== user?.data?.username ||
        borehole?.data?.role !== 'EDIT'
      )
    ) {
      setIsEditable(true);
    } else {
      setIsEditable(false);
    }
  }, [setIsEditable, borehole, user]);

  // let selectedStratigraphy = useMemo(
  //   () => {
  //     return borehole?.data?.stratigraphy?.[0] ?? null;
  // }, [borehole]);

  const dataBorehole = {
    data: borehole.data,
    user: user.data,
    isEditable: isEditable,
  };

  return (
    <Style.MainContainer>
      <ProfileHeader
        data={{
          boreholeID: borehole.data.id,
          kind: 3000,
          isEditable,
          selectedStratigraphy: e => {
            setSelectedStratigraphy(e);
          },
        }}
      />
      <Style.Container>
        <div style={{ width: '60%' }}>
          <ProfileInfo
            data={{
              item: selectedStratigraphy !== null && selectedStratigraphy,
              isEditable,
            }}
          />

          <ProfileLayers
            data={{
              selectedStratigraphyID: selectedStratigraphy?.id,
              isEditable,
            }}
          />
        </div>
        <div style={{ width: '40%' }}>
          <ProfileAttributes />
        </div>
      </Style.Container>
    </Style.MainContainer>
  );
};

Profile.propTypes = {
  // borehole: PropTypes.object,
  // id: PropTypes.number,
  // kind: PropTypes.number,
  // unlocked: PropTypes.bool,
};

Profile.defaultProps = {
  id: undefined,
};

export default Profile;
