import styles from './style.module.css';

const Spinner = () => {
  return (
    <div className="flex h-full">
      <div className={styles.spinner}>
        <div className={styles.spinner__item}></div>
        <div className={styles.spinner__item}></div>
        <div className={styles.spinner__item}></div>
        <div className={styles.spinner__item}></div>
      </div>
    </div>
  );
};

export { Spinner };