import React from 'react'
import { connect } from 'react-redux'
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
  getBorehole
} from '@ist-supsi/bmsjs'

import DateText from '../../form/dateText';
import SearchEditorComponent from '../../search/editor/searchEditorComponent'

class MenuEditor extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      creating: false
    }
  }

  render() {
    const {
      t, boreholeSelected
    } = this.props
    return(
      this.props.editor.bselected?
      <div style={{
        padding: '1em'
      }}>
        <Button fluid icon primary
          onClick={e=>boreholeSelected(null)}>
          <Icon name='caret left' />
          {t('back_to_list')}
        </Button>
        <br/>
        <Button fluid icon positive>
          <Icon name='share' />
          Publish
        </Button>
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
            <Table fixed compact='very' basic='very'>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    Original
                  </Table.Cell>
                  <Table.Cell textAlign='right'>
                    13 layers
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    Interpretation 1
                  </Table.Cell>
                  <Table.Cell textAlign='right'>
                    10 layers
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    Interpretation 2
                  </Table.Cell>
                  <Table.Cell textAlign='right'>
                    n/p
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    Interpretation 3
                  </Table.Cell>
                  <Table.Cell textAlign='right'>
                    n/p
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </Segment>
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
                    }.bind(this)
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
    editor: state.editor
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
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
)(translate(['home','common', 'borehole_form'])(withRouter(MenuEditor)))