import React from "react";
import Page from "./components/Page";
import Tweet from "./components/Tweet";

const App = () => {
    return (
        <>
            <Tweet
                tweet={{
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
                        date: "Just now"
                    },
                }}
            />
            <Page />
        </>
    );
};

export default App;
