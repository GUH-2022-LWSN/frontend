import styles from "./Landing.module.scss";

interface LandingProps {
    start(): void;
    twitterHandle: string;
    setTwitterHandle(twitterHandle: string): void;
}

function Landing(props: LandingProps) {
    const { start, twitterHandle, setTwitterHandle } = props;

    const sth = (value: string) => {
        setTwitterHandle(value.replaceAll("@", "").substring(0, 32));
    };

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
                        sth(e.target.value);
                    }}
                    placeholder="Your Twitter Handle"
                    value={twitterHandle}
                    onKeyDown={(e) => {
                        if (e.code === "Enter") {
                            if (twitterHandle !== "") start();
                        }
                    }}
                    autoFocus
                />
            </div>
            <button
                className={styles.goButton}
                disabled={!twitterHandle}
                onClick={() => {
                    if (twitterHandle !== "") start();
                }}
                style={{
                    cursor: twitterHandle ? 'pointer' : 'default',
                }}
            >
                Start Game
            </button>
        </div>
    );
}

export default Landing;
