import chunk from 'lodash/chunk';

export const getPaginatedItems = (items, perPage=0) => {
  if (perPage === 0) {
    return items;
  }

  return chunk(items, perPage);
}