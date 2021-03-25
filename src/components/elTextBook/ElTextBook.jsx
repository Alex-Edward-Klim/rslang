import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserDataFromState,
  getWordsGroupAndPageFromState,
} from "../../redux/selectors";
import axios from "axios";
import ElTextBookCard from "./elTextBookCard/ElTextBookCard";
import GroupFlags from "./groupFlags/GroupFlags";
import "./elTextBook.scss";
import { setWordsGroupAndPage } from "../../redux/wordsGroupAndPage/wordsGroupAndPageActions";

function ElTextBook() {
  const { userId, token } = useSelector(getUserDataFromState);
  const currentPosition = useSelector(getWordsGroupAndPageFromState);
  const [wordsList, setWordList] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios(`https://rslang-server-2021.herokuapp.com/words`, {
      params: currentPosition,
    }).then((response) => setWordList(response.data));
  }, [currentPosition.group, currentPosition.page]);

  const handleFlagClick = (n) => {
    dispatch(setWordsGroupAndPage({ group: n, page: 0 }));
    console.log(currentPosition);
  };
  console.log(currentPosition);
  const flags = Array.from({ length: 6 }, (v, k) => k).map((el) => (
    <GroupFlags
      number={el}
      current={currentPosition.group}
      key={el + Date.now()}
      handleFlagClick={handleFlagClick}
    />
  ));


  let wordCards;
  if (wordsList !== null) {
    wordCards = wordsList.map((el, i) => {
      return (
        <ElTextBookCard
          word={el.word}
          key={el.id}
          id={el.id}
          image={el.image}
          audio={el.audio}
          textMeaning={el.textMeaning}
          textMeaningTranslate={el.textMeaningTranslate}
          textExample={el.textExample}
          textExampleTranslate={el.textExampleTranslate}
          wordTranslate={el.wordTranslate}
          transcription={el.transcription}
          audioMeaning={el.audioMeaning}
          audioExample={el.audioExample}
        />
      );
    });
  }

  return (
    <div className="text-book">
      <div className="text-book-nav">
        <div className="text-book-nav__header">
          <h2 className="text-book-nav__title title">Электронный учебник</h2>
          <div className="text-book-nav__flags flags">{flags}</div>
        </div>
        <div className="text-book-nav__option">
          <div className="text-book-nav__group">
            {/*пагинация по страницам */}
          </div>
          <div className="text-book-nav__game">
            {/* 4 игры */}
          </div>
        </div>
      </div>
      <div className="word-cards">{wordCards}</div>
      <div>
      {/* пагинация по страницам */}
      </div>
    </div>
  );
}

export default ElTextBook;
