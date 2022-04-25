import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// import {
//   Table
// } from 'semantic-ui-react';

import DomainText from '../../form/domain/domainText';
import DateText from '../../form/dateText';
import MunicipalityText from '../../form/municipality/municipalityText';
import CantonText from '../../form/cantons/cantonText';
import TranslationText from '../../form/translationText';
// import FromNowText from '../../form/fromNowText';

class MetaComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      pubexpanded: false,
    };
  }
  

  getDomainRow(schema, id, i18n = undefined) {
    // const { t } = this.props;
    return this.getTextRow( 
      _.isUndefined(i18n)? schema :i18n,
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

  getTextRow(schema, text, key = Math.random().toString(16).from(2, 8)) {
    return (
      <div
        key={key}
      >
        <div
          style={{
            fontSize: '0.8em',
            color: '#787878',
            lineHeight: '1em',
          }}
        >
          <TranslationText
            id={schema}
            // ns='borehole'
          />
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

  getStatusRow(){
    const {
      data
    } = this.props;
    return (
      <div>
        <div
          style={{
            fontSize: '0.8em',
            color: '#787878',
            lineHeight: '1em',
          }}
        >
          <TranslationText
            id='locked_status'
          />
        </div>
        <div
          style={{
            marginBottom: '0.4em'
          }}
        >
          <TranslationText
            id={`status${data.role.toLowerCase()}`}
          />
        </div>
      </div>
    );
  }

  getStatusDate(){
    const {
      data
    } = this.props;
    

    if (data.workflow.finished) {
      return this.getDateRow('date', data.workflow.finished);
    } else {
      return (
        <div>
          <div
            style={{
              fontSize: '0.8em',
              color: '#787878',
              lineHeight: '1em',
            }}
          >
            <TranslationText
              id='date'
            />
          </div>
          <div
            style={{
              marginBottom: '0.4em'
            }}
          >
            <TranslationText
              id='inProgress'
            />
          </div>
        </div>
      );
    }
  }

  getPublicationsRows(){
    const {
      data
    } = this.props;
    const ret = [];
    for (let index = 0; index < data.pubblications.length; index++) {
      const pubblication = data.pubblications[index];
      if (pubblication.finished){
        ret.push(
          <div>
            {
              ret.length === 0?
                <div
                  style={{
                    fontSize: '0.8em',
                    color: '#787878',
                    lineHeight: '1em',
                  }}
                >
                  <TranslationText
                    id='currentVersion'
                  />
                </div>: null
            }
            {
              ret.length === 1?
                <div
                  style={{
                    fontSize: '0.8em',
                    color: '#787878',
                    lineHeight: '1em',
                  }}
                >
                  <TranslationText
                    id='previousVersions'
                  />
                </div>: null
            }
            <div
              style={{
                marginBottom: '0.4em'
              }}
            >
              <DateText
                date={pubblication.finished}
                hours
              />
            </div>
          </div>
        );
      }
    }
    return ret;
  }

  render() {
    const {
      data
    } = this.props;
    const margin = '0.5em 0px';
    const padding = '0.5em';
    return (
      <div
        style={{
          minWidth: '250px',
        }}
      >

        {
          data.custom.identifiers && data.custom.identifiers.length>0?
            <div
              style={{
                borderBottom: 'thin solid rgba(0, 0, 0, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                margin: margin,
                padding: padding
              }}
            >
              {
                data.custom.identifiers.map(
                  (identifier, index) => (
                    <div
                      key={`bdms-metadata-cmp-identifiers-${index}`}
                      style={{
                        flex: '1 1 100%',
                        marginBottom: '0.4em'
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.8em',
                          color: '#787878',
                          lineHeight: '1em',
                        }}
                      >
                        <DomainText
                          id={identifier.id}
                          schema='borehole_identifier'
                        />
                      </div>
                      {identifier.value}
                    </div>
                  )
                )
              }
            </div>: null
        }

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
            {this.getStatusRow()}
          </div>
          <div
            style={{
              flex: '1 1 100%'
            }}
          >
            {
              data.role === 'PUBLIC' && data.pubblications !== null?
                this.getPublicationsRows():
                this.getStatusDate()
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
                  data.custom.drill_diameter + " mm" : null
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
                <TranslationText
                  id='yes'
                />:
                data.extended.groundwater === false ?
                  <TranslationText
                    id='no'
                  />: null
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

export default MetaComponent;
