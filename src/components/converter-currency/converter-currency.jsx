import React, { useEffect, useState } from 'react';
import CurrencyRow from './components/currency-row';
import styles from './converter-currency.module.scss';
import { useSelector } from 'react-redux';

export default function ConverterCurrency() {
  const data = useSelector((state) => state.currency.currencyData);
  const currencyOptions = Object.keys(data.Valute);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [valueCurrency, setValueCurrency] = useState('');
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  useEffect(() => {
      setValueCurrency(
        data.Valute[fromCurrency].Value / data.Valute[toCurrency].Value
      );
  }, [fromCurrency, toCurrency]);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * valueCurrency;
  } else {
    toAmount = amount;
    fromAmount = amount / valueCurrency;
  }

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <div>
      <h1 className={styles.title}>Конвертер валют</h1>
      <div className={styles.wrapper}>
        <CurrencyRow
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <CurrencyRow
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
      </div>
    </div>
  );
}
