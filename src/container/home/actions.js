export const LIST_CATEGORIES = 'LIST_CATEGORIES';
export const LIST_CATEGORIES_SUCCESS = 'LIST_CATEGORIES_SUCCESS';
export const LIST_CATEGORIES_FAIL = 'LIST_CATEGORIES_FAIL';

export const LIST_POSTS = 'LIST_POSTS';
export const LIST_POSTS_SUCCESS = 'LIST_POSTS_SUCCESS';
export const LIST_POSTS_FAIL = 'LIST_POSTS_FAIL';

export const LIST_CATEGORY_POSTS = 'LIST_CATEGORY_POSTS';
export const LIST_CATEGORY_POSTS_SUCCESS = 'LIST_CATEGORY_POSTS_SUCCESS';
export const LIST_CATEGORY_POSTS_FAIL = 'LIST_CATEGORY_POSTS_FAIL';

export function listCategories() {
  return {
    type: LIST_CATEGORIES,
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

export function listCategoryPosts(category) {
  return {
    type: LIST_CATEGORY_POSTS,
    payload: {
      request: {
        url: `/${category}/posts`
      }
    }
  };
}
