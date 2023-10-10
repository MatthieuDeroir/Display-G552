import React from 'react';
import './StandardDisplay.css';

const StandardDisplay = ({ gameState }) => {

    if (!gameState) return <div className="standard-container">Game data not available</div>;

    const {
        Home = {},
        Guest = {},
        Timer = {},
        Period,
        Set,
    } = gameState;

    const periodOrSet = Period || Set || "N/A";

    return (
        <div className="standard-container">
            <div className="team home">
                <h2 className="team-name">{Home.TeamName || "N/A"}</h2>
                <p className="team-score">{Home.Points || 0}</p>
                <div className="team-timeouts">
                    {Array.from({ length: Home.Timeout?.Count || 0 }).map((_, index) => (
                        <span key={index} className="timeout-circle"></span>
                    ))}
                </div>
                <p className="team-penalty-timer">{Home.Exclusion?.Timer || "N/A"}</p>
            </div>

            <div className="center-section">
                <p className="period-set">{periodOrSet}</p>
                <p className="timer">{Timer.Value || "00:00"}</p>
                <div className="possession-service">
                    {Home.Possession && <span className="possession-arrow home"></span>}
                    {Guest.Possession && <span className="possession-arrow guest"></span>}
                </div>
            </div>

            <div className="team guest">
                <h2 className="team-name">{Guest.TeamName || "N/A"}</h2>
                <p className="team-score">{Guest.Points || 0}</p>
                <div className="team-timeouts">
                    {Array.from({ length: Guest.Timeout?.Count || 0 }).map((_, index) => (
                        <span key={index} className="timeout-circle"></span>
                    ))}
                </div>
                <p className="team-penalty-timer">{Guest.Exclusion?.Timer || "N/A"}</p>
            </div>
        </div>
    );
};

export default StandardDisplay;
