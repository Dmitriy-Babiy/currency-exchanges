import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCurrency = createAsyncThunk('currency', async () => {
  const response  = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
  for (let i in response.data.Valute) {
    if (response.data.Valute[i].Nominal > 1)
    response.data.Valute[i].Value = response.data.Valute[i].Value / response.data.Valute[i].Nominal
    response.data.Valute[i].Previous = response.data.Valute[i].Previous / response.data.Valute[i].Nominal
  }
  response.data.Valute.RUB = {'Value' : 1, 'Nominal': 1}
  return response.data;
});

const initialState = {
  currencyData: {},
  status: 'loading',
  requestDate: '',
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrency.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.currencyData = action.payload;
        state.status = 'loaded';
        state.requestDate = new Date().toLocaleString();
      })
      .addCase(fetchCurrency.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const currencyReducer = currencySlice.reducer;
