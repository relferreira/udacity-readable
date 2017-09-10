export function vote(option, obj) {
  return option === 'upVote' ? obj.voteScore + 1 : obj.voteScore - 1;
}

export function unVote(option, obj) {
  return option === 'upVote' ? obj.voteScore - 1 : obj.voteScore + 1;
}
