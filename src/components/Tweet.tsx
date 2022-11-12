import { useState, memo } from "react";
import { TweetInfo } from "../types/tweet";
import { Like, Reply, Retweet } from "./Icons";

import styles from "./Tweet.module.scss";

const Tweet = ({
    tweet,
    tweetRef,
}: {
    tweet: TweetInfo;
    tweetRef: React.MutableRefObject<any>;
}) => {
    const [lightbox, setLightbox] = useState(false);

    return (
        <div
            className={styles.tweet}
            ref={tweetRef}
            style={{
                boxShadow: tweet.hover
                    ? "5px 5px 50px -1px rgba(0,0,0,0.4)"
                    : "5px 5px 10px -5px rgba(0,0,0,0.4)",
            }}
        >
            <div className={styles.head}>
                <div
                    className={styles.pfp}
                    style={{
                        backgroundImage: `url(${tweet.user.pfp})`,
                    }}
                />
                <div className={styles.names}>
                    <div className={styles.displayName}>
                        {tweet.user.displayName}
                    </div>
                    <div className={styles.handle}>@{tweet.user.handle}</div>
                </div>
            </div>
            <div className={styles.body}>{tweet.body}</div>
            {tweet.attachment ? (
                <img
                    alt=""
                    onClick={() => setLightbox(true)}
                    className={styles.attachment}
                    src={tweet.attachment}
                />
            ) : null}
            <div className={styles.foot}>
                <span>
                    <Reply />
                    {tweet.stats.replies}
                </span>
                <span>
                    <Retweet />
                    {tweet.stats.retweets}
                </span>
                <span>
                    <Like />
                    {tweet.stats.likes}
                </span>
                <span>{tweet.stats.date}</span>
            </div>

            {lightbox && tweet.attachment ? (
                <div
                    onClick={() => setLightbox(false)}
                    className={styles.lightbox}
                >
                    <img alt="" src={tweet.attachment} />
                </div>
            ) : null}
        </div>
    );
};
export default memo(Tweet);
