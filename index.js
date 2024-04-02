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
 * @param {object} params
 * @param {unknown[]} params.data
 * @param {number} [params.pageNum]
 * @param {number} [params.pageSize]
 * @param {OrderByI} [params.orderBy]
 * @param {OrderByI} [params.search]
 */
export const getCientSidePaginatedData = ({
  data,
  pageNum,
  pageSize,
  orderBy,
  search,
}) => {};
