import React from "react";

import "./StandardDisplay.css";

const StandardDisplay = () => {
  const gameState = {
    Home: {
      Points: 0,
      TeamName: "Nom de l'équipe à domicile",
      TimeoutCounts: 0,
    },
    Guest: {
      Points: 0,
      TeamName: "Nom de l'équipe invitée",
      TimeoutCounts: 0,
    },
    Timer: {
      value: "00:00",
    },
    Period: 1,
    Set: 0,
  };

  const periodOrSet = gameState.Period || gameState.Set;

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
          src="/_Stramatel_Logo_FR_2.png"
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
