import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import _ from 'lodash';
import moment from 'moment';

import {
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import {
  updateBorehole,
  loadBorehole,
  checkBorehole,
  // createBorehole,
  createStratigraphy,
  patchBorehole
} from '@ist-supsi/bmsjs';

import PointComponent from '../../map/pointComponent';
import DomainDropdown from '../domain/dropdown/domainDropdown';
import MunicipalityDropdown from '../municipality/dropdown/municipalityDropdown';
// import DomainTabs from '../domain/domainTabs';
import CantonDropdown from '../cantons/dropdown/cantonDropdown';
import DateField from '../dateField';
import DateText from '../dateText';
// import StratigraphyForm from '../stratigraphy/stratigraphyForm';
import StratigraphyFormContainer from '../stratigraphy/stratigraphyFormContainer';
import DomainText from '../domain/domainText';

import {
  Button,
  Form,
  Input,
  Segment,
  Message,
  Dimmer,
  Loader,
  // Progress,
  // TextArea,
  Icon
} from 'semantic-ui-react';

class BoreholeForm extends React.Component {

  constructor(props) {
    super(props);
    this.checkattribute = false;
    this.updateAttributeDelay = {};
    this.state = {
      "tab": 0,
      "loadingFetch": false,
      "patchFetch": false,
      "creationFetch": false,
      "extended.original_name_check": true,
      "extended.original_name_fetch": false,
      "custom.public_name_check": true,
      "custom.public_name_fetch": false,

      // Stratigraphy
      "layer_kind": null,
      "stratigraphy_id": null,
      "layer": null,
      "layers": [],
      "layerUpdated": null,

      // Finish
      "note": ""
    };
  }

  componentDidMount() {
    const {
      match
    } = this.props;
    if (!_.isNil(match.params.id)){
      this.loadOrCreate(parseInt(match.params.id, 10));
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.id !== null
      && this.props.match.params.id !== prevProps.match.params.id
    ) {
      this.loadOrCreate(parseInt(this.props.match.params.id, 10));
    }
  }

  // componentWillUnmount() {
  //   const {
  //     borehole,
  //     user,
  //   } = this.props;
  //   if (
  //     borehole.data.lock === null
  //     || borehole.data.lock.username === user.data.username
  //   ){
  //     this.props.unlockBorehole(
  //       borehole.data.id
  //     );
  //   }
  // }

  loadOrCreate(id) {
    const self = this;
    if (_.isInteger(id)) {
      // request to edit a borehole
      this.setState({
        "loadingFetch": true,
        "layer_kind": null,
        "stratigraphy_id": null,
        "layers": [],
        "layer": null,
        "borehole": this.empty
      }, () => {
        this.props.getBorehole(id).then(function (response) {
          if (response.success) {
            self.setState({
              "loadingFetch": false,
              "stratigraphy_id": (
                _.isArray(response.data.stratigraphy)
                  && response.data.stratigraphy.length > 0 ?
                  response.data.stratigraphy[0].id : null
              )
            });
          }
        }).catch(function (error) {
          console.log(error);
        });
      });
    }
    // else if (id === null) {
    //   this.setState({
    //     "loadingFetch": false,
    //     "layer_kind": null,
    //     "stratigraphy_id": null,
    //     "layers": [],
    //     "layer": null,
    //     "borehole": this.empty
    //   });
    // } else {
    //   // request the creation of a new borehole if id is not given
    //   this.setState({
    //     "creationFetch": true
    //   }, () => {
    //     setTimeout(function () {
    //       createBorehole().then(function (response) {
    //         if (response.data.success) {
    //           self.setState({
    //             "creationFetch": false,
    //             "borehole": {
    //               ...self.state.borehole,
    //               "id": response.data.id
    //             }
    //           });
    //         }
    //       }).catch(function (error) {
    //         console.log(error);
    //       });
    //     }, 100);
    //   });
    // }
  }

  check(attribute, value) {

    if (
      this.props.borehole.data.lock === null
      || this.props.borehole.data.lock.username !== this.props.user.data.username
    ){
      alert("Borehole not locked");
      return;
    }
    // Check for uniqueness and patch
    const state = {
      ...this.state,
      "patchFetch": true
    };
    const borehole = {
      ...this.props.borehole.data
    };
    _.set(borehole, attribute, value);
    state[attribute + "_fetch"] = true;

    const self = this;

    // update state
    this.setState(state, () => {
      if (self.checkattribute) {
        clearTimeout(self.checkattribute);
        self.checkattribute = false;
      }
      // this.props.updateBorehole(borehole);

      self.checkattribute = setTimeout(function () {
        checkBorehole(
          attribute, value
        ).then(function (response) {
          if (response.data.success) {
            let state = {};
            state[attribute + '_check'] = response.data.check;
            state[attribute + '_fetch'] = false;
            self.setState(state);
            if (response.data.check) {
              // patch attribute
              patchBorehole(
                borehole.id,
                attribute,
                value
              ).then(function (response) {
                if (response.data.success) {
                  self.setState({
                    patchFetch: false
                  }, () => {
                    borehole.percentage = response.data.percentage;
                    borehole.lock = response.data.lock;
                    borehole.updater = response.data.updater;
                    self.props.updateBorehole(borehole);
                  });
                } else if (response.status === 200){
                  alert(response.data.message);
                  if (response.data.error === 'E-900'){
                    self.setState({
                      patchFetch: false
                    }, () => {
                      borehole.lock = null;
                      self.props.updateBorehole(borehole);
                    });
                  }
                }
              }).catch(function (error) {
                console.error(error);
              });
            }
          }
        }).catch(function (error) {
          console.error(error);
        });
      }, 250);
    });
  }

  updateChange(attribute, value, to = true) {
    if (
      this.props.borehole.data.lock === null
      || this.props.borehole.data.lock.username !== this.props.user.data.username
    ){
      alert("Borehole not locked");
      return;
    }
    const state = {
      ...this.state,
      patchFetch: true,
      // borehole: {
      //   ...this.state.borehole
      // }
    };
    const borehole = {
      ...this.props.borehole.data
    };
    if (attribute === 'location') {
      _.set(borehole, 'location_x', value[0]);
      _.set(borehole, 'location_y', value[1]);
      _.set(borehole, 'custom.canton', value[2]);
      _.set(borehole, 'custom.city', value[3]);
      if (value[4] !== null) {
        _.set(borehole, 'elevation_z', value[4]);
      }
    } else if (attribute === 'geocoding') {
      _.set(borehole, 'custom.canton', value[0]);
      _.set(borehole, 'custom.city', value[1]);
    } else {
      _.set(borehole, attribute, value);
    }
    const self = this;
    this.setState(state, () => {
      this.props.updateBorehole(borehole);
      if (
        self.updateAttributeDelay.hasOwnProperty(attribute) &&
        self.updateAttributeDelay[attribute]
      ) {
        clearTimeout(self.updateAttributeDelay[attribute]);
        self.updateAttributeDelay[attribute] = false;
      }
      self.updateAttributeDelay[attribute] = setTimeout(function () {
        patchBorehole(
          borehole.id,
          attribute,
          value
        ).then(function (response) {
          if (response.data.success) {
            self.setState({
              patchFetch: false
            }, () => {
              borehole.percentage = response.data.percentage;
              borehole.lock = response.data.lock;
              borehole.updater = response.data.updater;
              self.props.updateBorehole(borehole);
            });
          }
        }).catch(function (error) {
          console.error(error);
        });
      }, to ? 500 : 0);
    });
  }

  render() {

    const {
      t, workflow
    } = this.props;

    if (this.props.borehole.error !== null){
      return (
        <div>
          {
            t(
              `error:${this.props.borehole.error}`,
              this.props.borehole.data
            )}
        </div>
      );
    }

    const borehole = this.props.borehole.data;
    const size = null; // 'small'

    // Handle highlithing of mentions in comments
    const mentions = workflow.previous !== null?
      workflow.previous.mentions: [];

    return (
      <Dimmer.Dimmable
        as={'div'}
        dimmed={
          this.props.borehole.isFetching === true
          || this.state.loadingFetch === true
          || this.state.creationFetch === true
        }
        style={{
          flex: 1,
          overflowY: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Dimmer
          active={
            this.props.borehole.isFetching === true
            || this.state.loadingFetch === true
            || this.state.creationFetch === true
          }
          inverted
        >
          <Loader>
            {(() => {
              if (
                this.props.borehole.isFetching
                || this.state.loadingFetch === true
              ) {
                return (t('loadingFetch'));
              } else if (this.state.creationFetch === true) {
                return (t('creationFetch'));
              }
            })()}
          </Loader>
        </Dimmer>
        <Switch>
          <Route
            exact
            path={process.env.PUBLIC_URL + "/editor/:id"}
            render={() => (
              <div
                style={{
                  flex: "1 1 0%",
                  padding: "1em",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <Segment>
                  <Form
                    autoComplete="off"
                    error
                    size={size}
                  >
                    <Form.Group widths='equal'>
                      <Form.Field
                        error={
                          borehole.extended.original_name === ''
                          || (
                            this.state['extended.original_name_check'] === false
                            && this.state['extended.original_name_fetch'] === false
                          )
                          || mentions.indexOf('original_name') >= 0
                        }
                        required
                      >
                        <label>
                          <DomainText
                            geocode='original_name'
                            schema='borehole_form'
                          />
                        </label>
                        <Input
                          autoCapitalize="off"
                          autoComplete="off"
                          autoCorrect="off"
                          icon={
                            this.state['extended.original_name_check'] === true
                              && this.state[
                                'extended.original_name_fetch'] === false ?
                              'check' : 'delete'
                          }
                          iconPosition='left'
                          loading={this.state['extended.original_name_fetch']}
                          onChange={(e) => {
                            this.check(
                              'extended.original_name',
                              e.target.value
                            );
                          }}
                          spellCheck="false"
                          value={borehole.extended.original_name}
                        />
                      </Form.Field>
                      <Form.Field
                        error={
                          mentions.indexOf('project_name') >= 0
                        }
                      >
                        <label>  
                          <DomainText
                            geocode='project_name'
                            schema='borehole_form'
                          />
                        </label>
                        <Input
                          autoCapitalize="off"
                          autoComplete="off"
                          autoCorrect="off"
                          onChange={(e) => {
                            this.updateChange(
                              'custom.project_name', e.target.value
                            );
                          }}
                          spellCheck="false"
                          value={borehole.custom.project_name}
                        />
                      </Form.Field>
                    </Form.Group>
                    {
                      this.state['extended.original_name_check'] === false
                      && this.state['extended.original_name_fetch'] === false ?
                        <Message
                          content={
                            t('original_name') + ', '
                            + t('duplicate')
                          }
                          error
                          size={size}
                        /> : null
                    }
                    <Form.Group widths='equal'>
                      <Form.Field
                        error={
                          borehole.custom.public_name === ''
                          || (
                            this.state['custom.public_name_check'] === false
                            && this.state['custom.public_name_fetch'] === false
                          )
                          || mentions.indexOf('public_name') >= 0
                        }
                        required
                      >
                        <label>  
                          <DomainText
                            geocode='public_name'
                            schema='borehole_form'
                          />
                        </label>
                        <Input
                          autoCapitalize="off"
                          autoComplete="off"
                          autoCorrect="off"
                          icon={
                            this.state[
                              'custom.public_name_check'
                            ] === true
                              && this.state[
                                'custom.public_name_fetch'
                              ] === false ?
                              'check' : 'delete'
                          }
                          iconPosition='left'
                          loading={this.state.public_name_fetch}
                          onChange={(e) => {
                            this.check(
                              'custom.public_name',
                              e.target.value
                            );
                          }}
                          spellCheck="false"
                          value={borehole.custom.public_name}
                        />
                      </Form.Field>
                      <Form.Field
                        error={
                          borehole.kind === null
                          || mentions.indexOf('kind') >= 0
                        }
                        required
                      >
                        <label>  
                          <DomainText
                            geocode='kind'
                            schema='borehole_form'
                          />
                        </label>
                        <DomainDropdown
                          onSelected={(selected) => {
                            this.updateChange('kind', selected.id, false);
                          }}
                          schema='kind'
                          selected={borehole.kind}
                        />
                      </Form.Field>
                    </Form.Group>
                    {
                      this.state['custom.public_name_check'] === false
                      && this.state['custom.public_name_fetch'] === false ?
                        <Message
                          content={
                            t('public_name') + ', '
                            + t('duplicate')
                          }
                          error
                          size={size}
                        /> : null
                    }
                  </Form>
                </Segment>
                <Segment>
                  <Form
                    size={size}>
                    <Form.Group widths='equal'>
                      <Form.Field
                        error={
                          mentions.indexOf('restriction') >= 0
                        }
                        required
                      >
                        <label>  
                          <DomainText
                            geocode='restriction'
                            schema='borehole_form'
                          />
                        </label>
                        <DomainDropdown
                          onSelected={(selected) => {
                            this.updateChange(
                              'restriction', selected.id, false
                            );
                          }}
                          schema='restriction'
                          selected={borehole.restriction}
                        />
                      </Form.Field>
                      <Form.Field
                        error={
                          (
                            borehole.restriction === 29 &&
                            !moment(borehole.restriction_until).isValid()
                          ) || (
                            borehole.restriction !== 29 &&
                            _.isString(borehole.restriction_until) &&
                            borehole.restriction_until !== '' &&
                            moment(borehole.restriction_until).isValid()
                          )
                          || mentions.indexOf('restriction_until') >= 0
                        }
                        required={borehole.restriction === 29}
                      >
                        <label>
                          <DomainText
                            geocode='restriction_until'
                            schema='borehole_form'
                          /> ({t('date_format')})
                        </label>
                        <DateField
                          date={borehole.restriction_until}
                          onChange={(selected) => {
                            this.updateChange(
                              'restriction_until', selected, false
                            );
                          }}
                        />
                      </Form.Field>
                    </Form.Group>
                  </Form>
                </Segment>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <div
                    style={{
                      flex: '1'
                    }}
                  >
                    <Segment>
                      <Form size={size}>
                        <Form.Group widths='equal'>
                          <Form.Field
                            error={
                              mentions.indexOf('srs') >= 0
                            }
                            required
                          >
                            <label>{t('srs')}</label>
                            <DomainDropdown
                              onSelected={(selected) => {
                                this.updateChange('srs', selected.id, false);
                              }}
                              schema='srs'
                              selected={borehole.srs}
                            />
                          </Form.Field>
                          <Form.Field
                            error={
                              mentions.indexOf('qt_location') >= 0
                            }
                            required
                          >
                            <label>{t('qt_location')}</label>
                            <DomainDropdown
                              onSelected={(selected) => {
                                this.updateChange(
                                  'qt_location', selected.id, false
                                );
                              }}
                              schema='qt_location'
                              selected={borehole.qt_location}
                            />
                          </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                          <Form.Field
                            error={
                              mentions.indexOf('location_x') >= 0
                            }
                            required
                          >
                            <label>{t('location_x')}</label>
                            <Input
                              autoCapitalize="off"
                              autoComplete="off"
                              autoCorrect="off"
                              disabled={borehole.srs === null}
                              onChange={(e) => {
                                this.updateChange(
                                  'location_x',
                                  e.target.value === '' ?
                                    null : _.toNumber(e.target.value)
                                );
                              }}
                              spellCheck="false"
                              type='number'
                              value={
                                _.isNil(borehole.location_x) ?
                                  '' : borehole.location_x
                              }
                            />
                          </Form.Field>
                          <Form.Field
                            error={
                              mentions.indexOf('location_y') >= 0
                            }
                            required
                          >
                            <label>{t('location_y')}</label>
                            <Input
                              autoCapitalize="off"
                              autoComplete="off"
                              autoCorrect="off"
                              disabled={borehole.srs === null}
                              onChange={(e) => {
                                this.updateChange(
                                  'location_y',
                                  e.target.value === '' ?
                                    null : _.toNumber(e.target.value)
                                );
                              }}
                              spellCheck="false"
                              type='number'
                              value={
                                _.isNil(borehole.location_y) ?
                                  '' : borehole.location_y
                              }
                            />
                          </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                          <Form.Field
                            error={
                              mentions.indexOf('elevation_z') >= 0
                            }
                            required
                          >
                            <label>{t('elevation_z')}</label>
                            <Input
                              autoCapitalize="off"
                              autoComplete="off"
                              autoCorrect="off"
                              onChange={(e) => {
                                this.updateChange(
                                  'elevation_z',
                                  e.target.value === '' ?
                                    null : _.toNumber(e.target.value)
                                );
                              }}
                              spellCheck="false"
                              type='number'
                              value={
                                _.isNil(borehole.elevation_z)?
                                  '' : borehole.elevation_z
                              }
                            />
                          </Form.Field>
                          <Form.Field
                            error={
                              mentions.indexOf('hrs') >= 0
                            }
                            required
                          >
                            <label>{t('hrs')}</label>
                            <DomainDropdown
                              onSelected={(selected) => {
                                this.updateChange('hrs', selected.id, false);
                              }}
                              schema='hrs'
                              selected={borehole.hrs}
                            />
                          </Form.Field>
                          <Form.Field
                            error={
                              mentions.indexOf('qt_elevation') >= 0
                            }
                            required
                          >
                            <label>{t('qt_elevation')}</label>
                            <DomainDropdown
                              onSelected={(selected) => {
                                this.updateChange(
                                  'qt_elevation', selected.id, false
                                );
                              }}
                              schema='qt_elevation'
                              selected={borehole.qt_elevation}
                            />
                          </Form.Field>
                        </Form.Group>
                      </Form>
                    </Segment>

                    <Segment>
                      <Form
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                        size={size}
                        spellCheck="false"
                      >
                        <Form.Group widths='equal'>
                          <Form.Field
                            error={
                              mentions.indexOf('country') >= 0
                            }
                            required
                          >
                            <label>{t('country')}</label>
                            <Input
                              value={'Switzerland'} />
                          </Form.Field>
                          <Form.Field
                            error={
                              mentions.indexOf('canton') >= 0
                            }
                            required
                          >
                            <label>
                              {t('canton')} {
                                borehole.custom.canton !== null ?
                                  <span
                                    className='link'
                                    onClick={() => {
                                      for (
                                        let index = 0;
                                        index < this.props.cantons.length;
                                        index++
                                      ) {
                                        const canton = this.props.cantons[index];
                                        if (canton.id === borehole.custom.canton) {
                                          this.map.zoomtopoly(
                                            canton.geom.coordinates
                                          );
                                          break;
                                        }
                                      }
                                    }}
                                  >
                                    <Icon name='map marker' />
                                    {/* <Icon.Group>
                                      <Icon name='map marker' />
                                      <Icon corner name='search' />
                                    </Icon.Group> */}
                                  </span> : null
                              }
                            </label>
                            <CantonDropdown
                              onSelected={(selected) => {
                                if (borehole.custom.city !== null) {
                                  this.updateChange(
                                    'custom.city', null, false
                                  );
                                }
                                this.updateChange(
                                  'custom.canton', selected.id, false
                                );
                              }}
                              selected={borehole.custom.canton}
                            />
                          </Form.Field>
                          <Form.Field
                            error={
                              mentions.indexOf('city') >= 0
                            }
                            required
                          >
                            <label>
                              {t('city')} {
                                borehole.custom.city !== null ?
                                  <span
                                    className='link'
                                    onClick={() => {
                                      for (
                                        let index = 0;
                                        index < this.props.municipalities.length;
                                        index++
                                      ) {
                                        const municipality = this.props.municipalities[index];
                                        if (municipality.id === borehole.custom.city) {
                                          this.map.zoomtopoly(
                                            municipality.geom.coordinates
                                          );
                                          break;
                                        }
                                      }
                                    }}
                                  >
                                    {/* <Image
                                      avatar
                                      src={
                                        process.env.PUBLIC_URL
                                        + '/img/map-search-outline.svg'
                                      }
                                      style={{
                                        height: '1.5em',
                                        width: 'auto'                                      
                                      }}
                                    /> */}
                                    <Icon name='map marker' />
                                  </span> : null
                              }
                            </label>
                            <MunicipalityDropdown
                              canton={borehole.custom.canton}
                              disabled={borehole.custom.canton === null}
                              onSelected={(selected) => {
                                console.log(selected);
                                this.updateChange(
                                  'custom.city', selected.id, false
                                );
                              }}
                              selected={borehole.custom.city}
                            />
                          </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                          <Form.Field
                            error={
                              mentions.indexOf('address') >= 0
                            }
                          >
                            <label>{t('address')}</label>
                            <Input
                              autoCapitalize="off"
                              autoComplete="off"
                              autoCorrect="off"
                              onChange={(e) => {
                                this.updateChange(
                                  'custom.address', e.target.value
                                );
                              }}
                              spellCheck="false"
                              value={
                                _.isNil(borehole.custom.address) ?
                                  '' : borehole.custom.address
                              }
                            />
                          </Form.Field>
                          <Form.Field
                            error={
                              mentions.indexOf('landuse') >= 0
                            }
                          >
                            <label>{t('landuse')}</label>
                            <DomainDropdown
                              onSelected={(selected) => {
                                this.updateChange(
                                  'custom.landuse', selected.id, false
                                );
                              }}
                              schema='custom.landuse'
                              selected={borehole.custom.landuse}
                            />
                          </Form.Field>
                        </Form.Group>
                      </Form>
                    </Segment>
                  </div>
                  <div
                    style={{
                      flex: '1',
                      marginLeft: '1em'
                    }}
                  >
                    <PointComponent
                      applyChange={(x, y, height, cid, mid) => {
                        this.updateChange(
                          'location', [x, y, cid, mid, height], false);
                      }}
                      id={this.props.id}
                      ref={pmap => this.map = pmap}
                      srs={
                        borehole.srs !== null
                        && this.props.domains.data.hasOwnProperty('srs')?
                          (()=>{
                            const code = this.props.domains.data.srs.find((element) => {
                              return element.id === borehole.srs;
                            });
                            if (code !== undefined){
                              return 'EPSG:' + code['code'];
                            }
                            return null;
                          })():
                          null
                      }
                      x={
                        borehole.location_x === '' ?
                          null :
                          _.toNumber(borehole.location_x)
                      }
                      y={
                        borehole.location_y === '' ?
                          null :
                          _.toNumber(borehole.location_y)
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/editor/:id/borehole"}
            render={() => (
              <div
                style={{
                  flex: "1 1 0%",
                  padding: "1em",
                  overflowY: "auto"
                }}
              >
                <Segment>
                  <Form
                    autoComplete="off"
                    error
                    size={size}
                  >
                    <Form.Group widths='equal'>
                      <Form.Field
                        error={
                          mentions.indexOf('method') >= 0
                        }
                        required
                      >
                        <label>{t('method')}</label>
                        <DomainDropdown
                          onSelected={(selected) => {
                            this.updateChange(
                              'extended.method', selected.id, false);
                          }}
                          schema='extended.method'
                          selected={borehole.extended.method}
                        />
                      </Form.Field>
                      <Form.Field
                        error={
                          (
                            _.isString(borehole.drilling_date)
                            && borehole.drilling_date !== ''
                            && !moment(borehole.drilling_date).isValid()
                          )
                          || mentions.indexOf('method') >= 0
                        }
                        required
                      >
                        <label>{t('drilling_date')} ({t('date_format')})</label>
                        <DateField
                          date={borehole.drilling_date}
                          onChange={(selected) => {
                            this.updateChange(
                              'drilling_date', selected, false
                            );
                          }} />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Field
                        error={
                          mentions.indexOf('cuttings') >= 0
                        }
                        required
                      >
                        <label>{t('cuttings')}</label>
                        <DomainDropdown
                          onSelected={(selected) => {
                            this.updateChange(
                              'custom.cuttings', selected.id, false);
                          }}
                          schema='custom.cuttings'
                          selected={borehole.custom.cuttings}
                        />
                      </Form.Field>
                      <Form.Field
                        error={
                          mentions.indexOf('purpose') >= 0
                        }
                        required
                      >
                        <label>{t('purpose')}</label>
                        <DomainDropdown
                          onSelected={(selected) => {
                            this.updateChange(
                              'extended.purpose', selected.id, false);
                          }}
                          schema='extended.purpose'
                          selected={borehole.extended.purpose}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Field
                        error={
                          mentions.indexOf('drill_diameter') >= 0
                        }
                      >
                        <label>{t('drill_diameter')}</label>
                        <Input
                          autoCapitalize="off"
                          autoComplete="off"
                          autoCorrect="off"
                          onChange={(e) => {
                            this.updateChange(
                              'custom.drill_diameter',
                              e.target.value === '' ?
                                null : _.toNumber(e.target.value)
                            );
                          }}
                          spellCheck="false"
                          type='number'
                          value={
                            _.isNil(borehole.custom.drill_diameter) ?
                              '' : borehole.custom.drill_diameter
                          }
                        />
                      </Form.Field>
                      <Form.Field
                        error={
                          mentions.indexOf('status') >= 0
                        }
                        required
                      >
                        <label>{t('status')}</label>
                        <DomainDropdown
                          onSelected={(selected) => {
                            this.updateChange(
                              'extended.status', selected.id, false);
                          }}
                          schema='extended.status'
                          selected={borehole.extended.status}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Field
                        error={
                          mentions.indexOf('bore_inc') >= 0
                        }
                        required
                      >
                        <label>{t('bore_inc')}</label>
                        <Input
                          autoCapitalize="off"
                          autoComplete="off"
                          autoCorrect="off"
                          onChange={(e) => {
                            this.updateChange(
                              'bore_inc',
                              e.target.value === '' ?
                                null : _.toNumber(e.target.value)
                            );
                          }}
                          spellCheck="false"
                          type='number'
                          value={
                            _.isNil(borehole.bore_inc) ?
                              '' : borehole.bore_inc
                          }
                        />
                      </Form.Field>
                      <Form.Field
                        error={
                          mentions.indexOf('bore_inc_dir') >= 0
                        }
                        required
                      >
                        <label>{t('bore_inc_dir')}</label>
                        <Input
                          autoCapitalize="off"
                          autoComplete="off"
                          autoCorrect="off"
                          onChange={(e) => {
                            this.updateChange(
                              'bore_inc_dir',
                              e.target.value === '' ?
                                null : _.toNumber(e.target.value)
                            );
                          }}
                          spellCheck="false"
                          type='number'
                          value={
                            _.isNil(borehole.bore_inc_dir) ?
                              '' : borehole.bore_inc_dir
                          }
                        />
                      </Form.Field>
                      <Form.Field
                        error={
                          mentions.indexOf('qt_bore_inc_dir') >= 0
                        }
                        required
                      >
                        <label>{t('qt_bore_inc_dir')}</label>
                        <DomainDropdown
                          onSelected={(selected) => {
                            this.updateChange(
                              'custom.qt_bore_inc_dir', selected.id, false);
                          }}
                          schema='custom.qt_bore_inc_dir'
                          selected={borehole.custom.qt_bore_inc_dir}
                        />
                      </Form.Field>
                    </Form.Group>
                  </Form>
                </Segment>
                <Segment>
                  <Form
                    autoComplete="off"
                    error
                    size={size}
                  >
                    <Form.Group widths='equal'>
                      <Form.Field
                        error={
                          mentions.indexOf('length') >= 0
                        }
                        required
                      >
                        <label>{t('length')}</label>
                        <Input
                          autoCapitalize="off"
                          autoComplete="off"
                          autoCorrect="off"
                          onChange={(e) => {
                            this.updateChange(
                              'length',
                              e.target.value === '' ?
                                null : _.toNumber(e.target.value)
                            );
                          }}
                          spellCheck="false"
                          type='number'
                          value={
                            _.isNil(borehole.length) ?
                              '' : borehole.length
                          }
                        />
                      </Form.Field>
                      <Form.Field
                        error={
                          mentions.indexOf('qt_length') >= 0
                        }
                        required
                      >
                        <label>{t('qt_length')}</label>
                        <DomainDropdown
                          onSelected={(selected) => {
                            this.updateChange(
                              'custom.qt_length', selected.id, false
                            );
                          }}
                          schema='custom.qt_length'
                          selected={borehole.custom.qt_length}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Field
                        error={
                          mentions.indexOf('top_bedrock') >= 0
                        }
                        required
                      >
                        <label>{t('top_bedrock')}</label>
                        <Input
                          autoCapitalize="off"
                          autoComplete="off"
                          autoCorrect="off"
                          onChange={(e) => {
                            this.updateChange(
                              'extended.top_bedrock',
                              e.target.value === '' ?
                                null : _.toNumber(e.target.value)
                            );
                          }}
                          spellCheck="false"
                          type='number'
                          value={
                            _.isNil(borehole.extended.top_bedrock) ?
                              '' : borehole.extended.top_bedrock
                          }
                        />
                      </Form.Field>
                      <Form.Field
                        error={
                          mentions.indexOf('qt_top_bedrock') >= 0
                        }
                        required
                      >
                        <label>{t('qt_top_bedrock')}</label>
                        <DomainDropdown
                          onSelected={(selected) => {
                            this.updateChange(
                              'custom.qt_top_bedrock',
                              selected.id,
                              false
                            );
                          }}
                          schema='custom.qt_top_bedrock'
                          selected={borehole.custom.qt_top_bedrock}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Field
                      error={
                        mentions.indexOf('groundwater') >= 0
                      }
                      required
                    >
                      <label>{t('groundwater')}</label>
                      <Form.Group inline>
                        <Form.Radio
                          checked={borehole.extended.groundwater === true}
                          label={t('common:yes')}
                          onChange={(e, d) => {
                            this.updateChange(
                              'extended.groundwater', true, false);
                          }}
                        />
                        <Form.Radio
                          checked={borehole.extended.groundwater === false}
                          label={t('common:no')}
                          onChange={(e, d) => {
                            this.updateChange(
                              'extended.groundwater', false, false);
                          }}
                        />
                        <Form.Radio
                          checked={borehole.extended.groundwater === null}
                          label={t('common:np')}
                          onChange={(e, d) => {
                            this.updateChange(
                              'extended.groundwater', null, false);
                          }}
                        />
                      </Form.Group>
                    </Form.Field>
                    <Form.Field
                      error={
                        mentions.indexOf('lit_pet_top_bedrock') >= 0
                      }
                      required
                    >
                      <label>{t('lit_pet_top_bedrock')}</label>
                      <DomainDropdown
                        onSelected={(selected) => {
                          this.updateChange(
                            'custom.lit_pet_top_bedrock',
                            selected.id,
                            false
                          );
                        }}
                        schema='custom.lit_pet_top_bedrock'
                        selected={borehole.custom.lit_pet_top_bedrock}
                      />
                    </Form.Field>
                    <Form.Field
                      error={
                        mentions.indexOf('lit_str_top_bedrock') >= 0
                      }
                      required
                    >
                      <label>{t('lit_str_top_bedrock')}</label>
                      <DomainDropdown
                        onSelected={(selected) => {
                          this.updateChange(
                            'custom.lit_str_top_bedrock',
                            selected.id,
                            false
                          );
                        }}
                        schema='custom.lit_str_top_bedrock'
                        selected={borehole.custom.lit_str_top_bedrock}
                      />
                    </Form.Field>
                    <Form.Field
                      error={
                        mentions.indexOf('chro_str_top_bedrock') >= 0
                      }
                      required
                    >
                      <label>{t('chro_str_top_bedrock')}</label>
                      <DomainDropdown
                        onSelected={(selected) => {
                          this.updateChange(
                            'custom.chro_str_top_bedrock',
                            selected.id,
                            false
                          );
                        }}
                        schema='custom.chro_str_top_bedrock'
                        selected={borehole.custom.chro_str_top_bedrock}
                      />
                    </Form.Field>
                  </Form>
                </Segment>
              </div>
            )}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/editor/:id/stratigraphy"}
            render={() => (
              <div
                style={{
                  flex: "1 1 0%",
                  padding: "1em",
                  overflowY: "hidden"
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row'
                    }}
                  >
                    {
                      this.props.borehole.data.lock === null
                      || this.props.borehole.data.lock.username !==
                         this.props.user.data.username?
                        null:
                        <Button
                          content={t('meta_stratigraphy')}
                          icon='add'
                          onClick={() => {
                            createStratigraphy(
                              borehole.id
                            ).then(
                              (response) => {
                                if (response.data.success) {
                                  this.setState({
                                    "stratigraphy_id": response.data.id
                                  }, () => {
                                    this.loadOrCreate(borehole.id);
                                  });
                                }
                              }
                            ).catch(function (error) {
                              console.log(error);
                            });
                          }}
                          secondary
                          size='small'
                        />
                    }
                    {
                      _.isArray(borehole.stratigraphy) ?
                        borehole.stratigraphy.map((stratigraphy, sx) => (
                          <div
                            key={'str-tab-' + sx}
                            onClick={() => {
                              this.setState({
                                "stratigraphy_id": stratigraphy.id
                              });
                            }}
                            style={{
                              margin: '0px 1em',
                              cursor: 'pointer',
                              borderBottom:
                                this.state.stratigraphy_id === stratigraphy.id ?
                                  '2px solid black' : '2px solid transparent',
                              padding: '0px 0.5em 3px 0.5em'
                            }}
                          >
                            <span
                              style={{
                                fontWeight: 'bold'
                              }}
                            >
                              {
                                stratigraphy.primary === true?
                                  <Icon name='check' />: null
                              }
                              {
                                stratigraphy.name === null
                                || stratigraphy.name === ''?
                                  t('common:np'): stratigraphy.name
                              }
                              {/* <DomainText
                                id={stratigraphy.kind}
                                schema={'layer_kind'}
                              /> */}
                            </span>
                            <br />
                            <span
                              style={{
                                color: '#787878',
                                fontSize: '0.8em'
                              }}
                            >
                              <DateText
                                date={stratigraphy.date}
                              />
                            </span>
                          </div>
                        )) : null
                    }
                  </div>
                  <StratigraphyFormContainer
                    id={this.state.stratigraphy_id}
                    kind={this.state.layer_kind}
                    onClone={(id) => {
                      console.log("clone..");
                      this.loadOrCreate(borehole.id);
                    }}
                    onDeleted={(id) => {
                      const bh = {
                        ...borehole
                      };
                      const strt = [];
                      for (var i = 0; i < bh.stratigraphy.length; i++) {
                        if (id !== bh.stratigraphy[i].id) {
                          strt.push(bh.stratigraphy[i]);
                        }
                      }
                      bh.stratigraphy = strt;
                      this.props.updateBorehole(bh);
                    }}
                    onUpdated={(id, attribute, value) => {
                      const bh = {
                        ...borehole
                      };
                      for (var i = 0; i < bh.stratigraphy.length; i++) {
                        if (id === bh.stratigraphy[i].id) {
                          bh.stratigraphy[i][attribute] = value;
                          if (attribute !== 'primary'){
                            break;
                          }
                        } else if (attribute === 'primary'){
                          bh.stratigraphy[i][attribute] = false;
                        }
                      }
                      this.props.updateBorehole(bh);
                    }}
                    refresh={this.props.borehole.fcnt}
                  />
                </div>
              </div>
            )}
          />
        </Switch>
        {/* <Progress
          color={
            borehole.percentage === 100 ? 'green' : 'black'
          }
          percent={borehole.percentage}
          progress
          size='medium'
        /> */}
      </Dimmer.Dimmable>
    );
  }
}

BoreholeForm.propTypes = {
  borehole: PropTypes.object,
  getBorehole: PropTypes.func,
  id: PropTypes.number,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  t: PropTypes.func,
  updateBorehole: PropTypes.func,
  workflow: PropTypes.object
};

BoreholeForm.defaultProps = {
  id: undefined
};

const mapStateToProps = (state) => {
  return {
    borehole: state.core_borehole,
    workflow: state.core_workflow,
    domains: state.core_domain_list,
    cantons: state.core_canton_list.data,
    municipalities: state.core_municipality_list.data,
    user: state.core_user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    getBorehole: (id) => {
      return dispatch(loadBorehole(id));
    },
    updateBorehole: (data) => {
      return dispatch(updateBorehole(data));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    translate(['borehole_form', 'common', 'error'])(BoreholeForm)
  )
);
