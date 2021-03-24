import "./audiocall.css";
import soundBtnSrc from "../../images/icons/volume.svg";
import closeBtn from "../../images/icons/close.svg";
import rigthAnswerBtn from "../../images/icons/rigthAnswer.png";
import wrongAnswerBtn from "../../images/icons/wrongAnswer.png";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

// TODO: если не авторизован, хранить результат игры в локал сторейдж, если авторизован пост запрос при каждом ответе.
// TODO: добавить звук при верном и не верном ответе.

const Audiocall = () => {
  //TODO: get URL from props
  const apiUrl = "https://react-learnwords-example.herokuapp.com";
  const wordListUrl = "https://react-learnwords-example.herokuapp.com/words";

  const [wordList, setWordList] = useState();
  const [currentRound, setCurrentRound] = useState(1);
  // const [rigthAnswerID, setRigthAnswerID] = useState();
  const [rigthAnswer, setRigthAnswer] = useState();
  const [usedID, setUsedID] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [isWordChecked, setIsWordChecked] = useState(false);
  const [rigthAnswerImgSrc, setRigthAnswerImgSrc] = useState("");

  const soundBtnBg = useRef(null);
  const audioPlayer = useRef(null);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  };

  const endGame = () => {
    console.log("Игра закончилась!");
  };

  const closeGame = () => {
    console.log("Перейти в главное меню");
  }

  const addAnimation = (element, elementClass, delay) => {
    element.current.classList.add(elementClass);
    setTimeout(() => {
      element.current.classList.remove(elementClass);
    }, delay);
  };

  const renderGame = () => {
    const roundsQuanity = 10;
    if (!wordList) {
      return;
    } else if (currentRound === roundsQuanity) {
      endGame();
      return;
    }

    const currentWordList = shuffle(wordList);
    const rigthOption = currentWordList[0];

    const rigthOptionID = rigthOption.id;
    // setRigthAnswerID(rigthOptionID);
    setRigthAnswer(rigthOption);

    currentOptions.push(wordList.find((el) => el.id === rigthOptionID));

    for (let i = 1; i < 5; i++) {
      currentOptions.push(currentWordList[i]);
    }

    setCurrentOptions(shuffle(currentOptions));

    usedID.push(rigthOptionID);
    setUsedID(usedID);
  };

  const sayWord = () => {
    if (!rigthAnswer) {
      return;
    }

    const currentWord = wordList.find((el) => el.id === rigthAnswer.id);

    const soundUrl = `${apiUrl}/${currentWord.audio}`;

    audioPlayer.current.src = soundUrl;
    audioPlayer.current.autoPlay = true;

    setTimeout(() => {
      audioPlayer.current.play();
    }, 500);

    const animationClass = "audiocall__sound__animation__active";
    const animationDelay = 3000;

    addAnimation(soundBtnBg, animationClass, animationDelay);
  };

  const checkWord = (e) => {
    const rigthAnswerID = rigthAnswer.id;
    const selecedtWordID = e.currentTarget.id;

    const rigthAnswerImg = e.currentTarget.children[0];
    const wrongAnswerImg = e.currentTarget.children[1];
    const numberOfWord = e.currentTarget.children[2];

    if (rigthAnswerID === selecedtWordID) {
      rigthAnswerImg.classList.remove("audiocall__option-list__item__off");
      console.log("ВЕРНО");




      // TODO: post request to server +1 rigth answer
    } else {
      console.log(" НЕ ВЕРНО");
      wrongAnswerImg.classList.remove("audiocall__option-list__item__off");



      //TODO: add check true answer


      // TODO: post request to server +1 wrong answer
    }
    numberOfWord.classList.add("audiocall__option-list__item__off");
    const rigthAnswerImgUrl = `${apiUrl}/${rigthAnswer.image}`;

    setRigthAnswerImgSrc(rigthAnswerImgUrl)
    console.log(rigthAnswerImgUrl)

    setIsWordChecked(true);


    // +1 количество слов
  };
  useEffect(() => {
    const currentUrl = wordListUrl;
    axios.get(currentUrl).then((resp) => {
      const allWords = resp.data;
      setWordList(allWords);
    });
  }, []);

  useEffect(() => {
    renderGame();
  }, [wordList]);

  useEffect(() => {
    sayWord();
  }, [rigthAnswer]);

  // TODO: implement
  useEffect(() => {
    if (wordList) {
      if (wordList.length < 20) {
        // addWords() допушить слова в список слов
      }
    }
  }, [wordList]);

  if (!wordList || wordList.length === 0) return <p>Загрузка...</p>;

  const optionList = currentOptions.map((el, i) => {
    return (
      <li
        className="audiocall__option-list__item"
        key={i}
        id={el.id}
        onClick={!isWordChecked ? checkWord : undefined} 
      >
        <img
          src={rigthAnswerBtn}
          alt="rigth answer"
          className="audiocall__option-list__item__img audiocall__option-list__item__off"
        />
        <img
          src={wrongAnswerBtn}
          alt="wrong answer"
          className="audiocall__option-list__item__img audiocall__option-list__item__off"
        />
        <span className="audiocall__option-list__item__number">{i + 1}</span>
        <span className="audiocall__option-list__item__content">
          {el.wordTranslate}
        </span>
      </li>
    );
  });

  const rigthAnswerImg = <img
    alt="rigth answer"
    src={rigthAnswerImgSrc}
    className="audiocall__mid-content__img"
  />;

  return (
    <>
      <header className="audiocall__header">
        <img
          alt="close btn"
          src={closeBtn}
          className="audiocall__header__btn"
          onClick={closeGame}
        />
      </header>
      <main className="audiocall">
        <div className="audiocall__container">
          <div className="audiocall__mid-content">
            {isWordChecked && rigthAnswerImg}
            {isWordChecked && <p className="audiocall__mid-content__word">{rigthAnswer.word}</p>}
            <div className={isWordChecked ? "audiocall__sound audiocall__sound__checked" : "audiocall__sound"}>
              <img
                className={isWordChecked ? "audiocall__sound__img audiocall__sound__img__checked" : "audiocall__sound__img__checked"}
                src={soundBtnSrc}
                alt="sound btn"
              />
              <div
                className={isWordChecked ? "audiocall__sound__animation audiocall__sound__animation__checked" : "audiocall__sound__animation"}
                ref={soundBtnBg}
                onClick={sayWord}
              ></div>
              <audio ref={audioPlayer} />
            </div>
          </div>
          <ul className="audiocall__option-list">{optionList}</ul>
          <div className="audiocall__skip-btn">
            <p className="audiocall__skip-btn__value"> {isWordChecked ? "Далее" : "Не знаю"} </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Audiocall;