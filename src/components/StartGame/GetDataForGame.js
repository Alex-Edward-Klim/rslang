import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from "axios";

import { getUserDataFromState, getWordsGroupAndPageFromState } from "../../redux/selectors";
import randomWords from '../../Utils/randomWords';
import get20ActiveWordsGroup from '../../Utils/get20ActiveWordsGroup';

const GetDataForGame = props => {
    const { game, launchmodule } = useParams();
    const [loading , setLoading ] = useState(false);
    const [data, setData] = useState([]);
    const {userId, token} = useSelector(getUserDataFromState);
    const {group, page} = useSelector(getWordsGroupAndPageFromState);
    const settingsGame = props.location.propsGame;

    useEffect(() => {
        if (!settingsGame) return <Redirect to={`/startgame/${game}/${launchmodule}`} />

        const head = "https://rslang-server-2021.herokuapp.com";
        const wordCount = settingsGame.wordCount10 ? 10 : 20;
        const groupNav = settingsGame.settingsGroup;

        if (userId) {
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            switch (launchmodule) {

                case "book":
                    const filterActive = '{"$or":[{"userWord.difficulty":"studied_word"},{"userWord.difficulty":"compound_word"},{"userWord":null}]}';
                    const url = `${head}/users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20&filter=${filterActive}`;
                    const getDataBook = async () => {
                        try {
                            let result = [];
                            const res = await axios.get(url, headers).then(res => res.data[0].paginatedResults);
                            if (res.length < wordCount) {
                                const wordsAll = page * 20;
                                if (wordsAll) {
                                    const filterData = '{"$or":[{"userWord.difficulty":"studied_word"},{"userWord.difficulty":"compound_word"}]}';
                                    const urlData = `${head}/users/${userId}/aggregatedWords?group=${group}&wordsPerPage=${wordsAll}&filter=${filterData}`;
                                    const resData = await axios.get(urlData, headers).then(res => res.data[0].paginatedResults);
                                    const words = wordCount - res.length;
                                    const resFilter = randomWords(resData, words);
                                    result = res.concat(resFilter);
                                } else {
                                    result = res;
                                };
                            } else {
                                result = randomWords(res, wordCount);
                            };
                            setData(result);
                            setLoading(true);
                        } catch (error) {
                            console.log('GetDataForGame.js -> case "book" + USER __ ERROR: ', error);
                        };
                    };
                    getDataBook();
                    break;
    
                case "nav":
                    const getDataNav = async () => {
                        try {
                            const result = await get20ActiveWordsGroup(userId, token, groupNav, wordCount);
                            setData(result);
                            setLoading(true);
                        } catch (error) {
                            console.log('GetDataForGame.js -> case "nav" + USER __ ERROR: ', error);
                        };
                    };
                    getDataNav();
                    break;
    
                case "compound":
                    const filterCompound = '{"userWord.difficulty":"compound_word"}';
                    const urlCompound = `${head}/users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20&filter=${filterCompound}`;
                    const getDataCompound = async () => {
                        try {
                            const res = await axios.get(urlCompound, headers).then(res => res.data[0].paginatedResults);
                            let result = [];
                            if (res.length < wordCount) {
                                if (page) {
                                    const urlCompoundNew = `${head}/users/${userId}/aggregatedWords?group=${group}&page=${page - 1}&wordsPerPage=20&filter=${filterCompound}`;
                                    const resData = await axios.get(urlCompoundNew, headers).then(res => res.data[0].paginatedResults);
                                    const words = wordCount - res.length;
                                    const resFilter = randomWords(resData, words);
                                    result = res.concat(resFilter);
                                } else {
                                    result = res;
                                };
                            } else {
                                result = randomWords(res, wordCount);
                            };
                            setData(result);
                            setLoading(true);
                        } catch (error) {
                            console.log('GetDataForGame.js -> case "compound" + USER __ ERROR: ', error);
                        };
                    };
                    getDataCompound();
                break;
    
                case "deleted":
                    const filterDeleted = '{"userWord.difficulty":"deleted_word"}';
                    const urlDeleted = `${head}/users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20&filter=${filterDeleted}`;
                    const getDataDeleted = async () => {
                        try {
                            const res = await axios.get(urlDeleted, headers).then(res => res.data[0].paginatedResults);
                            let result = [];
                            if (res.length < wordCount) {
                                if (page) {
                                    const urlDeletedNew = `${head}/users/${userId}/aggregatedWords?group=${group}&page=${page - 1}&wordsPerPage=20&filter=${filterDeleted}`;
                                    const resData = await axios.get(urlDeletedNew, headers).then(res => res.data[0].paginatedResults);
                                    const words = wordCount - res.length;
                                    const resFilter = randomWords(resData, words);
                                    result = res.concat(resFilter);
                                } else {
                                    result = res;
                                };
                            } else {
                                result = randomWords(res, wordCount);
                            };
                            setData(result);
                            setLoading(true);
                        } catch (error) {
                            console.log('GetDataForGame.js -> case "deleted" + USER __ ERROR: ', error);
                        };
                    };
                    getDataDeleted();
                break;
    
                default:
                break;
            };
        } else {
            switch (launchmodule) {

                case "book":
                    const urlUserNoneBook = `${head}/words?group=${group}&page=${page}`;
                    const getDataBookUserNone = async () => {
                        try {
                            const res = await axios.get(urlUserNoneBook).then(res => res.data);
                            const result = randomWords(res, wordCount);
                            setData(result);
                            setLoading(true);
                        } catch (error) {
                            console.log('GetDataForGame.js -> case "book" __ ERROR: ', error);
                        };
                    };
                    getDataBookUserNone();
                    break;
    
                case "nav":
                    const urlUserNoneNav = `${head}/words?group=${groupNav}`;
                    const getDataNavUserNone = async () => {
                        try {
                            const res = await axios.get(urlUserNoneNav).then(res => res.data);
                            const result = randomWords(res, wordCount);
                            setData(result);
                            setLoading(true);
                        } catch (error) {
                            console.log('GetDataForGame.js -> case "nav" __ ERROR: ', error);
                        };
                    };
                    getDataNavUserNone();
                    break;
    
                default:
                break;
            };
        };
    }, []);

    const controlURLgame = game === "memory" || game === "audiocall" || game === "sprint"; // еще одна игра
    const controlURLlaunchmodule = launchmodule === "nav" || launchmodule === "book" || launchmodule === "compound" || launchmodule === "deleted";
    if (!controlURLgame || !controlURLlaunchmodule) return <Redirect to={`/`} />;
    if (!settingsGame) return <Redirect to={`/startgame/${game}/${launchmodule}`} />

    // console.log(data)

    return (
        <>
            { loading ? <Redirect to={{ pathname: `/${game}/${launchmodule}`, propsData: {
                data: data, 
                imgRender: settingsGame.imgRender
            }}} /> : <p>Loading...</p> }
        </>
    );
};

export default GetDataForGame;