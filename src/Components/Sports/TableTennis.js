import React from 'react';
import './Sport.css'; // CSS import

const TableTennis = ({ gsi }) => {
    return (
        <div className="table-tennis-container">
            <h1>Table Tennis Match</h1>
            <div className="score-container">
                <div className="team">
                    <h2 className="team-name">Home</h2>
                    <p className="team-score">Home_TotalPoints</p>
                    <p className="team-sets-won">Home_SetsWon</p>
                    <p className="team-points-by-set">Home_PointsBySet</p>
                    <p className="team-service">Home_Service</p>
                    <p className="team-winner">Home_Winner</p>
                </div>
                <div className="team">
                    <h2 className="team-name">Guest</h2>
                    <p className="team-score">Guest_TotalPoints</p>
                    <p className="team-sets-won">Guest_SetsWon</p>
                    <p className="team-points-by-set">Guest_PointsBySet</p>
                    <p className="team-service">Guest_Service</p>
                    <p className="team-winner">Guest_Winner</p>
                </div>
            </div>
            <div className="chrono-container">
                <p className="chrono">Chrono</p>
            </div>
            <div className="timer-status-container">
                <p className="timer-status">Timer_Status</p>
                <p className="led">LED</p>
            </div>
            <div className="display-container">
                <p className="clock-display">Clock_Display</p>
                <p className="chrono-display">Chrono_Display</p>
            </div>
        </div>
    );
};

export default TableTennis;
