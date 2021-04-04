import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import vocImg from "../../img/how-to-choose-english-dictionary.png";
import s from "./vocabulary.module.scss";
import cn from "classnames";
import {
  getUserDataFromState,
  getWordsGroupAndPageFromState,
} from "../../redux/selectors";
import ElTextBookCard from "../elTextBook/elTextBookCard/ElTextBookCard";
import GroupFlags from "../elTextBook/groupFlags/GroupFlags";
import GameCard from "../elTextBook/gameCard/GameCard";
import PagePagination from "../elTextBook/pagePagination/PagePagination";
import { setWordsGroupAndPage } from "../../redux/wordsGroupAndPage/wordsGroupAndPageActions";
import { gameList } from "../../modules/GameList";
import requestVocabulary from "../../Utils/requestVocabulary";

function Vocabulary() {
  const { userId, token } = useSelector(getUserDataFromState);
  const { group, page } = useSelector(getWordsGroupAndPageFromState);
  const [wordsList, setWordList] = useState(null);
  const [length, setLength] = useState(null);
  const [typeOfWords, setTypeOfWords] = useState("studied_word");
  const dispatch = useDispatch();

  useEffect(() => {
    requestVocabulary(
      token,
      userId,
      group,
      page,
      typeOfWords,
      setWordList,
      setLength
    );
  }, [group, page, userId, typeOfWords]);

  let allCorrect = 0;
  let allWrong = 0;
  const maxPage = Math.floor(length / 20);
  const handleFlagClick = (n) => {
    dispatch(setWordsGroupAndPage({ group: n, page: 0 }));
  };

  const removeHandler = (id) => {
    setWordList((prev) => prev.filter((word) => word._id !== id));
  };

  const flags = Array.from({ length: 6 }, (v, k) => k).map((el) => (
    <GroupFlags
      number={el}
      current={group}
      key={el + Date.now() * 10}
      handleFlagClick={handleFlagClick}
    />
  ));

  const games = gameList.map((el, i) => (
    <GameCard name={el.name} path={el.route} key={Date.now() * 10 + i} />
  ));

  let wordCards;
  if (wordsList !== null) {
    allCorrect = wordsList.reduce(
      (acc, el) => acc + el?.userWord?.optional?.correct_otvet,
      0
    );
    allWrong = wordsList.reduce(
      (acc, el) => acc + el?.userWord?.optional?.wrong_otvet,
      0
    );

    wordCards = wordsList.map((el, i) => {
      return (
        <ElTextBookCard
          key={el._id}
          typeOfWords={typeOfWords}
          wordElement={el}
          correct={
            el?.userWord?.optional?.correct_otvet
              ? el.userWord.optional.correct_otvet
              : 0
          }
          wrong={
            el?.userWord?.optional?.wrong_otvet
              ? el.userWord.optional.wrong_otvet
              : 0
          }
          removeHandler={removeHandler}
        />
      );
    });
  }

  const typeWordsHandler = (typeName) => {
    setTypeOfWords(typeName);
    dispatch(setWordsGroupAndPage({ group, page: 0 }));
  };

  return (
    <div className={s.vocabulary}>
      <div className={s.header}>
        <img src={vocImg} alt="" />
        <h2>Словарь</h2>
      </div>
      <ul className={s.typeWord}>
        <li
          onClick={() => typeWordsHandler("studied_word")}
          className={cn(
            s.typeWordEl,
            typeOfWords === "studied_word" ? s.active : null
          )}
        >
          Изучаемые слова
        </li>
        <li
          onClick={() => typeWordsHandler("compound_word")}
          className={cn(
            s.typeWordEl,
            typeOfWords === "compound_word" ? s.active : null
          )}
        >
          Сложные слова
        </li>
        <li
          onClick={() => typeWordsHandler("deleted_word")}
          className={cn(
            s.typeWordEl,
            typeOfWords === "deleted_word" ? s.active : null
          )}
        >
          Удаленные слова
        </li>
      </ul>
      <ul className={s.pageStatistic}>
        <li>{`Слов на этой странице:  ${wordCards?.length ? wordCards.length : 0}`}</li>
        <li>{`Всего верных ответов: ${allCorrect ? allCorrect : 0}`}</li>
        <li>{`Всего неверных ответов: ${allWrong ? allWrong : 0}`}</li>
      </ul>
      <div className="text-book-nav__flags flags">{flags}</div>
      <div className="text-book-nav__option">
        <div className="text-book-nav__group">
          {length !== null && length > 20 && (
            <PagePagination maxPage={maxPage} />
          )}
        </div>
        {typeOfWords === "studied_word" ? null : (
          <div className="text-book-nav__game">{games}</div>
        )}
      </div>
      <div className="word-cards">
        {wordsList === null ? (
          <h2>This page is empty</h2>
        ) : length === undefined ? (
          <h2>This page is empty</h2>
        ) : (
          wordCards
        )}
      </div>
      {length !== null && length > 20 && <PagePagination maxPage={maxPage} />}
    </div>
  );
}

export default Vocabulary;
