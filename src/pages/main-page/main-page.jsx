import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConverterCurrency from '../../components/converter-currency/converter-currency';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import TableCurrency from '../../components/table-currency/table-currency';
import { fetchCurrency } from '../../redux/slices/currency-slice';
import styles from './main-page.module.scss';

export default function MainPage() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.currency.status);

  useEffect(() => {
    dispatch(fetchCurrency());
  }, []);

  return (
    <div className={styles.container}>
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          <Header />
          <TableCurrency />
          <ConverterCurrency />
        </>
      )}
    </div>
  );
}
