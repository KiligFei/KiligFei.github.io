export function formatDateShort(date?: string, fallback = 'Undated', locale = 'en') {
  const parsed = normalizeDate(date)

  if (!parsed)
    return fallback

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(parsed)
}

export function formatDateLong(date?: string, fallback = '', locale = 'en') {
  const parsed = normalizeDate(date)

  if (!parsed)
    return fallback

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(parsed)
}

function normalizeDate(date?: string) {
  if (!date)
    return null

  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime()))
    return null

  return parsed
}
