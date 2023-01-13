export function requestEditing(response) {
  for (let i in response.data.Valute) {
    if (response.data.Valute[i].Nominal > 1)
    response.data.Valute[i].Value = response.data.Valute[i].Value / response.data.Valute[i].Nominal
    response.data.Valute[i].Previous = response.data.Valute[i].Previous / response.data.Valute[i].Nominal
  }
  response.data.Valute.RUB = {'Value' : 1, 'Nominal': 1}
}