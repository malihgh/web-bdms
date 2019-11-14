import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import {
  Button,
  Divider,
  Header,
  Input,
  Segment,
} from 'semantic-ui-react';

class DatabaseSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      export: false
    };
  }

  render() {
    const {
      t
    } = this.props;
    return (
      <div
        style={{
          padding: '2em',
          flex: 1
        }}
      >
        <div
          style={{
            flexDirection: 'row',
            display: 'flex'
          }}
        >
          <Header
            as='h3'
            className='link'
            onClick={() => {
              this.setState({
                "export": !this.state.export
              });
            }}
            style={{
              margin: '0px'
            }}
          >
            Export
          </Header>
          <div
            style={{
              flex: 1,
              textAlign: 'right'
            }}
          >
            <Button
              color='red'
              onClick={() => {
                this.setState({
                  "export": !this.state.export
                });
              }}
              size='small'
            >
              {
                this.state.export === true ?
                  t('collapse') : t('expand')
              }
            </Button>
          </div>
        </div>
        {
          this.state.export === true ?
            <Segment>
              <Button
                onClick={() => {
                  return;
                }}
                primary
                size='small'
              >
                Download
              </Button>
            </Segment>: <Divider />
        }
        <div
          style={{
            flexDirection: 'row',
            display: 'flex'
          }}
        >
          <Header
            as='h3'
            className='link'
            onClick={() => {
              this.setState({
                "restore": !this.state.restore
              });
            }}
            style={{
              margin: '0px'
            }}
          >
            Restore
          </Header>
          <div
            style={{
              flex: 1,
              textAlign: 'right'
            }}
          >
            <Button
              color='red'
              onClick={() => {
                this.setState({
                  "restore": !this.state.restore
                });
              }}
              size='small'
            >
              {
                this.state.restore === true ?
                  t('collapse') : t('expand')
              }
            </Button>
          </div>
        </div>
        {
          this.state.restore === true ?
            <Segment>
              <Input
                type='file'
              />
              <Button
                onClick={() => {
                  return;
                }}
                primary
                size='small'
              >
                Restore
              </Button>
            </Segment>: <Divider />
        }
      </div>
    );
  }
};

DatabaseSettings.propTypes = {
  t: PropTypes.func
};

// DatabaseSettings.defaultProps = {
// };

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate(['common'])(DatabaseSettings));
