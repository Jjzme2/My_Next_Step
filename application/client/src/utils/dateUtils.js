/**
 * Utility functions for date operations
 */

/**
 * Formats a date to 'YYYY-MM-DD' format with error handling
 * @param {Date} date - The date to format
 * @returns {string} - The formatted date string
 */
function formatDate(date) {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error('Invalid date')
  }
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Parses a date string in 'YYYY-MM-DD' format with error handling
 * @param {string} dateString - The date string to parse
 * @returns {Date} - The parsed date object
 */
function parseDate(dateString) {
  if (typeof dateString !== 'string') {
    throw new Error('Invalid input: expected a string')
  }
  const dateParts = dateString.split('-')
  if (dateParts.length !== 3) {
    throw new Error('Invalid date format')
  }
  const [year, month, day] = dateParts.map(Number)
  const date = new Date(year, month - 1, day)
  if (isNaN(date)) {
    throw new Error('Invalid date')
  }
  return date
}

export default { formatDate, parseDate }
