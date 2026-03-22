const ronFormatter = new Intl.NumberFormat('ro-RO', {
  style: 'currency',
  currency: 'RON',
  maximumFractionDigits: 2,
})

export function formatRON(value: number): string {
  return ronFormatter.format(value)
}
