import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StratigraphiesComponent from './stratigrafy/stratigraphiesComponent';
import MunicipalityText from '../form/municipality/municipalityText';
import CantonText from '../form/cantons/cantonText';
import DomainText from '../form/domain/domainText';
import DateText from '../form/dateText';
import TranslationText from '../form/translationText';
import ExportLink from '../exportlink';
import { Icon } from 'semantic-ui-react';

class DetailsComponent extends React.Component {
  render() {
    const { detail } = this.props;
    return (
      <div
        id="DetailsComponent"
        style={{
          flex: '1 1 100%',
          overflowY: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>
        {detail.borehole ? (
          [
            <div
              id="bms-dc-1"
              key="bms-dc-1"
              style={{
                padding: '1em',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <div>
                <div
                  style={{
                    fontSize: '1em',
                    margin: '0px 0px 0.4em',
                  }}>
                  {(() => {
                    if (!this.props.domains.data.hasOwnProperty('kind')) {
                      return null;
                    }

                    const kind = this.props.domains.data['kind'].find(function (
                      element,
                    ) {
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
                          alt=""
                          src={
                            process.env.PUBLIC_URL +
                            '/img/' +
                            kind.code +
                            '-' +
                            color +
                            '.svg'
                          }
                          style={{
                            height: '0.75em',
                            width: 'auto',
                          }}
                        />
                      );
                    } else {
                      return (
                        <img
                          alt=""
                          src={
                            process.env.PUBLIC_URL + '/img/a-' + color + '.svg'
                          }
                          style={{
                            height: '0.75em',
                            width: 'auto',
                          }}
                        />
                      );
                    }
                  })()}{' '}
                  <DomainText id={detail.borehole.kind} schema={'kind'} />
                </div>
                <div
                  style={{
                    fontWeight: 'bold',
                    // color: '#2185d0',
                    fontSize: '2em',
                  }}>
                  {detail.borehole.extended.original_name}
                </div>
                <div
                  style={{
                    color: '#787878',
                    paddingTop: '0.4em',
                  }}>
                  {/* {detail.borehole.custom.address !== null &&
                  detail.borehole.custom.address !== ''
                    ? detail.borehole.custom.address + ', '
                    : null} */}
                  <MunicipalityText id={detail.borehole.custom.city} />
                  {detail.borehole.custom.city !== null &&
                  detail.borehole.custom.city !== ''
                    ? ', '
                    : null}{' '}
                  <CantonText id={detail.borehole.custom.canton} />
                </div>
                <div>
                  <ExportLink
                    id={[detail.borehole.id]}
                    style={{
                      fontSize: '0.8em',
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
                  justifyContent: 'flex-end',
                  flexWrap:
                    this.props.developer.debug === true ? 'wrap' : 'nowrap',
                }}>
                <div
                  style={{
                    textAlign: 'center',
                    margin: '0px 1em',
                  }}>
                  <div
                    style={{
                      fontWeight: 'bold',
                      fontSize: '1.1em',
                    }}>
                    <DomainText
                      id={detail.borehole.extended.purpose}
                      schema={'extended.purpose'}
                    />
                  </div>
                  <div
                    style={{
                      color: '#787878',
                      fontSize: '0.8em',
                    }}>
                    <TranslationText id="purpose" />
                  </div>
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    margin: '0px 1em',
                  }}>
                  <div
                    style={{
                      fontWeight: 'bold',
                      fontSize: '1.1em',
                    }}>
                    {detail.borehole.total_depth} m
                  </div>
                  <div
                    style={{
                      color: '#787878',
                      fontSize: '0.8em',
                    }}>
                    <TranslationText id="totaldepth" />
                  </div>
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    margin: '0px 1em',
                  }}>
                  <div
                    style={{
                      fontWeight: 'bold',
                      fontSize: '1.1em',
                    }}>
                    {detail.borehole.elevation_z} m
                  </div>
                  <div
                    style={{
                      color: '#787878',
                      fontSize: '0.8em',
                    }}>
                    <TranslationText id="elevation_z" />
                  </div>
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    margin: '0px 1em',
                  }}>
                  <div
                    style={{
                      fontWeight: 'bold',
                      fontSize: '1.1em',
                    }}>
                    <DateText date={detail.borehole.drilling_date} />
                  </div>
                  <div
                    style={{
                      color: '#787878',
                      fontSize: '0.8em',
                    }}>
                    <TranslationText id="drilling_end_date" />
                  </div>
                </div>
              </div>
            </div>,
            <div
              key="bms-dc-2"
              style={{
                display: 'flex',
                flexDirection: 'row',
                flex: '1 1 100%',
                paddingBottom: '1em',
                overflowY: 'hidden',
              }}>
              <StratigraphiesComponent
                data={detail}
                stratigraphies={detail.stratigraphies}
              />
            </div>,
          ]
        ) : detail.isFetching === true ? (
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <div
              style={{
                margin: 'auto',
              }}>
              <Icon loading name="spinner" /> Loading...
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    developer: state.developer,
  };
};

DetailsComponent.propTypes = {
  detail: PropTypes.object,
  domains: PropTypes.object,
  developer: PropTypes.shape({
    debug: PropTypes.bool,
  }),
  i18n: PropTypes.shape({
    t: PropTypes.func,
  }),
};
export default connect(mapStateToProps, null)(DetailsComponent);
