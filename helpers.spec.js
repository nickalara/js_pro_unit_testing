const {
  flattenArr,
  dataFetcher,
  sortList,
  formatCurrency,
  handlePromises
} = require('./helpers.js');
const axios = require('axios');

jest.mock('axios');

describe('flattenArr', () => {
  it('return a non-nested arr', () => {
    const input = [1, 2, 3, 4];
    const expectedOutput = [1, 2, 3, 4];

    expect(flattenArr(input)).toEqual(expectedOutput);
  });

  it('flattens a nested arr', () => {
    const input = [1, 2, 3, [4, 5, [6, 7, [8, [9, [10]]]]]];
    const expectedOutput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    expect(flattenArr(input)).toEqual(expectedOutput);
    expect(flattenArr(input)).toHaveLength(expectedOutput.length);
  });

  it('flattens multiple nested arrays', () => {
    const input = [1, 2, 3, [4, 5, [6, 7, [8, [9, [10]]]]], [11, 12, 13, [14, 15, [16, 17, [18, [19, [20]]]]]]];
    const expectedOutput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    expect(flattenArr(input)).toEqual(expectedOutput);
    expect(flattenArr(input)).toHaveLength(expectedOutput.length);
  });

  it('does not accept a string', () => {
    const input = 'not an array';
    const expectedOutput = 'Input must be an array.';

    expect(flattenArr(input)).toEqual(expectedOutput);
  });

  it('does not accept a number', () => {
    const input = 123;
    const expectedOutput = 'Input must be an array.';

    expect(flattenArr(input)).toEqual(expectedOutput);
  });

  it('handles arrays with mixed types (including empty arrays)', () => {
    const input = [1, 2, 3, [4, 5, [6, 7, []]], 'not a number'];
    const expectedOutput = [1, 2, 3, 4, 5, 6, 7, 'not a number'];

    expect(flattenArr(input)).toEqual(expectedOutput);
  });

  // TO DO: Add submethod for removing duplicates and sorting
  // Does not remove duplicates
  // it('removes duplicates', () => {
  //   const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2];
  //   const expectedOutput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //   expect(flattenArr(input)).toEqual(expectedOutput);
  // });

  // Does not sort the returned array
  // it('sorts an array', () => {
  //   const input = [1, 2, 5, [4, 3, [6, 7, [8, [9, [10]]]]]];
  //   const expectedOutput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //   expect(flattenArr(input)).toEqual(expectedOutput);
  // });
});

describe('dataFetcher', () => {
  it('handles a successful response', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: { users: [] } }));

    const data = await dataFetcher();

    expect(data).toEqual({ data: { users: [] } });
  });

  it('handles an error response', async () => {
    axios.get.mockImplementation(() => Promise.reject('Boom'));

    try {
      await dataFetcher();
    } catch (e) {
      expect(e).toEqual(new Error({ error: 'Boom', message: 'An Error Occurred' }));
    }
  });
});

// TODO: Add test for getClientRegionAndCountry
// // Get client region and country from IP address
// describe('getClientRegionAndCountry', () => {
//   it('returns the region code and country', async () => {
//     axios.get.mockImplementation(() => Promise.resolve({ data: { region_code: 'US', country: 'United States' } }));

//     try {
//       await getClientRegionAndCountry();
//     } catch (e) {
//       expect(e).toEqual(new Error({ error: 'Boom', message: 'An Error Occurred' }));
//     }
//   });
// });

describe('sortList', () => {
  it('calls a sorter function if it is available', () => {
    const sortFn = jest.fn();

    sortList([3, 2, 1], sortFn);

    expect(sortFn).toBeCalled();
    expect(sortFn).toBeCalledTimes(1);
    expect(sortFn.mock.calls).toEqual([[[3, 2, 1]]]);
  });

  it('does not call a sorter function if the array has a length <= 1', () => {
    const sortFn = jest.fn();

    sortList([1], sortFn);

    expect(sortFn).not.toBeCalled();
    expect(sortFn).toBeCalledTimes(0);
  });
});

/**
 * Add you test/s here and get this helper file to 100% test coverage!!!
 * You can check that your coverage meets 100% by running `npm run test:coverage`
 */

describe('formatCurrency', () => {
  it('does <insert your test here>', () => {
    return true;
  });
});

describe('handlePromises', () => {
  it('does <insert your test here>', () => {
    return true;
  });
});
