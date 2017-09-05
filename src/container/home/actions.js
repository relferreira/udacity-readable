export const LIST_CATEGORIES = 'LOAD';
export const LIST_CATEGORIES_SUCCESS = 'LOAD_SUCCESS';
export const LIST_CATEGORIES_FAIL = 'LOAD_FAIL';
export const LIST_POSTS = 'LIST_POSTS';
export const LIST_POSTS_SUCCESS = 'LIST_POSTS_SUCCESS';
export const LIST_POSTS_FAIL = 'LIST_POSTS_FAIL';

export function listCategories() {
  return {
    type: 'LOAD',
    payload: {
      request: {
        url: '/categories'
      }
    }
  };
}

export function listPosts() {
  return {
    type: LIST_POSTS,
    payload: {
      request: {
        url: '/posts'
      }
    }
  };
}
