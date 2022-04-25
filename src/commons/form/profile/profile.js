import React, { useState, useEffect, useCallback } from 'react';
import * as Styled from './styles';
import { useSelector } from 'react-redux';
import ProfileHeader from './components/profileHeader';
import ProfileInfo from './components/profileInfo';
import ProfileLayers from './components/profileLayers';
import ProfileAttributes from './components/profileAttributes';
import { casingData } from './data/casingdata';
import { fillingData } from './data/fillingdata';
import { stratigraphyData } from './data/stratigraphydata';
import ProfileInstrument from './components/profileInstrument/profileInstrument';
import { profileKinds } from './data/profileKinds';
import TranslationText from '../translationText';

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
  const [stratigraphyKind, setStratigraphyKind] = useState(null);
  const [showAllInstrument, setShowAllInstrument] = useState(false);

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
    if (kind === 'instruments') {
      setStratigraphyKind(profileKinds[3]);
      OnUpdated('newAttribute');
    }
    if (kind === 'stratigraphy') {
      setAttributesBasedKind(stratigraphyData);
      setStratigraphyKind(profileKinds[0]);
      OnUpdated('newAttribute');
    }
    if (kind === 'hydrogeology') {
      setAttributesBasedKind(stratigraphyData);
      setStratigraphyKind(profileKinds[5]);
      OnUpdated('newAttribute');
    }
    if (kind === 'casing') {
      setAttributesBasedKind(casingData);
      setStratigraphyKind(profileKinds[2]);
      OnUpdated('newAttribute');
    }
    if (kind === 'filling') {
      setAttributesBasedKind(fillingData);
      setStratigraphyKind(profileKinds[4]);
      OnUpdated('newAttribute');
    }
  }, [setIsEditable, borehole, user, kind]);

  const OnUpdated = attribute => {
    if (
      attribute === 'depth_to' ||
      attribute === 'depth_from' ||
      attribute === 'lithostratigraphy' ||
      attribute === 'lithology' ||
      attribute === 'chronostratigraphy' ||
      attribute === 'newLayer' ||
      attribute === 'fixErrors' ||
      attribute === 'casing_kind' ||
      attribute === 'casing_material' ||
      attribute === 'casing_drilling' ||
      attribute === 'fill_material'
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
    if (attribute === 'deleteStratigraphy' || attribute === 'newAttribute') {
      setSelectedStratigraphy(null);
      setReloadHeader(reloadHeader => reloadHeader + 1);
      setReloadLayer(reloadLayer => reloadLayer + 1);
    }

    if (attribute === 'newAttribute')
      setReloadAttribute(reloadAttribute => reloadAttribute + 1);
  };

  const set = useCallback(
    e => {
      setSelectedStratigraphy(e);
      setSelectedLayer(null);
      setShowAllInstrument(false);
    },
    [setSelectedStratigraphy, setSelectedLayer, setShowAllInstrument],
  );

  return (
    <Styled.MainContainer>
      {stratigraphyKind && borehole.data.id && (
        <ProfileHeader
          data={{
            boreholeID: borehole.data.id,
            kind: stratigraphyKind.kindNumber,
            isEditable,
            showAllInstrument,
            setShowAllInstrument: () => {
              setSelectedStratigraphy(null);

              setShowAllInstrument(!showAllInstrument);
            },
            reloadHeader,
          }}
          selectedStratigraphy={selectedStratigraphy}
          setSelectedStratigraphy={set}
        />
      )}

      {!selectedStratigraphy &&
        !showAllInstrument &&
        stratigraphyKind?.kind !== 'instruments' && (
          <Styled.Empty>
            <TranslationText id="msgStartigraphyEmpty" />
          </Styled.Empty>
        )}

      {stratigraphyKind?.kind !== 'instruments' && selectedStratigraphy && (
        <Styled.Container>
          <Styled.FirstColumn>
            <ProfileInfo
              data={{
                kind: stratigraphyKind.kind,
                selectedStratigraphyID: selectedStratigraphy
                  ? selectedStratigraphy.id
                  : null,
                isEditable,
                onUpdated: OnUpdated,
                attribute: attributesBasedKind?.profileInfo,
              }}
            />

            <ProfileLayers
              data={{
                selectedStratigraphyID: selectedStratigraphy
                  ? selectedStratigraphy.id
                  : null,
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
      )}
      {stratigraphyKind?.kind === 'instruments' && borehole.data.id && (
        <ProfileInstrument
          data={{
            boreholeID: borehole.data.id,
            showAllInstrument,
            selectedStratigraphyID: selectedStratigraphy?.id,
            isEditable,
            reloadLayer,
            onUpdated: OnUpdated,
          }}
        />
      )}
    </Styled.MainContainer>
  );
};

Profile.defaultProps = {
  id: undefined,
};

export default Profile;
