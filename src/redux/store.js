import { configureStore } from '@reduxjs/toolkit';
import { currencyReducer } from './slices/currency-slice';

const store = configureStore({
  reducer: {
    currency: currencyReducer
  },
});

export default store;
