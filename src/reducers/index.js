import { combineReducers } from 'redux';

const initialState = {
  categories: []
};

function test(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_SUCCESS':
      return { ...state, categories: action.payload.data.categories };
    default:
      return state;
  }
}

export function testRequest() {
  return {
    type: 'LOAD',
    payload: {
      request: {
        url: '/categories'
      }
    }
  };
}

export default combineReducers({ test });
