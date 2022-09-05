export const ITEMS_PER_PAGE = 10;

interface Pagination {
  currentPage: number;
  pages: number;
  hasNext: boolean;
  nextPage: number;
  hasPrevious: boolean;
  previousPage: number;
}

export default (
  page: number,
  totalItems: number,
  itemsPerPage: number = ITEMS_PER_PAGE
): Pagination => {
  return {
    currentPage: page,
    pages: Math.ceil(totalItems / itemsPerPage),
    hasNext: page < Math.ceil(totalItems / itemsPerPage),
    nextPage: page + 1,
    hasPrevious: page > 1,
    previousPage: page - 1,
  };
};
