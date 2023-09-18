import React from 'react';
import './StandardDisplay.css';

const StandardDisplay = ({ gameState }) => {
    const placeholderState = {
        Home: {
            TeamName: "HOME",
            TotalPoints: "12",
            Timeout: { Count: 3 },
            Possession: true,
            Service: true,
            Exclusion: { Timer: "2:00" }
        },
        Guest: {
            TeamName: "GUEST",
            TotalPoints: "10",
            Timeout: { Count: 2 },
            Possession: false,
            Service: false,
            Exclusion: { Timer: "1:00" }
        },
        Timer: { Value: "10:00" },
        Period: 2,
        Set: null
    };

    const {
        Home,
        Guest,
        Timer,
        Period,
        Set,
    } = placeholderState;

    const periodOrSet = Period || Set;

    return (
        <div className="standard-container">
            <div className="team home">
                <h2 className="team-name">{Home.TeamName}</h2>
                <p className="team-score">{Home.TotalPoints}</p>
                <div className="team-timeouts">
                    {Array.from({ length: Home.Timeout.Count }).map((_, index) => (
                        <span key={index} className="timeout-circle"></span>
                    ))}
                </div>
                <p className="team-penalty-timer">{Home.Exclusion.Timer}</p>
            </div>

            <div className="center-section">
                <p className="period-set">{periodOrSet}</p>
                <p className="timer">{Timer.Value}</p>
                <div className="possession-service">
                    {Home.Possession && <span className="possession-arrow home"></span>}
                    {Guest.Possession && <span className="possession-arrow guest"></span>}
                </div>
            </div>

            <div className="team guest">
                <h2 className="team-name">{Guest.TeamName}</h2>
                <p className="team-score">{Guest.TotalPoints}</p>
                <div className="team-timeouts">
                    {Array.from({ length: Guest.Timeout.Count }).map((_, index) => (
                        <span key={index} className="timeout-circle"></span>
                    ))}
                </div>
                <p className="team-penalty-timer">{Guest.Exclusion.Timer}</p>
            </div>
        </div>
    );
};

export default StandardDisplay;
