import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useParams, Redirect } from 'react-router-dom';
import axios from "axios";

import { getUserDataFromState, getWordsGroupAndPageFromState } from "../../redux/selectors";
import handlerWords from '../../Utils/handlerWords';
import get20ActiveWordsGroup from '../../Utils/get20ActiveWordsGroup';

const Example = (props) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const { userId, token } = useSelector(getUserDataFromState);
    const { group, page} = useSelector(getWordsGroupAndPageFromState);
    const head = "https://rslang-server-2021.herokuapp.com";
    const url = `${head}/users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20`;
    // const url = `${head}/users/${userId}/aggregatedWords?group=${group}`;
    // const filterDelete = '{"userWord.difficulty":"deleted_word"}';
    // const url = `${head}/users/${userId}/aggregatedWords?group=${group}&wordsPerPage=600&filter=${filterDelete}`;
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axios.get(url , headers).then(res => res.data[0].paginatedResults);
                // const result = await axios.get(url , headers).then(res => res.data);
                setData(result);
            } catch (error) {
                console.log('useWords ERROR');
            }
        };
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    /* useEffect(() => {
        const getData = async () => {
            try {
                const result = await get20ActiveWordsGroup(userId, token, group);
                setData(result);
            } catch (error) {
                console.log('useWords ERROR');
            }
        };
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); */



    const handler = event => {
        const word = data[Number(event.target.dataset.item_index)];

        // const newDifficulty = "game";
        // const newDifficulty = "compound_word";
        // const newDifficulty = "deleted_word";
        const newDifficulty = "reconstitute";
        
        handlerWords(userId, token, word, newDifficulty);
    }

    if (!props.location.propsGame) return <Redirect to={`/gamememory/${id}`} />;
    console.log(data);
    console.log(id," ",props.location.propsGame);

    return (
        <>
            <p>раздел: {group}, страница {page}</p>
            <ul>
            { data ? data.map((item, index) => (
                <li key={index} onClick={ handler } data-item_index={index}>
                    {`${item.word.toUpperCase()} ___ раздел: ${item.group}, страница ${item.page}${item.userWord ? ` ___ difficulty: ${item.userWord.difficulty} ___ optional: {correct_otvet: ${item.userWord.optional.correct_otvet}, wrong_otvet: ${item.userWord.optional.wrong_otvet}}` : ''}`}
                </li>
            )) : null}
            </ul>
        </>
    )
}

export default Example;