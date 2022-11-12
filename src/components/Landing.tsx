interface LandingProps {
    start(): void;
}

function Landing(props: LandingProps) {
    const { start } = props;

    return (
        <div>
            <button onClick={start}>Start Game</button>
        </div>
    );
}

export default Landing;