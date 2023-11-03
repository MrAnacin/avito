export const formatHiddenPhone = (phone?: string) => {
  if (!phone) {
    return ''
  }

  const phoneLength = phone.length

  if (phone.startsWith('+') && phoneLength >= 5) {
    return (
      phone.slice(0, 2) +
      ' ' +
      phone.slice(2, 5) +
      ' ' +
      Array(phone.length - 5)
        .fill('X')
        .join('')
    )
  }

  if (phoneLength >= 4) {
    return (
      phone.slice(0, 1) +
      ' ' +
      phone.slice(1, 4) +
      ' ' +
      Array(phone.length - 4)
        .fill('X')
        .join('')
    )
  }

  return Array(phone?.length).fill('X').join('')
}
