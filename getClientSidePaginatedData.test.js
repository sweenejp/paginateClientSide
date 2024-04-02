import { expect, describe, it } from 'bun:test';
import { getCientSidePaginatedData } from '.';

const data = [
  { id: 1, name: 'Alice', age: 30, favoriteFood: 'banana' },
  { id: 2, name: 'Bob', age: 25, favoriteFood: 'chocolate' },
  { id: 3, name: 'Charlie', age: 35, favoriteFood: 'apple' },
];

describe('getClientSidePaginatedData', () => {
  it('returns full list when nothing should change about the data', () => {
    expect(
      getCientSidePaginatedData({
        data,
        pageNum: 1,
        pageSize: 3,
        orderBy: { field: 'name', sort: 'asc' },
      })
    ).toStrictEqual([
      { id: 1, name: 'Alice', age: 30, favoriteFood: 'banana' },
      { id: 2, name: 'Bob', age: 25, favoriteFood: 'chocolate' },
      { id: 3, name: 'Charlie', age: 35, favoriteFood: 'apple' },
    ]);
  });

  it('returns full list when nothing should change about the data, even if page size is more than the total amount of items', () => {
    expect(
      getCientSidePaginatedData({
        data,
        pageNum: 1,
        pageSize: 10,
        orderBy: { field: 'name', sort: 'asc' },
      })
    ).toStrictEqual([
      { id: 1, name: 'Alice', age: 30, favoriteFood: 'banana' },
      { id: 2, name: 'Bob', age: 25, favoriteFood: 'chocolate' },
      { id: 3, name: 'Charlie', age: 35, favoriteFood: 'apple' },
    ]);
  });

  it('paginates page size', () => {
    expect(
      getCientSidePaginatedData({
        data,
        pageNum: 1,
        pageSize: 2,
        orderBy: { field: 'name', sort: 'asc' },
      })
    ).toStrictEqual([
      { id: 1, name: 'Alice', age: 30, favoriteFood: 'banana' },
      { id: 2, name: 'Bob', age: 25, favoriteFood: 'chocolate' },
    ]);
  });

  it('paginates page num', () => {
    expect(
      getCientSidePaginatedData({
        data,
        pageNum: 2,
        pageSize: 1,
        orderBy: { field: 'name', sort: 'asc' },
      })
    ).toStrictEqual([
      { id: 2, name: 'Bob', age: 25, favoriteFood: 'chocolate' },
    ]);
  });

  it('returns empty array if pageNum exceeds possible amount of pages', () => {
    expect(
      getCientSidePaginatedData({
        data,
        pageNum: 2,
        pageSize: 10,
        orderBy: { field: 'name', sort: 'asc' },
      })
    ).toStrictEqual([]);
  });

  it('can sort text', () => {
    expect(
      getCientSidePaginatedData({
        data,
        pageNum: 1,
        pageSize: 10,
        orderBy: { field: 'favoriteFood', sort: 'asc' },
      })
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
      getCientSidePaginatedData({
        data,
        pageNum: 1,
        pageSize: 10,
        orderBy: { field: 'favoriteFood', sort: 'desc' },
      })
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
      getCientSidePaginatedData({
        data,
        pageNum: 1,
        pageSize: 10,
        orderBy: { field: 'age' },
      })
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
      getCientSidePaginatedData({
        data,
        pageNum: 1,
        pageSize: 10,
        orderBy: { field: 'age', sort: 'desc' },
      })
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
      getCientSidePaginatedData({
        data,
        pageNum: 1,
        pageSize: 10,
        search: { field: 'notakey', value: 'a' },
      })
    ).toStrictEqual([]);
  });
});
