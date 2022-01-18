import React, { useState, useEffect } from 'react';
import * as Styled from './styles';
import { Button, Icon } from 'semantic-ui-react';
import TranslationText from './../../../translationText';
import PropTypes from 'prop-types';
import _ from 'lodash';
import DateText from '../../../dateText';

const ProfileHeader = props => {
  const {
    data,
    user,
    selectedStratigraphy,
    setSelectedStratigraphy,
    isEditable,
  } = props.data;

  return (
    <Styled.Container>
      {isEditable && (
        <Button
          content={<TranslationText id="stratigraphy" />}
          icon="add"
          secondary
          size="small"
        />
      )}

      {_.isArray(data.stratigraphy) &&
        data.stratigraphy.map(item => (
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
              {item.name === null || item.name === '' ? 'translate' : item.name}
            </Styled.ItemName>
            <Styled.ItemDate>
              <DateText date={item.date} />
            </Styled.ItemDate>
          </Styled.Item>
        ))}
    </Styled.Container>
  );
};
ProfileHeader.propTypes = {
  t: PropTypes.func,
};

export default ProfileHeader;
