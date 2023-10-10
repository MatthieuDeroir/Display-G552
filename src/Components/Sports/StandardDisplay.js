import React from "react";

import "./StandardDisplay.css";

const StandardDisplay = ({ gameState }) => {
  const periodOrSet = gameState.Period || gameState.Set;
  const timer = gameState.Timer ? gameState.Timer.Value : "00:00";
  const possession = gameState.Possession ? gameState.Possession : "Home";
  const homeTeamName = gameState.Home ? gameState.Home.TeamName : "Home";
  const guestTeamName = gameState.Guest ? gameState.Guest.TeamName : "Guest";
  const homeTeamScore = gameState.Home ? gameState.Home.Points : "0";
  const guestTeamScore = gameState.Guest ? gameState.Guest.Points : "0";
  const homeTeamTimeouts = gameState.Home ? gameState.Home.Timeout.Counts : "0";
  const homeTeamTimeoutsTimer = gameState.Home
    ? gameState.Home.Timeout.Timer
    : "0";
  const guestTeamTimeouts = gameState.Guest
    ? gameState.Guest.Timeout.Counts
    : "2";
  const guestTeamTimeoutsTimer = gameState.Guest
    ? gameState.Guest.Timeout.Timer
    : "0";

  return (
    <div class="scoreboard">
      <div class="team-display home">
        <span class="team-score-display">{homeTeamScore}</span>
        <span class="team-name-display">{homeTeamName}</span>

        <div className="timeout-left timeout-display">
          {Array.from(Array(homeTeamTimeouts), (e, i) => {
            return <div className="circleIcon"></div>;
          })}
        </div>
        <div class="timer-timeout">{homeTeamTimeoutsTimer}</div>
      </div>

      <div class="middle-section">
        <div class="period">
          {possession === "Home" ? (
            <div className="possession-icon-left"></div>
          ) : null}
          {/*<div className="arrow-icon-left"></div>*/}

          <span class="period-number">1</span>

          {possession === "Guest" ? (
            <div className="possession-icon-right"></div>
          ) : null}
          {/*<div className="arrow-icon-right"></div>*/}
        </div>
        <div class="timer">{timer}</div>
        <img
          className="logo"
          src="images/_Stramatel_Logo_FR_2.png"
          alt="logo"
        />
      </div>

      <div class="team-display guest">
        <span class="team-score-display">{guestTeamScore}</span>
        <span class="team-name-display team-name-right">{guestTeamName}</span>

        <div className="timeout-right timeout-display">
          {Array.from(Array(guestTeamTimeouts), (e, i) => {
            return <div className="circleIcon"></div>;
          })}
        </div>
        <div class="timer-timeout">{guestTeamTimeoutsTimer}</div>
      </div>
    </div>
  );
};

export default StandardDisplay;
