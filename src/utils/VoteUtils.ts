class VoteUtils {
  getCurrVoteNum(currVote: string | undefined): number {
    return !currVote
      ? 0
      : currVote === 'UP_VOTE'
      ? 1
      : currVote === 'NEUTRAL'
      ? 0
      : -1;
  }
  getDownVoteDiff(currVote: number, newVote: number): number {
    let diff = 0;
    if (currVote === 1) {
      if (newVote === 0) {
        diff = -1;
      } else {
        diff = -2;
      }
    } else if (currVote === 0) {
      diff = -1;
    } else {
      diff = 1;
    }
    return diff;
  }
  getUpVoteDiff(currVote: number, newVote: number): number {
    let diff = 0;
    if (currVote === -1) {
      if (newVote === 0) {
        diff = 1;
      } else {
        diff = 2;
      }
    } else if (currVote === 0) {
      diff = 1;
    } else {
      diff = -1;
    }
    return diff;
  }
}
export default new VoteUtils();
