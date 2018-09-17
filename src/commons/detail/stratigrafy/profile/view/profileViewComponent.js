import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { Table } from 'semantic-ui-react'

class ProfileView extends React.Component {
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
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{t('depth')}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              data.map((item, idx) => (
                <Table.Row>
                  <Table.Cell collapsing singleLine>
                    <span
                      style={{
                        color: '#787878',
                        fontSize: '0.8em'
                      }}>
                      {item.depth_from} m ({item.msm_from} m)
                    </span>
                    <br/>
                    {item.depth_to} m ({item.msm_to} m)
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </div>
    )
  }
}

ProfileView.propTypes = {
    data: PropTypes.object
}

export default translate('layer_form')(ProfileView)
