import React from "react";
import Page from "./components/Page";
import TwoTweets from "./components/TwoTweets";

const App = () => {
    return (
        <Page>
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
                }}
            />
        </Page>
    );
};

export default App;
