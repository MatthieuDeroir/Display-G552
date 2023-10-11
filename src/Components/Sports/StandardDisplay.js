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
            console.log('incomingGameState', incomingGameState)
            setGameState(incomingGameState);
        }
    }, [incomingGameState]);
  const periodOrSet = gameState?.Period || gameState?.Set || "";
    const timer = gameState?.Timer?.Value || savedGameState?.Timer?.Value || "";
    const possessionHome = gameState?.Home.Possession || savedGameState?.Home.Possession || "";
    const possessionGuest = gameState?.Guest.Possession || savedGameState?.Guest.Possession || "";
    const homeTeamName = gameState?.Home?.TeamName || savedGameState?.Home?.TeamName || "";
    const homeTeamFouls = gameState?.Home?.Fouls.Team.toString() || savedGameState?.Home?.Fouls.Team.toString() || 0;
    const guestTeamName = gameState?.Guest?.TeamName || savedGameState?.Guest?.TeamName || "";
    const guestTeamFouls = gameState?.Guest?.Fouls.Team.toString() || savedGameState?.Guest?.Fouls.Team.toString() || 0;
    const homeTeamScore = gameState?.Home?.Points?.toString() || savedGameState?.Home?.Points?.toString() || 0;
    const guestTeamScore = gameState?.Guest?.Points?.toString() || savedGameState?.Guest?.Points?.toString() || 0;
    const homeTeamTimeouts = gameState?.Home?.Timeout?.Count || savedGameState?.Home?.Timeout?.Count || "";
    const TimeoutsTimer = gameState?.Home?.Timeout?.Time || savedGameState?.Home?.Timeout?.Time || "";
    const guestTeamTimeouts = gameState?.Guest?.Timeout?.Counts || savedGameState?.Guest?.Timeout?.Counts || "";
    const guestTeamTimeoutsTimer = gameState?.Guest?.Timeout?.Time || savedGameState?.Guest?.Timeout?.Time || "";



    // useEffect(() => {
    //     setInterval(() => {
    //         console.log('possessionHome', possessionHome)
    //         console.log('possessionGuest', possessionGuest)
    //         console.log('homeTeamFouls', homeTeamFouls)
    //         console.log('guestTeamFouls', guestTeamFouls)
    //         console.log('homeTeamTimeouts', homeTeamTimeouts)
    //         console.log('guestTeamTimeouts', guestTeamTimeouts)
    //         console.log('TimeoutsTimer', TimeoutsTimer)
    //     })
    // }, 1000)



  return (
    <div class="scoreboard">
      <div class="team-display home">
        <span class="team-score-display">{homeTeamScore}</span>
        <span class="team-name-display">{homeTeamName}</span>

          <div className="timeout-left timeout-display">
              {
                  [...Array(3)].map((_, i) => {
                      return i < homeTeamTimeouts
                          ? <div className="circleIcon filled" key={i}></div>
                          : <div className="circleIcon empty" key={i}></div>;
                  })
              }
          </div>
          {TimeoutsTimer === "0:00" ? <div className="timer-timeout">{homeTeamFouls}</div> : <div class="timer-timeout">{TimeoutsTimer}</div>}
      </div>

      <div class="middle-section">
        <div class="period">
          { possessionHome ?
              <div className="arrow-icon-left"></div>
           : <div className="arrow-icon-left hidden" ></div>}

          <span class="period-number">{periodOrSet}</span>

          {possessionGuest ?
              <div className="arrow-icon-right"></div>
           : <div className="arrow-icon-right hidden"></div>
          }
        </div>
          <img
              className="logo-fiba"
              style={{visibility: "hidden"}}
              src="images/fiba.png"
              alt="logo"
          />
          <div className="timer">{timer}</div>
          <img
              className="logo-fiba"
              src="images/fiba.png"
              alt="logo"
          />
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
              {
                  [...Array(3)].map((_, i) => {
                      return i < guestTeamTimeouts
                          ? <div className="circleIcon filled" key={i}></div>
                          : <div className="circleIcon empty" key={i}></div>;
                  })
              }
          </div>
          {TimeoutsTimer === "0:00" ? <div className="timer-timeout">{guestTeamFouls}</div> : null}


      </div>
    </div>
  );

};

export default StandardDisplay;
