import React, { useState, useEffect } from "react";
import axios from "axios";
import ElTextBookCard from "../elTextBookCard/ElTextBookCard";
import "./elTextBook.scss";


const currentPageInit = {
  group: 0,
  page: 0,
};

function ElTextBook() {
  const [wordsList, setWordList] = useState(null);
  const [currentPage, setCurrentPage] = useState(currentPageInit);
  useEffect(() => {
    axios(`https://react-learnwords-example.herokuapp.com/words`, {
      params: currentPage,
    }).then((response) => setWordList(response.data));
  }, [currentPage]);

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

  return <div className="word-cards">{wordCards}</div>;
}

export default ElTextBook;
