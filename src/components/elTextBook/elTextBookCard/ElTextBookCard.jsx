import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserDataFromState } from "../../../redux/selectors";
import "./ElTextBookCard.scss";
import soundImg from "../../../img/sound.png";
import handlerWords from "../../../Utils/handlerWords";

function ElTextBookCard({ wordElement, correct, wrong, removeHandler }) {
  const {
    _id,
    word,
    image,
    audio,
    textMeaning,
    textMeaningTranslate,
    textExample,
    textExampleTranslate,
    wordTranslate,
    transcription,
    audioMeaning,
    audioExample,
  } = wordElement;
  const { userId, token } = useSelector(getUserDataFromState);

  const initIsHard = wordElement?.userWord?.difficulty === "compound_word";

  const [isHard, setIsHard] = useState(initIsHard);

  const playSound = (path) => {
    const sound = new Audio("");
    sound.src = `https://react-learnwords-example.herokuapp.com/${path}`;
    sound.play();
  };

  const hardWordHandler = () => {
    handlerWords(userId, token, wordElement, "compound_word");
    setIsHard(true);
  };
  const delWordHandler = () => {
    handlerWords(userId, token, wordElement, "deleted_word");
    removeHandler(_id);
  };

  return (
    <div className={`word-card ${userId ? "reg" : null}`}>
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
            onClick={() => playSound(audio)}
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
              onClick={() => playSound(audioMeaning)}
            />
          </div>
          <p dangerouslySetInnerHTML={{ __html: textMeaningTranslate }} />
          <br />
          <div className="eng-example">
            <p dangerouslySetInnerHTML={{ __html: textExample }} />
            <img
              className="img-sounds"
              src={soundImg}
              height="18"
              alt=""
              onClick={() => playSound(audioExample)}
            />
          </div>
          <p dangerouslySetInnerHTML={{ __html: textExampleTranslate }} />
          <br />
          <p>Результат изучения данного слова:</p>
          <p>
            Верных ответов{" "}
            <span style={{ color: "green", fontSize: 24 }}>{correct}</span>.
            Ошибок <span style={{ color: "red", fontSize: 24 }}>{wrong}</span>.
          </p>
        </div>
      </div>
      {userId && (
        <div className="word-settings">
          <div className="word-settings__header">Добавить в раздел:</div>
          <div className="word-settings__main">
            <button
              className={`word-settings__place ${isHard ? "hard" : null}`}
              onClick={hardWordHandler}
            >
              {isHard ? "Сложное слово" : "Добавить в сложные"}
            </button>
            <button className="word-settings__place" onClick={delWordHandler}>
              Удалить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ElTextBookCard;
