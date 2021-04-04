import React from 'react';
import { useParams, Redirect } from 'react-router-dom';

import randomСloneWidenWords from '../../Utils/randomСloneWidenWords';

import CardList from './CardList/CardList';

const GameMemory = props => {
    const { launchmodule } = useParams();
    const propsData = props.location.propsData;    

    return (
        <>
            { propsData
                ? <CardList data={randomСloneWidenWords(propsData.data)} imgRender={propsData.imgRender} launchmodule={propsData.launchmodule}/> 
                : <Redirect to={`/startgame/memory/${launchmodule}`} /> }
        </>
    )
};

export default GameMemory;