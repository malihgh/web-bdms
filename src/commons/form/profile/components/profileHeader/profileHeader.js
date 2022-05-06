import React, { useState, useEffect, useCallback } from 'react';
import * as Styled from './styles';
import { Button } from 'semantic-ui-react';
import TranslationText from './../../../translationText';
import { getData, createNewStratigraphy } from './api';
import { profileKind } from '../../constance';
import ProfileHeaderList from './components/profileHeaderList';

const ProfileHeader = props => {
  const { boreholeID, kind, isEditable, reloadHeader, showAllInstrument } =
    props.data;
  const {
    selectedStratigraphy,
    setSelectedStratigraphy,
    setShowAllInstrument,
  } = props;

  const [profiles, setProfiles] = useState([]);

  const setSpecialData = useCallback(
    data => {
      if (!selectedStratigraphy && kind !== profileKind.INSTRUMENT) {
        setSelectedStratigraphy(data?.[0]);
      } else if (
        !selectedStratigraphy &&
        kind === profileKind.INSTRUMENT &&
        !showAllInstrument
      ) {
        setShowAllInstrument();
      }
    },
    [
      selectedStratigraphy,
      setSelectedStratigraphy,
      setShowAllInstrument,
      showAllInstrument,
      kind,
    ],
  );

  const setData = useCallback(
    (id, kind) => {
      let myKind = kind !== profileKind.INSTRUMENT ? kind : profileKind.CASING;
      getData(id, myKind).then(data => {
        setProfiles(data);
        setSpecialData(data);
      });
    },
    [setSpecialData],
  );

  useEffect(() => {
    if (boreholeID) {
      setData(boreholeID, kind);
    }
  }, [boreholeID, reloadHeader, kind, setData]);

  useEffect(() => {
    setProfiles([]);
  }, [kind]);

  const createStratigraphy = () => {
    createNewStratigraphy(boreholeID, kind).then(data => {
      if (data) setData(boreholeID, kind);
    });
  };

  const setStratigraphy = item => {
    setSelectedStratigraphy(item);
  };

  const setText = (
    <>
      {(kind === profileKind.STRATIGRAPHY && (
        <TranslationText id="stratigraphy" />
      )) ||
        (kind === profileKind.CASING && <TranslationText id="casing" />) ||
        (kind === profileKind.FILLING && <TranslationText id="filling" />) ||
        ''}
    </>
  );

  return (
    <Styled.Container>
      <Styled.ButtonContainer>
        {isEditable && kind !== profileKind.INSTRUMENT && (
          <Button
            content={setText}
            disabled={kind === profileKind.FILLING && profiles?.length > 0}
            icon="add"
            onClick={createStratigraphy}
            secondary
            size="small"
          />
        )}
        {kind === profileKind.INSTRUMENT && (
          <Button
            content={<TranslationText id="showAll" />}
            disabled={showAllInstrument || profiles?.length < 1}
            onClick={setShowAllInstrument}
            secondary
            size="small"
          />
        )}

        <ProfileHeaderList
          profiles={profiles}
          selectedStratigraphy={selectedStratigraphy}
          setSelectedStratigraphy={setStratigraphy}
        />
      </Styled.ButtonContainer>
    </Styled.Container>
  );
};

export default ProfileHeader;
