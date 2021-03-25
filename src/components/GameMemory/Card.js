import React from 'react';
import cn from 'classnames';

import s from './Card.module.scss';

const Card = props => {
    const { index, word, image, face, correct_otvet: correct, wrong_otvet: wrong, first_open: open } = props.wordCard;
    const head = "https://rslang-server-2021.herokuapp.com";

    if (correct || wrong || face) {
        return (
            <div className={cn(s.card, s.face, correct ? s.correct : null, wrong ? s.wrong : null )}>
                <div className={s.img} style={{ backgroundImage: `url(${head}/${image})` }}/>
                <p className={s.text}>{ word }</p>
            </div>
        )
    } else {
        return <div className={cn(s.card, open ? s.open : null)} onClick={ props.fu }  data-index={index} />
    }
}

export default Card;