// @ts-check

/**
 * @typedef OrderByI
 * @property {string} field needs to be a key in `data`
 * @property {'asc' | 'desc'} [sort] defaults to `'asc'`
 */

/**
 * @typedef SearchI
 * @property {string} field needs to be a key in `data`
 * @property {string} [value]
 */

/**
 * Filters, sorts, and slices an array of unknown data type
 * @template {object} T
 * @param {object} params
 * @param {T[]} params.items
 * @param {number} [params.pageNum]
 * @param {number} [params.pageSize]
 * @param {OrderByI} [params.orderBy]
 * @param {SearchI} [params.search]
 * @returns {{items: T[], itemTotal: number}} Paginated data array
 */
export const paginateClientSide = ({
  items,
  pageNum = 1,
  pageSize = 10,
  orderBy,
  search,
}) => {
  let filteredItems = [...items];

  // Apply search filter if provided
  if (search?.field && search.value) {
    filteredItems = filteredItems.filter((item) => {
      if (search.field in item) {
        return (
          // @ts-ignore
          item[search.field]
            .toLowerCase()
            // @ts-ignore
            .includes(search.value.toLowerCase())
        );
      }

      return false;
    });
  }

  // Apply sorting if orderBy is provided
  if (orderBy?.field) {
    filteredItems.sort((a, b) => {
      // @ts-ignore
      const aValue = a[orderBy.field];
      // @ts-ignore
      const bValue = b[orderBy.field];

      if (!orderBy.sort || orderBy.sort === 'asc') {
        if (aValue > bValue) return 1;
        if (aValue < bValue) return -1;
        return 0;
      }

      if (aValue < bValue) return 1;
      if (aValue > bValue) return -1;
      return 0;
    });
  }

  // Apply pagination
  const startIndex = (pageNum - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredItems.slice(startIndex, endIndex);

  return { items: paginatedData, itemTotal: filteredItems.length };
};

export default paginateClientSide;
