export function formatDate(date: string) {
  if (!date) throw new Error('Invalid date')

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(date))
}
