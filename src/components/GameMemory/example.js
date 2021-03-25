import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";

import { getUserDataFromState, getWordsGroupAndPageFromState } from "../../redux/selectors";
import handlerWords from '../../Utils/handlerWords';

const GameMemory =  () => {
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
            } catch (error) {
                console.log('useWords ERROR');
            }
        };
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const handler = event => {
        const word = data[Number(event.target.dataset.item_index)];

        // const newDifficulty = "game";
        // const newDifficulty = "compound_word";
        // const newDifficulty = "deleted_word";
        const newDifficulty = "reconstitute";
        
        handlerWords(userId, token, word, newDifficulty);
    }


    return (
        <ul>
        { data ? data.map((item, index) => (
            <li key={index} onClick={ handler } data-item_index={index}>
                {`${item.word}${item.userWord ? ` !!! difficulty: ${item.userWord.difficulty}, optional: {correct_otvet: ${item.userWord.optional.correct_otvet}, wrong_otvet: ${item.userWord.optional.wrong_otvet}}` : ''}`}
            </li>
        )) : null}
        </ul>
    )
}

export default GameMemory;