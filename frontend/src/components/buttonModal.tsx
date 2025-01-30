import styles from './buttonModal.module.css';

export default function ButtonModal() {
  return (
    <div className={styles.container}>
      <button className={styles.button}>Сделать пост</button>
      <button className={styles.accountExitButton}>Выйти из аккаунта</button>
    </div>
  )
}