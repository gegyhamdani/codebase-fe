export const formatBreadcrumbText = (segment: string): string => {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const generateBreadcrumbs = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean)

  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const text = formatBreadcrumbText(segment)
    const isLast = index === segments.length - 1

    return {
      href,
      text,
      isLast
    }
  })

  return breadcrumbs
}
