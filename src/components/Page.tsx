import Checkmark from "./Checkmark";
import styles from "./Page.module.scss";

const Page = ({ children, checkmarkRef, checkmarkImagePos, checkmarkSetImagePos }: {children: React.ReactNode, checkmarkRef: React.MutableRefObject<any>, checkmarkImagePos: { left: number; top: number; }, checkmarkSetImagePos(checkmarkImagePos: { left: number; top: number; }): void}) => {
    return (
        <div className={styles.page}>
            <Checkmark
                checkmarkRef={checkmarkRef}
                imagePos={checkmarkImagePos}  
                setImagePos={checkmarkSetImagePos}  
            />
            { children }
        </div>
    );
};
export default Page;
