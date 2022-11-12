import { useState, useEffect } from "react";
import { Like } from "./Icons";

import styles from "./Score.module.scss";

const Score = ({ score }: { score: number }) => {
    const [anim, setAnim] = useState(0);
    useEffect(() => {
        setAnim(1);
    }, [score]);
    useEffect(() => {
        if (anim) requestAnimationFrame(() => setAnim(0));
    }, [anim]);

    return (
        <div className={styles.wrap}>
            <div className={styles.score}>
                {score ? score : 0}
                <Like
                    className={styles.popup + (anim ? "" : " " + styles.run)}
                />
            </div>
        </div>
    );
};
export default Score;
