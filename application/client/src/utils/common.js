/**
 * Utility functions for common operations
 */

/**
 * Formats a date to 'YYYY-MM-DD' format with error handling
 * @param {Date} date - The date to format
 * @returns {string} - The formatted date string
 */
export function formatDate(date) {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error('Invalid date')
  }
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Capitalizes the first letter of a string with error handling
 * @param {string} str - The string to capitalize
 * @returns {string} - The capitalized string
 */
export function capitalize(str) {
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
export function toCamelCase(str) {
  if (typeof str !== 'string') {
    throw new Error('Invalid input: expected a string')
  }
  return str.replace(/([-_][a-z])/gi, (match) =>
    match.toUpperCase().replace('-', '').replace('_', ''),
  )
}

/**
 * Converts a string to kebab case with error handling
 * @param {string} str - The string to convert
 * @returns {string} - The kebab case string
 */
export function toKebabCase(str) {
  if (typeof str !== 'string') {
    throw new Error('Invalid input: expected a string')
  }
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * Converts a string to snake case with error handling
 * @param {string} str - The string to convert
 * @returns {string} - The snake case string
 */
export function toSnakeCase(str) {
  if (typeof str !== 'string') {
    throw new Error('Invalid input: expected a string')
  }
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
}

/**
 * Trims whitespace from both ends of a string with error handling
 * @param {string} str - The string to trim
 * @returns {string} - The trimmed string
 */
export function trim(str) {
  if (typeof str !== 'string') {
    throw new Error('Invalid input: expected a string')
  }
  return str.trim()
}

/**
 * Checks if a string is a palindrome with error handling
 * @param {string} str - The string to check
 * @returns {boolean} - True if the string is a palindrome, false otherwise
 */
export function isPalindrome(str) {
  if (typeof str !== 'string') {
    throw new Error('Invalid input: expected a string')
  }
  const cleaned = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase()
  return cleaned === cleaned.split('').reverse().join('')
}

/**
 * Generates a random integer between min and max (inclusive) with error handling
 * @param {number} min - The minimum value
 * @param {number} max - The maximum value
 * @returns {number} - The random integer
 */
export function getRandomInt(min, max) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Invalid input: expected numbers')
  }
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Shuffles an array with error handling
 * @param {Array} array - The array to shuffle
 * @returns {Array} - The shuffled array
 */
export function shuffleArray(array) {
  if (!Array.isArray(array)) {
    throw new Error('Invalid input: expected an array')
  }
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

/**
 * Deep clones an object with error handling
 * @param {Object} obj - The object to clone
 * @returns {Object} - The cloned object
 */
export function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Invalid input: expected an object')
  }
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Debounces a function with error handling
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce delay in milliseconds
 * @returns {Function} - The debounced function
 */
export function debounce(func, wait) {
  if (typeof func !== 'function' || typeof wait !== 'number') {
    throw new Error('Invalid input: expected a function and a number')
  }
  let timeout
  return function (...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), wait)
  }
}

/**
 * Throttles a function with error handling
 * @param {Function} func - The function to throttle
 * @param {number} limit - The throttle limit in milliseconds
 * @returns {Function} - The throttled function
 */
export function throttle(func, limit) {
  if (typeof func !== 'function' || typeof limit !== 'number') {
    throw new Error('Invalid input: expected a function and a number')
  }
  let inThrottle
  return function (...args) {
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Converts a string to title case with error handling
 * @param {string} str - The string to convert
 * @returns {string} - The title case string
 */
export function toTitleCase(str) {
  if (typeof str !== 'string') {
    throw new Error('Invalid input: expected a string')
  }
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

/**
 * Checks if an object is empty with error handling
 * @param {Object} obj - The object to check
 * @returns {boolean} - True if the object is empty, false otherwise
 */
export function isEmptyObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Invalid input: expected an object')
  }
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

/**
 * Merges two objects with error handling
 * @param {Object} target - The target object
 * @param {Object} source - The source object
 * @returns {Object} - The merged object
 */
export function mergeObjects(target, source) {
  if (
    typeof target !== 'object' ||
    target === null ||
    typeof source !== 'object' ||
    source === null
  ) {
    throw new Error('Invalid input: expected objects')
  }
  return { ...target, ...source }
}

/**
 * Generates a unique identifier with error handling
 * @returns {string} - The unique identifier
 */
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Converts a string to a number with error handling
 * @param {string} str - The string to convert
 * @returns {number} - The converted number
 */
export function toNumber(str) {
  const num = parseFloat(str)
  if (isNaN(num)) {
    throw new Error('Invalid input: expected a number')
  }
  return num
}

/**
 * Checks if a value is a number with error handling
 * @param {*} value - The value to check
 * @returns {boolean} - True if the value is a number, false otherwise
 */
export function isNumber(value) {
  return typeof value === 'number' && !isNaN(value)
}
