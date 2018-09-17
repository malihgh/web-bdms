import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import _ from 'lodash'
import {
  Table
} from 'semantic-ui-react'

import DomainText from '../../form/domain/domainText'
import DateText from '../../form/dateText'
import FromNowText from '../../form/fromNowText'

class BoreholeComponent extends React.Component {
  getDomainRow(schema, id, i18n = undefined){
    const { t } = this.props
    return (
      <Table.Row>
        <Table.Cell
          collapsing
          singleLine
          style={{
            fontWeight: 'bold'
          }}  
        >
        {
          _.isUndefined(i18n)? t(schema): t(i18n)
        }
        </Table.Cell>
        <Table.Cell>
          <DomainText
            schema={schema}
            id={id}/>
        </Table.Cell>
      </Table.Row>
    )
  }
  getDateRow(schema, isodate){
    const { t } = this.props
    return (
      <Table.Row>
        <Table.Cell
          collapsing
          singleLine
          style={{
            fontWeight: 'bold'
          }}  
        >
          {t(schema)}
        </Table.Cell>
        <Table.Cell>
          <DateText
            date={isodate}/> (<FromNowText date={isodate}/>)
        </Table.Cell>
      </Table.Row>
    )
  }
  getTextRow(schema, text){
    const { t } = this.props
    return (
      <Table.Row>
        <Table.Cell
          collapsing
          singleLine
          style={{
            fontWeight: 'bold'
          }}  
        >
          {t(schema)}
        </Table.Cell>
        <Table.Cell>
          {text}
        </Table.Cell>
      </Table.Row>
    )
  }
  render() {
    const {
      data, t
    } = this.props
    return (
      <div style={{
          flex: "1 1 0%",
          overflowY: 'auto',
          padding: '1em'
        }}>
        <Table basic>
          <Table.Body>
            {this.getDomainRow(
              'extended.method', data.extended.method, 'method'
            )}
            {this.getDateRow(
              'drilling_date', data.drilling_date
            )}
            {this.getDomainRow(
              'custom.cuttings', data.custom.cuttings, 'cuttings'
            )}
            {this.getDomainRow(
              'extended.purpose', data.extended.purpose, 'purpose'
            )}
            {this.getTextRow(
              'drill_diameter',
              data.custom.drill_diameter !== null?
              data.custom.drill_diameter + " m": null
            )}
            {this.getDomainRow(
              'extended.status', data.extended.status, 'status'
            )}
            {this.getTextRow(
              'bore_inc',
              data.bore_inc !== null?
              data.bore_inc + "°": null
            )}
            {this.getTextRow(
              'bore_inc_dir',
              data.bore_inc_dir !== null?
              data.bore_inc_dir + "°": null
            )}
            {this.getDomainRow(
              'custom.qt_bore_inc_dir',
              data.custom.qt_bore_inc_dir,
              'qt_bore_inc_dir'
            )}
            {this.getTextRow(
              'length',
              data.length !== null?
              data.length + " m": null
            )}
            {this.getDomainRow(
              'custom.qt_length',
              data.custom.qt_length,
              'qt_length'
            )}
            {this.getTextRow(
              'top_bedrock',
              data.extended.top_bedrock !== null?
              data.extended.top_bedrock + " m": null
            )}
            {this.getDomainRow(
              'custom.qt_top_bedrock',
              data.custom.qt_top_bedrock,
              'qt_top_bedrock'
            )}
            {this.getTextRow(
              'groundwater',
              data.extended.groundwater === true?
                t("yes"):
                data.extended.groundwater === false?
                  t("no"): null
            )}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

BoreholeComponent.propTypes = {
    data: PropTypes.object
}

export default translate('borehole_form')(BoreholeComponent)
