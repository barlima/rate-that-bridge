import fill from 'lodash/fill';

export const preparePagination = (pages, boxesLimit, currentPage=1) => {
  if (pages <= boxesLimit) {
    return fill(Array(pages), null).map((_, i) => i + 1);
  }

  let boxes = [];

  let neighbours = [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ];

  neighbours = neighbours.filter(i => i > 0 && i <= pages);

  if (!neighbours.concat().splice(0,3).includes(1)) {
    boxes.push(1);

    if (!neighbours.concat().splice(0,3).includes(2)) {
      boxes.push(null);
    } else {
      neighbours.push(currentPage + 3);
    }
  }

  boxes = [ ...boxes, ...neighbours ];

  if (neighbours[neighbours.length - 1] < pages) {
    if (neighbours[neighbours.length - 1] < pages - 1) {
      boxes.push(null);
    }
    boxes.push(pages);
  }

  return boxes
}