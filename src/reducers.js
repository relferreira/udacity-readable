import { combineReducers } from 'redux';
import home from './home/reducer';
import post from './post/reducer';

export default combineReducers({ home, post });
