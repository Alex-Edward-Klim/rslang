import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { getUserDataFromState } from '../../../redux/selectors';
import handlerWords from '../../../Utils/handlerWords';

import s from './CardList.module.scss';

import Card from '../Card/Card';
import StopGame from '../../StopGame/StopGame'

const CardList = props => {
    const data = props.data.concat();
    const [otvetCorrect, setOtvetCorrect] = useState([]);
    const [otvetWrong, setOtvetWrong] = useState([]);
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

    const saveResultOtvet = (otvet, fuOtvet, data) => {
        const arr = otvet.concat();
        arr.push(data);
        fuOtvet(arr);
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
                // верный ответ
                saveResultOtvet(otvetCorrect, setOtvetCorrect, data[index]);
                if (userId) {
                    handlerWords(userId, token, data[index], "game", true);
                }
            } else {
                const find = firstOpenCard.findIndex(item => item._id === data[openCard[0]]._id && item.index !== openCard[0]);
                if (find !== -1) {
                    data[openCard[0]].wrong_otvet = true;
                    data[firstOpenCard[find].index].wrong_otvet = true;
                    saveIndexFirstOpenCard(index);
                    setOpenCard([index]);
                    // не верный ответ
                    saveResultOtvet(otvetWrong, setOtvetWrong, data[openCard[0]]);
                    if (userId) {
                        handlerWords(userId, token, data[openCard[0]], "game", false);
                    }
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
        <>
            <section className={s.section}>
                { data.map( (item, index) => <Card wordCard={item} imgRender={props.imgRender} fu={ handlerClick } key={index}/> ) }
                { 2 * otvetCorrect.length + 2 * otvetWrong.length === data.length ? <StopGame propsStop={{
                    otvetCorrect: otvetCorrect,
                    otvetWrong: otvetWrong,
                    game: "memory",
                    launchmodule: props.launchmodule,
                }} /> : null}
            </section>
        </>
    )
};

export default CardList;