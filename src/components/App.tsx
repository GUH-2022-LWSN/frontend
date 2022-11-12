import { useState } from "react";
import styles from "./App.module.scss";
import Game from "./Game";
import Landing from "./Landing";
import Leaderboard from "./Leaderboard";

const App = () => {
    const [gameState, setGameState] = useState<'START' | 'GAMEPLAY' | 'END'>('END');

    return (
        <div className={styles.page}>   
            {
                gameState === 'START'
                    ? <Landing 
                        start={() => setGameState('GAMEPLAY')} 
                        end={() => setGameState('END')}
                      />
                    : gameState === 'GAMEPLAY'
                        ? <Game />
                        : <Leaderboard restart={() => setGameState('START')} />
            }
        </div>
    );
};

export default App;
