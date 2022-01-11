import React, { useState, useEffect } from 'react';
import * as Styled from './styles';
import { Button, Icon } from 'semantic-ui-react';
import TranslationText from './../../../translationText';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

const ProfileHeader = props => {
  const { data } = props.borehole;

  const [showStratigraphyButton, setShowStratigraphyButton] = useState(false);
  const [isPrimary, setIsPrimary] = useState(true);

  useEffect(() => {
    if (
      !(
        data.lock === null ||
        data.lock.username !== props.user.data.username ||
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

      <Styled.Item>
        <Styled.ItemName>
          {isPrimary && <Icon name="check" />}
          Mali
        </Styled.ItemName>
        <Styled.ItemDate>1/02</Styled.ItemDate>
      </Styled.Item>
    </Styled.Container>
  );
};
ProfileHeader.propTypes = {
  borehole: PropTypes.object,
};

ProfileHeader.defaultProps = {
  id: undefined,
};

const mapStateToProps = state => {
  return {
    borehole: state.core_borehole,
    user: state.core_user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withTranslation(['common'])(ProfileHeader)),
);
