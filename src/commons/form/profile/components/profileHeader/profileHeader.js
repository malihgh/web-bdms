import React, { useState, useEffect, useCallback } from 'react';
import * as Styled from './styles';
import { Button, Icon } from 'semantic-ui-react';
import TranslationText from './../../../translationText';
import PropTypes from 'prop-types';
import DateText from '../../../dateText';
import { getProfiles, createStratigraphy } from '@ist-supsi/bmsjs';
import { withTranslation } from 'react-i18next';

const ProfileHeader = props => {
  const {
    boreholeID,
    kind,
    isEditable,
    selectedStratigraphy,
    setSelectedStratigraphy,
    reloadHeader,
  } = props.data;
  const { t } = props;
  const [profiles, setProfiles] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  const getData = useCallback(
    (id, kind) => {
      getProfiles(id, kind)
        .then(response => {
          if (response.data.success) {
            setProfiles(response.data.data);
            if (!selectedStratigraphy) {
              setSelectedItem(response.data.data[0]);
              setSelectedStratigraphy(response.data.data[0]);
            }
          } else {
            alert(response.data.message);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    [selectedStratigraphy, setSelectedStratigraphy],
  );

  useEffect(() => {
    const myKind = kind !== 3003 ? kind : 3002;
    if (boreholeID) getData(boreholeID, myKind);
  }, [boreholeID, reloadHeader, getData, kind]);

  const createStratigraphy = () => {
    createStratigraphy(boreholeID, kind)
      .then(response => {
        if (response.data.success) {
          getData();
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
                'Casing'
              ) : kind === 3004 ? (
                'Create Filling'
              ) : (
                ''
              )
            }
            disabled={kind === 3004 && profiles.length > 0}
            icon="add"
            onClick={createStratigraphy}
            secondary
            size="small"
          />
        )}
        {kind === 3003 && (
          <Button
            content={<TranslationText id="showAll" />}
            // onClick={CreateStratigraphy}
            secondary
            size="small"
          />
        )}

        {profiles?.map(item => (
          <Styled.Item
            key={item.id}
            onClick={() => {
              setSelectedItem(item);
              setSelectedStratigraphy(item);
            }}
            style={{
              borderBottom: item.id === selectedItem?.id && '2px solid black',
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
ProfileHeader.propTypes = {
  t: PropTypes.func,
};

export default withTranslation('common')(ProfileHeader);
