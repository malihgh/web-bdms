import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import _ from 'lodash';
// import {
//   Table
// } from 'semantic-ui-react';

import DomainText from '../../form/domain/domainText';
import DateText from '../../form/dateText';
import MunicipalityText from '../../form/municipality/municipalityText';
import CantonText from '../../form/cantons/cantonText';
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
            id={id}
            schema={schema}
          />
        </div>
    );
  }
  getDateRow(schema, isodate) {
    // const { t } = this.props;

    return this.getTextRow(
      schema,
      _.isNil(isodate) || isodate === '' ?
        null :
        <DateText
          date={isodate}
        />
    );
  }

  getTextRow(schema, text) {
    const { t } = this.props;
    return (
      <div>
        <div
          style={{
            fontSize: '0.8em',
            color: '#787878',
            lineHeight: '1em',
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
    );
  }
  render() {
    const {
      data, t
    } = this.props;
    const margin = '0.5em 0px';
    const padding = '0.5em';
    return (
      <div
        style={{
          minWidth: '250px',
        }}
      >
        <div
          style={{
            borderBottom: 'thin solid rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'row',
            margin: margin,
            padding: padding
          }}
        >
          <div
            style={{
              flex: '1 1 100%'
            }}
          >
            {this.getTextRow(
              'original_name', data.extended.original_name
            )}
            {this.getTextRow(
              'public_name', data.custom.public_name
            )}
          </div>
          <div
            style={{
              flex: '1 1 100%'
            }}
          >
            {this.getTextRow(
              'project_name', data.custom.project_name
            )}
            {this.getDomainRow(
              'kind', data.kind
            )}
          </div>
        </div>

        <div
          style={{
            borderBottom: 'thin solid rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'row',
            margin: margin,
            padding: padding
          }}
        >
          <div
            style={{
              flex: '1 1 100%'
            }}
          >
            {this.getTextRow(
              'restriction', data.restriction
            )}
          </div>
          <div
            style={{
              flex: '1 1 100%'
            }}
          >
            {
              data.restriction_until !== null
              && data.restriction_until !== '' ?
                this.getTextRow(
                  'restriction_until',
                  <DateText
                    date={data.restriction_until}
                  />
                ): null
            }
          </div>
        </div>

        <div
          style={{
            borderBottom: 'thin solid rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'row',
            margin: margin,
            padding: padding
          }}
        >
          <div
            style={{
              flex: '1 1 100%'
            }}
          >
            {this.getTextRow(
              'coordinates',
              data.location_x + ", " + data.location_y
            )}
            {this.getTextRow(
              'elevation_z', data.elevation_z
            )}
          </div>
          <div
            style={{
              flex: '1 1 100%'
            }}
          >
            {this.getDomainRow(
              'qt_location', data.qt_location
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <div
                style={{
                  flex: '1 1 100%'
                }}
              >
                {this.getDomainRow(
                  'hrs', data.hrs
                )}
              </div>
              <div
                style={{
                  flex: '1 1 100%'
                }}
              >
                {this.getDomainRow(
                  'qt_elevation', data.qt_elevation
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div
          style={{
            borderBottom: 'thin solid rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'row',
            margin: margin,
            padding: padding
          }}
        >
          <div
            style={{
              flex: '1 1 100%'
            }}
          >
            {this.getDomainRow(
              'custom.landuse', data.custom.landuse, 'landuse'
            )}
            {this.getTextRow(
              'city', <MunicipalityText id={data.custom.city} />
            )}
          </div>
          <div
            style={{
              flex: '1 1 100%'
            }}
          >
            {this.getTextRow(
              'canton', <CantonText id={data.custom.canton} />
            )}
            {this.getTextRow(
              'address', data.custom.address
            )}
          </div>
        </div>
        
        <div
          style={{
            borderBottom: 'thin solid rgba(0, 0, 0, 0.15)',
            margin: margin,
            padding: padding
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <div
              style={{
                flex: '1 1 100%'
              }}
            >
              {this.getDomainRow(
                'extended.method', data.extended.method, 'method'
              )}
              {this.getDomainRow(
                'custom.cuttings', data.custom.cuttings, 'cuttings'
              )}
              {this.getTextRow(
                'drill_diameter',
                data.custom.drill_diameter !== null ?
                  data.custom.drill_diameter + " m" : null
              )}
              {this.getTextRow(
                'bore_inc',
                data.bore_inc !== null ?
                  data.bore_inc + "°" : null
              )}
            </div>
            <div
              style={{
                flex: '1 1 100%'
              }}
            >
              {this.getDateRow(
                'drilling_date', data.drilling_date
              )}
              {this.getDomainRow(
                'extended.purpose', data.extended.purpose, 'purpose'
              )}
              {this.getDomainRow(
                'extended.status', data.extended.status, 'status'
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <div
                  style={{
                    flex: '1 1 100%'
                  }}
                >
                  {this.getTextRow(
                    'bore_inc_dir',
                    data.bore_inc_dir !== null ?
                      data.bore_inc_dir + "°" : null
                  )}
                </div>
                <div
                  style={{
                    flex: '1 1 100%'
                  }}
                >
                  {this.getDomainRow(
                    'custom.qt_bore_inc_dir',
                    data.custom.qt_bore_inc_dir,
                    'qt_bore_inc_dir'
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            // borderBottom: 'thin solid rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'row',
            margin: margin,
            padding: padding
          }}
        >
          <div
            style={{
              flex: '1 1 100%'
            }}
          >
            {this.getTextRow(
              'length',
              data.length !== null ?
                data.length + " m" : null
            )}
            {this.getTextRow(
              'top_bedrock',
              data.extended.top_bedrock !== null ?
                data.extended.top_bedrock + " m" : null
            )}
            {this.getTextRow(
              'groundwater',
              data.extended.groundwater === true ?
                t("yes") :
                data.extended.groundwater === false ?
                  t("no") : null
            )}
          </div>
          <div
            style={{
              flex: '1 1 100%'
            }}
          >
            {this.getDomainRow(
              'custom.qt_length',
              data.custom.qt_length,
              'qt_length'
            )}
            {this.getDomainRow(
              'custom.qt_top_bedrock',
              data.custom.qt_top_bedrock,
              'qt_top_bedrock'
            )}
          </div>
        </div>

        <div
          style={{
            // borderBottom: 'thin solid rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'row',
            margin: margin,
            padding: padding
          }}
        >
          <div
            style={{
              flex: '1 1 100%'
            }}
          >
            {this.getTextRow(
              'remarks',
              data.custom.remarks !== ''?
                data.custom.remarks : '-'
            )}
          </div>
        </div>

      </div>
    );
  }
}

MetaComponent.propTypes = {
  data: PropTypes.object
};

export default translate('borehole_form')(MetaComponent);
