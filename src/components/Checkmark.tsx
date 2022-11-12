import { useEffect, useState } from "react";
import styles from "./Checkmark.module.scss";

function Checkmark() {
    const [tracking, setTracking] = useState<boolean>(false);

    useEffect(() => {
        const onMouseDown = (e: MouseEvent) => {

        };

        const onMouseUp = (e: MouseEvent) => {

        };

        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    useEffect(() => {

    }, [tracking])

    return (
        <img
            alt="Twitter verified checkmark"
            className={styles.checkmark}
            src="/checkmark.png"
            style={{
                left: 0,
                top: 0,
            }}
        />
    );
}

export default Checkmark;