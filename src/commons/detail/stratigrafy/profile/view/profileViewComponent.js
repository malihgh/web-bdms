import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import _ from 'lodash'
import {
  Table,
  Dimmer,
  Loader,
  List
} from 'semantic-ui-react'
import DomainText from '../../../../form/domain/domainText'
// import DateText from '../../form/dateText'

class ProfileView extends React.Component {
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
  getDomainRowMultiple(schema, ids, i18n = undefined){
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
          <List bulleted>
            {
              ids.map((id, idx)=>(
                <List.Item
                  key={schema + '-itm-'+idx}
                >
                  <DomainText
                    id={id}
                    schema={schema}
                  />
                </List.Item>
              ))
            }
          </List>
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
      data, t, onSelected, layer
    } = this.props
    console.log(layer)
    return (
      <div style={{
        flex: "1 1 0%",
        overflowY: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        height: '100%'
      }}>
        <div style={{
            overflowY: 'auto',
            padding: '1em'
          }}>
          <Table basic selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{t('depth')}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                data.map((item, idx) => (
                  <Table.Row
                    active={layer!==null && layer.id === item.id}
                    style={{
                      cursor: 'pointer'
                    }}
                    onClick={()=>{
                      onSelected(item)
                    }}>
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
        <div style={{
            flex: "1 1 0%",
            overflowY: 'auto'
          }}>
          <Dimmer.Dimmable
            dimmed={
              this.props.isFetchingLayer === true
            }>
            <Dimmer
              active={
                this.props.isFetchingLayer === true
              }
              inverted>
              <Loader>
                {t('loading_fetch')}
              </Loader>
            </Dimmer>
            {
              this.props.layer === null?
              'Nothing selected':
              <Table basic>
                <Table.Body>
                  {this.getTextRow(
                    'depth_from', layer.depth_from
                  )}
                  {this.getTextRow(
                    'depth_to', layer.depth_to
                  )}
                  {this.getTextRow(
                    'description', layer.description
                  )}
                  {this.getTextRow(
                    'geology', layer.geology
                  )}
                  {this.getTextRow(
                    'last',
                    layer.last === true?
                      t("common:yes"):
                      layer.last === false?
                        t("common:no"): null
                  )}
                  {this.getDomainRow(
                    'qt_description',
                    layer.qt_description
                  )}
                  {this.getDomainRow(
                    'custom.lit_pet_top_bedrock',
                    layer.lithology,
                    'lithology'
                  )}
                  {this.getDomainRow(
                    'custom.lit_str_top_bedrock',
                    layer.lithostratigraphy,
                    'lithostratigraphy'
                  )}
                  {this.getDomainRow(
                    'custom.chro_str_top_bedrock',
                    layer.chronostratigraphy,
                    'chronostratigraphy'
                  )}
                  {this.getDomainRow(
                    'vtec404',
                    layer.tectonic_unit,
                    'tectonic_unit'
                  )}
                  {this.getDomainRowMultiple(
                    'mlpr112',
                    layer.color,
                    'color'
                  )}
                  {this.getDomainRow(
                    'mlpr101',
                    layer.plasticity,
                    'plasticity'
                  )}
                  {this.getDomainRow(
                    'mlpr105',
                    layer.humidity,
                    'humidity'
                  )}
                  {this.getDomainRow(
                    'mlpr103',
                    layer.consistance,
                    'consistance'
                  )}
                  {this.getDomainRow(
                    'mlpr106',
                    layer.alteration,
                    'alteration'
                  )}
                  {this.getDomainRow(
                    'mlpr102',
                    layer.compactness,
                    'compactness'
                  )}
                  {this.getDomainRowMultiple(
                    'mlpr113',
                    layer.jointing,
                    'jointing'
                  )}
                  {this.getDomainRow(
                    'mlpr108',
                    layer.soil_state,
                    'soil_state'
                  )}
                  {this.getDomainRowMultiple(
                    'mlpr108',
                    layer.organic_component,
                    'organic_component'
                  )}
                  {this.getTextRow(
                    'striae',
                    layer.striae === true?
                      t("common:yes"):
                      layer.striae === false?
                        t("common:no"): null
                  )}
                  {this.getDomainRow(
                    'mlpr109',
                    layer.grain_size_1,
                    'grain_size_1'
                  )}
                  {this.getDomainRow(
                    'mlpr109',
                    layer.grain_size_2,
                    'grain_size_2'
                  )}
                  {this.getDomainRowMultiple(
                    'mlpr110',
                    layer.grain_shape,
                    'grain_shape'
                  )}
                  {this.getDomainRowMultiple(
                    'mlpr115',
                    layer.grain_granularity,
                    'grain_granularity'
                  )}
                  {this.getDomainRow(
                    'mlpr116',
                    layer.cohesion,
                    'cohesion'
                  )}
                  {this.getDomainRowMultiple(
                    'mlpr117',
                    layer.further_properties,
                    'further_properties'
                  )}
                  {this.getDomainRow(
                    'mcla101',
                    layer.uscs_1,
                    'uscs_1'
                  )}
                  {this.getDomainRow(
                    'mcla101',
                    layer.uscs_2,
                    'uscs_2'
                  )}
                  {this.getDomainRowMultiple(
                    'mcla101',
                    layer.uscs_3,
                    'uscs_3'
                  )}
                  {this.getTextRow(
                    'uscs_original', layer.uscs_original
                  )}
                  {this.getDomainRowMultiple(
                    'mcla104',
                    layer.uscs_determination,
                    'uscs_determination'
                  )}
                  {this.getDomainRow(
                    'mcla102',
                    layer.unconrocks,
                    'unconrocks'
                  )}
                  {this.getDomainRowMultiple(
                    'mcla107',
                    layer.debris,
                    'debris'
                  )}
                  {this.getDomainRowMultiple(
                    'custom.lit_pet_top_bedrock',
                    layer.lit_pet_deb,
                    'lit_pet_deb'
                  )}
                  {this.getDomainRow(
                    'mcla105',
                    layer.lithok,
                    'lithok'
                  )}
                  {this.getDomainRow(
                    'mcla106',
                    layer.kirost,
                    'kirost'
                  )}
                  {this.getTextRow(
                    'notes', layer.notes
                  )}
                </Table.Body>
              </Table>
            }
          </Dimmer.Dimmable>
        </div>
      </div>
    )
  }
}

ProfileView.propTypes = {
    data: PropTypes.object,
    layer: PropTypes.object,
    isFetchingLayer: PropTypes.bool,
    onSelected: PropTypes.func
}

export default translate(['layer_form','common'])(ProfileView)
