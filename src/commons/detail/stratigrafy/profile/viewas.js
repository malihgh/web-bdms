import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import {
  Dropdown
} from 'semantic-ui-react';

class ViewAs extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, data){
    const {
      onChange
    } = this.props;
    if (onChange) {
      onChange(data.value);
    }
  }

  render() {
    const {
      domains,
      setting,
      kinds,
      i18n,
      style,
      t
    } = this.props;
    return (
      <div
        className='flex_row'
        style={{
          ...style
        }}
      >
        <div
          style={{
            whiteSpace: 'nowrap',
            marginRight: '0.3em'
          }}
        >
          {t('viewas')}:
        </div>
        <div
          className='flex_fill'
        >
          {
            kinds !== null &&
            kinds.length>0?
              <Dropdown
                defaultValue={
                  kinds.includes(
                    setting.data.defaults.stratigraphy
                  )?
                    setting.data.defaults.stratigraphy:
                    kinds[0]
                }
                inline
                onChange={this.handleChange}
                options={
                  domains.data['layer_kind'].filter(
                    kind => kinds.includes(
                      kind.id
                    )
                  ).map((domain) => ({
                    value: domain.id,
                    text: domain[i18n.language].text
                  }))
                }
              />: null
          }
        </div>
      </div>
    );
  }
}

ViewAs.propTypes = {
  domains: PropTypes.shape({
    data: PropTypes.object
  }),
  i18n: PropTypes.shape({
    language: PropTypes.string
  }),
  kinds: PropTypes.array,
  onChange: PropTypes.func,
  setting: PropTypes.shape({
    data: PropTypes.object
  }),
  style: PropTypes.object,
  t: PropTypes.func
};

ViewAs.defaultProps = {
  kinds: [],
  style: null
};

const mapStateToProps = (state) => {
  return {
    domains: state.core_domain_list,
    setting: state.setting,
  };
};

export default connect(
  mapStateToProps,
  null
)(
  withTranslation('common')(ViewAs)
);
