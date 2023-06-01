/**
 * @description
 * The date is formatted in pt-BR, and the time zone is set to UTC
 * @example
 * 01/04/2021 00:00
 *
 * @param {string} date
 * @returns {string}
 *
 *
 */
export function formatDatePtBr(date: string): string {
  if (!date) return ''
  const formatDate = new Date(date)
  const format = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  }).format(formatDate)

  return format
}
