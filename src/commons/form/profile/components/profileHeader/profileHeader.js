import React, { useState, useEffect } from "react";
import * as Styled from "./styles";
import { Button, Icon } from "semantic-ui-react";
import TranslationText from "./../../../translationText";
import PropTypes from "prop-types";
import _ from "lodash";
import DateText from "../../../dateText";

const ProfileHeader = (props) => {
  const { data, user } = props.data;

  const [showStratigraphyButton, setShowStratigraphyButton] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (
      !(
        data.lock === null ||
        data.lock.username !== user.username ||
        data.role !== "EDIT"
      )
    ) {
      setShowStratigraphyButton(true);
    } else {
      setShowStratigraphyButton(false);
    }

    if (data.stratigraphy && data.stratigraphy.length > 0)
      setSelectedItem(data.stratigraphy[0].id);
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
        data.stratigraphy.map((item) => (
          <Styled.Item
            key={item.id}
            onClick={() => {
              setSelectedItem(item.id);
            }}
            style={{
              borderBottom: item.id === selectedItem && "2px solid black",
            }}
          >
            <Styled.ItemName>
              {item.primary && <Icon name="check" />}
              {item.name === null || item.name === "" ? "translate" : item.name}
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