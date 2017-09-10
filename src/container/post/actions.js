export const LOAD_POST = 'LOAD_POST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAIL = 'LOAD_POST_FAIL';
export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAIL = 'LOAD_COMMENTS_FAIL';

export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAIL = 'DELETE_POST_FAIL';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAIL = 'CREATE_COMMENT_FAIL';

export const EDIT_COMMENT = 'EDIT_COMMENT';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAIL = 'EDIT_COMMENT_FAIL';

export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAIL = 'DELETE_COMMENT_FAIL';

export const VOTE_POST = 'VOTE_POST';
export const VOTE_POST_SUCCESS = 'VOTE_POST_SUCCESS';
export const VOTE_POST_FAIL = 'VOTE_POST_FAIL';

export const VOTE_COMMENT = 'VOTE_COMMENT';
export const VOTE_COMMENT_SUCCESS = 'VOTE_COMMENT_SUCCESS';
export const VOTE_COMMENT_FAIL = 'VOTE_COMMENT_FAIL';

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

export function deletePost(id) {
  return {
    type: DELETE_POST,
    payload: {
      request: {
        url: `/posts/${id}`,
        method: 'delete'
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

export function createComment(comment) {
  return {
    type: CREATE_COMMENT,
    payload: {
      request: {
        url: '/comments',
        method: 'post',
        data: comment
      }
    }
  };
}

export function editComment(id, timestamp, body) {
  return {
    type: EDIT_COMMENT,
    payload: {
      request: {
        url: `/comments/${id}`,
        method: 'put',
        data: { timestamp, body }
      }
    }
  };
}

export function deleteComment(id) {
  return {
    type: DELETE_COMMENT,
    payload: {
      request: {
        url: `/comments/${id}`,
        method: 'delete'
      }
    }
  };
}

export function votePost(id, option) {
  return {
    type: VOTE_POST,
    option,
    payload: {
      request: {
        url: `/posts/${id}`,
        method: 'post',
        data: { option }
      }
    }
  };
}

export function voteComment(id, option) {
  return {
    type: VOTE_COMMENT,
    id,
    option,
    payload: {
      request: {
        url: `/comments/${id}`,
        method: 'post',
        data: { option }
      }
    }
  };
}
