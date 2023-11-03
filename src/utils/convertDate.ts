export const convertDate = (dateString: string) => {
  const currentDate = new Date()
  const offsetMin = currentDate.getTimezoneOffset()
  const date = new Date(Date.parse(dateString) - offsetMin * 60 * 1000)

  return date.toLocaleString().slice(0, -3).split(', ').join(' в ')
}
