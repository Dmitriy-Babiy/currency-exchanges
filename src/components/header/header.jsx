import React from 'react';
import styles from './header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrency } from '../../redux/slices/currency-slice';

export default function Header() {
  const requestDate = useSelector((state) => state.currency.requestDate);
  const dispatch = useDispatch();
  return (
    <header className={styles.header}>
      <div className={styles.logo}>kozhindev-test-exchanges</div>
      <div className={styles.wrapper}>
        <div className={styles.date}>{requestDate}</div>
        <button className={styles.button} onClick={() => {dispatch(fetchCurrency());}}>
          <span>Обновить</span>
        </button>
      </div>
    </header>
  );
}
