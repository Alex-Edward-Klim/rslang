import "./sprint.scss";

import audioOff from "./assets/icons/audioOff.png";
import audioOn from "./assets/icons/audioOn.png";
import closeImg from "./assets/icons/closeBtn.png";
import emptyCircleSrc from "./assets/icons/emptyCircle.png";
import circleCorrectAnswerSrc from "./assets/icons/circleCorrectAnswer.png";
import branchImg from "./assets/images/branch.png";
import birdImg from "./assets/images/bird.png";
import leftArrow from "./assets/images/leftArrow.png";
import rightArrow from "./assets/images/rightArrow.png";

import { useEffect, useState } from "react";
import axios from "axios";
import SprintTimer from "./sprintTimer/SprintTimer";

const Sprint = () => {
  // TODO: change api url
  const apiUrl = "https://rslang-server-2021.herokuapp.com";
  const wordListUrl = `${apiUrl}/words`;
  // TODO: вынести в компоненты: audio,  timer,
  // const [isAudioOn, setIsAudioOn] = useState(false);

  const [wordList, setWordList] = useState();
  const [score, setScore] = useState(0);
  const [pointsPerWord, setPointsPerWord] = useState(10);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [winStreak, setWinStreak] = useState(0);
  const [isCorrectTranslation, setIsCorrectTranslation] = useState(null);
  const [mainWord, setMainWord] = useState("");
  const [secondWord, setSecondWord] = useState("");
  const [round, setRound] = useState(1);

  //
  const [rightAnswerList, setRightAnswerList] = useState([]);
  const [wrongAnswerList, setWrongAnswerList] = useState([]);
  //

  let birdsQuantity = 1;
  switch (pointsPerWord) {
    case 10:
      birdsQuantity = 1;
      break;
    case 20:
      birdsQuantity = 2;
      break;
    case 40:
      birdsQuantity = 3;
      break;
    case 80:
      birdsQuantity = 4;
      break;
    default:
      break;
  }

  const getSecondWord = (mainWord) => {
    const randomNumber = Math.round(Math.random() * 100);

    let secondWord;

    if (randomNumber >= 50) {
      secondWord = mainWord;
      setIsCorrectTranslation(true);
    } else {
      secondWord = wordList[Math.floor(Math.random() * wordList.length)];
      setIsCorrectTranslation(false);
    }
    setSecondWord(secondWord);

    return secondWord;
  };

  const renderGame = () => {
    if (!wordList) return;

    const mainWord = wordList[Math.floor(Math.random() * wordList.length)];
    setMainWord(mainWord);

    getSecondWord(mainWord);
  };

  const countRightAnswer = () => {
    let currentWinStreak = winStreak;

    if (winStreak < 3) {
      currentWinStreak += 1;
      setWinStreak(currentWinStreak);
    } else if (winStreak === 3) {
      currentWinStreak = 0;
      setWinStreak(0);
      if (pointsPerWord < 80) {
        setPointsPerWord(pointsPerWord * 2);
      }
    }

    const currentRightAnswerList = rightAnswerList;
    currentRightAnswerList.push(mainWord);
    setRightAnswerList(currentRightAnswerList);

    setScore(score + pointsPerWord);
  };
  // 
  const setWrongAnswer = () => {
    let currentWinStreak = winStreak;

    if (currentWinStreak > 0) {
      currentWinStreak -= 1;
      setWinStreak(currentWinStreak);
    }

  };
  // 


  const checkAnswerTrue = () => {
    if (isCorrectTranslation) {
      countRightAnswer();

      console.log("+1");
    } else {
      console.log("-1");
    }
    setRound(round + 1);
  };

  const checkAnswerFalse = () => {
    if (!isCorrectTranslation) {
      countRightAnswer();

      console.log("+1");
    } else {
      console.log("-1");
    }
    setRound(round + 1);
  };

  useEffect(() => {
    const currentUrl = wordListUrl;
    axios.get(currentUrl).then((resp) => {
      const allWords = resp.data;
      setWordList(allWords);
    });
  }, []);

  useEffect(() => {
    if (isTimeUp) {
      console.log("end game");
    }
  }, [isTimeUp]);

  useEffect(() => {
    renderGame();
  }, [wordList, round]);

  const bird = (
    <img
      src={birdImg}
      alt="bird"
      className="sprint__game-area__birds-wrapper__birds__item"
    />
  );

  const emptyCircle = <img src={emptyCircleSrc} alt="empty circle" />;
  const rightAnswerCircle = (
    <img
      src={circleCorrectAnswerSrc}
      alt="right answer circle"
      className="sprint__game-area__streak__right-answer"
    />
  );
  
  const ShowWinStreak = () => {
    if (pointsPerWord === 80) {
      return rightAnswerCircle;
    }
    return (
      <>
        {winStreak > 0 ? rightAnswerCircle : emptyCircle}
        {winStreak > 1 ? rightAnswerCircle : emptyCircle}
        {winStreak > 2 ? rightAnswerCircle : emptyCircle}
      </>
    );
  };

  if (!wordList || wordList.length === 0) return <p>Загрузка...</p>;


  return (
    <div className="sprint">
      <header className="sprint__header">
        {/* <SprintTimer setIsTimeUp={setIsTimeUp}/> */}
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
        <p className="sprint__game-area__total-score">{score}</p>
        <div className="sprint__game-area__wrapper">
          <div className="sprint__game-area__streak">
            {ShowWinStreak()}
          </div>
          <p className="sprint__game-area__current-points">
            +{pointsPerWord} очков за слово
          </p>
          <div className="sprint__game-area__birds-wrapper">
            <div className="sprint__game-area__birds-wrapper__birds">
              {bird}
              {birdsQuantity > 1 && bird}
              {birdsQuantity > 2 && bird}
              {birdsQuantity > 3 && bird}
            </div>
            <img
              src={branchImg}
              alt="branch"
              className="sprint__game-area__birds-wrapper__branch"
            />
          </div>
          <p className="sprint__game-area__main-word">{mainWord.word}</p>
          <p className="sprint__game-area__second-word">
            {secondWord.wordTranslate}
          </p>
          <div className="sprint__game-area__indicator">
            {/* <img src={circleCorrectAnswer} alt="правильный ответ" /> */}
          </div>
          <div className="sprint__game-area__answer-btn">
            <p
              className="sprint__game-area__answer-btn__wrong sprint__game-area__answer-btn__btn"
              onClick={checkAnswerFalse}
            >
              Неверно
            </p>
            <p
              className="sprint__game-area__answer-btn__right sprint__game-area__answer-btn__btn"
              onClick={checkAnswerTrue}
            >
              Верно
            </p>
          </div>
        </div>
      </div>
      <div className="sprint__keyboard-btns">
        <img alt="left arrow" src={leftArrow} />
        <img alt="right arrow" src={rightArrow} />
      </div>
    </div>
  );
};

export default Sprint;