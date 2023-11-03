export const ending = (amount: number) => {
  let ending

  const rest = amount % 10
  const rest100 = amount % 100

  if (rest === 0 || (rest >= 5 && rest <= 19)) {
    ending = 'ов'
  }

  if (rest === 1) {
    ending = ''
  }

  if (rest >= 2 && rest <= 4) {
    ending = 'а'
  }

  if (rest100 >= 11 && rest100 <= 19) {
    ending = 'ов'
  }

  return ending
}
