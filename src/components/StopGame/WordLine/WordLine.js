import React from 'react';

import s from './WordLine.module.scss';

const WordLine = props => {
    const { word, transcription, wordTranslate, audio} = props.word;
    const head = "https://rslang-server-2021.herokuapp.com";

    return (
        <div className={s.wordLine}>          
            <p className={s.word}>{word}</p>
            <p>&mdash;</p>
            <p className={s.transcription}>{transcription}</p>
            <p>&mdash;</p>
            <p className={s.wordTranslate}>{wordTranslate}</p>
            <div className={s.img} onClick={() => new Audio(`${head}/${audio}`).play()} />
        </div>
    )
}

export default WordLine;