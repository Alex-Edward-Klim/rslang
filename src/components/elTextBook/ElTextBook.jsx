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
import { gameList } from "../../modules/GameList";

function ElTextBook() {
  const { userId, token } = useSelector(getUserDataFromState);
  const { group, page } = useSelector(getWordsGroupAndPageFromState);
  const [wordsList, setWordList] = useState(null);
  const dispatch = useDispatch();

  const CancelToken = axios.CancelToken;

  const url = userId
    ? `https://rslang-server-2021.herokuapp.com/users/${userId}/aggregatedWords`
    : "https://rslang-server-2021.herokuapp.com/words";

  useEffect(() => {
    let cancel;
    axios(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { group, page, wordsPerPage: 20 },
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
    })
      .then((response) => {
        const data = userId ? response.data[0].paginatedResults : response.data;
        return setWordList(data);
      })
      .catch((err) => console.log(err.message));
    return () => {
      cancel("Please don't click too fast ...");
    };
  }, [group, page, userId]);

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
    let words = [...wordsList];
    if (userId) {
      // setWordList(prev => prev.filter(word => word?.userWord?.difficulty !== 'deleted_word'))
      words = wordsList.filter(
        (el) => el?.userWord?.difficulty !== "deleted_word"
      );
    }
    wordCards = words.map((el, i) => {
      return (
        <ElTextBookCard
          key={el._id}
          wordElement={el}
          correct={el?.options?.correct_otvet ? el.options.correct_otvet : 0}
          wrong={el?.options?.wrong_otvet ? el.options.wrong_otvet : 0}
          removeHandler={removeHandler}
        />
      );
    });
  }

  return (
    <>
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
          {wordsList === null ? (
            <h2>Loading...</h2>
          ) : wordCards.length === 0 ? (
            <h2>This page is empty</h2>
          ) : (
            wordCards
          )}
        </div>
        <div className="text-book-nav__group">
          <PagePagination />
        </div>
      </div>
    </>
  );
}

export default ElTextBook;
