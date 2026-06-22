export function todayLocal(): string {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60_000
  return new Date(now.getTime() - offset).toISOString().slice(0, 10)
}

export function isDateTodayOrLater(value: string): boolean {
  return Boolean(value) && value >= todayLocal()
}
