import { useState } from "react";
import styles from "./App.module.scss";
import Game from "./Game";
import Landing from "./Landing";
import Leaderboard from "./Leaderboard";

const App = () => {
    const [gameState, setGameState] = useState<"START" | "GAMEPLAY" | "END">(
        "START"
    );
    const [twitterHandle, setTwitterHandle] = useState<string>('');

    return (
        <div className={styles.page}>
            {gameState === "START" ? (
                <Landing
                    start={() => setGameState("GAMEPLAY")}
                    twitterHandle={twitterHandle}
                    setTwitterHandle={setTwitterHandle}
                />
            ) : gameState === "GAMEPLAY" ? (
                <Game
                    end={() => setGameState("END")}
                    twitterHandle={twitterHandle}
                />
            ) : (
                <Leaderboard restart={() => setGameState("START")} />
            )}
        </div>
    );
};

export default App;
