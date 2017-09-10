import { checkFormErrors } from './EditPost.js';

describe('Form validation', () => {
  it('should not submit post without title', () => {
    expect(checkFormErrors('', 'body', 'category')).toEqual(true);
  });

  it('should not submit post without body', () => {
    expect(checkFormErrors('title', '', 'category')).toEqual(true);
  });

  it('should not submit post without category', () => {
    expect(checkFormErrors('title', 'body', '')).toEqual(true);
  });
});
