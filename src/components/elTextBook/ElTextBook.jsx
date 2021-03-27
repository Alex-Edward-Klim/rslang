import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserDataFromState,
  getWordsGroupAndPageFromState,
} from "../../redux/selectors";
import axios from "axios";
import ElTextBookCard from "./elTextBookCard/ElTextBookCard";
import GroupFlags from "./groupFlags/GroupFlags";
import GameCard from "./gameCard/GameCard";
import PagePagination from "./pagePagination/PagePagination";
import "./elTextBook.scss";
import { setWordsGroupAndPage } from "../../redux/wordsGroupAndPage/wordsGroupAndPageActions";
import { gameList } from "../../modules/GameList"

function ElTextBook() {
  const { userId, token } = useSelector(getUserDataFromState);
  const { group, page } = useSelector(getWordsGroupAndPageFromState);
  const [wordsList, setWordList] = useState(null);
  const dispatch = useDispatch();

  const getUnregWords = (group, page, callBackFunction) => {
    axios(`https://rslang-server-2021.herokuapp.com/words`, {
      params: { group, page },
    }).then((response) => callBackFunction(response.data)).catch(err => console.log(err));
  }
  const getRegWords = (group, page, callBackFunction) => {
    axios(`https://rslang-server-2021.herokuapp.com/users/${userId}/aggregatedWords`, {
      params: { group, page, wordsPerPage: 20 },
    }).then((response) => callBackFunction(response.data)).catch(err => console.log(err));
  }

  useEffect(() => {
    // axios(`https://rslang-server-2021.herokuapp.com/words`, {
    //   params: { group, page },
    // }).then((response) => setWordList(response.data));
    getUnregWords(group, page, setWordList)

  }, [group, page]);

  const handleFlagClick = (n) => {
    dispatch(setWordsGroupAndPage({ group: n, page: 0 }));
  };
  const flags = Array.from({ length: 6 }, (v, k) => k).map((el) => (
    <GroupFlags
      number={el}
      current={group}
      key={el + Date.now()*10}
      handleFlagClick={handleFlagClick}
    />
  ));

  const games = gameList.map((el, i) => (
    <GameCard name={el.name} path={el.route} key={Date.now()*10 + i} />
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
            <PagePagination />
          </div>
          <div className="text-book-nav__game">{games}</div>
        </div>
      </div>
      <div className="word-cards">
        {wordsList === null ? <h2>Loading...</h2> : wordCards}
      </div>
      <div className="text-book-nav__group">
        <PagePagination />
      </div>
    </div>
  );
}

export default ElTextBook;
