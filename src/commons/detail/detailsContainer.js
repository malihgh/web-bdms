import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import {
  Tab
} from 'semantic-ui-react';
import MetaComponent from './meta/metaComponent';
import BoreholeComponent from './borehole/boreholeComponent';
import StratigraphiesComponent from './stratigrafy/stratigraphiesComponent';
import {
  getBorehole,
  getStratigraphiesByBorehole
} from '@ist-supsi/bmsjs';

class DetailsContainer extends React.Component {
  componentDidMount(){
    const {
      id
    } = this.props;
    this.props.getBorehole(id);
    this.props.getStratigraphiesByBorehole(id);
  }
  componentDidUpdate(prevProps){
    const {
      id, detail
    } = this.props;
    if(
      detail.borehole !== null
      && id !== null
      && detail.borehole.id !== id
    ){
      this.props.getBorehole(id);
      this.props.getStratigraphiesByBorehole(id);
    }
  }
  render() {
    const {
      detail, t
    } = this.props;
    return (
      detail.borehole?
        <div style={{
            flex: "1 1 0%",
            // overflowY: 'auto',
            padding: '1em',
            height: '100%'
          }}>
          <Tab
            activeIndex={detail.tab}
            menu={{
              secondary: true,
              pointing: true
            }}
            onTabChange={(e, d, i) => {
              this.props.setTab(d.activeIndex)
            }}
            panes={[
              {
                menuItem: t('meta_location'),
                render: () => <MetaComponent
                  data={detail.borehole}/>
              },
              {
                menuItem: t('meta_borehole'),
                render: () => <BoreholeComponent
                  data={detail.borehole}/>
              },
              // {
              //   menuItem: t('form_admin'),
              //   render: () => null
              // },
              {
                menuItem: t('meta_stratigraphy'),
                render: () => <StratigraphiesComponent
                  stratigraphies={detail.stratigraphies}/>
              }
            ]}
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          />
        </div>:
        <div>
          Nothing selected
        </div>
    )
  }
}

DetailsContainer.propTypes = {
  detail: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    detail: state.detail_borehole,
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    setTab: (tab) => {
      dispatch({
        type: 'DETCNTTABCHG',
        tab: tab
      })
    },
    getBorehole: (id) => {
      dispatch({
        type: 'GETBOREHOLEDETAILS'
      })
      getBorehole(
        id
      ).then(function(response) {
        if(response.data.success){
          dispatch({
            type: 'GETBOREHOLEDETAILS_OK',
            borehole: response.data.data
          })
        }else{
          dispatch({
            type: 'GETBOREHOLEDETAILS_ERROR',
            message: response.message
          })
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    getStratigraphiesByBorehole: (id) => {
      dispatch({
        type: 'GET_BOREHOLE_STRATIGRAPHIES'
      })
      getStratigraphiesByBorehole(
        id
      ).then(function(response) {
        if(response.data.success){
          dispatch({
            type: 'GET_BOREHOLE_STRATIGRAPHIES_OK',
            stratigraphies: response.data.data
          })
        }else{
          dispatch({
            type: 'GET_BOREHOLE_STRATIGRAPHIES_ERROR',
            message: response.message
          })
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate('borehole_form')(DetailsContainer))
