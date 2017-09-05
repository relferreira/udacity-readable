import {
  LOAD_POST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAIL,
  LOAD_COMMENTS,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAIL
} from './actions';

const initialState = {
  post: {},
  comments: [],
  loading: false,
  loadingComments: false,
  error: false,
  errorComments: false
};

export default function post(state = initialState, action) {
  switch (action.type) {
    case LOAD_POST:
      return { ...state, loading: true, post: {} };
    case LOAD_POST_SUCCESS:
      return { ...state, loading: false, post: action.payload.data };
    case LOAD_POST_FAIL:
      return { ...state, loading: false, error: 'TODO' };
    case LOAD_COMMENTS:
      return { ...state, loadingComments: true, comments: [] };
    case LOAD_COMMENTS_SUCCESS:
      return {
        ...state,
        loadingComments: false,
        comments: action.payload.data
      };
    case LOAD_COMMENTS_FAIL:
      return { ...state, loadingComments: false, errorComments: 'TODO' };
    default:
      return state;
  }
}

export function loadPostInfo(id) {
  return {
    type: LOAD_POST,
    payload: {
      request: {
        url: `/posts/${id}`
      }
    }
  };
}

export function loadComments(id) {
  return {
    type: LOAD_COMMENTS,
    payload: {
      request: {
        url: `/posts/${id}/comments`
      }
    }
  };
}
