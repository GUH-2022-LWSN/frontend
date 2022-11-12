import styles from "./Progress.module.scss";

const Progress = () => {
    return <div className={styles.progress}>
        <div className={styles.label}>50%!</div>
        <div className={styles.label}>50%!</div>
    </div>;
};
export default Progress;
