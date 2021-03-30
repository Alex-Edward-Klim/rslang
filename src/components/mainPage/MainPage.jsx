import React from "react";
import { NavLink } from "react-router-dom";
import "./mainPage.scss";

function MainPage() {

  return (
    <div className="main-page">
      <NavLink to={`/elTextBook`} >
        <div className="" >
          <h2 className="">Электронный учебник</h2>
        </div>
      </NavLink>
      <NavLink to={`/vocabulary`} >
        <div className="" >
          <h2 className="">Словарь</h2>
        </div>
      </NavLink>
      <NavLink to={`/settings`} >
        <div className="" >
          <h2 className="">Настройки</h2>
        </div>
      </NavLink>
    </div>
  )
}

export default MainPage