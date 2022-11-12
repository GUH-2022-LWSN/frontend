import Checkmark from "./Checkmark";
import styles from "./Page.module.scss";

const Page = ({ children }: {children: React.ReactNode}) => {
    return (
        <div className={styles.page}>
            <Checkmark />
            { children }
        </div>
    );
};
export default Page;
