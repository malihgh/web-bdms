import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import _ from 'lodash';
// import {
//   Table
// } from 'semantic-ui-react';

import DomainText from '../../form/domain/domainText';
import DateText from '../../form/dateText';
// import MunicipalityText from '../../form/municipality/municipalityText';
// import CantonText from '../../form/cantons/cantonText';
// import FromNowText from '../../form/fromNowText';

class MetaComponent extends React.Component {
  getDomainRow(schema, id, i18n = undefined) {
    // const { t } = this.props;
    return this.getTextRow(
      _.isUndefined(i18n) ? schema : i18n,
      _.isNil(id) || id === '' ?
        null :
        <div>
          <DomainText
            schema={schema}
            id={id} />
        </div>
    );
    // return (
    //   <Table.Row>
    //     <Table.Cell collapsing singleLine>{
    //       _.isUndefined(i18n)? t(schema): t(i18n)
    //     }</Table.Cell>
    //     <Table.Cell>
    //       <DomainText
    //         schema={schema}
    //         id={id}/>
    //     </Table.Cell>
    //   </Table.Row>
    // )
  }
  getDateRow(schema, isodate) {
    // const { t } = this.props;

    return this.getTextRow(
      schema,
      _.isNil(isodate) || isodate === '' ?
        null :
        <DateText
          date={isodate} />
      // <div>
      //   <DateText
      //     date={isodate}/> (<FromNowText date={isodate}/>)
      // </div>
    );
    // return (
    //   <Table.Row>
    //     <Table.Cell collapsing singleLine>
    //       {t(schema)}
    //     </Table.Cell>
    //     <Table.Cell>
    //       <DateText
    //         date={isodate}/> (<FromNowText date={isodate}/>)
    //     </Table.Cell>
    //   </Table.Row>
    // )
  }

  getTextRow(schema, text) {
    const { t } = this.props
    return (
      <div>
        <div
          style={{
            fontSize: '0.8em',
            color: '#787878', // 'rgb(33, 133, 208)',
            lineHeight: '1em',
            // marginTop: '0.5em 0px 0.4em'
          }}
        >
          {t(schema)}
        </div>
        <div
          style={{
            marginBottom: '0.4em'
          }}
        >
          {
            _.isNil(text) || text === '' ?
              '-' : text
          }
        </div>
      </div>
    )
    // return (
    //   <Table.Row>
    //     <Table.Cell collapsing singleLine>
    //       {t(schema)}
    //     </Table.Cell>
    //     <Table.Cell>
    //       {text}
    //     </Table.Cell>
    //   </Table.Row>
    // )
  }
  render() {
    const {
      data, t
    } = this.props;
    return (
      <div
        style={{
          overflowY: 'auto',
          padding: '1em'
        }}
      >
        {/* {this.getTextRow(
            'original_name', data.extended.original_name
          )} */}
        {this.getTextRow(
          'public_name', data.custom.public_name
        )}
        {/* {this.getDomainRow(
            'kind', data.kind
          )} */}
        {this.getTextRow(
          'project_name', data.custom.project_name
        )}

        {this.getTextRow(
          'restriction',
          <div>
            <DomainText
              id={data.restriction}
              schema={'restriction'}
            /> {
              data.restriction_until !== null
              && data.restriction_until !== '' ?
                <DateText
                  date={data.restriction_until}
                /> : null
            }
          </div>

        )}
        
        {this.getTextRow(
          'coordinates',
          data.location_x + ", " + data.location_y
        )}

        {/* {this.getTextRow(
            'location_x', data.location_x
          )}
          {this.getTextRow(
            'location_y', data.location_y
          )} */}

        {/* {this.getDomainRow(
            'srs', data.srs
          )} */}

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
        {/* {this.getTextRow(
            'canton', <CantonText id={data.custom.canton}/>
          )}
          {this.getTextRow(
            'city', <MunicipalityText id={data.custom.city}/>
          )}
          {this.getTextRow(
            'address', data.custom.address
          )} */}
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
          data.custom.drill_diameter !== null ?
            data.custom.drill_diameter + " m" : null
        )}
        {this.getDomainRow(
          'extended.status', data.extended.status, 'status'
        )}
        {this.getTextRow(
          'bore_inc',
          data.bore_inc !== null ?
            data.bore_inc + "°" : null
        )}
        {this.getTextRow(
          'bore_inc_dir',
          data.bore_inc_dir !== null ?
            data.bore_inc_dir + "°" : null
        )}
        {this.getDomainRow(
          'custom.qt_bore_inc_dir',
          data.custom.qt_bore_inc_dir,
          'qt_bore_inc_dir'
        )}
        {this.getTextRow(
          'length',
          data.length !== null ?
            data.length + " m" : null
        )}
        {this.getDomainRow(
          'custom.qt_length',
          data.custom.qt_length,
          'qt_length'
        )}
        {this.getTextRow(
          'top_bedrock',
          data.extended.top_bedrock !== null ?
            data.extended.top_bedrock + " m" : null
        )}
        {this.getDomainRow(
          'custom.qt_top_bedrock',
          data.custom.qt_top_bedrock,
          'qt_top_bedrock'
        )}
        {this.getTextRow(
          'groundwater',
          data.extended.groundwater === true ?
            t("yes") :
            data.extended.groundwater === false ?
              t("no") : null
        )}
      </div>
    );
  }
}

MetaComponent.propTypes = {
  data: PropTypes.object
};

export default translate('borehole_form')(MetaComponent);
