export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAIL = 'CREATE_POST_FAIL';

export const EDIT_POST = 'CREATE_POST';
export const EDIT_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const EDIT_POST_FAIL = 'CREATE_POST_FAIL';

export function createPost(post) {
  return {
    type: CREATE_POST,
    payload: {
      request: {
        url: '/posts',
        method: 'post',
        data: { ...post }
      }
    }
  };
}

export function updatePost(id, title, body) {
  return {
    type: CREATE_POST,
    payload: {
      request: {
        url: `/posts/${id}`,
        method: 'put',
        data: { title, body }
      }
    }
  };
}
