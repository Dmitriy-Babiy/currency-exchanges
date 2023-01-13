import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestEditing } from '../../utils/request-editing';
import { getCurrencyFromLS } from '../../utils/get-сurrency-fromLS';


export const fetchCurrency = createAsyncThunk('currency', async () => {
  const response  = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
  requestEditing(response)
  return response.data;
});

const currencyLS = getCurrencyFromLS()

const initialState = {
  currencyData: {},
  status: 'loading',
  requestDate: '',
  fromCurrency: currencyLS.fromCurrency,
  toCurrency: currencyLS.toCurrency,
};



export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    getToCurrency: (state, action) => {
      state.toCurrency = action.payload
    },
    getFromCurrency: (state, action) => {
      state.fromCurrency = action.payload
    },
  },
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

export const { getToCurrency, getFromCurrency } = currencySlice.actions
export const currencyReducer = currencySlice.reducer;
