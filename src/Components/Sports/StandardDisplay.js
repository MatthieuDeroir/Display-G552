import React, { useState, useEffect } from "react";

import "./StandardDisplay.css";

const StandardDisplay = ({ gameState: incomingGameState }) => {
  // Check for gameState in localStorage
  const savedGameState = JSON.parse(localStorage.getItem("gameState"));
  const [gameState, setGameState] = useState(
    incomingGameState || savedGameState || {}
  );

  useEffect(() => {
    // Store gameState in localStorage whenever it changes
    localStorage.setItem("gameState", JSON.stringify(gameState));
    console.log(gameState)

  }, [gameState]);

  useEffect(() => {
    // Update local gameState with incomingGameState if not null
    if (incomingGameState) {
      console.log("incomingGameState", incomingGameState);
      setGameState(incomingGameState);
    }
  }, [incomingGameState]);

  const cleanTeamName = (name) => {
    // Supprimez tous les "✝" de la chaîne
    return name.replace(/✝/g, '');
  };

  const formatTimer = (timerString) => {
    // Récupère les 5 premiers caractères ou moins si la chaîne est plus courte.
    const characters = timerString.slice(0, 5).split('');
  
    // Vérifie s'il y a moins de 5 caractères et, le cas échéant, ajoute des espaces vides jusqu'à ce qu'il y en ait 5.
    while (characters.length < 5) {
      characters.push(' '); // ajoute un espace vide à la liste, qui sera rendu comme un span vide.
    }
  
    // Map sur les caractères et renvoie les spans, avec une classe différente pour l'index 2.
    return characters.map((char, index) => {
      const className = index === 2 ? "character-different" : "character";
      return <span key={index} className={className}>{char}</span>;
    });
  };
  

  const periodOrSet = gameState?.Period || gameState?.Set || "1";
  const timer = formatTimer(
    gameState?.Timer?.Value || savedGameState?.Timer?.Value || "00:00"
  );
    const homeTeamName =
    cleanTeamName(gameState?.Home?.TeamName || savedGameState?.Home?.TeamName || "HOMEHOME");
  const guestTeamName =
    cleanTeamName(gameState?.Guest?.TeamName || savedGameState?.Guest?.TeamName || "GUEST");
  const homeTeamScore =
    gameState?.Home?.Points || savedGameState?.Home?.Points || "0";
  const guestTeamScore =
    gameState?.Guest?.Points || savedGameState?.Guest?.Points || "0";
  const homeTeamTimeouts =
    gameState?.Home?.Timeout?.Counts ||
    savedGameState?.Home?.Timeout?.Counts ||
    "3";

  const guestTeamTimeouts =
    gameState?.Guest?.Timeout?.Counts ||
    savedGameState?.Guest?.Timeout?.Counts ||
    "3";

  const possessionHome =
    gameState?.Home.Possession || savedGameState?.Home.Possession || false;
  const possessionGuest =
    gameState?.Guest.Possession || savedGameState?.Guest.Possession || true;

  const homeTeamFouls =
    gameState?.Home?.Fouls.Team.toString() ||
    savedGameState?.Home?.Fouls.Team.toString() ||
    "1";

  const guestTeamFouls =
    gameState?.Guest?.Fouls.Team.toString() ||
    savedGameState?.Guest?.Fouls.Team.toString() ||
    "1";

  const TimeoutsTimer =
    gameState?.Home?.Timeout?.Time ||
    savedGameState?.Home?.Timeout?.Time ||
    "1:00";

  return (
    <div class="scoreboard">
      <div class="team-display home">
        <span class="team-score-display">{homeTeamScore}</span>
        <span class="team-name-display">{homeTeamName}</span>

        <div className=" timeout-display">
          {[...Array(3)].map((_, i) => {
            return i < homeTeamTimeouts ? (
              <div className="circleIcon filled" key={i}></div>
            ) : (
              <div key={i}></div>
            );
          })}
        </div>
        <div className="timeout">
          {TimeoutsTimer === "0:00" ? (
            <span className="timeout-left timeout-texte">{homeTeamFouls}</span>
          ) : (
            <span class="timeout-left timeout-texte">{TimeoutsTimer}</span>
          )}
        </div>
      </div>

      <div class="middle-section">
        <div class="period">
          {possessionHome === true ? (
            <div className="arrow-icon-left"></div>
          ) : (
            <div className="arrow-icon-left hidden"></div>
          )}

          <span class="period-number">{periodOrSet}</span>

          {possessionGuest ? (
            <div className="arrow-icon-right"></div>
          ) : (
            <div className="arrow-icon-right hidden"></div>
          )}
        </div>
        <div className="time-logo">
        {/*   <img
            className="logo-fiba"
            style={{ visibility: "hidden" }}
            src="images/fiba.png"
            alt="logo"
          /> */}
          <div className="timer">{timer}</div>
       {/*    <img className="logo-fiba" src="images/fiba.png" alt="logo" /> */}
        </div>
        <img
          className="logo"
          src="images/_Stramatel_Logo_FR_2.gif"
          alt="logo"
        />
      </div>

      <div class="team-display guest">
        <span class="team-score-display team-name-right">{guestTeamScore}</span>
        <span class="team-name-display team-name-right">{guestTeamName}</span>

        <div className="timeout-display">
          {[...Array(3)].map((_, i) => {
            return i < guestTeamTimeouts ? (
              <div className="circleIcon filled" key={i}></div>
            ) : (
              <div key={i}></div>
            );
          })}
        </div>
        <div className="timeout">
          {TimeoutsTimer === "0:00" ? (
            <span className="timeout-left timeout-texte">{guestTeamFouls}</span>
          ) : (
            <span class="timeout-left timeout-texte">{TimeoutsTimer}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StandardDisplay;
