import { vote, unVote } from '../../util/vote-score';
import * as actionValues from './actions';
import {
  VOTE_POST,
  VOTE_POST_FAIL,
  DELETE_POST,
  DELETE_POST_FAIL
} from '../post/actions';

const initialState = {
  categories: [],
  posts: [],
  loadingCategories: false,
  error: false,
  deletedPostSnapshot: null
};

export default function home(state = initialState, action) {
  switch (action.type) {
    case actionValues.LIST_POSTS:
      return { ...state, loading: true, posts: [] };
    case actionValues.LIST_POSTS_SUCCESS:
      return { ...state, loading: false, posts: action.payload.data };
    case actionValues.LIST_POSTS_FAIL:
      return { ...state, loading: false, error: 'error listing posts' };
    case actionValues.LIST_CATEGORIES:
      return { ...state, loadingCategories: true, categories: [] };
    case actionValues.LIST_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload.data.categories };
    case actionValues.LIST_CATEGORIES_FAIL:
      return { ...state, error: 'Error listing categories' };
    case VOTE_POST:
      let selectedIndex = state.posts.findIndex(post => post.id === action.id);
      return {
        ...state,
        posts: state.posts.map(
          (post, index) =>
            index === selectedIndex
              ? { ...post, voteScore: vote(action.option, post) }
              : post
        )
      };
    case VOTE_POST_FAIL:
      let selectedIndexFail = state.posts.findIndex(
        post => post.id === action.id
      );
      return {
        ...state,
        posts: state.posts.map(
          (post, index) =>
            index === selectedIndexFail
              ? { ...post, voteScore: unVote(action.option, post) }
              : post
        )
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.id),
        deletedPostSnapshot: state.posts.find(post => post.id === action.id)
      };
    case DELETE_POST_FAIL:
      return {
        ...state,
        posts: state.posts.concat(state.deletedPostSnapshot),
        deletedPostSnapshot: null,
        error: 'Error deleting post'
      };
    default:
      return state;
  }
}
