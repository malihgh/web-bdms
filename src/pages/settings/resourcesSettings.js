import React from 'react';
import { withTranslation } from 'react-i18next';

import { Header } from 'semantic-ui-react';

class ResourcesSettings extends React.Component {
  render() {
    return (
      <div
        style={{
          padding: '2em',
          flex: 1,
        }}>
        <Header
          as="h3"
          className="link"
          onClick={() => {
            this.setState({
              appearance: !this.state.appearance,
            });
          }}
          style={{
            margin: '0px',
          }}>
          {this.props.t('common:resources')}
        </Header>
        <div
          style={{
            paddingTop: '1em',
          }}>
          Documentation:
          <br />
          <a
            href="https://geoservice.ist.supsi.ch/docs/bdms"
            rel="noopener noreferrer"
            target="_BLANK">
            https://geoservice.ist.supsi.ch/docs/bdms
          </a>
        </div>
        <div
          style={{
            paddingTop: '1em',
          }}>
          Python web Service (source code):
          <br />
          <a
            href="https://github.com/geoadmin/service-bdms"
            rel="noopener noreferrer"
            target="_BLANK">
            https://github.com/geoadmin/service-bdms
          </a>
        </div>
        <div
          style={{
            paddingTop: '1em',
          }}>
          Web Application (source code):
          <br />
          <a
            href="https://github.com/geoadmin/web-bdms"
            rel="noopener noreferrer"
            target="_BLANK">
            https://github.com/geoadmin/web-bdms
          </a>
        </div>
        <div
          style={{
            paddingTop: '1em',
          }}>
          Swissforages JavaScript API (source code):
          <br />
          <a
            href="https://github.com/geoadmin/js-bdms"
            rel="noopener noreferrer"
            target="_BLANK">
            https://github.com/geoadmin/js-bdms
          </a>
        </div>
        <div
          style={{
            paddingTop: '1em',
          }}>
          React Stratigraphy library (source code):
          <br />
          <a
            href="https://github.com/ist-supsi/react-stratigraphy"
            rel="noopener noreferrer"
            target="_BLANK">
            https://github.com/ist-supsi/react-stratigraphy
          </a>
        </div>
      </div>
    );
  }
}

export default withTranslation(['common'])(ResourcesSettings);
