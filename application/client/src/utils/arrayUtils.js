/**
 * Utility functions for array operations
 */

/**
 * Returns unique elements from an array with error handling
 * @param {Array} array - The array to process
 * @returns {Array} - The array with unique elements
 */
export function unique(array) {
  if (!Array.isArray(array)) {
    throw new Error('Invalid input: expected an array')
  }
  return [...new Set(array)]
}

/**
 * Flattens nested arrays with error handling
 * @param {Array} array - The array to flatten
 * @returns {Array} - The flattened array
 */
export function flatten(array) {
  if (!Array.isArray(array)) {
    throw new Error('Invalid input: expected an array')
  }
  return array.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), [])
}
