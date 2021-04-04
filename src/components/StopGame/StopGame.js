import React from 'react';
import { Link } from 'react-router-dom';

import s from './StopGame.module.scss';

const StopGame = props => {

    return (
        <div className={s.stopWraper}>
            <p>Правильные ответы: {props.propsStop.otvetCorrect}</p>
            <p>Неправельные ответы: {props.propsStop.otvetWrong}</p>
            { props.propsStop.launchmodule === "nav" || props.propsStop.launchmodule === "book" ? <Link to={'/elTextBook'}><button>ОК</button></Link> : null}
            { props.propsStop.launchmodule === "compound" || props.propsStop.launchmodule === "deleted" ? <Link to={'/vocabulary'}><button>ОК</button></Link> : null}            
        </div>
    )
};

export default StopGame;