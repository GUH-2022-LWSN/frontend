import React, { useEffect, useRef, useState } from "react";
import Page from "./components/Page";
import Progress from "./components/Progress";
import TwoTweets from "./components/TwoTweets";

const App = () => {
    const [imagePos, setImagePos] = useState<{ left: number; top: number }>({
        left: 540,
        top: 720,
    });
    const [selectedTweet, setSelectedTweet] = useState<0 | 1 | 2>(0);

    const tweet1Ref = useRef<any>(null);
    const tweet2Ref = useRef<any>(null);
    const checkmarkRef = useRef<any>(null);

    useEffect(() => {
        if (tweet1Ref.current && tweet2Ref.current && checkmarkRef.current) {
            const tweet1X0 = tweet1Ref.current.offsetLeft;
            const tweet1Y0 = tweet1Ref.current.offsetTop;
            const tweet1X1 = tweet1Ref.current.offsetLeft + tweet1Ref.current.offsetWidth;
            const tweet1Y1 = tweet1Ref.current.offsetTop + tweet1Ref.current.offsetHeight;
    
            const tweet2X0 = tweet2Ref.current.offsetLeft;
            const tweet2Y0 = tweet2Ref.current.offsetTop;
            const tweet2X1 = tweet2Ref.current.offsetLeft + tweet2Ref.current.offsetWidth;
            const tweet2Y1 = tweet2Ref.current.offsetTop + tweet2Ref.current.offsetHeight;
    
            const checkmarkX0 = imagePos.left;
            const checkmarkY0 = imagePos.top;
            const checkmarkX1 = imagePos.left + checkmarkRef.current.offsetWidth;
            const checkmarkY1 = imagePos.top + checkmarkRef.current.offsetHeight;
    
            if (
                tweet1X0 < checkmarkX0 &&
                tweet1Y0 < checkmarkY0 &&
                tweet1X1 > checkmarkX1 &&
                tweet1Y1 > checkmarkY1
            ) {
                setSelectedTweet(1);
            } else if (
                tweet2X0 < checkmarkX0 &&
                tweet2Y0 < checkmarkY0 &&
                tweet2X1 > checkmarkX1 &&
                tweet2Y1 > checkmarkY1
            ) {
                setSelectedTweet(2);
            } else {
                setSelectedTweet(0);
            }
        }
    }, [imagePos]);

    return (
        <Page
            checkmarkRef={checkmarkRef}
            checkmarkImagePos={imagePos}
            checkmarkSetImagePos={setImagePos}    
        >
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
            <div style={{flexGrow: 1}} />
            <Progress level={1} progress={.70} />
        </Page>
    );
};

export default App;
