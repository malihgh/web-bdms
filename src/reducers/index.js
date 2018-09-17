import home from '../pages/home/homeState'
import editor from '../pages/editor/editorState'
import leftmenu from './leftmenu'
import detail_borehole from '../commons/detail/detailsState'
import search from '../commons/search/searchState'
import searchEditor from '../commons/search/editor/searchEditorState'
// import test from './test'

export const appReducers = {
  leftmenu,
  home,
  detail_borehole,
  search,
  searchEditor,
  editor
  // test
}
