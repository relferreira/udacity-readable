import { vote, unVote } from '../../util/vote-score';
import * as actionValues from './actions';

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
    case actionValues.LOAD_POST:
      return { ...state, loading: true, post: {} };
    case actionValues.LOAD_POST_SUCCESS:
      return { ...state, loading: false, post: action.payload.data };
    case actionValues.LOAD_POST_FAIL:
      return { ...state, loading: false, error: 'TODO' };
    case actionValues.LOAD_COMMENTS:
      return { ...state, loadingComments: true, comments: [] };
    case actionValues.LOAD_COMMENTS_SUCCESS:
      return {
        ...state,
        loadingComments: false,
        comments: action.payload.data
      };
    case actionValues.LOAD_COMMENTS_FAIL:
      return { ...state, loadingComments: false, errorComments: 'TODO' };
    case actionValues.VOTE_POST:
      return {
        ...state,
        post: {
          ...state.post,
          voteScore:
            action.option === 'upVote'
              ? state.post.voteScore + 1
              : state.post.voteScore - 1
        }
      };
    case actionValues.VOTE_POST_FAIL:
      return {
        ...state,
        post: {
          ...state.post,
          voteScore:
            action.option === 'upVote'
              ? state.post.voteScore - 1
              : state.post.voteScore + 1
        }
      };
    case actionValues.VOTE_COMMENT:
      let selectedIndex = state.comments.findIndex(
        comment => comment.id === action.id
      );
      return {
        ...state,
        comments: state.comments.map(
          (comment, index) =>
            index === selectedIndex
              ? { ...comment, voteScore: vote(action.option, comment) }
              : comment
        )
      };
    case actionValues.VOTE_COMMENT_FAIL:
      let selectedIndexFail = state.comments.findIndex(
        comment => comment.id === action.id
      );
      return {
        ...state,
        comments: state.comments.map(
          (comment, index) =>
            index === selectedIndexFail
              ? { ...comment, voteScore: unVote(action.option, comment) }
              : comment
        )
      };
    default:
      return state;
  }
}
