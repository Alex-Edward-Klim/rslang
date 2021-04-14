import axios from 'axios';
import randomWords from './randomWords';

const  get20ActiveWordsGroup = async (userId, token, group, volume = 20) => {
  const head = "https://rslang-server-2021.herokuapp.com";
  const filterActive = '{"$or":[{"userWord.difficulty":"studied_word"},{"userWord.difficulty":"compound_word"}]}';
  const url = `${head}/users/${userId}/aggregatedWords?group=${group}&wordsPerPage=600&filter=${filterActive}`;
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  
  const result = await axios.get(url, headers).then(res => res.data[0].paginatedResults);
  if (result.length === volume) {
    return result;
  } else if (result.length < volume) {
    const words = volume - result.length;
    const filterData = '{"userWord":null}';
    const urlData = `${head}/users/${userId}/aggregatedWords?group=${group}&wordsPerPage=${words}&filter=${filterData}`;
    const data = await axios.get(urlData, headers).then(res => res.data[0].paginatedResults);
    return result.concat(data);
  } else {    
    return randomWords(result, volume);
  }
};

export default get20ActiveWordsGroup;