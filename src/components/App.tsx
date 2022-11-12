import React, { useEffect, useRef, useState } from "react";
import Progress from "./Progress";
import TwoTweets from "./TwoTweets";

import styles from "./App.module.scss";
import Checkmark from "./Checkmark";

const App = () => {
    const [selectedTweet, setSelectedTweet] = useState<0 | 1 | 2>(0);

    const tweet1Ref = useRef<HTMLElement | null>(null);
    const tweet2Ref = useRef<HTMLElement | null>(null);

    const [t1ClientRect, setT1ClientRect] = useState<null | DOMRect>(null);
    const [t2ClientRect, setT2ClientRect] = useState<null | DOMRect>(null);

    const setRects = () => {
        if (tweet1Ref.current)
            setT1ClientRect(tweet1Ref.current.getBoundingClientRect());
        if (tweet2Ref.current)
            setT2ClientRect(tweet2Ref.current.getBoundingClientRect());
    };
    useEffect(() => {
        setRects();
        window.addEventListener("resize", setRects);
        return () => {
            window.removeEventListener("resize", setRects);
        };
    }, []);

    return (
        <div className={styles.page}>
            <Checkmark
                setSelected={setSelectedTweet}
                t1ClientRect={t1ClientRect}
                t2ClientRect={t2ClientRect}
            />

            <TwoTweets
                tweet1={{
                    user: {
                        displayName: "Test User",
                        handle: "hi",
                        pfp: "http://placekitten.com/48/48",
                    },
                    body: "Hi!!",
                    attachment: "http://placekitten.com/1000/500",
                    stats: {
                        replies: 0,
                        retweets: 0,
                        likes: 0,
                        date: "Just now",
                    },
                    hover: selectedTweet === 1,
                }}
                tweet2={{
                    user: {
                        displayName: "Test User",
                        handle: "hi",
                        pfp: "http://placekitten.com/48/48",
                    },
                    body: "Hi!!",
                    attachment: "http://placekitten.com/1000/500",
                    stats: {
                        replies: 0,
                        retweets: 0,
                        likes: 0,
                        date: "Just now",
                    },
                    hover: selectedTweet === 2,
                }}
                tweet1Ref={tweet1Ref}
                tweet2Ref={tweet2Ref}
            />
            <div style={{ flexGrow: 1 }} />
            <Progress level={1} progress={0.7} />
        </div>
    );
};

export default App;
