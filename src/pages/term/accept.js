import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import {
  Button
} from 'semantic-ui-react';

import {
  acceptTerms,
  getTerms
} from '@ist-supsi/bmsjs';


import Markdown from 'markdown-to-jsx';

class AcceptTerms extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAccepting: false,
      isFetching: true,
      id: null,
      en: '',
      de: '',
      fr: '',
      it: '',
      ro: '',
    };
  }

  componentDidMount(){
    getTerms()
      .then(
        r => {
          this.setState({
            isFetching: false,
            id: r.data.data.id,
            en: r.data.data.en,
            fr: r.data.data.fr,
            de: r.data.data.de,
            it: r.data.data.it,
            ro: r.data.data.ro,
          });
        }
      );
  }

  componentDidUpdate(prevProps) {
      
  }

  render() {
    const {
      i18n
    } = this.props;
    return (
      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#787878',
          display: 'flex',
          flex: '1 1 0%',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '2px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            display: 'flex',
            flex: '1 1 100%',
            flexDirection: 'column',
            margin: '1em 0px',
            overflowY: 'hidden',
            width: '600px',
          }}
        >
          <div
            style={{
              fontSize: '0.9em',
              padding: '1em',
              textAlign: 'right'
            }}
          >
            <span
              className='link'
              onClick={() => {
                i18n.changeLanguage('de');
              }}
              style={{
                paddingRight: '0.5em',
                color: i18n.language === 'de' ?
                  '#ed1d24' : null,
                textDecoration: i18n.language === 'de' ?
                  'underline' : null
              }}
            >
              DE
            </span>
            <span
              className='link'
              onClick={() => {
                i18n.changeLanguage('fr');
              }}
              style={{
                paddingRight: '0.5em',
                color: i18n.language === 'fr' ?
                  '#ed1d24' : null,
                textDecoration: i18n.language === 'fr' ?
                  'underline' : null
              }}
            >
              FR
            </span>
            <span
              className='link'
              onClick={() => {
                i18n.changeLanguage('it');
              }}
              style={{
                paddingRight: '0.5em',
                color: i18n.language === 'it' ?
                  '#ed1d24' : null,
                textDecoration: i18n.language === 'it' ?
                  'underline' : null
              }}
            >
              IT
            </span>
            <span
              className='link'
              onClick={() => {
                i18n.changeLanguage('en');
              }}
              style={{
                color: i18n.language === 'en' ?
                  '#ed1d24' : null,
                textDecoration: i18n.language === 'en' ?
                  'underline' : null
              }}
            >
              EN
            </span>
          </div>
          <div
            style={{
              flex: '1 1 100%',
              overflowY: 'auto',
              paddingRight: '2em',
              margin: '0px 0px 0px 2em',
            }}
          >
            <Markdown
              style={{
                marginBottom: '1em'
              }}
            >
              {this.state[i18n.language]}
            </Markdown>
          </div>
          <div
            style={{
              alignItems: 'center',
              borderTop: 'thin solid #787878',
              padding: '1em',
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            {/* <Button
              secondary
              style={{
                whiteSpace: 'nowrap'
              }}
            >
              I disagree
            </Button> */}
            <div
              style={{
                flex: '1 1 100%'
              }}
            />
            <Button
              loading={this.state.isAccepting}
              onClick={()=>{
                this.setState({
                  isAccepting: true
                }, () => {
                  this.props.acceptTerms(
                    this.state.id
                  ).then(
                  );
                });
              }}
              primary
              style={{
                whiteSpace: 'nowrap'
              }}
            >
              {this.props.t('iagree')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

AcceptTerms.propTypes = {
  acceptTerms: PropTypes.func,
  // i18n: PropTypes.shape({
  //   changeLanguage: PropTypes.func,
  //   language: PropTypes.text
  // }),
  t: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    user: state.core_user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    acceptTerms: async (id) => {
      return dispatch(acceptTerms(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('common')(AcceptTerms));
