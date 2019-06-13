import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { translate } from 'react-i18next';
import {
  withRouter
} from 'react-router-dom';

import {
  Button,
  Dropdown,
  Header,
  Icon,
  Menu,
  Modal
} from 'semantic-ui-react';

import {
  createBorehole
} from '@ist-supsi/bmsjs';

import SearchEditorComponent from '../../search/editor/searchEditorComponent'

class MenuEditorSearch extends React.Component {

  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.state = {
      creating: false,
      delete: false,
      scroller: false,
      modal: false,
      workgroup: this.props.user.data.workgroups.length === 1?
        this.props.user.data.workgroups[0].id: null
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
      history, boreholes, t
    } = this.props;
    return (
      [
        <div
          key='sb-em-1'
          style={{
            color: boreholes.isFetching === false && boreholes.dlen === 0?
              'red': '#767676',
            // fontWeight: 'bold',
            padding: '1em 1em 0px 1em'
          }}
        >
          {
            t("common:boreholes").charAt(0).toUpperCase()
            + t("common:boreholes").slice(1)
          }: {
            boreholes.isFetching ?
              <Icon
                loading
                name='spinner'
              /> :
              boreholes.dlen + ' ' + (
                boreholes.dlen > 1 || boreholes.dlen === 0 ?
                  t("common:results") : t("common:result")
              )
          }
        </div>,
        <div
          className={
            this.state.scroller === true ?
              'scroller' : null
          }
          key='sb-em-2'
          ref={divElement => this.menu = divElement}
          style={{
            padding: '1em',
            flex: '1 1 100%',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'hidden',
            marginRight: this.state.scroller === true ?
              this.props.setting.scrollbar : '0px'
          }}>
          <SearchEditorComponent
            onChange={(filter) => {
              //console.log(filter)
            }}
          />
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
              loading={boreholes.isFetching}
              name='refresh'
            />
            Refresh
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              this.props.reset();
            }}
            style={{
              flex: 1
            }}
          >
            <Icon name='undo' />
            Reset
          </Menu.Item>
          <Menu.Item
            disabled={this.props.user.data.roles.indexOf('EDIT')===-1}
            onClick={() => {
              const self = this;
              this.setState({
                modal: true
              });
            }}
            style={{
              flex: 1
            }}
          >
            <Icon name='add' />
            New
          </Menu.Item>
        </Menu>,
        <Modal
          closeIcon
          key='sb-em-4'
          onClose={()=>{
            this.setState({
              modal: false
            });
          }}
          onOpen={()=>{
            console.log("onOpen");
          }}
          open={this.state.modal===true}
          size='mini'
        >
          <Header
            content={t(`common:newBorehole`)}
            // icon='archive'
          />
          <Modal.Content>
            <p>
              Workgroup: {
                this.props.user.data.workgroups.length === 1?
                  this.props.user.data.workgroups[0].workgroup:
                  <Dropdown
                    item
                    onChange={(ev, data) => {
                      this.setState({
                        workgroup: data.value
                      });
                    }}
                    options={
                      this.props.user.data.workgroups.filter(
                        w => w.roles.indexOf('EDIT') >= 0
                      ).map(wg => (
                        {
                          key: wg['id'],
                          text: wg['workgroup'],
                          value: wg['id']
                        }
                      ))
                    }
                    simple
                    text='Dropdown'
                  />
              }
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              // disabled={
              //   readOnly
              //   || workflows.isRejecting
              // }
              loading={
                this.state.creating === true
              }
              onClick={()=>{
                this.setState({
                  creating: true,
                }, ()=>{
                  createBorehole(
                    this.state.workgroup
                  ).then(
                    (response) => {
                      if (response.data.success) {
                        this.setState({
                          creating: false,
                          modal: false
                        }, () => {
                          history.push(
                            process.env.PUBLIC_URL
                            + "/editor/"
                            + response.data.id
                          );
                        });
                      }
                    }
                  ).catch(function (error) {
                    console.log(error);
                  });
                });
              }}
              secondary
            >
              <Icon
                name='add'
              /> {t('editor:create')}
            </Button>
          </Modal.Actions>
        </Modal>
      ]
    );
  }
}

const mapStateToProps = (state) => {
  return {
    leftmenu: state.leftmenu,
    home: state.home,
    search: state.search,
    editor: state.editor,
    borehole: state.core_borehole,
    boreholes: state.core_borehole_editor_list,
    setting: state.setting,
    user: state.core_user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    boreholeSelected: (borehole) => {
      dispatch({
        path: '/borehole',
        type: 'CLEAR'
      });
      dispatch({
        type: 'EDITOR_BOREHOLE_SELECTED',
        selected: borehole
      });
    },
    refresh: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_REFRESH'
      });
    },
    reset: () => {
      dispatch({
        type: 'SEARCH_EDITOR_FILTER_RESET'
      });
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    translate(['home', 'common', 'borehole_form', 'editor'])(MenuEditorSearch)
  )
);
