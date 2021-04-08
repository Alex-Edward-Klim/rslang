import React, { useState } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

import s from './StartGame.module.scss';

import { getWordsGroupAndPageFromState } from "../../redux/selectors";

import GroupFlags from '../elTextBook/groupFlags/GroupFlags.jsx';

import DescriptionMemory from '../GameMemory/Description/Description';
import DescriptionSprint from '../sprint/Description/Description.jsx';
import DescriptionAudiocall from '../audiocall/Description/Description';
import DescriptionSavanna from '../GameSavanna/Description/Description';

const StartGame = () => {
    const { game, launchmodule } = useParams();

    const {group} = useSelector(getWordsGroupAndPageFromState);
    const [settingsGroup, setSettingsGroup] = useState(group);
    const [settingsOpen, setSettingsOpen] = useState(false);
    
    // начало блока индивидуальных настроек для memory
    const [img, setImg] = useState(true);
    const [wordCount, setWordCount] = useState(false); // соответствует "wordCount20"
    const handlerCheckbox = event => {
        if (event.target.name === "img") {
            setImg(!img);
        } else if (event.target.name === "wordCount10" || event.target.name === "wordCount20") {
            setWordCount(!wordCount);
        };
    }
    // конец блока индивидуальных настроек для memory

    const controlURLgame = game === "memory" || game === "sprint" || game === "audiocall" || game === "savanna";
    const controlURLlaunchmodule = launchmodule === "nav" || launchmodule === "book" || launchmodule === "compound" || launchmodule === "deleted";
    if (!controlURLgame || !controlURLlaunchmodule) return <Redirect to={`/`} />;

    return (
        <div>
            <section className={s.section}>
                <div className={s.container}>
                    { game === "memory" ? <DescriptionMemory /> : null}
                    { game === "sprint" ? <DescriptionSprint /> : null}
                    { game === "audiocall" ? <DescriptionAudiocall /> : null}
                    { game === "savanna" ? <DescriptionSavanna /> : null}

                    { game === "memory" ? 
                        <div className={s.control}>
                            <label>
                                <input name="img" type="checkbox" checked={img} onChange={handlerCheckbox} />
                                Использовать изображения в карточке.
                            </label>
                            <label>
                                <input name="wordCount10" type="checkbox" checked={wordCount} onChange={handlerCheckbox} />
                                { launchmodule === "nav" ? "Использовать 10 случайных слов из раздела" : "Использовать 10 случайных слов со страницы" }
                            </label>
                            <label>
                                <input name="wordCount20" type="checkbox" checked={!wordCount} onChange={handlerCheckbox} />
                                { launchmodule === "nav" ? "Использовать 20 случайных слов из раздела" : "Использовать 20 слов со страницы" }
                            </label>                            
                        </div>
                    : <div className={s.control}>
                        { launchmodule === "nav" ? <p>Будут использованы 20 слов из раздела</p> : <p>Будут ипользованы 20 слов со страницы</p> }
                    </div> }

                    { launchmodule === "nav" 
                        ? <p>Если в разделе недостаточно изучаемых слов, к изучаемым словам будут добавлены новые слова из раздела.<br/>
                            (доступно для авторизованного пользователя)</p> 
                        : <p>Если на странице недостаточно слов, будут задействованы изучаемые слова с предыдущих страниц.<br/>
                            (доступно для авторизованного пользователя)</p> }

                    <Link to={{ pathname: `/getdataforgame/${game}/${launchmodule}`, 
                        propsGame: {
                            settingsGroup: settingsGroup,
                            imgRender: img, 
                            wordCount10: wordCount,
                        } 
                    }}>
                        <button className={s.btn}>Начать</button>
                    </Link>

                    <div className={s.girl} />
                    <div className={s.boy} />

                    { launchmodule === "nav" || launchmodule === "book" ? <Link to={'/elTextBook'} className={s.close}>&#10060;</Link> : null}
                    { launchmodule === "compound" || launchmodule === "deleted" ? <Link to={'/vocabulary'} className={s.close}>&#10060;</Link> : null}
                    
                    { launchmodule === "nav" ? 
                        <div className={s.settings} onClick={() => setSettingsOpen(!settingsOpen)}>
                            { settingsOpen ? 
                                <div className={s.flagWrapper}>
                                    {Array(6).fill().map((x,index) => (
                                        <GroupFlags 
                                            number={index} 
                                            current={settingsGroup} 
                                            handleFlagClick={group => {
                                                setSettingsGroup(group);
                                                setSettingsOpen(!settingsOpen);
                                            }} 
                                            key={index}
                                        />
                                    ))}
                                </div>
                            : null }
                        </div> 
                    : null}

                </div>
            </section>
        </div>
    )

};

export default StartGame;