import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import _ from 'lodash'

import BoreholeForm from '../../commons/form/borehole/boreholeForm'
import ProjectTable from '../../commons/table/projectTable'
import BoreholeTable from '../../commons/table/boreholeTable'

import LabelReset from '../../commons/form/labelReset'

import {
  Header,
  Form,
  Input,
  // Button,
  // Segment,
  Divider
} from 'semantic-ui-react'

class EditorComponent extends React.Component {
  render() {
    const {
      t, pcnt, bcnt
    } = this.props
    return (
      <div style={{
        flex: '1 1 0%',
        display: 'flex',
        flexDirection: 'row'
      }}>
        <div style={{
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flex: 0.3,
          flexDirection: 'column',
          // maxWidth: '400px',
          padding: '1em'
        }}>
          <div>
            <Header>
              {t('title')} ({pcnt})
            </Header>
            <Form
              error
              autoComplete="off">
              <Form.Group widths='equal'>
                <Form.Input fluid
                  placeholder={t('create_new')}/>
                <Form.Button
                  fluid
                  disabled
                  content={t('create')}
                  primary/>
              </Form.Group>
              <Divider/>
              <Form.Field>
                <Input
                  icon='search'
                  iconPosition='left'
                  placeholder={t('search')}
                  onChange={(e)=>{
                    console.log('change')
                  }}
                  // value={this.state.borehole.extended.original_name}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"/>
                <LabelReset onClick={()=>{
                  console.log('reset')
                }}/>
              </Form.Field>
            </Form>
          </div>
          <ProjectTable
            activeItem={
              !_.isNil(this.props.store.pselected)?
                this.props.store.pselected.id: null
            }
            onSelected={(project)=>{
              this.props.projectSelected(project)
            }}/>
        </div>
        {
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
            <div>
              <Header>
                {t('title2')} ({bcnt})
              </Header>
              <Form
                error
                autoComplete="off">
                <Form.Group widths='equal'>
                  <Form.Input fluid
                    placeholder={t('create_new')}/>
                  <Form.Button
                    fluid
                    disabled
                    content={t('create')}
                    primary/>
                </Form.Group>
                <Divider/>
                <Form.Field>
                  <Input
                    icon='search'
                    iconPosition='left'
                    placeholder={t('search')}
                    onChange={(e)=>{
                      console.log('change')
                    }}
                    // value={this.state.borehole.extended.original_name}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"/>
                  <LabelReset onClick={()=>{
                    console.log('reset')
                  }}/>
                </Form.Field>
              </Form>
            </div>
            <BoreholeTable
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
        }
        {
          _.isNil(this.props.store.bselected)?
            <div style={{
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flex: 1,
              flexDirection: 'column'
            }}>
              <div style={{margin: 'auto'}}>
              {
                _.isNil(this.props.store.pselected)?
                null: 'Create a new borehole or modify an existing one'
              }
              </div>
            </div>:
            <div style={{
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flex: 1,
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
