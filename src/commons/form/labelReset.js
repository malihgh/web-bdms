import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

class LabelReset extends React.Component {
  render() {
    const {onClick, t} = this.props;
    return (
      <label
        style={{
          cursor: 'pointer',
          textAlign: 'right',
          color: '#1d5daf',
          textDecoration: 'underline',
          fontWeight: 'normal',
          fontSize: '0.9em'
        }}
        onClick={
          onClick !== undefined?
          ()=>{
            onClick()
          }: null
        }>{t('reset')}</label>
    )
  }
}

LabelReset.propTypes = {
  onClick: PropTypes.func
}

export default translate('search')(LabelReset)
