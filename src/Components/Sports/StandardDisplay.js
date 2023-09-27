import React from 'react';
import './StandardDisplay.css';

const StandardDisplay = ({ gameState }) => {

    const {
        Home,
        Guest,
        Timer,
        Period,
        Set,

    } = gameState;

    const periodOrSet = Period || Set;

    return (
        <div className="standard-container">
            <div className="team home">
                <h2 className="team-name">{Home.TeamName}</h2>
                <p className="team-score">{Home.Points}</p>
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
                <p className="team-score">{Guest.Points}</p>
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
