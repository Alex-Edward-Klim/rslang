const random = (maxNum, minNum = 0) => minNum + Math.floor(Math.random() * (maxNum - minNum + 1));

const randomСloneWidenWords = arr => {
    const data = [];
    arr.forEach(item => {
        data.push({...item, face: false, correct_otvet: false, wrong_otvet: false, first_open: false});
        data.push({...item, word: item.wordTranslate, face: false, correct_otvet: false, wrong_otvet: false, first_open: false});
    });
    const dataRandom = [];
    const dataCopy = data.concat();
    for (let i = 0; i < dataCopy.length; i++) {
        dataRandom.push({...data.splice(random(data.length - 1), 1)[0], index: i});
    };
    return dataRandom;
}

export default randomСloneWidenWords;