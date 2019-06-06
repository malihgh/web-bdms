import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import {
  loadDomains
} from '@ist-supsi/bmsjs';


class DomainText extends React.Component {

  componentDidMount() {
    const {
      domains,
      schema
    } = this.props;
    if (!domains.data.hasOwnProperty(schema) && domains.isFetching === false) {
      console.log('loading: ' + domains + " / " + this.props.schema);
      this.props.loadDomains();
    }
  }

  render() {
    const {
      domains,
      geocode,
      id,
      i18n,
      schema,
    } = this.props;
    if (id === null) {
      return '';
    }
    if (!domains.data.hasOwnProperty(schema)) {
      if (domains.isFetching === true) {
        return 'loading translations';
      }
      return '';
    }
    if (geocode !== undefined){
      return (
        domains.data[schema].find(function (element) {
          return element.code === geocode;
        })[i18n.language].text
      );
    } else {
      return (
        domains.data[schema].find(function (element) {
          return element.id === id;
        })[i18n.language].text
      );
    }
  }
}

DomainText.propTypes = {
  domains: PropTypes.object,
  geocode: PropTypes.string,
  id: PropTypes.number,
  schema: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    domains: state.core_domain_list
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    loadDomains: () => {
      dispatch(loadDomains());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  translate('search')(DomainText)
);
