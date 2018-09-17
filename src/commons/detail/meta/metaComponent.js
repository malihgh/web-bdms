import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import _ from 'lodash'
import {
  Table
} from 'semantic-ui-react'

import DomainText from '../../form/domain/domainText'
import DateText from '../../form/dateText'
import MunicipalityText from '../../form/municipality/municipalityText'
import CantonText from '../../form/cantons/cantonText'
import FromNowText from '../../form/fromNowText'

class MetaComponent extends React.Component {
  getDomainRow(schema, id, i18n = undefined){
    const { t } = this.props
    return (
      <Table.Row>
        <Table.Cell collapsing singleLine>{
          _.isUndefined(i18n)? t(schema): t(i18n)
        }</Table.Cell>
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
        <Table.Cell collapsing singleLine>
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
        <Table.Cell collapsing singleLine>
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
            {this.getTextRow(
              'original_name', data.extended.original_name
            )}
            {this.getTextRow(
              'public_name', data.custom.public_name
            )}
            {this.getDomainRow(
              'kind', data.kind
            )}
            {this.getTextRow(
              'project_name', data.custom.project_name
            )}

            {this.getDomainRow(
              'restriction', data.restriction
            )}
            {this.getDateRow(
              'restriction_until', data.restriction_until
            )}

            {this.getTextRow(
              'location_x', data.location_x
            )}
            {this.getTextRow(
              'location_y', data.location_y
            )}
            {this.getDomainRow(
              'srs', data.srs
            )}
            {this.getDomainRow(
              'qt_location', data.qt_location
            )}
            {this.getTextRow(
              'elevation_z', data.elevation_z
            )}
            {this.getDomainRow(
              'hrs', data.hrs
            )}
            {this.getDomainRow(
              'qt_elevation', data.qt_elevation
            )}

            {this.getDomainRow(
              'custom.landuse', data.custom.landuse, 'landuse'
            )}
            {this.getTextRow(
              'address', data.custom.address
            )}
            <Table.Row>
              <Table.Cell collapsing singleLine>
                {t('city')}
              </Table.Cell>
              <Table.Cell>
                <MunicipalityText id={data.custom.city}/>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing singleLine>
                {t('canton')}
              </Table.Cell>
              <Table.Cell>
                <CantonText id={data.custom.canton}/>
              </Table.Cell>
            </Table.Row>
            {this.getTextRow(
              'country', 'Switzerland'
            )}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

MetaComponent.propTypes = {
    data: PropTypes.object
}

export default translate('borehole_form')(MetaComponent)
