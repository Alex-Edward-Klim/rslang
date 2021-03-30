import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import s from './GameMemoryStart.module.scss';

import Footer from '../../footer/Footer';

const GameMemoryStart = () => {
    const { id } = useParams();
    const [img, setImg] = useState(true);
    const [wordCount, setWordCount] = useState(true);

    const handlerCheckbox = event => {
        if (event.target.name === "img") {
            setImg(!img);
        } else if (event.target.name === "wordCount10" || event.target.name === "wordCount20") {
            setWordCount(!wordCount);
        };
    }

    return (
        <>
            <section className={s.section}>
                <div className={s.container}>               
                    <h2>Карточки</h2>
                    <p>Изучая слова не забывайте тренировать и память. Эта игра предложит Вам карточки, где перевернуть за раз можно две. Ваша задача найти соответствующие 
                        карточки. Игра следит какие карточки были перевернуты. Открыв первую карточку, Вы должны указать соответствующую вторую. Если вторая карточка была 
                        ранее перевернута, но Вы её не указали, игра засчитает неверный ответ и подсветит обе карты красным.</p>
                    <div className={s.control}>
                        <label>
                            <input name="img" type="checkbox" checked={img} onChange={handlerCheckbox} />
                            Использовать изображения в карточке.
                        </label>
                        <label>
                            <input name="wordCount10" type="checkbox" checked={wordCount} onChange={handlerCheckbox} />
                            { id === "nav" ? "Использовать 10 случайных слов из раздела" : "Использовать 10 случайных слов со страницы" }
                        </label>
                        <label>
                            <input name="wordCount20" type="checkbox" checked={!wordCount} onChange={handlerCheckbox} />
                            { id === "nav" ? "Использовать 20 случайных слов из раздела" : "Использовать 20 случайных слов со страницы" }
                        </label>
                        { id === "nav" 
                            ? <p>Если в разделе недостаточно изучаемых слов, к изучаемым словам будут добавлены новые слова из раздела.</p> 
                            : <p>Если на странице недостаточно слов, будут задействованы изучаемые слова с предыдущих страниц.</p> }
                    </div>
                    <Link to={{ pathname: `/game_memory/${id}`, propsGame: {imgRender: img, wordCount10: wordCount} }}>
                        <button className={s.btn}>Начать</button>
                    </Link>
                    <div className={s.girl} />
                    <div className={s.boy} />
                    { id === "nav" || id === "book" ? <Link to={'/elTextBook'} className={s.close}>&#10060;</Link> : null}
                    {/* добавить линк для других мест запуска */}
                </div>
            </section>
            {/* <Footer /> */}
        </>
    )

};

export default GameMemoryStart;

//значения id мест запуска
//id = "nav" || "book" || "compound" || "deleted"