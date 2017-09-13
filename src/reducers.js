import { combineReducers } from 'redux';
import { snackbarReducer } from 'react-redux-snackbar';

import home from './container/home/reducer';
import post from './container/post/reducer';
import editPost from './container/edit-post/reducer';

export default combineReducers({
  home,
  post,
  editPost,
  snackbar: snackbarReducer
});
