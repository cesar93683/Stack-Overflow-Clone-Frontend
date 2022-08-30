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
  getVoteDiff(currVote: number, newVote: number): number {
    let diff = 0;
    if (currVote === -1) {
      if (newVote === 0) {
        diff = 1;
      } else {
        // newVote === 1
        diff = 2;
      }
    } else if (currVote === 0) {
      if (newVote === -1) {
        diff = -1;
      } else {
        // newVote === 1
        diff = 1;
      }
    } else {
      // currVote === 1
      if (newVote === -1) {
        diff = -2;
      } else {
        // newVote === 0
        diff = -1;
      }
    }
    return diff;
  }
}
export default new VoteUtils();
