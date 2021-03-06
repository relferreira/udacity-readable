import { vote, unVote } from '../../util/vote-score';
import * as actionValues from './actions';

const initialState = {
  post: {},
  comments: [],
  loading: false,
  loadingComments: false,
  error: false,
  errorComments: false,
  commentSnapshot: null
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
    case actionValues.CREATE_COMMENT:
      return {
        ...state,
        comments: state.comments.concat(action.comment),
        post: { ...state.post, comments: state.post.comments + 1 },
        commentSnapshot: action.comment
      };
    case actionValues.CREATE_COMMENT_FAIL:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== state.commentSnapshot.id
        ),
        post: { ...state.post, comments: state.post.comments - 1 },
        commentSnapshot: null,
        error: 'Error creating comment'
      };
    case actionValues.EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map(
          comment =>
            comment.id === action.id
              ? { ...comment, timestamp: action.timestamp, body: action.body }
              : comment
        ),
        commentSnapshot: state.comments.find(
          comment => comment.id === action.id
        )
      };
    case actionValues.EDIT_COMMENT_FAIL:
      return {
        ...state,
        comments: state.comments.map(
          comment =>
            comment.id === state.commentSnapshot.id
              ? state.commentSnapshot
              : comment
        ),
        commentSnapshot: null,
        error: 'Error updating comment'
      };
    case actionValues.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.id),
        post: { ...state.post, comments: state.post.comments - 1 },
        commentSnapshot: state.comments.find(
          comment => comment.id === action.id
        )
      };
    case actionValues.DELETE_COMMENT_FAIL:
      return {
        ...state,
        comments: state.comments.concat(state.commentSnapshot),
        post: { ...state.post, comments: state.post.comments + 1 },
        commentSnapshot: null,
        error: 'Error removing comment'
      };
    default:
      return state;
  }
}
