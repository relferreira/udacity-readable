import {
  LIST_CATEGORIES,
  LIST_CATEGORIES_SUCCESS,
  LIST_CATEGORIES_FAIL,
  LIST_POSTS,
  LIST_POSTS_SUCCESS,
  LIST_POSTS_FAIL
} from './actions';

const initialState = {
  categories: [],
  posts: [],
  loadingCategories: false,
  error: false
};

export default function home(state = initialState, action) {
  switch (action.type) {
    case LIST_POSTS:
      return { ...state, loading: true, posts: [] };
    case LIST_POSTS_SUCCESS:
      return { ...state, loading: false, posts: action.payload.data };
    case LIST_POSTS_FAIL:
      return { ...state, loading: false, error: 'TODO' };
    case LIST_CATEGORIES:
      return { ...state, loadingCategories: true, categories: [] };
    case LIST_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload.data.categories };
    case LIST_CATEGORIES_FAIL:
      return { ...state, error: 'TODO' };
    default:
      return state;
  }
}
