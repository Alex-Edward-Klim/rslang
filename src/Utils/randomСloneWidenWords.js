const random = (maxNum, minNum = 0) => minNum + Math.floor(Math.random() * (maxNum - minNum + 1));

const randomСloneWidenWords = arr => {
    const data = [];
    arr.forEach(item => {
        if (item.id) {
            data.push({...item, _id: item.id, wordCard: item.word, face: false, correct_otvet: false, wrong_otvet: false, first_open: false});
            data.push({...item, _id: item.id, wordCard: item.wordTranslate, face: false, correct_otvet: false, wrong_otvet: false, first_open: false});
        } else {
            data.push({...item, wordCard: item.word, face: false, correct_otvet: false, wrong_otvet: false, first_open: false});
            data.push({...item, wordCard: item.wordTranslate, face: false, correct_otvet: false, wrong_otvet: false, first_open: false});
        }        
    });
    const dataRandom = [];
    const dataCopy = data.concat();
    for (let i = 0; i < dataCopy.length; i++) {
        dataRandom.push({...data.splice(random(data.length - 1), 1)[0], index: i});
    };
    return dataRandom;
}

export default randomСloneWidenWords;