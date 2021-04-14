const random = (maxNum, minNum = 0) => minNum + Math.floor(Math.random() * (maxNum - minNum + 1));

const randomWords = (arr, volume = arr.length) => {
    const vol = volume > arr.length ? arr.length : volume;
    const data = arr.concat();
    const dataRandom = [];
    for (let i = 0; i < vol; i++) {
        dataRandom.push(data.splice(random(data.length - 1), 1)[0]);
    };
    return dataRandom;
}

export default randomWords;