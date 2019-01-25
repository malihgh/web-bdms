import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import {
    withRouter
} from 'react-router-dom';

import {
  Icon,
  Button
} from 'semantic-ui-react';

class MenuSettings extends React.Component {

  render() {
    const {
      t
    } = this.props;
    return(
      <div style={{
        padding: '1em'
      }}>
        <Button fluid icon primary
          onClick={this.props.history.goBack}
        >
          <Icon name='caret left' />
          {t('back_to_list')}
        </Button>
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    setting: state.setting
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    boreholeSelected: (borehole) => {
      dispatch({
        path: '/borehole',
        type: 'CLEAR'
      });
    }
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(translate(
  ['home','common', 'borehole_form']
)(withRouter(MenuSettings)));