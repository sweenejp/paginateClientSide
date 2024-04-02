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
 * @param {T[]} params.data
 * @param {number} [params.pageNum]
 * @param {number} [params.pageSize]
 * @param {OrderByI} [params.orderBy]
 * @param {SearchI} [params.search]
 * @returns {T[]} Paginated data array
 */
export const getCientSidePaginatedData = ({
  data,
  pageNum = 1,
  pageSize = 10,
  orderBy,
  search,
}) => {
  let filteredData = [...data];

  // Apply search filter if provided
  if (search?.field && search.value) {
    filteredData = filteredData.filter((item) => {
      if (search.field in item) {
        return (
          // @ts-ignore
          item[search.field]
            .toLowerCase()
            // @ts-ignore
            .includes(search.value.toLowerCase())
        );
      }
    });
  }

  // Apply sorting if orderBy is provided
  if (orderBy?.field) {
    filteredData.sort((a, b) => {
      // @ts-ignore
      const aValue = a[orderBy.field];
      // @ts-ignore
      const bValue = b[orderBy.field];

      if (!orderBy.sort || orderBy.sort === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  }

  // Apply pagination
  const startIndex = (pageNum - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return paginatedData;
};
