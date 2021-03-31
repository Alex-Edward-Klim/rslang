import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import vocImg from "../../img/how-to-choose-english-dictionary.png"
import s from "./vocabulary.module.scss"

function Vocabulary() {

  return (
    <div className={s.vocabulary}>
      <div className={s.header}>
      <img src={vocImg} alt=""/>
      <h2>Словарь</h2>
      </div>
    </div>
  )
}

export default Vocabulary