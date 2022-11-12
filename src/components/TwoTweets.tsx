import { TweetInfo } from "../types/tweet";
import Tweet from "./Tweet";

import styles from "./TwoTweets.module.scss";

const TwoTweets = ({
    tweet1,
    tweet2,
    tweet1Ref,
    tweet2Ref,
}: {
    tweet1: TweetInfo;
    tweet2: TweetInfo;
    tweet1Ref: React.MutableRefObject<any>,
    tweet2Ref: React.MutableRefObject<any>,
}) => {
    return (
        <div>
            <div className={styles.pair}>
                <Tweet tweet={tweet1} tweetRef={tweet1Ref} />
                <Tweet tweet={tweet2} tweetRef={tweet2Ref} />
            </div>
            <div className={styles.cta}>Verify the correct account</div>
        </div>
    );
};

export default TwoTweets;
