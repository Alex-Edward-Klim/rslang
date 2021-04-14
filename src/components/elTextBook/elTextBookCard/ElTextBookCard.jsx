import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getUserDataFromState } from "../../../redux/selectors";
import { getSettingsFromState } from "../../../redux/selectors";
import "./ElTextBookCard.scss";
import soundImg from "../../../img/sound.png";
import handlerWords from "../../../Utils/handlerWords";
import { useLocation } from "react-router";

function ElTextBookCard({ wordElement, correct, wrong, removeHandler, typeOfWords }) {
  const {
    _id,
    page,
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
  const { translate, changeWordStatus } = useSelector(getSettingsFromState);
  const location = useLocation();
  const initIsHard = wordElement?.userWord?.difficulty === "compound_word";

  const [isHard, setIsHard] = useState(initIsHard);

  const playSound = (path) => {
    const sound = new Audio("");
    sound.src = `https://rslang-server-2021.herokuapp.com/${path}`;
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
  const recoverWordHandler = () => {
    handlerWords(userId, token, wordElement, "reconstitute");
    removeHandler(_id);
  };
  
  return (
    <div
      className={`word-card ${userId && changeWordStatus ? "reg" : null} ${
        isHard ? "hard" : null
      }`}
    >
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
          {translate && (
            <span className="word-card__header header-element">
              {wordTranslate}
            </span>
          )}
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
          {translate && (
            <p dangerouslySetInnerHTML={{ __html: textMeaningTranslate }} />
          )}
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
          {translate && (
            <p dangerouslySetInnerHTML={{ __html: textExampleTranslate }} />
          )}
          <br />
          <p>Результат изучения данного слова:</p>
          <p>
            Верных ответов{" "}
            <span style={{ color: "green", fontSize: 24 }}>{correct}</span>.
            Ошибок <span style={{ color: "red", fontSize: 24 }}>{wrong}</span>.
          </p>
        </div>
      </div>
      {userId && changeWordStatus && (
        <div className="word-settings">
          <div className="word-settings__header">
            {location.pathname === "/vocabulary"
              ? `Страница ${+page + 1}`
              : "Добавить в раздел:"}
          </div>
          <div className="word-settings__main">
            { typeOfWords === "deleted_word" || typeOfWords === "compound_word" ? null : (
              <button
                className={`word-settings__place ${isHard ? "hard" : null}`}
                onClick={hardWordHandler}
              >
                {isHard ? "Сложное слово" : "Добавить в сложные"}
              </button>
            )}
            <button
              className="word-settings__place"
              onClick={
                typeOfWords === "deleted_word" || typeOfWords === "compound_word"
                  ? recoverWordHandler
                  : delWordHandler
              }
            >
              {typeOfWords === "deleted_word" || typeOfWords === "compound_word" ? "Восстановить" : "Удалить"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ElTextBookCard;
