import React, { useState, useEffect } from "react";
import "./ElTextBookCard.scss";
import soundImg from "../../img/sound.png";

function ElTextBookCard({
  word,
  id,
  image,
  audio,
  textMeaning,
  textMeaningTranslate,
  textExample,
  textExampleTranslate,
  wordTranslate,
  transcription,
  audioMeaning,
  audioExample
}) {
  const soundWord = new Audio("");
  const soundMeaning = new Audio("");
  const soundExample = new Audio("");
  soundWord.src = `https://react-learnwords-example.herokuapp.com/${audio}`;
  soundMeaning.src = `https://react-learnwords-example.herokuapp.com/${audioMeaning}`;
  soundExample.src = `https://react-learnwords-example.herokuapp.com/${audioExample}`;

  const playSound = (el) => {
    el.play();
  };

  return (
    <div className="word-card">
      <div className="word-info">
        <div className="word-card__header">
          <div className="photo">
            <img
              className="word-card__header header-element img-el"
              src={`https://rslang-server-2021.herokuapp.com/${image}`}
              height="86"
              alt=""
            />
          </div>
          <span className="word-card__header header-element">{word}</span>
          <span className="word-card__header header-element">
            {transcription}
          </span>
          <span className="word-card__header header-element">
            {wordTranslate}
          </span>
          <img
            className="word-card__header header-element img-sound"
            src={soundImg}
            width="34"
            alt=""
            onClick={() => playSound(soundWord)}
          />
        </div>
        <div className="word-card__description">
          <div className="eng-example">
            <p dangerouslySetInnerHTML={{ __html: textMeaning }} />
            <img
              className="img-sounds"
              src={soundImg}
              height="18"
              alt=""
              onClick={() => playSound(soundMeaning)}
            />
          </div>
          <p dangerouslySetInnerHTML={{ __html: textMeaningTranslate }} />
          <div className="eng-example">
            <p dangerouslySetInnerHTML={{ __html: textExample }} />
            <img
              className="img-sounds"
              src={soundImg}
              height="18"
              alt=""
              onClick={() => playSound(soundExample)}
            />
          </div>
          <p dangerouslySetInnerHTML={{ __html: textExampleTranslate }} />
        </div>
      </div>
      <div className="word-settings">
        <div className="word-settings__header">Добавить в раздел:</div>
        <div className="word-settings__main">
          <button className="word-settings__place">Сложные слова</button>
          <button className="word-settings__place">Удаленные слова</button>
        </div>
      </div>
    </div>
  );
}

export default ElTextBookCard;
