export const LOAD = 'LOAD';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const LOAD_FAIL = 'LOAD_FAIL';

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
