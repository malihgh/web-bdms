import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/en-gb'
import 'moment/locale/it'
import 'moment/locale/fr'
import 'moment/locale/de-ch'
import { translate } from 'react-i18next'

class DateText extends React.Component {
  render() {
    const { date, i18n, hours } = this.props
    if(i18n.language === 'de'){
      moment.locale('de-ch')
    }else if (i18n.language === 'en') {
      moment.locale('en-gb')
    }else{
      moment.locale(i18n.language)
    }
    if(moment(date).isValid()){
      return moment(date).format(
        'DD.MM.YYYY' + (
          hours? ' HH:mm': ''
        )
      )
    }else if (date === null) {
      return this.props.nullValue
    }
    return null
  }
}

DateText.propTypes = {
  date: PropTypes.string,
  hours: PropTypes.bool,
  nullValue: PropTypes.string,
  invalid: PropTypes.string
}

DateText.defaultProps = {
  date: null,
  hours: false,
  nullValue: '',
  invalid: 'invalid date'
}

export default translate()(DateText)
