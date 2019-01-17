import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { translate } from 'react-i18next'
import {
    withRouter
} from 'react-router-dom'

import {
  Icon,
  List,
  Header,
  Button,
  Segment,
  Table
} from 'semantic-ui-react'

import {
  createBorehole,
  getBorehole,
  deleteBorehole
} from '@ist-supsi/bmsjs'

import DateText from '../../form/dateText';
import DomainText from '../../form/domain/domainText'
import SearchEditorComponent from '../../search/editor/searchEditorComponent'

class MenuEditor extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      creating: false,
      delete: false
    }
  }

  render() {
    const {
      t, boreholeSelected, borehole
    } = this.props
    return(
      !_.isNil(this.props.editor.bselected)?
        <div style={{
          padding: '1em'
        }}>
          <Button fluid icon primary
            onClick={e=>{
              this.setState({
                delete: false
              }, ()=>boreholeSelected(null))
            }}
          >
            <Icon name='caret left' />
            {t('back_to_list')}
          </Button>
          <br/>
          <Segment>
            <Header>
              {this.props.editor.bselected.original_name}
            </Header>
            <div style={{
                marginTop: '0.5em'  
              }}>
              <span
                style={{
                  color: '#787878',
                  fontSize: '0.8em'
                }}>
                {t('common:creator')}
              </span>
              <br/>
              {this.props.editor.bselected.author.username}
            </div>
            <div style={{
                marginTop: '0.5em'  
              }}>
              <span
                style={{
                  color: '#787878',
                  fontSize: '0.8em'
                }}>
                {t('common:creation_date')}
              </span>
              <br/>
              {
                this.props.editor.bselected.author.date === null?
                '-': <DateText
                  date={this.props.editor.bselected.author.date}
                  hours={true}
                />
              }
            </div>
            <div style={{
                marginTop: '0.5em'  
              }}>
              <span
                style={{
                  color: '#787878',
                  fontSize: '0.8em'
                }}>
                {t('borehole_form:meta_stratigraphy')}
              </span>
              {
                _.isArray(this.props.editor.bselected.stratigraphy)?
                  <Table fixed compact='very' basic='very'>
                    <Table.Body>
                      {
                        this.props.editor.bselected.stratigraphy.map(
                          (stratigraphy, idx) => (
                            <Table.Row key={'bms-medtr-'+idx}>
                              <Table.Cell>
                                <DomainText
                                  schema='layer_kind'
                                  id={stratigraphy.kind}
                                />
                              </Table.Cell>
                              <Table.Cell textAlign='right'>
                                {stratigraphy.layers} layers
                              </Table.Cell>
                            </Table.Row>
                          )
                        )
                      }
                    </Table.Body>
                  </Table>: null
              }
            </div>
          </Segment>
          <br/>
          <Button
            color={this.state.delete === true? 'red': null}
            fluid
            icon 
            onClick={e=>{
              if(this.state.delete === false){
                this.setState({
                  delete: true
                })
              } else {
                this.setState({
                  delete: false
                }, ()=>{
                  deleteBorehole(borehole.data.id).then(
                    function(response) {
                      boreholeSelected(null);
                    }
                  );
                })
              }
            }}>
            {
              this.state.delete === true?
                null:
                <Icon name='trash alternate' />
            }
            
            {
              this.state.delete === true?
                t('common:sure'):
                t('common:delete')
            }
          </Button>
        </div>:
        !_.isNil(this.props.editor.mselected)?
          <div
            style={{
              height: '100%',
              display: 'flex',
              padding: '1em',
              overflowY: 'auto'
            }}>
            <div
              style={{
                width: '100%'
              }}
            >
              <Button fluid icon primary
                onClick={e=>{
                  console.log("back")
                }}
              >
                Cancel
              </Button>
            </div>
          </div>:
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
            <List
              divided
              verticalAlign='middle'
              selection
            >
              <List.Item
                style={{
                  padding: '1em'
                }}>
                <List.Content
                  onClick={(e) => {
                    const self = this
                    this.setState({
                      creating: true
                    }, () => {
                      createBorehole().then(
                        function(response) {
                          if(response.data.success){
                            getBorehole(response.data.id).then(
                              function(response) {
                                if(response.data.success){
                                  boreholeSelected(response.data.data)
                                }
                                self.setState({
                                  creating: false
                                })
                              }
                            )
                          }
                        }//.bind(this)
                      ).catch(function (error) {
                        console.log(error)
                      })
                    })
                  }}
                >
                  {
                    this.state.creating === true?
                    <Icon name='spinner' loading/>:
                    <Icon name='add' />
                  }
                  Create a new borehole
                </List.Content>
              </List.Item>
            </List>
            <div
              style={{
                margin: '1em'
              }}>
              <Header size='medium' color='blue'>
                Boreholes (drafts)
              </Header>
              <SearchEditorComponent
                onChange={(filter)=>{
                  //console.log(filter)
                }}/>
            </div>
          </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    leftmenu: state.leftmenu,
    home: state.home,
    search: state.search,
    editor: state.editor,
    borehole: state.core_borehole
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    boreholeSelected: (borehole) => {
      dispatch({
        path: '/borehole',
        type: 'CLEAR'
      })
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
)(translate(['home','common', 'borehole_form'])(withRouter(MenuEditor)))