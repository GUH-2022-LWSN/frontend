import { useEffect, useRef, useState, useCallback } from "react";
import Progress from "./Progress";
import TwoTweets from "./TwoTweets";

import Checkmark from "./Checkmark";
import Score from "./Score";
import { Tweet as ITweet } from "../types/tweet";
import { Company as ICompany } from "../types/company";

const Game = () => {
    const [selectedTweet, setSelectedTweet] = useState<0 | 1 | 2>(0);
    const [disabled, setDisabled] = useState<boolean>(false);

    const [tweet1, setTweet1] = useState<ITweet | null>(null);
    const [tweet2, setTweet2] = useState<ITweet | null>(null);
    const [company, setCompany] = useState<ICompany | null>(null);

    const spaceRef = useRef<HTMLDivElement | null>(null);
    const tweet1Ref = useRef<HTMLElement | null>(null);
    const tweet2Ref = useRef<HTMLElement | null>(null);
    const tweet1CMRef = useRef<HTMLElement | null>(null);
    const tweet2CMRef = useRef<HTMLElement | null>(null);

    const [t1ClientRect, setT1ClientRect] = useState<null | DOMRect>(null);
    const [t2ClientRect, setT2ClientRect] = useState<null | DOMRect>(null);

    useEffect(() => {
        let alive = true;
        let cT1: DOMRect | null = null;
        let cT2: DOMRect | null = null;

        getTweetsFromServer();

        const setRects = () => {
            if (tweet1Ref.current) {
                const t1 = tweet1Ref.current.getBoundingClientRect();
                if (
                    !cT1 ||
                    t1.left !== cT1.left ||
                    t1.right !== cT1.right ||
                    t1.top !== cT1.top ||
                    t1.bottom !== cT1.bottom
                ) {
                    cT1 = t1;
                    setT1ClientRect(t1);
                }
            }
            if (tweet2Ref.current) {
                const t2 = tweet2Ref.current.getBoundingClientRect();
                if (
                    !cT2 ||
                    t2.left !== cT2.left ||
                    t2.right !== cT2.right ||
                    t2.top !== cT2.top ||
                    t2.bottom !== cT2.bottom
                ) {
                    cT2 = t2;
                    setT2ClientRect(t2);
                }
            }
        };

        const aframe = () => {
            setRects();
            if (alive) requestAnimationFrame(aframe);
        };
        requestAnimationFrame(aframe);
        return () => {
            alive = false;
        };
    }, []);

    const [level, setLevel] = useState(1);
    const [progress, setProgress] = useState(0);
    const [score, setScore] = useState(0);
    const onDrop = useCallback((selected: 1 | 2) => {
        setProgress((oldProg) => {
            let newProg = 0;
            setLevel((oldLevel) => {
                newProg = oldProg + 1 / 2 ** (oldLevel + 1);
                // Float rounding...
                if (newProg < 0.99999) return oldLevel;
                return oldLevel + 1;
            });
            if (newProg < 0.99999) return newProg;
            return 0;
        });
        setScore((oldScore) => oldScore + 8);
        setDisabled(true);
        setTimeout(() => {
            setDisabled(false);
        }, 3000);
    }, []);

    const getTweetsFromServer = () => {
        // fetch(`${process.env.REACT_APP_SERVER_URL}/getTweets`).then((resp) => {
            const resp = {
                "company_id": "c901ae6a-1d48-4a",
                "name": "Elon Musk",
                "handle": "@elonmusk",
                "picture": "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg",
                "followers": 15300000,
                "following": 130,
                "joined_date": "2009-06-01",
                "tweets": [
                    {
                        "id_num": "d9a55b10-6fcb-4f",
                        "body": "ðŸª¦ðŸ¤–",
                        "vibe": "Soon",
                        "retweets": 18100,
                        "quote_tweets": 4157,
                        "likes": 223800,
                        "date": "2022-11-12T07:36:00",
                        "attachment": ""
                    },
                    {
                        "id_num": "55eb91dd-119e-4b",
                        "body": "ðŸ¤¡",
                        "vibe": "Soon",
                        "retweets": 18100,
                        "quote_tweets": 4327,
                        "likes": 193600,
                        "date": "2022-11-12T05:12:00",
                        "attachment": ""
                    }
                ],
            };

            setCompany({
                company_id: resp.company_id,
                name: resp.name,
                handle: resp.handle,
                picture: resp.picture,
                followers: resp.followers,
                following: resp.following,
                joined_date: resp.joined_date,
            });

            setTweet1({
                attachment: resp.tweets[0].attachment,
                body: resp.tweets[0].body,
                date: new Date(resp.tweets[0].date),
                interactions: {
                    likes: resp.tweets[0].likes,
                    replies: 0,
                    quote_tweets: resp.tweets[0].quote_tweets,
                    retweets: resp.tweets[0].retweets,
                },
                tweet_id: resp.tweets[0].id_num,
                vibe: resp.tweets[0].vibe,
            });

            setTweet2({
                attachment: resp.tweets[1].attachment,
                body: resp.tweets[1].body,
                date: new Date(resp.tweets[1].date),
                interactions: {
                    likes: resp.tweets[1].likes,
                    replies: 0,
                    quote_tweets: resp.tweets[1].quote_tweets,
                    retweets: resp.tweets[1].retweets,
                },
                tweet_id: resp.tweets[1].id_num,
                vibe: resp.tweets[1].vibe,
            });
        // });
    };

    if (!tweet1 || !tweet2 || !company) {
        return null;
    }

    return (
        <>
            <Checkmark
                setSelected={setSelectedTweet}
                t1ClientRect={t1ClientRect}
                t2ClientRect={t2ClientRect}
                tweet1CMRef={tweet1CMRef}
                tweet2CMRef={tweet2CMRef}
                spaceRef={spaceRef}
                onDrop={onDrop}
                disabled={disabled}

                correctAnswer={2}
            />

            <Score score={score} />
            <TwoTweets
                company={company}
                tweet1={tweet1}
                tweet2={tweet2}
                selectedTweet={selectedTweet}
                tweet1Ref={tweet1Ref}
                tweet2Ref={tweet2Ref}
                tweet1CMRef={tweet1CMRef}
                tweet2CMRef={tweet2CMRef}
            />
            <div ref={spaceRef} style={{ flexGrow: 1 }} />
            <Progress level={level} progress={progress} />
        </>
    );
};

export default Game;
