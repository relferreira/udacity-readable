import { organizeValues } from './values-filter';

describe('Posts', () => {
  it('should filter deleted posts', () => {
    let posts = [
      { title: 'test', deleted: false },
      { title: 'test2', deleted: true }
    ];
    let filteredPosts = organizeValues(posts);
    expect(filteredPosts.length).toEqual(1);
    expect(filteredPosts[0].title).toEqual('test');
  });

  it('should order posts by score', () => {
    let posts = [
      { title: 'test', voteScore: 1 },
      { title: 'test2', voteScore: 3 },
      { title: 'test3', voteScore: 2 }
    ];
    let filteredPosts = organizeValues(posts, 'voteScore', 'desc');
    expect(filteredPosts[0].voteScore).toEqual(3);
    expect(filteredPosts[1].voteScore).toEqual(2);
    expect(filteredPosts[2].voteScore).toEqual(1);
  });

  it('should order posts by score asc', () => {
    let posts = [
      { title: 'test', voteScore: 1 },
      { title: 'test2', voteScore: 3 },
      { title: 'test3', voteScore: 2 }
    ];
    let filteredPosts = organizeValues(posts, 'voteScore', 'asc');
    expect(filteredPosts[0].voteScore).toEqual(1);
    expect(filteredPosts[1].voteScore).toEqual(2);
    expect(filteredPosts[2].voteScore).toEqual(3);
  });

  it('should order posts by timestamp', () => {
    let posts = [
      { title: 'test', timestamp: 1467166872634 },
      { title: 'test2', timestamp: 1467166872636 },
      { title: 'test3', timestamp: 1467166872635 }
    ];
    let filteredPosts = organizeValues(posts, 'timestamp', 'desc');
    expect(filteredPosts[0].timestamp).toEqual(1467166872636);
    expect(filteredPosts[1].timestamp).toEqual(1467166872635);
    expect(filteredPosts[2].timestamp).toEqual(1467166872634);
  });

  it('should filter posts by selected category', () => {
    let posts = [
      { title: 'test', category: 'react' },
      { title: 'test2', category: 'redux' }
    ];
    let filteredPosts = organizeValues(posts, 'voteScore', 'desc', 'react');
    expect(filteredPosts.length).toEqual(1);
    expect(filteredPosts[0].category).toEqual('react');
  });
});
