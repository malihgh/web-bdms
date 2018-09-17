import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import _ from 'lodash'

import BoreholeForm from '../../commons/form/borehole/boreholeForm'
// import ProjectTable from '../../commons/table/projectTable'
import BoreholeEditorTable from '../../commons/table/boreholeEditorTable'
import MenuEditor from '../../commons/menu/editor/menuEditor'
import MenuContainer from '../../commons/menu/menuContainer'

// import {
//   createBorehole
// } from '@ist-supsi/bmsjs'

import {
  Header,
  // Icon,
  // Button,
  // Divider
} from 'semantic-ui-react'

class EditorComponent extends React.Component {
  render() {
    // const {
    //   t, pcnt, bcnt
    // } = this.props
    return (
      <div style={{
        flex: '1 1 0%',
        display: 'flex',
        height: '100%',
        flexDirection: 'row'
      }}>
        {
          false? null:
          <div style={{
            flex: '0 0 300px',
            boxShadow: '2px 0px 5px 0px rgba(0,0,0,0.75)',
            marginRight: '10px'
          }}>
            <MenuContainer>
              <MenuEditor/>
            </MenuContainer>
          </div>
        }
        {/*
        <div style={{
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flex: 0.3,
          flexDirection: 'column',
          // maxWidth: '400px',
          padding: '1em'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '1em'
          }}>
            <div style={{
              flex: '1 1 0%'
            }}>
              <Header style={{margin: 'auto'}}>
                {t('title')} ({pcnt})
              </Header>
            </div>
            <div>
              <Button basic  size='mini'
                onClick={(e) => {
                  // createLayer(
                  //   this.state.stratigraphy_id
                  // ).then(
                  //   function(response) {
                  //     if(response.data.success){
                  //       let layer_id = response.data.id
                  //       getLayers(
                  //         this.state.stratigraphy_id
                  //       ).then(function(response) {
                  //         if(response.data.success){
                  //           this.setState({
                  //             layers: response.data.data,
                  //             layer: layer_id
                  //           })
                  //         }
                  //       }.bind(this)).catch(function (error) {
                  //         console.log(error)
                  //       })
                  //     }
                  //   }.bind(this)
                  // ).catch(function (error) {
                  //   console.log(error)
                  // })
                }}>
                <Icon name='add' />
                Add project
              </Button>
            </div>
          </div>
          <Divider/>
          <ProjectTable
            activeItem={
              !_.isNil(this.props.store.pselected)?
                this.props.store.pselected.id: null
            }
            onSelected={(project)=>{
              this.props.projectSelected(project)
            }}/>
        </div>
        */}
        <div style={{
          flex: '1 1 0%',
          display: 'flex',
          flexDirection: 'row'
        }}>
          {
            _.isNil(this.props.store.bselected)?
              <div style={{
                flex: '1 1.5 100%',
                padding: "1em",
                // boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 8px 0px inset',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <BoreholeEditorTable
                  activeItem={
                    !_.isNil(this.props.store.bselected)?
                      this.props.store.bselected.id: null
                  }
                  filter={{
                    project: !_.isNil(this.props.store.pselected)?
                      this.props.store.pselected.id: undefined
                  }}
                  onSelected={(borehole)=>{
                    this.props.boreholeSelected(borehole)
                  }}
                />
              </div>:
              <div style={{
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flex: '1 1 100%',
                flexDirection: 'column',
                padding: '1em'
              }}>
                <Header>
                  Borehole editor
                </Header>
                <BoreholeForm
                  id={
                    !_.isNil(this.props.store.bselected)?
                      this.props.store.bselected.id: undefined
                  }/>
              </div>
          }
          {/*
            _.isNil(this.props.store.pselected)?
            <div style={{
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flex: 0.3,
              flexDirection: 'column'
            }}>
              <div style={{margin: 'auto'}}>
                Please select a project first
              </div>
            </div>:
            <div style={{
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flex: 0.3,
                flexDirection: 'column',
                padding: '1em'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: '1em'
                }}>
                  <div style={{
                    flex: '1 1 0%'
                  }}>
                    <Header style={{margin: 'auto'}}>
                      {t('title2')} ({bcnt})
                    </Header>
                  </div>
                  <div>
                    <Button basic size='mini'
                      onClick={(e) => {
                        createBorehole(
                          this.props.store.pselected.id
                        ).then(
                          function(response) {
                            if(response.data.success){
                              this.props.boreholeSelected({
                                id: response.data.id
                              })
                            }
                          }.bind(this)
                        ).catch(function (error) {
                          console.log(error)
                        })
                      }}>
                      <Icon name='add' />
                      Add borehole
                    </Button>
                  </div>
                </div>
              <BoreholeEditorTable
                activeItem={
                  !_.isNil(this.props.store.bselected)?
                    this.props.store.bselected.id: null
                }
                filter={{
                  project: !_.isNil(this.props.store.pselected)?
                    this.props.store.pselected.id: undefined
                }}
                onSelected={(borehole)=>{
                  this.props.boreholeSelected(borehole)
                }}
              />
            </div>
          */}
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pcnt: state.core_project_list.dlen,
    bcnt: state.core_borehole_list.dlen,
    scnt: state.core_stratigraphy_list.dlen,
    store: state.editor
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    projectSelected: (project) => {
      dispatch({
        type: 'EDITOR_PROJECT_SELECTED',
        selected: project
      })
    },
    boreholeSelected: (borehole) => {
      dispatch({
        type: 'EDITOR_BOREHOLE_SELECTED',
        selected: borehole
      })
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(translate('editor')(EditorComponent))
