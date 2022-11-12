import { useEffect, useRef, useState, useCallback } from "react";
import Progress from "./Progress";
import TwoTweets from "./TwoTweets";

import Checkmark from "./Checkmark";
import Score from "./Score";

const Game = () => {
    const [selectedTweet, setSelectedTweet] = useState<0 | 1 | 2>(0);
    const [disabled, setDisabled] = useState<boolean>(false);

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
                tweet1CMRef={tweet1CMRef}
                tweet2CMRef={tweet2CMRef}
            />
            <div ref={spaceRef} style={{ flexGrow: 1 }} />
            <Progress level={level} progress={progress} />
        </>
    );
};

export default Game;
