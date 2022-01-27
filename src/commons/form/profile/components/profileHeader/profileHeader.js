import React, { useState, useEffect } from 'react';
import * as Styled from './styles';
import { Button, Icon } from 'semantic-ui-react';
import TranslationText from './../../../translationText';
import PropTypes from 'prop-types';
import DateText from '../../../dateText';
import { getProfiles } from '@ist-supsi/bmsjs';
import ProfileInfo from './components/profileInfo';
import { withTranslation } from 'react-i18next';

const ProfileHeader = props => {
  const { boreholeID, kind, isEditable, selectedStratigraphyID } = props.data;
  const { t } = props;
  const [profiles, setProfiles] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => {
    GetData();
  }, [boreholeID]);

  const GetData = () => {
    getProfiles(boreholeID, kind)
      .then(response => {
        if (response.data.success) {
          setProfiles(response.data.data);
          setSelectedItem(response.data.data[0]);
          selectedStratigraphyID(response.data.data[0].id);
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Styled.Container>
      <Styled.ButtonContainer>
        {isEditable && (
          <Button
            content={<TranslationText id="stratigraphy" />}
            icon="add"
            secondary
            size="small"
          />
        )}

        {profiles?.map(item => (
          <Styled.Item
            key={item.id}
            onClick={() => {
              setSelectedItem(item);
              selectedStratigraphyID(item.id);
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
      <ProfileInfo data={{ item: selectedItem, isEditable }} />
    </Styled.Container>
  );
};
ProfileHeader.propTypes = {
  t: PropTypes.func,
};

export default withTranslation('common')(ProfileHeader);
