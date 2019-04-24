import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import _ from 'lodash';
import {
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import {
  Button,
  Header,
  Icon,
  Menu,
  Segment
} from 'semantic-ui-react';
import DateText from '../../form/dateText';
import SearchComponent from '../../search/searchComponent';

class MenuExplorer extends React.Component {

  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.state = {
      scroller: false
    };
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    if (!_.isNil(this.menu) && this.menu.children.length > 0) {
      const height = this.menu.clientHeight;
      const childrenHeight = this.menu.children[0].clientHeight;
      this.setState({
        scroller: childrenHeight > height
      });
    } else {
      this.setState({
        scroller: true
      });
    }
  }

  render() {
    const {
      history,
      home,
      boreholes,
      t,
      detail,
      search
    } = this.props;
    return (
      <Switch>
        <Route
          exact
          path={process.env.PUBLIC_URL + "/:id"}
          render={() => (
            <div
              style={{
                padding: '1em'
              }}
            >
              <Button
                fluid
                icon
                onClick={e => {
                  history.push(
                    process.env.PUBLIC_URL
                  );
                }}
                primary
              >
                <Icon name='caret left' />
                {t('back_to_list')}
              </Button>
              <Segment
                loading={detail.isFetching}
              >
                <Header>
                  {
                    _.hasIn(detail.borehole, 'extended.original_name') ?
                      detail.borehole.extended.original_name :
                      null
                  }
                </Header>
                <div
                  style={{
                    marginTop: '0.5em'
                  }}
                >
                  <span
                    style={{
                      color: '#787878',
                      fontSize: '0.8em'
                    }}
                  >
                    {t('common:creator')}
                  </span>
                  <br />
                  {
                    _.hasIn(detail.borehole, 'author.username') ?
                      detail.borehole.author.username :
                      null
                  }
                </div>
                <div
                  style={{
                    marginTop: '0.5em'
                  }}
                >
                  <span
                    style={{
                      color: '#787878',
                      fontSize: '0.8em'
                    }}
                  >
                    {t('common:creation_date')}
                  </span>
                  <br />
                  {
                    _.hasIn(detail.borehole, 'author.date') ?
                      <DateText
                        date={detail.borehole.author.date}
                        hours
                      /> :
                      null
                  }
                </div>
              </Segment>
            </div>
          )}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL}
          render={() => (
            [
              <div
                key='sb-em-1'
                style={{
                  padding: '1em'
                }}>
                <Header size='medium'>
                  Boreholes: {
                    boreholes.isFetching ?
                      ' searching...' :
                      boreholes.dlen + ' founds'
                  }
                </Header>
              </div>,
              <div
                className={
                  this.state.scroller === true ?
                    'scroller' : null
                }
                ref={divElement => this.menu = divElement}
                key='sb-em-2'
                style={{
                  padding: '1em',
                  flex: '1 1 100%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflowY: 'hidden',
                  marginRight: this.state.scroller === true ?
                    this.props.setting.scrollbar : '0px'
                }}>
                <SearchComponent
                  onChange={(filter) => {
                    //console.log(filter)
                  }} />
              </div>,
              <Menu
                icon='labeled'
                key='sb-em-3'
                size='mini'
                style={{
                  margin: '0px'
                }}
              >
                <Menu.Item
                  onClick={() => {
                    this.props.refresh();
                  }}
                  style={{
                    flex: 1
                  }}
                >
                  <Icon
                    name='refresh'
                    loading={boreholes.isFetching}
                  />
                  Refresh
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    window.open(
                      process.env.PUBLIC_URL + '/api/v1/borehole/export?'
                      + Object.keys(search.filter).map((k) => {
                        return encodeURIComponent(k)
                          + '=' + encodeURIComponent(search.filter[k])
                      }).join('&')
                    );
                  }}
                  style={{
                    flex: 1
                  }}
                >
                  <Icon name='download' />
                  Export
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    this.props.reset();
                  }}
                  style={{
                    flex: 1
                  }}
                >
                  <Icon name='undo' /> Reset
                </Menu.Item>  
              </Menu>
            ]
          )}
        />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    leftmenu: state.leftmenu,
    detail: state.detail_borehole,
    home: state.home,
    search: state.search,
    boreholes: state.core_borehole_list,
    setting: state.setting
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    boreholeSeleced: () => {
      dispatch({
        type: 'HOME_BOREHOLE_SELECTED',
        id: null
      });
    },
    refresh: () => {
      dispatch({
        type: 'SEARCH_FILTER_REFRESH'
      });
    },
    reset: () => {
      dispatch({
        type: 'SEARCH_FILTER_RESET'
      });
    }
  }
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(translate(['home', 'common'])(MenuExplorer))
);
