import "./audiocall.css";
import soundBtnSrc from "../../images/icons/volume.svg";
import closeBtn from "../../images/icons/close.svg";
import rigthAnswerBtn from "../../images/icons/rigthAnswer.png";
import wrongAnswerBtn from "../../images/icons/wrongAnswer.png";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

// TODO: если не авторизован, хранить результат игры в локал сторейдж, если авторизован пост запрос при каждом ответе.

const Audiocall = () => {
  //TODO: get URL from props
  const apiUrl = "https://react-learnwords-example.herokuapp.com";
  const wordListUrl = "https://react-learnwords-example.herokuapp.com/words";

  const [wordList, setWordList] = useState();
  const [currentRound, setCurrentRound] = useState(0);
  // const [rigthAnswerID, setRigthAnswerID] = useState();
  const [rigthAnswer, setRigthAnswer] = useState();
  const [usedID, setUsedID] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [isWordChecked, setIsWordChecked] = useState(false);
  const [rigthAnswerImgSrc, setRigthAnswerImgSrc] = useState("");

  const gameArea = useRef(null);
  const soundBtnBg = useRef(null);
  const audioPlayer = useRef(null);
  const optionListRef = useRef(null);

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
    // TODO: rout to main menu
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

    const localCurrentOptions = []

    localCurrentOptions.push(wordList.find((el) => el.id === rigthOptionID));

    for (let i = 1; i < 5; i++) {
      localCurrentOptions.push(currentWordList[i]);
    }

    setCurrentOptions(shuffle(localCurrentOptions));

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

    if (e.currentTarget.id === rigthAnswerID) {
      // console.log("ВЕРНО");

      // TODO: post request to server +1 rigth answer
    } else if (e.currentTarget.innerHTML === "Не знаю") {

      console.log("не знаю")
      // TODO: post request to server +1 wrong answer
    } else {

      // console.log(" НЕ ВЕРНО");

      const wrongAnswerImg = e.currentTarget.children[1];
      const numberOfWord = e.currentTarget.children[2];

      wrongAnswerImg.classList.remove("audiocall__option-list__item__off");
      numberOfWord.classList.add("audiocall__option-list__item__off");

      // TODO: post request to server +1 wrong answer
    }

    const currentOptionList = optionListRef.current.childNodes;

    let rigthAnswerNode;

    for (let i = 0; i < currentOptionList.length; i++) {
      if (currentOptionList[i].id === rigthAnswerID) {
        rigthAnswerNode = currentOptionList[i];
      }
    }

    rigthAnswerNode.children[0].classList.remove("audiocall__option-list__item__off");
    rigthAnswerNode.children[2].classList.add("audiocall__option-list__item__off");

    const rigthAnswerImgUrl = `${apiUrl}/${rigthAnswer.image}`;

    setRigthAnswerImgSrc(rigthAnswerImgUrl)

    setIsWordChecked(true);
    document.addEventListener('keydown', nextWordWithKeyboard);
    document.removeEventListener('keydown', checkWordWithKeyboard);
  };

  const checkWordWithKeyboard = (e) => {
    if (!rigthAnswer) {
      return
    } else if (!((e.key) < 6) || ((e.key) === "0")) {
      return
    }
    const rigthAnswerID = rigthAnswer.id;
    const currentOptionList = optionListRef.current.childNodes;
    const selectedOption = currentOptionList[e.key - 1];
    let rigthAnswerOption;

    for (let i = 0; i < currentOptionList.length; i++) {
      if (currentOptionList[i].id === rigthAnswerID) {
        rigthAnswerOption = currentOptionList[i];
      }
    }
    if (rigthAnswerOption === undefined) {
      return
    }

    if (selectedOption == rigthAnswerOption) {
      // console.log("ВЕРНО");
      // TODO: post request to server +1 rigth answer
    } else {
      // TODO: post request to server +1 wrong answer
      // console.log("не ВЕРНО");

      const wrongAnswerImg = selectedOption.children[1];
      const numberOfWord = selectedOption.children[2];

      wrongAnswerImg.classList.remove("audiocall__option-list__item__off");
      numberOfWord.classList.add("audiocall__option-list__item__off");
    }

    rigthAnswerOption.children[0].classList.remove("audiocall__option-list__item__off");
    rigthAnswerOption.children[2].classList.add("audiocall__option-list__item__off");

    const rigthAnswerImgUrl = `${apiUrl}/${rigthAnswer.image}`;

    setRigthAnswerImgSrc(rigthAnswerImgUrl)

    setIsWordChecked(true);

    document.removeEventListener('keydown', checkWordWithKeyboard);

    document.addEventListener('keydown', nextWordWithKeyboard);
  }

  const nextWord = () => {
    const currentOptionList = optionListRef.current.childNodes;

    for (let i = 0; i < currentOptionList.length; i++) {
      const el = currentOptionList[i];
      el.children[0].classList.add("audiocall__option-list__item__off");
      el.children[1].classList.add("audiocall__option-list__item__off");
      el.children[2].classList.remove("audiocall__option-list__item__off");
    }
    
    gameArea.current.classList.remove("audiocall__come")
    gameArea.current.classList.add("audiocall__leave")

    setTimeout(() => {
      gameArea.current.classList.remove("audiocall__leave")
      gameArea.current.classList.add("audiocall__come")
      setIsWordChecked(false);
    }, 300);

    setCurrentRound(currentRound + 1);
    document.removeEventListener('keydown', nextWordWithKeyboard);
  }

  const nextWordWithKeyboard = (e) => {
    if (e.key === "Enter") {
      nextWord();
    }
  }

  useEffect(() => {
    const currentUrl = wordListUrl;
    axios.get(currentUrl).then((resp) => {
      const allWords = resp.data;
      setWordList(allWords);
    });
  }, []);

  useEffect(() => {
    renderGame();
  }, [wordList, currentRound]);

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

  useEffect(() => {
    document.addEventListener('keydown', checkWordWithKeyboard);
  }, [rigthAnswer])

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

  const skipBtn = (
    <p className="audiocall__skip-btn__value" onClick={checkWord}>
      Не знаю
    </p>
  );
  const nextBtn = (
    <p className="audiocall__skip-btn__value" onClick={nextWord}>
      Далее
    </p>
  );

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
      <main className="audiocall" ref={gameArea}>
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
          <ul className="audiocall__option-list" ref={optionListRef}>{optionList}</ul>
          <div className="audiocall__skip-btn">
            {isWordChecked ? nextBtn : skipBtn}
          </div>
        </div>
      </main>
    </>
  );
};

export default Audiocall;