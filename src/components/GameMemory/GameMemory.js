import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";

import { getUserDataFromState, getWordsGroupAndPageFromState } from "../../redux/selectors";

import CardList from './CardList';

const random = (maxNum, minNum = 0) => minNum + Math.floor(Math.random() * (maxNum - minNum + 1));

const GameMemory = () => {
    const [loading , setLoading ] = useState(false);
    const [data, setData] = useState([]);
    const { userId, token } = useSelector(getUserDataFromState);
    const { group, page} = useSelector(getWordsGroupAndPageFromState);
    const head = "https://rslang-server-2021.herokuapp.com";
    const url = `${head}/users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20`;
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axios.get(url , headers).then(res => res.data[0].paginatedResults);
                setData(result);
                setLoading(true);
            } catch (error) {
                console.log('useWords ERROR');
            }
        };
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dataGame = [];
    if (loading) {
        const dataArr = [];
        const dataExample = data.concat(); // slice(0, 13) возможно заберу меньше слов
        dataExample.forEach(item => {
            if (item.userWord) {
                if (item.userWord.difficulty === "studied_word" || item.userWord.difficulty === "compound_word") {
                    dataArr.push({...item, face: false, correct_otvet: false, wrong_otvet: false, first_open: false});
                    dataArr.push({...item, word: item.wordTranslate, face: false, correct_otvet: false, wrong_otvet: false, first_open: false});
                }
            } else {
                dataArr.push({...item, face: false, correct_otvet: false, wrong_otvet: false, first_open: false});
                dataArr.push({...item, word: item.wordTranslate, face: false, correct_otvet: false, wrong_otvet: false, first_open: false});
            }
        });
        const dataArrCopy = dataArr.concat();
        for (let i = 0; i < dataArrCopy.length; i++) {
            dataGame.push({...dataArr.splice(random(dataArr.length - 1), 1)[0], index: i});
        };
    }

    return loading ? <CardList data={dataGame}/> : <p>Loading...</p>;
};

export default GameMemory;