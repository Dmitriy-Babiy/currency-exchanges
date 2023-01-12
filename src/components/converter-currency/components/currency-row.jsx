import styles from './currency-row.module.scss';

export default function CurrencyRow({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  onChangeAmount,
  amount,
}) {
  return (
    <div className={styles.wrapper}>
      <input
        type='number'
        value={amount}
        onKeyDown={(evt) => evt.key === '.' && evt.preventDefault()}
        onChange={onChangeAmount}
      />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
