import { useState } from "react";
import styles from "./App.module.scss";
import Game from "./Game";
import Landing from "./Landing";

const App = () => {
    const [gameStarted, setGameStarted] = useState<boolean>(false);

    return (
        <div className={styles.page}>   
            {
                gameStarted
                    ? <Game />
                    : <Landing start={() => setGameStarted(true)} />
            }
        </div>
    );
};

export default App;
