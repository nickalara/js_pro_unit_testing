const axios = require('axios');

/**
 * flattens a nested array
 * @param {array} arr an array  ex: [1,2,[3,4,[5]]]
 * @returns {array} ex: [1,2,3,4,5]
 */
const flattenArr = (arr) => {
  if (!Array.isArray(arr)) return 'Input must be an array.';
  const retVal = [];
  const helper = (val) => {
    for (let i = 0; i < val.length; i++) {
      if (Array.isArray(val[i])) {
        helper(val[i]);
      } else {
        retVal.push(val[i]);
      }
    }
  };

  helper(arr);
  return retVal;
};

/**
 * makes an async request to a placeholder API
 * @returns {object} on success returns the successful response object and on failure returns a formatted error object
 */

const dataFetcher = async () => {
  try {
    const data = await axios.get('https://jsonplaceholder.typicode.com/users');
    return data;
  } catch (e) {
    throw new Error({ error: e, message: 'An Error Occurred' });
  }
};

// // TODO: Add getClientRegionAndCountry
// // get client region and country from IP address
// const getClientRegionAndCountry = async () => {
//   try {
//     const regionCode = await axios.get('https://ipapi.co/region_code/');
//     const country = await axios.get('https://ipapi.co/country/');
//     return { regionCode, country };
//   } catch (e) {
//     throw new Error({ error: e, message: 'Unexpected Result' });
//   }
// };

/**
 * sorts an array using a callback function supplied as an argument
 * @param {array} arr generic array
 * @param {function} sortFn a callback function to sort the array
 * @returns {array}
 */

const sortList = (arr, sortFn) => {
  if (sortFn && arr.length > 1) {
    return sortFn(arr);
  }

  return arr;
};

/**
 * Formats a number to US currency
 * @param {number} num
 * @returns {string} ex: $3.99
 */
// TODO: fix this test
const formatCurrency = (num) => {
  if (isNaN(num)) return '$0.00';

  return `$${num.toFixed(2)}`;
};

/**
 * Resolves (or rejects) an array of promises
 * @param {array} tasks an array of promises ex: [new Promise((res, rej) => res())]
 * @returns {array} of resolved promises or an error
 */
// TODO: fix this test
const handlePromises = async (tasks = []) => {
  try {
    const [...data] = await Promise.all(tasks);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  flattenArr,
  dataFetcher,
  sortList,
  formatCurrency,
  handlePromises
};
