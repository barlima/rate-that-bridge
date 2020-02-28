import moment from 'moment';
import { Period } from "../types/graphql-utils";

export const getDate = (period: Period) => {
  switch (period) {
    case 0:
      return moment.utc().startOf('day').subtract(1, 'minute').toISOString();
    case 1:
      return moment.utc().startOf('week').toISOString();
    case 2:
      return moment.utc().startOf('month').toISOString();
    case 4:
      return moment('2000-01-01').toISOString();
    default:
      return moment('2000-01-01').toISOString();
  }
}

export const getDayStart = () => {
  return moment().startOf('day').subtract(1, 'minute').toISOString();
}