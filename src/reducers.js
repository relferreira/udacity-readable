import { combineReducers } from 'redux';
import home from './container/home/reducer';
import post from './container/post/reducer';
import editPost from './container/edit-post/reducer';

export default combineReducers({ home, post, editPost });
