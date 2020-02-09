export const TODAY = 'today';
export const THIS_WEEK = 'this_week';
export const THIS_MONTH = 'this_month';
export const ALL_TIME = 'all_time';

export const getPeriod = tab => {
  switch (tab) {
    case THIS_WEEK:
      return "THIS_WEEK";
    case THIS_MONTH:
      return "THIS_MONTH";
    case ALL_TIME:
      return "ALL_TIME";
    default:
      return "TODAY"
  }
}