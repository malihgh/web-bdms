import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import _ from 'lodash';

import BoreholeForm from '../../commons/form/borehole/boreholeForm';
import BoreholeEditorTable from '../../commons/table/boreholeEditorTable';
import MenuEditor from '../../commons/menu/editor/menuEditor';
import MenuContainer from '../../commons/menu/menuContainer';


class EditorComponent extends React.Component {
  render() {
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
                  /*filter={{
                    project: !_.isNil(this.props.store.pselected)?
                      this.props.store.pselected.id: undefined
                  }}*/
                  filter={{
                    ...this.props.search.filter
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
                <BoreholeForm
                  id={
                    !_.isNil(this.props.store.bselected)?
                      this.props.store.bselected.id: undefined
                  }/>
              </div>
          }
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
    store: state.editor,
    search: state.searchEditor
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    projectSelected: (project) => {
      dispatch({
        type: 'EDITOR_PROJECT_SELECTED',
        selected: project
      });
    },
    boreholeSelected: (borehole) => {
      dispatch({
        type: 'EDITOR_BOREHOLE_SELECTED',
        selected: borehole
      });
    }
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(translate('editor')(EditorComponent));