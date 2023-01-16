import { ClipLoader } from 'react-spinners';
import styles from './loader.module.scss';

export default function Loader() {
  return (
    <div className={styles.loader}>
      <ClipLoader
        color='#36d7b7'
        size={150}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
}
