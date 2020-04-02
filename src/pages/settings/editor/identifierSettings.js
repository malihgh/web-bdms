import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import {
  Button,
  Icon,
  Form,
  Popup,
} from 'semantic-ui-react';

import DomainText from '../../../commons/form/domain/domainText';

import {
  listIdentifier,
  createIdentifier,
  deleteIdentifier,
  // updateIdentifier
} from '@ist-supsi/bmsjs';

class IdentifierSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      identifier: ""
    };
  }

  componentDidMount(){
    this.props.listIdentifier();
  }

  render() {
    const {
      t,
      domains
    } = this.props;
    return (
      <div
        style={{
          padding: '2em'
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Form
            style={{
              flex: 1
            }}
          >
            <Form.Group
              widths='equal'
            >
              <Form.Input
                fluid
                label={t('identifier')}
                onChange={(e)=>{
                  this.setState({
                    identifier: e.target.value
                  });
                }}
                placeholder={t('identifier')}
                value={this.state.identifier}
              />
              <div
                style={{
                  flex: '0 0 0% !important'
                }}
              >
                <Form.Button
                  disabled={this.state.identifier===''}
                  icon
                  label='&nbsp;'
                  onClick={()=>{
                    createIdentifier(this.state.identifier).then(
                      (response) => {
                        this.setState({
                          identifier: ''
                        }, ()=>{
                          console.log(response);
                          this.props.listIdentifier();
                        })
                      }
                    );
                  }}
                >
                  {
                    this.state.uId !== null?
                      <Icon name='save' />:  <Icon name='plus' />
                  }
                </Form.Button>
              </div>
            </Form.Group>
          </Form>
        </div>
        <div>
          {
            domains.data.hasOwnProperty('borehole_identifier')?
              domains.data['borehole_identifier'].map((val, idx) => (
                <div
                  key={'bisp-'+idx}
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row',
                    paddingBottom: '0.5em',
                  }}
                >
                  <Popup
                    flowing
                    hoverable
                    on='click'
                    // position='right center'
                    trigger={
                      <Button
                        color='red'
                        icon
                        size='tiny'
                      >
                        <Icon
                          name='trash alternate outline'
                        />
                      </Button>
                    }
                  >
                    Delete "
                    <DomainText
                      id={val.id}
                      schema='borehole_identifier'
                    />" forever?
                    <br />
                    <br />
                    <Button
                      icon
                      onClick={()=>{
                        deleteIdentifier(val.id).then(
                          (response) => {
                            console.log(response);
                            this.props.listIdentifier();
                          }
                        );
                      }}
                      secondary
                      size='tiny'
                    >
                      Confirm
                    </Button>
                  </Popup>
                  <div
                    style={{
                      marginLeft: '1em'
                    }}
                  >
                    <DomainText
                      id={val.id}
                      schema='borehole_identifier'
                    />
                  </div>
                </div>
              )):
              'Empty'
          }
        </div>
      </div>
    );
  }
};

IdentifierSettings.propTypes = {
  domains: PropTypes.shape({
    data: PropTypes.object
  }),
  listIdentifier: PropTypes.func,
  t: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    domains: state.core_domain_list
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    listIdentifier: () => {
      return dispatch(
        listIdentifier()
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation(['common'])(IdentifierSettings));
