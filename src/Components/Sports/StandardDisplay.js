import React, { useState, useEffect } from "react";

import "./StandardDisplay.css";

const StandardDisplay = ({gameState: incomingGameState}) => {

    // Check for gameState in localStorage
    const savedGameState = JSON.parse(localStorage.getItem('gameState'));
    const [gameState, setGameState] = useState(incomingGameState || savedGameState || {});

    useEffect(() => {
        // Store gameState in localStorage whenever it changes
        localStorage.setItem('gameState', JSON.stringify(gameState));
    }, [gameState]);

    useEffect(() => {
        // Update local gameState with incomingGameState if not null
        if (incomingGameState) {
            setGameState(incomingGameState);
        }
    }, [incomingGameState]);
  const periodOrSet = gameState?.Period || gameState?.Set || "";
    const timer = gameState?.Timer?.Value || savedGameState?.Timer?.Value || "00:00";
    const possession = gameState?.Possession || savedGameState?.Possession || "Home";
    const homeTeamName = gameState?.Home?.TeamName || savedGameState?.Home?.TeamName || "Home";
    const guestTeamName = gameState?.Guest?.TeamName || savedGameState?.Guest?.TeamName || "Guest";
    const homeTeamScore = gameState?.Home?.Points || savedGameState?.Home?.Points || "0";
    const guestTeamScore = gameState?.Guest?.Points || savedGameState?.Guest?.Points || "0";
    const homeTeamTimeouts = gameState?.Home?.Timeout?.Counts || savedGameState?.Home?.Timeout?.Counts || "0";
    const homeTeamTimeoutsTimer = gameState?.Home?.Timeout?.Timer || savedGameState?.Home?.Timeout?.Timer || "0";
    const guestTeamTimeouts = gameState?.Guest?.Timeout?.Counts || savedGameState?.Guest?.Timeout?.Counts || "0";
    const guestTeamTimeoutsTimer = gameState?.Guest?.Timeout?.Timer || savedGameState?.Guest?.Timeout?.Timer || "0";


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
        <div className="timeout-logo">
        <img
            className="logo-fiba"
            style={{visibility: "hidden"}}
            src="images/fiba_e&v_full_colour_port_Approved Equipment_vecto.jpg"
            alt="logo"
          />
          <div class="timer">{timer}</div>
          <img
            className="logo-fiba"
            src="images/fiba_e&v_full_colour_port_Approved Equipment_vecto.jpg"
            alt="logo"
          />
        </div>
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

    return (
        <div class="scoreboard">
            <div class="team-display home">
                <span class="team-score-display">{homeTeamScore}</span>
                <span class="team-name-display">{homeTeamName}</span>

                <div className="timeout-left">
                  {
                    Array.from(Array(homeTeamTimeouts), (e, i) => {
                        return <div className="circleIcon"></div>
                    })
                }
                </div>
                <div class="timer-timeout">{homeTeamTimeoutsTimer}</div>
            </div>

            <div class="middle-section">
                <div class="period">
                  {possession === "Home" ? <div className="possession-icon-left"></div> : null }
                    {/*<div className="arrow-icon-left"></div>*/}

                    <span class="period-number">{periodOrSet}</span>

                  {possession === "Guest" ? <div className="possession-icon-right"></div> : null}
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
                <span class="team-name-display">{guestTeamName}</span>

                <div className="timeout-right">
                    {
                  Array.from(Array(guestTeamTimeouts), (e, i) => {
                  return <div className="circleIcon"></div>
                })
                  }
                </div>
                <div class="timer-timeout">{guestTeamTimeoutsTimer}</div>
            </div>
        </div>
    );
};

export default StandardDisplay;
