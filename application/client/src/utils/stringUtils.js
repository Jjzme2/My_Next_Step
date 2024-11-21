/**
 * Utility functions for string operations
 */

/**
 * Capitalizes the first letter of a string with error handling
 * @param {string} str - The string to capitalize
 * @returns {string} - The capitalized string
 */
function capitalize(str) {
  if (typeof str !== 'string') {
    throw new Error('Invalid input: expected a string')
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Converts a string to camel case with error handling
 * @param {string} str - The string to convert
 * @returns {string} - The camel case string
 */
function camelCase(str) {
  if (typeof str !== 'string') {
    throw new Error('Invalid input: expected a string')
  }
  return str.replace(/([-_][a-z])/gi, (match) =>
    match.toUpperCase().replace('-', '').replace('_', ''),
  )
}

/**
 * Truncates a string to a specified length with error handling
 * @param {string} str - The string to truncate
 * @param {number} length - The length to truncate to
 * @returns {string} - The truncated string
 */
function truncate(str, length) {
  if (typeof str !== 'string') {
    throw new Error('Invalid input: expected a string')
  }
  if (typeof length !== 'number') {
    throw new Error('Invalid input: expected a number')
  }
  return str.length > length ? str.slice(0, length) + '...' : str
}

/**
 * Reverses a string with error handling
 * @param {string} str - The string to reverse
 * @returns {string} - The reversed string
 */
function reverse(str) {
  if (typeof str !== 'string') {
    throw new Error('Invalid input: expected a string')
  }
  return str.split('').reverse().join('')
}

export default { capitalize, camelCase, truncate, reverse }
