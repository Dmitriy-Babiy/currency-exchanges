import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getToCurrency, getFromCurrency} from '../../redux/slices/currency-slice';
import CurrencyRow from './components/currency-row';
import styles from './converter-currency.module.scss';

export default function ConverterCurrency() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.currency.currencyData);
  const fromCurrency = useSelector((state) => state.currency.fromCurrency);
  const toCurrency = useSelector((state) => state.currency.toCurrency);
  const currencyOptions = Object.keys(data.Valute);

  const [valueCurrency, setValueCurrency] = useState('');
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('currency', JSON.stringify({fromCurrency: fromCurrency, toCurrency: toCurrency,}))
    }
    isMounted.current = true;
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
          onChangeCurrency={(e) => dispatch(getFromCurrency(e.target.value))}
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <CurrencyRow
          onChangeCurrency={(e) => dispatch(getToCurrency(e.target.value))}
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
      </div>
    </div>
  );
}
