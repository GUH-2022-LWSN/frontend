import { useState, memo } from "react";
import { Company as ICompany } from "../types/company";
import { Tweet as ITweet } from "../types/tweet";
import { Like, Reply, Retweet } from "./Icons";

import styles from "./Tweet.module.scss";


const Tweet = ({
    hover,
    company,
    tweet,
    checkmarkPosition,
    tweetRef,
}: {
    checkmarkPosition: React.MutableRefObject<HTMLDivElement>;
    tweetRef: React.MutableRefObject<HTMLDivElement>;
    hover: boolean;
    company: ICompany,
    tweet: ITweet;
}) => {
    const [lightbox, setLightbox] = useState(false);
    
    const formatDate = (d: Date) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const hours = d.getHours() === 0 ? 12 : (d.getHours() > 12 ? d.getHours() - 12 : d.getHours());
        const suffix = d.getHours() > 11 ? 'PM' : 'AM';

        return `${hours}:${d.getMinutes()} ${suffix} · ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
    }

    return (
        <div
            className={styles.tweet}
            ref={tweetRef}
            style={{
                boxShadow: hover
                    ? "5px 5px 50px -1px rgba(0,0,0,0.4)"
                    : "5px 5px 10px -5px rgba(0,0,0,0.4)",
            }}
        >
            <div className={styles.head}>
                <div
                    className={styles.pfp}
                    style={{
                        backgroundImage: `url(${company.picture})`,
                    }}
                />
                <div className={styles.names}>
                    <div className={styles.displayName}>
                        {company.name}
                        <div ref={checkmarkPosition} />
                    </div>
                    <div className={styles.handle}>{company.handle}</div>
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
            <br />
            <div className={styles.foot}>
                <span>{formatDate(tweet.date)}</span>
                <span>|</span>
                <span>
                    <Reply />
                    {tweet.interactions.replies}
                </span>
                <span>
                    <Retweet />
                    {tweet.interactions.retweets}
                </span>
                <span>
                    <Like />
                    {tweet.interactions.likes}
                </span>
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
