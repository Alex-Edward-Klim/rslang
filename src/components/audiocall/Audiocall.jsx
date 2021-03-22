import "./audiocall.css";
import soundBtn from "../../images/icons/volume.svg";
import closeBtn from "../../images/icons/close.svg";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Audiocall = () => {
  //TODO: get URL from props
  const url = "https://react-learnwords-example.herokuapp.com/words";

  const [wordList, setWordList] = useState();
  const [currentRound, setCurrentRound] = useState(1);
  const [rigthAnswerID, setRigthAnswerID] = useState();
  const [usedID, setUsedID] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  // 
  const [isLoaded, setIsLoaded] = useState(false);
// 
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  };

  const endGame = () => {
    console.log("Игра закончилась!")
  }

  const renderGame = () => {
    const roundsQuanity = 10;
    if (!wordList) {
      return;
    } else if (currentRound === roundsQuanity) {
      endGame();
      return ;
    }

    const currentWordList = shuffle(wordList);
    const rigthOption = currentWordList[0];

    const rigthOptionID = rigthOption.id;
    setRigthAnswerID(rigthOptionID);
    
    sayWord(rigthOptionID);

    currentOptions.push(wordList.find(el => el.id === rigthOptionID));

    for (let i = 1; i < 5; i++) {
      currentOptions.push(currentWordList[i]);
    }

    setCurrentOptions(shuffle(currentOptions))

    usedID.push(rigthOptionID)
  }

  const sayWord = (wordID) => {
    const currentWord = wordList.find(el => el.id === wordID);
  }

  useEffect(() => {
    const apiUrl = url;
    axios.get(apiUrl).then((resp) => {
      const allWords = resp.data;
      setWordList(allWords);
    });
  }, []);

  useEffect(() => {
    renderGame();
  }, [wordList])

  useEffect(() => {
    if (wordList) {
      if (wordList.length < 20) {
        // addWords() допушить слова в список слов
      }
    }
  }, [wordList])

  if (!wordList || wordList.length === 0) return <p>Загрузка...</p>

  const optionList = currentOptions.map((el, i) => {
    return (<li 
      className="audiocall__option-list__item" 
      key={i}
      id={el.id}> 
      {el.wordTranslate}
    </li>)
  })

  console.log(currentOptions)

  return (
    <>
      <header className="audiocall__header">
        <img
          alt="close btn"
          src={closeBtn}
          className="audiocall__header__btn"
        />
      </header>
      <main className="audiocall">
        <div className="audiocall__sound">
          <img
            className="audiocall__sound__img"
            src={soundBtn}
            alt="sound btn"
          />
        </div>
        <ul className="audiocall__option-list">
          {optionList}
        </ul>
        <div className="audiocall__skip-btn">
          <p className="audiocall__skip-btn__value">Не знаю</p>
        </div>
      </main>
    </>
  );
};

export default Audiocall;