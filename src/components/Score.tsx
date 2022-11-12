import { useState, useEffect } from "react";
import { Like } from "./Icons";

import styles from "./Score.module.scss";

const STATE_SHOW = 0;
const STATE_NEXT = 1;
const STATE_NOSHOW = 2;

const Score = ({ score }: { score: number }) => {
    const [anim, setAnim] = useState(STATE_NOSHOW);
    useEffect(() => {
        setAnim((old) => (score !== 0 ? STATE_NEXT : old));
    }, [score]);
    useEffect(() => {
        if (anim)
            requestAnimationFrame(() =>
                setAnim(anim === STATE_NEXT ? STATE_SHOW : STATE_NOSHOW)
            );
    }, [anim]);

    return (
        <div className={styles.wrap}>
            <div className={styles.score}>
                {score ? score : 0}
                <Like
                    className={
                        styles.popup +
                        (anim === STATE_SHOW ? " " + styles.run : "")
                    }
                />
            </div>
        </div>
    );
};
export default Score;
