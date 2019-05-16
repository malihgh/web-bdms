import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { translate } from 'react-i18next'
import {
    withRouter
} from 'react-router-dom'

import {
  Header,
  Icon,
  Menu,
} from 'semantic-ui-react'

import {
  createBorehole
} from '@ist-supsi/bmsjs'

import SearchEditorComponent from '../../search/editor/searchEditorComponent'

class MenuEditorSearch extends React.Component {
  
  constructor(props) {
    super(props);
    // this.cntMenu = React.createRef();
    // this.menu = React.createRef();
    this.updateDimensions = this.updateDimensions.bind(this);
    this.state = {
      creating: false,
      delete: false,
      scroller: false
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions(){
    if(!_.isNil(this.menu) && this.menu.children.length>0){
      const height = this.menu.clientHeight;
      const children_height = this.menu.children[0].clientHeight;
      this.setState({
        scroller: children_height>height
      });
    }else{
      this.setState({
        scroller: true
      });
    }
  }

  render() {
    const {
      history, boreholes, t
    } = this.props
    return(
      [
        // <div
        //   key='sb-em-1'
        //   style={{
        //     padding: '1em'
        //   }}>
        //   <Header size='medium'>
        //     Boreholes (drafts)
        //   </Header>
        // </div>,
        <div
          key='sb-em-1'
          style={{
            color: '#767676',
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
                boreholes.dlen > 1 || boreholes.dlen === 0?
                  t("common:results"): t("common:result")
              )
          }
        </div>,
        <div
          className={
            this.state.scroller === true?
              'scroller': null
          }
          ref={ divElement => this.menu = divElement}
          key='sb-em-2'
          style={{
            padding: '1em',
            flex: '1 1 100%',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'hidden',
            marginRight: this.state.scroller === true?
              this.props.setting.scrollbar: '0px'
          }}>
          <SearchEditorComponent
            onChange={(filter)=>{
              //console.log(filter)
            }}/>
        </div>,
        <Menu
          icon='labeled'
          size='mini'
          key='sb-em-3'
          style={{
            margin: '0px'
          }}
        >
          <Menu.Item
            onClick={()=>{
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
            onClick={()=>{
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
            onClick={()=>{
              const self = this
              this.setState({
                creating: true
              }, () => {
                createBorehole().then(
                  function(response) {
                    if(response.data.success){
                      self.setState({
                        creating: false
                      }, ()=>{
                        history.push(
                          process.env.PUBLIC_URL
                          + "/editor/"
                          + response.data.id
                        )
                      });
                      // getBorehole(response.data.id).then(
                      //   function(response) {
                      //     if(response.data.success){
                      //       boreholeSelected(response.data.data)
                      //     }
                      //     self.setState({
                      //       creating: false
                      //     })
                      //   }
                      // )
                    }
                  }//.bind(this)
                ).catch(function (error) {
                  console.log(error)
                })
              })
            }}
            style={{
              flex: 1
            }}
          >
            <Icon name='add' />
            New
          </Menu.Item>
        </Menu>
      ]
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    leftmenu: state.leftmenu,
    home: state.home,
    search: state.search,
    editor: state.editor,
    borehole: state.core_borehole,
    boreholes: state.core_borehole_editor_list,
    setting: state.setting
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
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
  }
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    translate(['home','common', 'borehole_form'])(MenuEditorSearch)
  )
);