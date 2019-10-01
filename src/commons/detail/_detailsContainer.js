import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import {
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import _ from 'lodash';
// import MetaComponent from './meta/metaComponent';
// import StratigraphiesComponent from './stratigrafy/stratigraphiesComponent';
// import MunicipalityText from '../form/municipality/municipalityText';
// import CantonText from '../form/cantons/cantonText';
// import DomainText from '../form/domain/domainText';
// import Scroller from '../scroller';
// import ExportLink from '../exportlink';
import DetailsComponent from './detailsComponent';

import {
  getBorehole,
  getStratigraphiesByBorehole
} from '@ist-supsi/bmsjs';

class DetailsContainer extends React.Component {
  componentDidMount() {
    const {
      match
    } = this.props;
    if (!_.isNil(match.params.id)){
      this.props.getBorehole(
        parseInt(match.params.id, 10)
      );
      this.props.getStratigraphiesByBorehole(
        parseInt(match.params.id, 10)
      );
    };
  }
  componentDidUpdate(prevProps) {
    const {
      detail,
      match
    } = this.props;
    if (
      (
        detail.borehole !== null
        && !_.isNil(match.params.id)
        && parseInt(match.params.id, 10) !== detail.borehole.id
      ) || (
        !_.isNil(match.params.id)
        && _.isNil(detail.borehole)
      )
    ){
      this.props.getBorehole(parseInt(match.params.id, 10));
      this.props.getStratigraphiesByBorehole(parseInt(match.params.id, 10));
    }
  }

  render() {
    const {
      detail, domains
    } = this.props;
    return (
      <Switch>
        <Route
          exact
          path={process.env.PUBLIC_URL + "/:id"}
          render={() => (
            <DetailsComponent
              detail={detail}
              domains={domains}
            />
          )}
        />
      </Switch>
    );
  }
}

DetailsContainer.propTypes = {
  detail: PropTypes.object,
  domains: PropTypes.object,
  getBorehole: PropTypes.func,
  getStratigraphiesByBorehole: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

const mapStateToProps = (state, ownProps) => {
  return {
    detail: state.detail_borehole,
    domains: state.core_domain_list,
    // ...ownProps
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    getBorehole: (id) => {
      dispatch({
        type: 'GETBOREHOLEDETAILS'
      });
      getBorehole(
        id
      ).then(function (response) {
        if (response.data.success) {
          dispatch({
            type: 'GETBOREHOLEDETAILS_OK',
            borehole: response.data.data
          });
        } else {
          dispatch({
            type: 'GETBOREHOLEDETAILS_ERROR',
            message: response.message
          });
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    getStratigraphiesByBorehole: (id) => {
      dispatch({
        type: 'GET_BOREHOLE_STRATIGRAPHIES'
      });
      getStratigraphiesByBorehole(
        id
      ).then(function (response) {
        if (response.data.success) {
          dispatch({
            type: 'GET_BOREHOLE_STRATIGRAPHIES_OK',
            stratigraphies: response.data.data
          });
        } else {
          dispatch({
            type: 'GET_BOREHOLE_STRATIGRAPHIES_ERROR',
            message: response.message
          });
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(translate('borehole_form')(DetailsContainer))
);
