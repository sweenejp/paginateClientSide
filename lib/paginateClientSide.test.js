import { expect, describe, it } from 'bun:test';
import paginateClientSide from './paginateClientSide';

const items = [
  { id: 1, name: 'Alice', age: 30, favoriteFood: 'banana' },
  { id: 2, name: 'Bob', age: 25, favoriteFood: 'chocolate' },
  { id: 3, name: 'Charlie', age: 35, favoriteFood: 'apple' },
];

describe('getClientSidePaginatedData', () => {
  it('returns full list when nothing should change about the data', () => {
    expect(
      paginateClientSide({
        items,
        pageNum: 1,
        pageSize: 3,
        orderBy: { field: 'name', sort: 'asc' },
      }).items
    ).toStrictEqual([
      { id: 1, name: 'Alice', age: 30, favoriteFood: 'banana' },
      { id: 2, name: 'Bob', age: 25, favoriteFood: 'chocolate' },
      { id: 3, name: 'Charlie', age: 35, favoriteFood: 'apple' },
    ]);
  });

  it('returns full list when nothing should change about the items, even if page size is more than the total amount of items', () => {
    expect(
      paginateClientSide({
        items,
        pageNum: 1,
        pageSize: 10,
        orderBy: { field: 'name', sort: 'asc' },
      }).items
    ).toStrictEqual([
      { id: 1, name: 'Alice', age: 30, favoriteFood: 'banana' },
      { id: 2, name: 'Bob', age: 25, favoriteFood: 'chocolate' },
      { id: 3, name: 'Charlie', age: 35, favoriteFood: 'apple' },
    ]);
  });

  it('paginates page size', () => {
    expect(
      paginateClientSide({
        items,
        pageNum: 1,
        pageSize: 2,
        orderBy: { field: 'name', sort: 'asc' },
      }).items
    ).toStrictEqual([
      { id: 1, name: 'Alice', age: 30, favoriteFood: 'banana' },
      { id: 2, name: 'Bob', age: 25, favoriteFood: 'chocolate' },
    ]);
  });

  it('paginates page num', () => {
    expect(
      paginateClientSide({
        items,
        pageNum: 2,
        pageSize: 1,
        orderBy: { field: 'name', sort: 'asc' },
      }).items
    ).toStrictEqual([
      { id: 2, name: 'Bob', age: 25, favoriteFood: 'chocolate' },
    ]);
  });

  it('returns empty array if pageNum exceeds possible amount of pages', () => {
    expect(
      paginateClientSide({
        items,
        pageNum: 2,
        pageSize: 10,
        orderBy: { field: 'name', sort: 'asc' },
      }).items
    ).toStrictEqual([]);
  });

  it('can sort text', () => {
    expect(
      paginateClientSide({
        items,
        pageNum: 1,
        pageSize: 10,
        orderBy: { field: 'favoriteFood', sort: 'asc' },
      }).items
    ).toStrictEqual([
      {
        age: 35,
        favoriteFood: 'apple',
        id: 3,
        name: 'Charlie',
      },
      {
        age: 30,
        favoriteFood: 'banana',
        id: 1,
        name: 'Alice',
      },
      {
        age: 25,
        favoriteFood: 'chocolate',
        id: 2,
        name: 'Bob',
      },
    ]);
  });

  it('can sort text desc', () => {
    expect(
      paginateClientSide({
        items,
        pageNum: 1,
        pageSize: 10,
        orderBy: { field: 'favoriteFood', sort: 'desc' },
      }).items
    ).toStrictEqual([
      {
        age: 25,
        favoriteFood: 'chocolate',
        id: 2,
        name: 'Bob',
      },
      {
        age: 30,
        favoriteFood: 'banana',
        id: 1,
        name: 'Alice',
      },
      {
        age: 35,
        favoriteFood: 'apple',
        id: 3,
        name: 'Charlie',
      },
    ]);
  });

  it('can sort numbers', () => {
    expect(
      paginateClientSide({
        items,
        pageNum: 1,
        pageSize: 10,
        orderBy: { field: 'age' },
      }).items
    ).toStrictEqual([
      {
        age: 25,
        favoriteFood: 'chocolate',
        id: 2,
        name: 'Bob',
      },
      {
        age: 30,
        favoriteFood: 'banana',
        id: 1,
        name: 'Alice',
      },
      {
        age: 35,
        favoriteFood: 'apple',
        id: 3,
        name: 'Charlie',
      },
    ]);
  });

  it('can sort numbers desc', () => {
    expect(
      paginateClientSide({
        items,
        pageNum: 1,
        pageSize: 10,
        orderBy: { field: 'age', sort: 'desc' },
      }).items
    ).toStrictEqual([
      {
        age: 35,
        favoriteFood: 'apple',
        id: 3,
        name: 'Charlie',
      },
      {
        age: 30,
        favoriteFood: 'banana',
        id: 1,
        name: 'Alice',
      },
      {
        age: 25,
        favoriteFood: 'chocolate',
        id: 2,
        name: 'Bob',
      },
    ]);
  });

  it('does not return items that do not have the search field', () => {
    expect(
      paginateClientSide({
        items,
        pageNum: 1,
        pageSize: 10,
        search: { field: 'notakey', value: 'a' },
      }).items
    ).toStrictEqual([]);
  });

  it('returns expected itemTotal when nothing is filtered', () => {
    expect(
      paginateClientSide({
        items,
        pageNum: 1,
        pageSize: 10,
      }).itemTotal
    ).toStrictEqual(3);
  });

  it('returns expected itemTotal when itesm are filtered', () => {
    expect(
      paginateClientSide({
        items,
        pageNum: 1,
        pageSize: 10,
        search: { field: 'favoriteFood', value: 'bana' },
      }).itemTotal
    ).toStrictEqual(1);
  });
});
