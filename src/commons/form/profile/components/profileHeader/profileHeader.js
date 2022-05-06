import React, { useState, useEffect, useCallback } from 'react';
import * as Styled from './styles';
import { Button, Icon } from 'semantic-ui-react';
import TranslationText from './../../../translationText';
import DateText from '../../../dateText';
import { createStratigraphy } from '@ist-supsi/bmsjs';
import { useTranslation } from 'react-i18next';
import { getData } from './api';
const ProfileHeader = props => {
  const { boreholeID, kind, isEditable, reloadHeader, showAllInstrument } =
    props.data;
  const {
    selectedStratigraphy,
    setSelectedStratigraphy,
    setShowAllInstrument,
  } = props;
  const { t } = useTranslation();
  const [profiles, setProfiles] = useState([]);
  const [isCasingNull, setIsCasingNull] = useState(true);

  const setData = useCallback(
    (id, kind) => {
      let myKind = kind !== 3003 ? kind : 3002;
      getData(id, myKind).then(data => {
        if (data) {
          setProfiles(data);
          if (myKind === 3002) {
            if (data.length > 0) {
              setIsCasingNull(false);
            } else {
              setIsCasingNull(true);
            }
          }
          if (!selectedStratigraphy && kind !== 3003) {
            setSelectedStratigraphy(data[0]);
          } else if (
            !selectedStratigraphy &&
            kind === 3003 &&
            !showAllInstrument
          ) {
            setShowAllInstrument();
          }
        }
      });
    },
    [
      selectedStratigraphy,
      setSelectedStratigraphy,
      setShowAllInstrument,
      showAllInstrument,
    ],
  );

  useEffect(() => {
    if (boreholeID) {
      setData(boreholeID, kind);
    }
  }, [boreholeID, reloadHeader, kind, setData]);

  useEffect(() => {
    setProfiles([]);
  }, [kind]);

  const createNewStratigraphy = () => {
    createStratigraphy(boreholeID, kind)
      .then(response => {
        if (response.data.success) {
          setData(boreholeID, kind);
        } else {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <Styled.Container>
      <Styled.ButtonContainer>
        {isEditable && kind !== 3003 && (
          <Button
            content={
              kind === 3000 ? (
                <TranslationText id="stratigraphy" />
              ) : kind === 3002 ? (
                <TranslationText id="casing" />
              ) : kind === 3004 ? (
                <TranslationText id="filling" />
              ) : (
                ''
              )
            }
            disabled={kind === 3004 && profiles?.length > 0}
            icon="add"
            onClick={createNewStratigraphy}
            secondary
            size="small"
          />
        )}
        {kind === 3003 && (
          <Button
            content={<TranslationText id="showAll" />}
            disabled={showAllInstrument || isCasingNull}
            onClick={setShowAllInstrument}
            secondary
            size="small"
          />
        )}

        {profiles?.map(item => (
          <Styled.Item
            key={item.id}
            onClick={() => {
              setSelectedStratigraphy(item);
            }}
            style={{
              borderBottom:
                item.id === selectedStratigraphy?.id && '2px solid black',
            }}>
            <Styled.ItemName>
              {item.primary && <Icon name="check" />}
              {item.name === null || item.name === ''
                ? t('common:np')
                : item.name}
            </Styled.ItemName>
            <Styled.ItemDate>
              <DateText date={item.date} />
            </Styled.ItemDate>
          </Styled.Item>
        ))}
      </Styled.ButtonContainer>
    </Styled.Container>
  );
};

export default ProfileHeader;
