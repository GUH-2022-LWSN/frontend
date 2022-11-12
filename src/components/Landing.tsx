import styles from './Landing.module.scss';

interface LandingProps {
    start(): void;
    end(): void;
}

function Landing(props: LandingProps) {
    const { start } = props;

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
            <button
                className={styles.goButton}
                onClick={start}
            >
                Start Game
            </button>
        </div>
    );
}

export default Landing;