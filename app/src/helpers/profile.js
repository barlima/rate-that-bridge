import moment from 'moment';
import groupBy from 'lodash/groupBy';

export const getRecentlyVoted = votes => {
  return votes.sort(
      (a,b) => moment(a.created).unix() - moment(b.created).unix()
    ).concat().reverse().splice(0,5);
}

export const getFavoriteBridge = votes => {
  const grouped = groupBy(votes.map(vote => vote.bridge.id));
  const keys = Object.keys(grouped);
  const stats = keys.map(key => ({ id: key, value: grouped[key].length }));
  return stats.sort((a,b) => b.value - a.value)[0];
}