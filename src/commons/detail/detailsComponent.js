import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import {
  Header,
  Table
} from 'semantic-ui-react'

import DomainText from '../form/domain/domainText'

class DetailsComponent extends React.Component {
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
        <Header>
        {data.extended.original_name}
        </Header>
        <Table basic>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing singleLine>
                {t('public_name')}
              </Table.Cell>
              <Table.Cell>
                {data.custom.public_name}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell singleLine>{t('kind')}</Table.Cell>
              <Table.Cell>
                <DomainText
                  schema='kind'
                  id={data.kind}/>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing singleLine>
                {t('project_name')}
              </Table.Cell>
              <Table.Cell>
                {data.custom.project_name}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <br/>Etc..
      </div>
    )
  }
}

DetailsComponent.propTypes = {
    data: PropTypes.object
}

export default translate('borehole_form')(DetailsComponent)
