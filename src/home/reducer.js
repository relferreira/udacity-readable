import { LOAD, LOAD_SUCCESS, LOAD_FAIL } from './actions';

const initialState = {
  categories: [],
  loading: false,
  error: false
};

export default function home(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return { ...state, loading: true, categories: [] };
    case LOAD_SUCCESS:
      return { ...state, categories: action.payload.data.categories };
    case LOAD_FAIL:
      return { ...state, error: 'TODO' };
    default:
      return state;
  }
}
