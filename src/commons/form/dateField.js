import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import 'moment/locale/en-gb'
import 'moment/locale/it'
import 'moment/locale/fr'
import 'moment/locale/de-ch'

import {
  Input
} from 'semantic-ui-react'

class DateField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: this.props.date
    }
  }
  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.date !== prevState.date){
      return {
        date: nextProps.date
      }
    }
    else return null
  }
  render() {
    const {
      onChange, i18n, placeholder
    } = this.props
    if(i18n.language === 'de'){
      moment.locale('de-ch')
    }else if (i18n.language === 'en') {
      moment.locale('en-gb')
    }else{
      moment.locale(i18n.language)
    }
    return (
      <DatePicker
        style={{
          width: '100%'
        }}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        dateFormat='DD.MM.YYYY'
        customInput={
          <div>
            <Input
              placeholder={placeholder}
              value={
                moment(this.state.date).isValid()?
                moment(this.state.date).format('DD.MM.YYYY'):''
              }
              icon='calendar alternate outline'
              iconPosition='left'
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"/>
          </div>
        }
        selected={
          moment(this.state.date).isValid()?
            moment(this.state.date): null
        }
        onChange={(date)=>{
          if(onChange!==undefined){
            onChange(
              date? date.format('YYYY-MM-DD'): ''
            )
          }
        }} />
    )
  }
}

DateField.propTypes = {
  date: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
};

DateField.defaultProps = {
  placeholder: null
};



export default translate('search')(DateField)
