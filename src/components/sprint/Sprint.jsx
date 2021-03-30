import "./sprint.scss";

import audioOff from "../../images/icons/audioOff.png";
import audioOn from "../../images/icons/audioOn.png";
import closeImg from "../../images/icons/closeBtn.png";
import emptyCircle from "../../images/icons/emptyCircle.png";
import circleCorrectAnswer from "../../images/icons/circleCorrectAnswer.png";
import branchImg from "../../images/sprint/branch.png";
import birdImg from "../../images/sprint/bird.png";
import leftArrow from "../../images/sprint/leftArrow.png";
import rigthArrow from "../../images/sprint/rigthArrow.png";

import { useState } from "react";
import SprintTimer from "./SprintTimer";

const Sprint = () => {
    // TODO: вынести в компоненты: audio,  timer, 
    // const [isAudioOn, setIsAudioOn] = useState(false); 
    
    const [score, setScore] = useState(0);
    const [pointsPerWord, setPointsPerWord] = useState(10);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [winStreak, setWinStreak] = useState(0);
    const [isCorrectTranslation, setIsCorrectTranslation] = useState(null)

    let birdsQuantity;
    switch (pointsPerWord) {
        case 10:
            birdsQuantity = 1;
            break;
        case 20:
            birdsQuantity = 2;
            break;
        case 40:
            birdsQuantity = 4;
            break;
        case 80:
            birdsQuantity = 4;
            break;
        default:
            break;
    }

  const bird = (
    <img
      src={birdImg}
      alt="bird"
      className="sprint__game-area__birds-wrapper__birds__item"
    />
  );


  return (
    <div className="sprint">
      <header className="sprint__header">
        <SprintTimer setIsTimeUp={setIsTimeUp}/>
        <div className="sprint__header__btns">
          <img
            alt="sound btn"
            className="sprint__header__btns__audio"
            src={audioOff}
          />
          <img
            alt="close btn"
            className="sprint__header__btns__exit"
            src={closeImg}
          />
        </div>
      </header>
      <div className="sprint__game-area">
        <p className="sprint__game-area__total-score">33</p>
        <div className="sprint__game-area__wrapper">
          <div className="sprint__game-area__streak">
            <img src={emptyCircle} alt="empty circle" />
            <img src={emptyCircle} alt="empty circle" />
            <img src={emptyCircle} alt="empty circle" />
          </div>
          <p className="sprint__game-area__current-points">
            +{10} очков за слово
          </p>
          <div className="sprint__game-area__birds-wrapper">
            <div className="sprint__game-area__birds-wrapper__birds">
              {bird}
              {bird}
              {bird}
              {bird}
            </div>
            <img src={branchImg} alt="branch" className="sprint__game-area__birds-wrapper__branch"/>
          </div>
          <p className="sprint__game-area__main-word">Forest</p>
          <p className="sprint__game-area__second-word">Лес</p>
          <div className="sprint__game-area__indicator">
            <img src={circleCorrectAnswer} alt="правильный ответ" />
          </div>
          <div className="sprint__game-area__answer-btn">
            <p className="sprint__game-area__answer-btn__wrong sprint__game-area__answer-btn__btn">Неверно</p>
            <p className="sprint__game-area__answer-btn__right sprint__game-area__answer-btn__btn">Верно</p>
          </div>
        </div>
      </div>
      <div className="sprint__keyboard-btns">
        <img alt="left arrow" src={leftArrow} />
        <img alt="rigth arrow" src={rigthArrow} />
      </div>
    </div>
  );
};

export default Sprint;
