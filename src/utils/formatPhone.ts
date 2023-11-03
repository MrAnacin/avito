export const formatPhone = (phone?: string) => {
  if (!phone) {
    return ''
  }

  const phoneLength = phone.length

  if (phone.startsWith('+') && phoneLength >= 5) {
    return phone.slice(0, 2) + ' ' + phone.slice(2, 5) + ' ' + phone.slice(5)
  }

  if (phoneLength >= 4) {
    return phone.slice(0, 1) + ' ' + phone.slice(1, 4) + ' ' + phone.slice(4)
  }

  return Array(phone?.length).fill('X').join('')
}
