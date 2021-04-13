import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useSelector } from 'react-redux';
import cn from 'classnames';

import s from './GameSavanna.module.scss';

import randomWords from '../../Utils/randomWords';
import handlerWords from '../../Utils/handlerWords';
import { getUserDataFromState } from '../../redux/selectors';

import StopGame from '../StopGame/StopGame';

const GameSavanna = props => {
    const propsData = props.location.propsData;
    const handle = useFullScreenHandle();
    const { launchmodule } = useParams();
    const [gameLv, setGameLv] = useState({});
    const [answer, setAnswer] = useState(false);
    const [level, setLevel] = useState(0);
    const [heart, setHeard] = useState(5);
    const [gameOver, setGameOver] = useState(false);
    const [otvetCorrect, setOtvetCorrect] = useState([]);
    const [otvetWrong, setOtvetWrong] = useState([]);
    const { userId, token } = useSelector(getUserDataFromState);

    useEffect(() => {
        if (!propsData) return <Redirect to={`/startgame/savanna/${launchmodule}`} />;

        if (level < propsData.data.length && heart > 0) {
            const game = handlerWordLevel(level, propsData.data);
            setTimeout(() => setGameLv(game), 800);
            const timerId = setTimeout(() => handlerPassivity(game), 4800);
            return () => clearTimeout(timerId);
        }
    }, [level])

    const  handlerWordLevel = (level, data) => {
        const gameLevel = {
            level: level,
            wordGame: null,
            btnGame: null,
        }
        const langGame = Math.random() < 0.5 ? true : false; // true = "RU" false = "ENG";
        const btn = [];
                
        gameLevel.wordGame = {...data[level], wordGame: langGame ? data[level].wordTranslate : data[level].word};
        btn.push({...data[level], wordGame: langGame ? data[level].word : data[level].wordTranslate, otvet: true});
        
        const arr = data.concat();
        arr.splice(level, 1);
        randomWords(arr, 3).forEach(item => btn.push({...item, wordGame: langGame ? item.word : item.wordTranslate}));
        gameLevel.btnGame = randomWords(btn, 4);

        return gameLevel;
    }

    const saveResultOtvet = (otvet, fuOtvet, data) => {
        const arr = otvet.concat();
        arr.push(data);
        fuOtvet(arr);
    }

    const handlerAnswer = event => {
        const index = event.target.dataset.index;
        if (gameLv.btnGame[index].otvet) {
            // верный ответ
            saveResultOtvet(otvetCorrect, setOtvetCorrect, gameLv.wordGame);
            if (userId) {
                handlerWords(userId, token, gameLv.wordGame, "game", true);
            };
            runLevelTrue();
        } else {
            gameLv.btnGame[index].otvet = false;
            setHeard(heart => heart - 1);            
            // не верный ответ
            saveResultOtvet(otvetWrong, setOtvetWrong, gameLv.wordGame);
            if (userId) {
                handlerWords(userId, token, gameLv.wordGame, "game", false);
            };
            runLevelFalse();
        };
    }

    const handlerPassivity = game => {
        game.btnGame.forEach(item => item.otvet = item.otvet ? true : false);
        setGameLv(game);
        setHeard(heart => heart - 1);        
        // не верный ответ
        saveResultOtvet(otvetWrong, setOtvetWrong, game.wordGame);
        if (userId) {
            handlerWords(userId, token, game.wordGame, "game", false);
        };
        runLevelFalse();
    }

    const runLevelTrue = () => {
        setAnswer(answer => !answer);
        setLevel(level => level + 1);
        if (level < propsData.data.length - 1 && heart > 0) {
            setTimeout(() => setAnswer(answer => !answer), 800);
        } else {
            setTimeout(() => {setGameOver(gameOver => !gameOver)}, 800);
        }
    }

    const runLevelFalse = () => {
        setAnswer(answer => !answer);
        setLevel(level => level + 1);
        if (level < propsData.data.length - 1 && heart > 1) {
            setTimeout(() => setAnswer(answer => !answer), 800);
        } else {
            setTimeout(() => {setGameOver(gameOver => !gameOver)}, 800);
        }
    }

    return (
        <>
            {propsData ? null : <Redirect to={`/startgame/savanna/${launchmodule}`} />}
            <FullScreen handle={handle}>
                <section className={cn(s.section, handle.active ? s.active : null)}>
                    <div className={s.TopWrapper}>
                        <div className={cn(s.btnFullScreen, handle.active ? s.active : null)} onClick={handle.active ? handle.exit : handle.enter}></div>
                        <div className={s.heartWrapper}>
                            { Array(heart).fill().map(index => <div className={s.heart}></div>) }
                        </div>
                    </div>
                    <div className={s.img} style={{backgroundPosition: `right ${level * 3}% center`}}>
                        {gameLv.wordGame && !answer ? <p className={s.word}>{gameLv.wordGame.wordGame}</p> : null}
                    </div>
                    <div className={s.btnWrapper}>
                        {gameLv.btnGame ? gameLv.btnGame.map((item, index) => (
                            <button 
                                className={cn(s.btn, answer ? (item.otvet ? s.green : (item.otvet === false ? s.red : null)) : null)} 
                                onClick={answer ? null : handlerAnswer} 
                                data-index={index} key={index}>{item.wordGame}</button>
                        )) : null}
                    </div>
                    {gameOver ? <StopGame propsStop={{
                    otvetCorrect: otvetCorrect,
                    otvetWrong: otvetWrong,
                    game: "savanna",
                    launchmodule: launchmodule,
                }} /> : null}
                </section>
            </FullScreen>
        </>
    )
};

export default GameSavanna;