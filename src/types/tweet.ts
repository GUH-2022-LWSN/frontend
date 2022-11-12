export type TweetInfo = {
    user: {
        pfp: string;
        displayName: string;
        handle: string;
    };
    body: string;
    attachment: string | null;
    stats: {
        replies: number;
        likes: number;
        retweets: number;
        date: string; // TODO: Make this a Date()
    };
};
