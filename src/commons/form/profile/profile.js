import React, { useState, useEffect } from 'react';
import * as Style from './styles';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ProfileHeader from './components/profileHeader';
import ProfileInfo from './components/profileInfo';
import ProfileLayers from './components/profileLayers';
import ProfileAttributes from './components/profileAttributes';

// Take a look at the StratigraphyFormContainer

const Profile = () => {
  const { user, borehole } = useSelector(state => ({
    borehole: state.core_borehole,
    user: state.core_user,
  }));

  const [isEditable, setIsEditable] = useState(false);
  const [selectedStratigraphy, setSelectedStratigraphy] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [reloadLayer, setReloadLayer] = useState(0);
  const [reloadHeader, setReloadHeader] = useState(0);

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

  const OnUpdated = attribute => {
    if (
      attribute === 'depth_to' ||
      attribute === 'depth_from' ||
      attribute === 'lithostratigraphy' ||
      attribute === 'lithology' ||
      attribute === 'chronostratigraphy' ||
      attribute === 'newLayer' ||
      attribute === 'fixErrors'
    ) {
      setReloadLayer(reloadLayer => reloadLayer + 1);
    }
    if (attribute === 'deleteLayer') {
      setSelectedLayer(null);
      setReloadLayer(reloadLayer => reloadLayer + 1);
    }
    if (
      attribute === 'primary' ||
      attribute === 'name' ||
      attribute === 'date' ||
      attribute === 'cloneStratigraphy'
    )
      setReloadHeader(reloadHeader => reloadHeader + 1);
    if (attribute === 'deleteStratigraphy') {
      setSelectedStratigraphy(null);
      setReloadHeader(reloadHeader => reloadHeader + 1);
      setReloadLayer(reloadLayer => reloadLayer + 1);
    }
  };

  return (
    <Style.MainContainer>
      <ProfileHeader
        data={{
          boreholeID: borehole.data.id,
          kind: 3000,
          isEditable,
          selectedStratigraphy,
          setSelectedStratigraphy: e => {
            setSelectedStratigraphy(e);
            setSelectedLayer(null);
          },
          reloadHeader,
        }}
      />
      <Style.Container>
        <Style.FirstColumn>
          <ProfileInfo
            data={{
              item: selectedStratigraphy !== null && selectedStratigraphy,
              isEditable,
              onUpdated: OnUpdated,
            }}
          />

          <ProfileLayers
            data={{
              selectedStratigraphyID: selectedStratigraphy?.id,
              isEditable,
              selectedLayer,
              setSelectedLayer: e => {
                setSelectedLayer(e);
              },
              reloadLayer,
              onUpdated: OnUpdated,
            }}
          />
        </Style.FirstColumn>
        {selectedLayer !== null && (
          <Style.SecondColumn>
            <ProfileAttributes
              data={{
                id: selectedLayer ? selectedLayer.id : null,
                isEditable,
                onUpdated: OnUpdated,
              }}
            />
          </Style.SecondColumn>
        )}
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
