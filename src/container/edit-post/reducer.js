import * as actionsValues from './actions';

const initialState = {
  loading: false,
  error: false
};

export default function editPost(state = initialState, action) {
  switch (action.type) {
    case actionsValues.CREATE_POST:
      return { ...state, loading: true };
    case actionsValues.CREATE_POST_SUCCESS:
    case actionsValues.EDIT_POST_SUCCESS:
      return { ...state, loading: false };
    case actionsValues.CREATE_POST_FAIL:
    case actionsValues.EDIT_POST_FAIL:
      return { ...state, loading: false, error: 'TODO' };
    default:
      return state;
  }
}
