import React from "react";

import "./StandardDisplay.css";

const StandardDisplay = ({gameState}) => {
    const periodOrSet = gameState.Period || gameState.Set;
    const timer = gameState.Timer ? gameState.Timer.Value : "00:00";
    const homeTeamName = gameState.Home ? gameState.Home.TeamName : "Home";
    const guestTeamName = gameState.Guest ? gameState.Guest.TeamName : "Guest";
    const homeTeamScore = gameState.Home ? gameState.Home.Points : "0";
    const guestTeamScore = gameState.Guest ? gameState.Guest.Points : "0";
    const homeTeamTimeouts = gameState.Home ? gameState.Home.Timeout.Counts : "0";
    const guestTeamTimeouts = gameState.Guest ? gameState.Guest.Timeout.Counts : "0";


    return (
        <div class="scoreboard">
            <div class="team-display home">
                <span class="team-score-display">999</span>
                <span class="team-name-display">Domicile</span>

                <div className="timeout-left">
                    <div className="circleIcon"></div>
                    <div className="circleIcon"></div>
                    <div className="circleIcon"></div>
                </div>
                <div class="timer-timeout">00:00</div>
            </div>

            <div class="middle-section">
                <div class="period">
                    <div className="arrow-icon-left"></div>

                    <span class="period-number">1</span>
                    <div className="arrow-icon-right"></div>
                </div>
                <div class="timer">00:00</div>
                <img
                    className="logo"
                    src="images/_Stramatel_Logo_FR_2.png"
                    alt="logo"
                />
            </div>

            <div class="team-display guest">
                <span class="team-score-display">999</span>
                <span class="team-name-display">Invité</span>

                <div className="timeout-right">
                    <div className="circleIcon"></div>
                    <div className="circleIcon"></div>
                    <div className="circleIcon"></div>
                </div>
                <div class="timer-timeout">00:00</div>
            </div>
        </div>
    );
};

export default StandardDisplay;
