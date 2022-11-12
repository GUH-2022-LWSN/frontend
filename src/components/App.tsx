import { useState } from "react";
import styles from "./App.module.scss";
import Game from "./Game";
import Landing from "./Landing";
import Leaderboard from "./Leaderboard";

const App = () => {
    const [gameState, setGameState] = useState<"START" | "GAMEPLAY" | "END">(
        "START"
    );

    return (
        <div className={styles.page}>
            {gameState === "START" ? (
                <Landing start={() => setGameState("GAMEPLAY")} />
            ) : gameState === "GAMEPLAY" ? (
                <Game end={() => setGameState("END")} />
            ) : (
                <Leaderboard restart={() => setGameState("START")} />
            )}
        </div>
    );
};

export default App;
