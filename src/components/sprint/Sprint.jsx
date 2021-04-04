import "./sprint.scss";

import audioOff from "./assets/icons/audioOff.png";
import audioOn from "./assets/icons/audioOn.png";
import fullscreenImg from "../../images/icons/fullscreen.png";
import emptyCircleSrc from "./assets/icons/emptyCircle.png";
import circleCorrectAnswerSrc from "./assets/icons/circleCorrectAnswer.png";
import circleWrongAnswerSrc from "./assets/icons/circleWrongAnswer.png";
import branchImg from "./assets/images/branch.png";
import birdImg from "./assets/images/bird.png";
import leftArrow from "./assets/images/leftArrow.png";
import rightArrow from "./assets/images/rightArrow.png";

import { useEffect, useRef, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import SprintTimer from "./sprintTimer/SprintTimer";
import { Redirect, useParams } from "react-router";
import StopGame from "../StopGame/StopGame";
import { useSelector } from "react-redux";
import { getUserDataFromState } from '../../redux/selectors';
import handlerWords from '../../Utils/handlerWords';

const Sprint = props => {
  // TODO: вынести в компоненты: audio,
  // const [isAudioOn, setIsAudioOn] = useState(false);

  const [score, setScore] = useState(0);
  const [pointsPerWord, setPointsPerWord] = useState(10);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [winStreak, setWinStreak] = useState(0);
  const [isCorrectTranslation, setIsCorrectTranslation] = useState(null);
  const [mainWord, setMainWord] = useState("");
  const [secondWord, setSecondWord] = useState("");
  const [round, setRound] = useState(1);
  const [rightAnswerList, setRightAnswerList] = useState([]);
  const [wrongAnswerList, setWrongAnswerList] = useState([]);

  const indicatorTrue = useRef(null);
  const indicatorFalse = useRef(null);

  const screen = useFullScreenHandle();

  const { launchmodule } = useParams();

  const {userId, token} = useSelector(getUserDataFromState);

  const propsData = props.location.propsData;
  let wordList = null;
  if (propsData) {
    wordList = propsData.data;
  }

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

  const showIndicator = (isTrueAnswer) => {
    const currentClass = "sprint__game-area__indicator__item__show";
    if (isTrueAnswer) {
      indicatorTrue.current.classList.add(currentClass);
    } else {
      indicatorFalse.current.classList.add(currentClass);
    }

    setTimeout(() => {
      indicatorTrue.current.classList.remove(currentClass);
      indicatorFalse.current.classList.remove(currentClass);
    }, 500);
  };

  const sendWord = (isTrueAnswer) => {
    if (userId) {
      handlerWords(userId, token, mainWord, "game", isTrueAnswer);
    }
  }

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

    showIndicator(true);
  };

  const countWrongAnswer = () => {
    let currentWinStreak = winStreak;

    if (currentWinStreak > 0) {
      currentWinStreak -= 1;
      setWinStreak(currentWinStreak);
    }

    const currentWrondAnswerList = wrongAnswerList;
    currentWrondAnswerList.push(mainWord);
    setWrongAnswerList(currentWrondAnswerList);

    showIndicator(false);
  };

  // TODO:  save in localStorage
  const checkAnswerTrue = () => {
    if (isCorrectTranslation) {
      countRightAnswer();

      sendWord(true);
    } else {
      countWrongAnswer();

      sendWord(false);
    }
    setRound(round + 1);
  };

  const checkAnswerFalse = () => {
    if (!isCorrectTranslation) {
      countRightAnswer();

      sendWord(true);
    } else {
      countWrongAnswer();

      sendWord(false);
    }
    setRound(round + 1);
  };

  useEffect(() => {
    renderGame();
  }, [wordList, round]);

  useEffect(() => {
    const checkAnswerWithKeyboard = ({ key }) => {
      if (key === "ArrowLeft") {
        checkAnswerFalse();
      } else if (key === "ArrowRight") {
        checkAnswerTrue();
      }
    };

    window.addEventListener("keydown", checkAnswerWithKeyboard);

    return () => {
      window.removeEventListener("keydown", checkAnswerWithKeyboard);
    };
  }, [isCorrectTranslation, round]);

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

  const contentPage = (
    <div className="sprint">
      <div className="sprint__header">
        <SprintTimer setIsTimeUp={setIsTimeUp} />
        <div className="sprint__header__btns">
          {/* <img
        alt="sound btn"
        className="sprint__header__btns__audio"
        src={audioOff}
      /> */}
          <img
            alt="full screen btn"
            className="sprint__header__btns__exit"
            src={fullscreenImg}
            onClick={screen.active ? screen.exit : screen.enter}
          />
        </div>
      </div>
      <div className="sprint__game-area">
        <p className="sprint__game-area__total-score">{score}</p>
        <div className="sprint__game-area__wrapper">
          <div className="sprint__game-area__streak">{ShowWinStreak()}</div>
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
            <img
              src={circleCorrectAnswerSrc}
              alt="правильный ответ"
              ref={indicatorTrue}
              className="sprint__game-area__indicator__item"
            />
            <img
              src={circleWrongAnswerSrc}
              alt="неправильный ответ"
              ref={indicatorFalse}
              className="sprint__game-area__indicator__item"
            />
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
        <img alt="left arrow" src={leftArrow} onClick={checkAnswerFalse} />
        <img alt="right arrow" src={rightArrow} onClick={checkAnswerTrue} />
      </div>
    </div>
  );

  const fullScreenContentPage = (
    <div className="sprint__fullscreen">{contentPage}</div>
  );

  return (
    <>
      {wordList === null ? (
        <Redirect to={`/startgame/sprint/${launchmodule}`} />
      ) : (
        <FullScreen handle={screen}>
          {screen.active ? fullScreenContentPage : contentPage}
        </FullScreen>
      )}
      {/* TODO: uncomment */}
      {isTimeUp && (<StopGame propsStop={{
        // otvetCorrect: rightAnswerList,
        // otvetWrong: wrongAnswerList,
        game: "sprint",
        launchmodule: props.launchmodule,
    }} />)}
    </>
  );
};

export default Sprint;