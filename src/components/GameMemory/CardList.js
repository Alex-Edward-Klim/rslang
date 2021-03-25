import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { getUserDataFromState } from '../../redux/selectors';
import handlerWords from '../../Utils/handlerWords';

import s from './CardList.module.scss';

import Card from './Card';

const CardList = props => {
    const data = props.data.concat();
    const [otvetCorrect, setOtvetCorrect] = useState(0);
    const [otvetWrong, setOtvetWrong] = useState(0);
    const [openCard, setOpenCard] = useState([]);
    const [firstOpenCard, setFirstOpenCard] = useState([]);
    const { userId, token } = useSelector(getUserDataFromState);

    const saveIndexFirstOpenCard = index => {
        const findIndex = firstOpenCard.findIndex(item => item.index === index);
        if (findIndex === -1) {
            const firstOpenCardCopy = firstOpenCard.concat();
            firstOpenCardCopy.push({_id: data[index]._id, index: index});
            setFirstOpenCard(firstOpenCardCopy);
        }
    }

    const handlerClick = event => {
        const index = event.target.dataset.index;
        data[index].face = true;
        data[index].first_open = true;
        if (openCard.length === 1) {
            if (data[index]._id === data[openCard[0]]._id) {
                data[index].correct_otvet = true;
                data[openCard[0]].correct_otvet = true;
                setOpenCard([]);
                setOtvetCorrect(otvetCorrect + 1);
                // верный ответ - отправим данные на сервер
                handlerWords(userId, token, data[index], "game", true);
            } else {
                const find = firstOpenCard.findIndex(item => item._id === data[openCard[0]]._id && item.index !== openCard[0]);
                if (find !== -1) {
                    data[openCard[0]].wrong_otvet = true;
                    data[firstOpenCard[find].index].wrong_otvet = true;
                    saveIndexFirstOpenCard(index);
                    setOpenCard([index]);
                    setOtvetWrong(otvetWrong + 1);
                    // не верный ответ - отправим данные на сервер
                    handlerWords(userId, token, data[openCard[0]], "game", false);
                } else {
                    const openCardCopy = openCard.concat();
                    openCardCopy.push(index);
                    saveIndexFirstOpenCard(index);
                    setOpenCard(openCardCopy);
                }                
            }
        } else if (openCard.length === 2) {
            data[openCard[0]].face = false;
            data[openCard[1]].face = false;
            saveIndexFirstOpenCard(index);
            setOpenCard([index]);
        } else {
            setOpenCard([index]);
            saveIndexFirstOpenCard(index);
        }
    }

    return (        
        <section className={s.section}>
            { data.map( (item, index) => <Card wordCard={item} fu={ handlerClick } key={index}/> ) }
            { 2 * otvetCorrect + 2 * otvetWrong === data.length ? 
                <p className={s.end}>КОНЕЦ</p> : null}
        </section>
    )
};

export default CardList;