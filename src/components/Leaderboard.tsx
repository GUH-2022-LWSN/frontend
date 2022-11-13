import styles from './Leaderboard.module.scss';

interface LeaderboardProps {
    restart(): void;
}

function Leaderboard(props: LeaderboardProps) {
    const { restart } = props;

    return (
        <div className={styles.leaderboardWrapper}>
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Money Spent on Twitter Blue</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1</strong></td>
                            <td>@bsnk</td>
                            <td>$160</td>
                        </tr>
                        <tr>
                            <td><strong>2</strong></td>
                            <td>@samhir01</td>
                            <td>$96</td>
                        </tr>
                        <tr>
                            <td><strong>3</strong></td>
                            <td>@Will_Newton</td>
                            <td>$72</td>
                        </tr>
                        <tr>
                            <td><strong>4</strong></td>
                            <td>@area</td>
                            <td>$48</td>
                        </tr>
                        <tr>
                            <td><strong>5</strong></td>
                            <td>@RossSmith09</td>
                            <td>$8</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button
                className={styles.goButton}
                onClick={restart}
            >
                Play Again
            </button>
        </div>
    );
}

export default Leaderboard;