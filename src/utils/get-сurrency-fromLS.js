export function getCurrencyFromLS() {
  const data = localStorage.getItem('currency')
  return data ? JSON.parse(data) : {'fromCurrency': 'USD','toCurrency': 'RUB'}
}