export const LOAD_POST = 'LOAD_POST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAIL = 'LOAD_POST_FAIL';
export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAIL = 'LOAD_COMMENTS_FAIL';

export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAIL = 'DELETE_POST_FAIL';

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
