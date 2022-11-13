import styles from "./Landing.module.scss";

interface LandingProps {
    start(): void;
    twitterHandle: string;
    setTwitterHandle(twitterHandle: string): void;
}

function Landing(props: LandingProps) {
    const { start, twitterHandle, setTwitterHandle } = props;

    return (
        <div className={styles.landingWrapper}>
            <img
                alt="JustPhish Logo"
                className={styles.logo}
                src="/photo-white-512.png"
            />
            <h1 className={styles.welcomeText}>Welcome to JustPhish*</h1>
            <sub>* Final name TBC!</sub>
            <br />
            <div className={styles.twitterHandleWrapper}>
                <span className={styles.twitterHandlePrefix}>@</span>
                <input
                    className={styles.twitterHandleInput}
                    onChange={(e) => {
                        setTwitterHandle(e.target.value);
                    }}
                    placeholder="Your Twitter Handle"
                    value={twitterHandle}
                    onKeyDown={(e) => {
                        if (e.code === "Enter") {
                            if (twitterHandle !== "") start();
                        }
                    }}
                />
            </div>
            <button
                className={styles.goButton}
                disabled={!twitterHandle}
                onClick={() => {
                    if (twitterHandle !== "") start();
                }}
            >
                Start Game
            </button>
        </div>
    );
}

export default Landing;
