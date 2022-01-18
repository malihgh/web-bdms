import React, { useState, useEffect } from 'react';
import * as Styled from './styles';
import { Button, Icon } from 'semantic-ui-react';
import TranslationText from './../../../translationText';
import PropTypes from 'prop-types';
import _ from 'lodash';
import DateText from '../../../dateText';

const ProfileHeader = props => {
  const { data, user, selectedStratigraphyID, setSelectedStratigraphyID } =
    props.data;

  const [showStratigraphyButton, setShowStratigraphyButton] = useState(false);

  useEffect(() => {
    if (
      !(
        data.lock === null ||
        data.lock.username !== user.username ||
        data.role !== 'EDIT'
      )
    ) {
      setShowStratigraphyButton(true);
    } else {
      setShowStratigraphyButton(false);
    }
  }, [props, setShowStratigraphyButton]);

  return (
    <Styled.Container>
      {showStratigraphyButton && (
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
              setSelectedStratigraphyID(item.id);
            }}
            style={{
              borderBottom:
                item.id === selectedStratigraphyID && '2px solid black',
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
