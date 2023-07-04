import React from 'react';
import './Sport.css';

const Boxing = ({ gsi }) => {
    return (
        <div className="sport-container">
            <h1>Boxing Match</h1>
            <div className="score-container">
                <div className="team">
                    <h2 className="team-name">Home</h2>
                    <p className="team-warnings">Home_Warnings</p>
                </div>
                <div className="team">
                    <h2 className="team-name">Guest</h2>
                    <p className="team-warnings">Guest_Warnings</p>
                </div>
            </div>
            <div className="chrono-container">
                <p className="chrono">Chrono</p>
            </div>
            <div className="timer-status-container">
                <p className="timer-status">Timer_Status</p>
                <p className="timer-led">Timer_LED</p>
            </div>
            <div className="display-container">
                <p className="period">Period</p>
                <p className="horn">Horn</p>
            </div>
        </div>
    );
};

export default Boxing;
