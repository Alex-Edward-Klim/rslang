import React from "react";
import { NavLink } from "react-router-dom";
import "./gameCard.scss";

function GameCard({ path, name }) {
  return (
    <NavLink to={path} className="textbook-game">
      <h4 className="textbook-game__title">{name}</h4>
    </NavLink>
  );
}

export default GameCard;
