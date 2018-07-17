import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import {
  Accordion,
  Icon,
  Button
} from 'semantic-ui-react'

import {
  setIndex,
  boreholeSeleced
} from './actions'

import SearchComponent from '../../commons/search/searchComponent'
import BoreholeGridComponent from '../../commons/grid/boreholeGridComponent'
import DetailsContainer from '../../commons/detail/detailsContainer'
import MapComponent from '../../commons/map/mapComponent'

class HomeComponent extends React.Component {
    render() {
      const {
        t,
        leftmenu,
        home,
        search
      } = this.props
      return (
        <div style={{
          flex: '1 1 0%',
          display: 'flex',
          flexDirection: 'row'
        }}>
          <div style={{
            width: '300px',
            padding: "1em",
            // boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.5)'
          }}>
            <Accordion>
              <Accordion.Title
                  active={leftmenu.index === 0}
                  index={0}
                  onClick={this.props.setIndex}>
                <Icon name='dropdown' />
                <span style={{
                  fontSize: leftmenu.index === 0? '1.2em': null,
                  fontWeight: leftmenu.index === 0? 'bold': null
                }}>{t('legend')}</span>
              </Accordion.Title>
              <Accordion.Content active={leftmenu.index === 0}>
                Foo
              </Accordion.Content>
              <Accordion.Title
                  active={leftmenu.index === 1}
                  index={1}
                  onClick={this.props.setIndex}>
                <Icon name='dropdown' />
                <span style={{
                  fontSize: leftmenu.index === 1? '1.2em': null,
                  fontWeight: leftmenu.index === 1? 'bold': null
                }}>{t('attribute_filter')}</span>
              </Accordion.Title>
              <Accordion.Content active={leftmenu.index === 1}>
                <SearchComponent
                  onChange={(filter)=>{
                    //console.log(filter)
                  }}/>
              </Accordion.Content>
              <Accordion.Title
                  active={leftmenu.index === 2}
                  index={2}
                  onClick={this.props.setIndex}>
                <Icon name='dropdown' />
                <span style={{
                  fontSize: leftmenu.index === 2? '1.2em': null,
                  fontWeight: leftmenu.index === 2? 'bold': null
                }}>{t('spatial_filter')}</span>
              </Accordion.Title>
              <Accordion.Content active={leftmenu.index === 2}>
                Bar
              </Accordion.Content>
            </Accordion>
          </div>
          <div style={{
            flex: '1 1 0%',
            display: 'flex',
            flexDirection: 'row'
          }}>
            <div style={{
              flex: '1 1 100%',
              padding: "1em",
              // boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 8px 0px inset',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {
                home.selected?
                <div>
                  <Button basic icon
                    onClick={e=>this.props.boreholeSeleced(null)}>
                    <Icon name='caret left' />
                    {t('back_to_list')}
                  </Button>
                  <DetailsContainer
                    id={home.selected.id}/>
                </div>:
                <BoreholeGridComponent
                  onSelected={(borehole)=>{
                    this.props.boreholeSeleced(borehole)
                  }}
                  filter={{
                    ...search.filter
                  }}
                />
              }
            </div>
            <div style={{
              flex: '1 1 100%',
              // padding: "1em",
              display: 'flex',
              flexDirection: 'column'
            }}>
              <MapComponent/>
            </div>
          </div>
      </div>
      )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    leftmenu: state.leftmenu,
    home: state.home,
    search: state.search
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    setIndex: (e, titleProps) => {
      const { index } = titleProps
      dispatch(setIndex(index))
    },
    boreholeSeleced: (borehole) => {
      dispatch(boreholeSeleced(borehole))
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(translate('home')(HomeComponent))
