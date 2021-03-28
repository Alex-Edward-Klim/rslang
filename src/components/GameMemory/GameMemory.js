import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useParams, Redirect } from 'react-router-dom';
import axios from "axios";

import { getUserDataFromState, getWordsGroupAndPageFromState } from "../../redux/selectors";
import randomWords from '../../Utils/randomWords';
import randomСloneWidenWords from '../../Utils/randomСloneWidenWords';
import get20ActiveWordsGroup from '../../Utils/get20ActiveWordsGroup';

import CardList from './CardList/CardList';

const GameMemory = props => {
    const { id } = useParams();    
    const [loading , setLoading ] = useState(false);
    const [data, setData] = useState([]);
    const {userId, token} = useSelector(getUserDataFromState);
    const {group, page} = useSelector(getWordsGroupAndPageFromState);
    const settingsGame = props.location.propsGame;  
    
    useEffect(() => {
        if (!props.location.propsGame) return <Redirect to={`/game_memory_start/${id}`} />;
        const head = "https://rslang-server-2021.herokuapp.com";
        const headers = { headers: { Authorization: `Bearer ${token}` } };
        switch (id) {

            case "book":
                const filterActive = '{"$or":[{"userWord.difficulty":"studied_word"},{"userWord.difficulty":"compound_word"},{"userWord":null}]}';
                const url = `${head}/users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20&filter=${filterActive}`;
                const getDataBook = async () => {
                    try {
                        let result = [];
                        const res = await axios.get(url, headers).then(res => res.data[0].paginatedResults);
                        const wordCount = settingsGame.wordCount10 ? 10 : 20;
                        if (res.length < wordCount) {                            
                            const wordsAll = page * 20;
                            if (wordsAll) {
                                const filterData = '{"$or":[{"userWord.difficulty":"studied_word"},{"userWord.difficulty":"compound_word"}]}';
                                const urlData = `${head}/users/${userId}/aggregatedWords?group=${group}&wordsPerPage=${wordsAll}&filter=${filterData}`;
                                const resData = await axios.get(urlData, headers).then(res => res.data[0].paginatedResults);
                                const words = 10 - res.length;
                                const resFilter = randomWords(resData, words);
                                result = res.concat(resFilter);
                            } else {
                                result = res;
                            };
                        } else {
                            result = randomWords(res, wordCount);
                        };
                        setData(randomСloneWidenWords(result));
                        setLoading(true);
                    } catch (error) {
                        console.log('GameMemory.js -> case "book" __ ERROR');
                    };
                };
                getDataBook();
                break;

            case "nav":
                const wordCountNav = settingsGame.wordCount10 ? 10 : 20;
                const getDataNav = async () => {
                    try {
                        const result = await get20ActiveWordsGroup(userId, token, group, wordCountNav);
                        setData(randomСloneWidenWords(result));
                        setLoading(true);
                    } catch (error) {
                        console.log('GameMemory.js -> case "nav" __ ERROR');
                    };
                };
                getDataNav();
                break;

            case "compound":
            break;

            case "deleted":
            break;

            default:
            break;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!props.location.propsGame) return <Redirect to={`/game_memory_start/${id}`} />;

    return (
        <>
            { loading ? <CardList data={data} imgRender={settingsGame.imgRender} /> : <p>Loading...</p> }
        </>
    )
};

export default GameMemory;