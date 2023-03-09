import styles from "./Loader.module.css"

function Loader () {
  return <div className={styles.newtons_cradle}>
  <div className={styles.newtons_cradle__dot}></div>
  <div className={styles.newtons_cradle__dot}></div>
  <div className={styles.newtons_cradle__dot}></div>
  <div className={styles.newtons_cradle__dot}></div>
</div>
}

export default Loader;