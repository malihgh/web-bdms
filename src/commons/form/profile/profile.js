import React, { useState, useEffect } from 'react';
import * as Styled from './styles';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ProfileHeader from './components/profileHeader';
import ProfileInfo from './components/profileInfo';
import ProfileLayers from './components/profileLayers';
import ProfileAttributes from './components/profileAttributes';
import { casingData } from './data/casingdata';
import { fillingData } from './data/fillingdata';
import { stratigraphyData } from './data/stratigraphydata';

// Take a look at the StratigraphyFormContainer

const Profile = props => {
  const { user, borehole } = useSelector(state => ({
    borehole: state.core_borehole,
    user: state.core_user,
  }));
  const { kind } = props;

  const [isEditable, setIsEditable] = useState(false);
  const [selectedStratigraphy, setSelectedStratigraphy] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [reloadLayer, setReloadLayer] = useState(0);
  const [reloadHeader, setReloadHeader] = useState(0);
  const [reloadAttribute, setReloadAttribute] = useState(0);
  const [attributesBasedKind, setAttributesBasedKind] = useState(null);

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
    if (kind === 'hydrogeology' || kind === 'stratigraphy') {
      setAttributesBasedKind(stratigraphyData);
      OnUpdated('newAttribute');
    }
    if (kind === 'casing') {
      setAttributesBasedKind(casingData);
      OnUpdated('newAttribute');
    }
    if (kind === 'filling') {
      setAttributesBasedKind(fillingData);
      OnUpdated('newAttribute');
    }
    console.log('lkdjfls', kind, attributesBasedKind);
  }, [setIsEditable, borehole, user, kind]);

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
      console.log('hey', attribute);
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
    if (attribute === 'deleteStratigraphy' || attribute === 'newAttribute') {
      setSelectedStratigraphy(null);
      setReloadHeader(reloadHeader => reloadHeader + 1);
      setReloadLayer(reloadLayer => reloadLayer + 1);
    }

    if (attribute === 'newAttribute')
      setReloadAttribute(reloadAttribute => reloadAttribute + 1);
  };
  // let selectedStratigraphy = useMemo(
  //   () => {
  //     return borehole?.data?.stratigraphy?.[0] ?? null;
  // }, [borehole]);

  return (
    <Styled.MainContainer>
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
      <Styled.Container>
        <Styled.FirstColumn>
          {attributesBasedKind && (
            <ProfileInfo
              data={{
                item: selectedStratigraphy !== null && selectedStratigraphy,
                isEditable,
                onUpdated: OnUpdated,
                attribute: attributesBasedKind?.profileInfo,
              }}
            />
          )}

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
        </Styled.FirstColumn>
        {selectedLayer !== null && (
          <Styled.SecondColumn>
            <ProfileAttributes
              data={{
                id: selectedLayer ? selectedLayer.id : null,
                isEditable,
                onUpdated: OnUpdated,
                reloadAttribute,
                attribute: attributesBasedKind?.profileAttribute,
              }}
            />
          </Styled.SecondColumn>
        )}
      </Styled.Container>
    </Styled.MainContainer>
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
