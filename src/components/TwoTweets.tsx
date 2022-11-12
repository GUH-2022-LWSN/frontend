import { TweetInfo } from "../types/tweet";
import Tweet from "./Tweet";

import styles from "./TwoTweets.module.scss";

const TwoTweets = ({
    tweet1,
    tweet2,
}: {
    tweet1: TweetInfo;
    tweet2: TweetInfo;
}) => {
    return (
        <div>
            <div className={styles.pair}>
                <Tweet tweet={tweet1} />
                <Tweet tweet={tweet2} />
            </div>
            <div className={styles.cta}>Verify the correct account</div>
        </div>
    );
};

export default TwoTweets;
