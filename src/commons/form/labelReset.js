import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';


const LabelReset = props => {
  const {
    onClick,
    t
  } = props;
  return (
    <label
      onClick={
        onClick !== undefined?
          ()=>{
            onClick();
          }:
          undefined
      }
      style={{
        cursor: 'pointer',
        textAlign: 'right',
        color: '#1d5daf',
        textDecoration: 'underline',
        fontWeight: 'normal',
        fontSize: '0.9em'
      }}
    >
      {t('reset')}
    </label>
  );
};

LabelReset.propTypes = {
  onClick: PropTypes.func,
  t: PropTypes.func
};

export default withTranslation('search')(LabelReset);
