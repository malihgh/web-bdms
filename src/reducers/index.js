import dataLoaderState from '../pages/settings/dataLoaderState';
import home from '../pages/home/homeState';
import checkout from '../pages/checkout/checkoutState';
import editor from '../pages/editor/editorState';
import leftmenu from './leftmenu';
import detail_borehole from '../commons/detail/detailsState';
import search from '../commons/search/searchState';
import searchEditor from '../commons/search/editor/searchEditorState';
import setting from '../pages/settings/settingState';
import wmts from '../commons/map/mapState';

export const appReducers = {
  dataLoaderState,
  leftmenu,
  home,
  checkout,
  detail_borehole,
  search,
  searchEditor,
  editor,
  setting,
  wmts
};
