import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import MetaComponent from './meta/metaComponent';
import StratigraphiesComponent from './stratigrafy/stratigraphiesComponent';
import MunicipalityText from '../form/municipality/municipalityText';
import CantonText from '../form/cantons/cantonText';
import DomainText from '../form/domain/domainText';
import Scroller from '../scroller';
import ExportLink from '../exportlink';
import {
  Icon
} from 'semantic-ui-react';


class DetailsComponent extends React.Component {
  render() {
    const {
      detail, t
    } = this.props;
    return (
      <div
        id='DetailsComponent'
        style={{
          flex: "1 1 100%",
          overflowY: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {
          detail.borehole ?
            [
              <div
                id="bms-dc-1"
                key='bms-dc-1'
                style={{
                  padding: '1em',
                  // borderBottom: 'thin solid #cecece',
                  // boxShadow: 'rgba(0, 0, 0, 0.17) 0px 2px 4px',
                  display: 'flex',
                  flexDirection: 'row'
                }
                }
              >
                <div>
                  <div
                    style={{
                      // color: '#2185d0',
                      fontSize: '1em',
                      margin: '0px 0px 0.4em'
                    }}
                  >
                    {(() => {
                      const kind = this.props.domains.data[
                        'kind'
                      ].find(function (element) {
                        return element.id === detail.borehole.kind;
                      });

                      const restriction = this.props.domains.data[
                        'restriction'
                      ].find(function (element) {
                        return element.id === detail.borehole.restriction;
                      });

                      let color = 'black';
                      if (restriction !== undefined) {
                        if (restriction.code === 'f') {
                          color = 'green';
                        } else if (['b', 'g'].indexOf(restriction.code) >= 0) {
                          color = 'red';
                        }
                      }

                      if (kind !== undefined) {
                        return (
                          <img
                            alt=''
                            src={
                              process.env.PUBLIC_URL
                              + '/img/'
                              + kind.code
                              + '-'
                              + color
                              + '.svg'
                            }
                            style={{
                              height: '0.75em',
                              // marginRight: '0.5em',
                              width: 'auto'
                            }}
                          />
                        );
                      } else {
                        return (
                          <img
                            alt=''
                            src={
                              process.env.PUBLIC_URL
                              + '/img/a-' + color + '.svg'
                            }
                            style={{
                              height: '0.75em',
                              // marginRight: '0.5em',
                              width: 'auto'
                            }}
                          />
                        );
                      }
                    })()} <DomainText
                      id={detail.borehole.kind}
                      schema={'kind'}
                    />
                  </div>
                  <div
                    style={{
                      fontWeight: 'bold',
                      // color: '#2185d0',
                      fontSize: '2em'
                    }}
                  >
                    {detail.borehole.extended.original_name}
                  </div>
                  <div
                    style={{
                      color: '#787878',
                      paddingTop: '0.4em'
                    }}
                  >
                    {
                      detail.borehole.custom.address !== null
                        && detail.borehole.custom.address !== '' ?
                        detail.borehole.custom.address + ', ' : null
                    }
                    <MunicipalityText
                      id={detail.borehole.custom.city}
                    />
                    {
                      detail.borehole.custom.city !== null
                        && detail.borehole.custom.city !== '' ?
                        ', ' : null
                    } <CantonText id={detail.borehole.custom.canton} />
                  </div>
                  <div>
                    <ExportLink
                      id={[detail.borehole.id]}
                      style={{
                        fontSize: '0.8em'
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      margin: '0px 1em'
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 'bold',
                        fontSize: '1.1em'
                      }}
                    >
                      <DomainText
                        schema={'extended.purpose'}
                        id={detail.borehole.extended.purpose}
                      />
                    </div>
                    <div
                      style={{
                        color: '#787878',
                        fontSize: '0.8em'
                      }}
                    >
                      {t('purpose')}
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      margin: '0px 1em'
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 'bold',
                        fontSize: '1.1em'
                      }}
                    >
                      {detail.borehole.length}m
                    </div>
                    <div
                      style={{
                        color: '#787878',
                        fontSize: '0.8em'
                      }}
                    >
                      {t('length')}
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      margin: '0px 1em'
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 'bold',
                        fontSize: '1.1em'
                      }}
                    >
                      {detail.borehole.custom.drill_diameter}m
                    </div>
                    <div
                      style={{
                        color: '#787878',
                        fontSize: '0.8em'
                      }}
                    >
                      {t('drill_diameter')}
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      margin: '0px 1em'
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 'bold',
                        fontSize: '1.1em'
                      }}
                    >
                      {detail.borehole.bore_inc + "°"}
                    </div>
                    <div
                      style={{
                        color: '#787878',
                        fontSize: '0.8em'
                      }}
                    >
                      {t('bore_inc')}
                    </div>
                  </div>
                </div>
              </div>,
              <div
                key='bms-dc-2'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flex: '1 1 100%',
                  paddingBottom: '1em',
                  overflowY: 'hidden'
                }}
              >
                <StratigraphiesComponent
                  data={detail}
                  stratigraphies={detail.stratigraphies}
                />
              </div>
            ]:
            detail.isFetching === true ?
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    margin: 'auto'
                  }}
                >
                  <Icon
                    loading
                    name='spinner'
                  /> Loading...
                </div>
              </div>: ''
        }
      </div>
    );
  }
}

DetailsComponent.propTypes = {
  detail: PropTypes.object,
  domains: PropTypes.object
};

export default translate('borehole_form')(DetailsComponent);
