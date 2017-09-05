import { extractCategoryFromUrl } from './Home.js';

describe('Url extraction', () => {
  it('should get category from URL', () => {
    expect(
      extractCategoryFromUrl('https://localhost:8080/?category=react')
    ).toEqual('react');
  });
});
