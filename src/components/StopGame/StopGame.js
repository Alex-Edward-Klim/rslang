import React from 'react';
import { Link } from 'react-router-dom';

import s from './StopGame.module.scss';

import WordLine from './WordLine/WordLine';

const StopGame = props => {
    const {otvetCorrect, otvetWrong, launchmodule} = props.propsStop;

    return (
        <div className={s.stopWraper}>
            <h3>Правильные ответы: <span className={s.correct}>&emsp;{otvetCorrect.length}&emsp;</span></h3>
            <div className={s.wraper}>
                {otvetCorrect.map((item, index) => <WordLine key={`C + ${index}`} word={item}/>)}
            </div>
            <h3>Неправильные ответы: <span className={s.wrong}>&emsp;{otvetWrong.length}&emsp;</span></h3>
            <div className={s.wraper}>
                {otvetWrong.map((item, index) => <WordLine key={`W + ${index}`} word={item}/>)}
            </div>
            { launchmodule === "nav" || launchmodule === "book" ? <Link to={'/elTextBook'} className={s.close}>&#10060;</Link> : null}
            { launchmodule === "compound" || launchmodule === "deleted" ? <Link to={'/vocabulary'} className={s.close}>&#10060;</Link> : null}
        </div>
    )
};

export default StopGame;