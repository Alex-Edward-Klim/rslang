import { SET_WORDS_GROUP_AND_PAGE } from "./wordsGroupAndPageTypes";

// Action Creators
export const setWordsGroupAndPage = (obj) => {

  localStorage.setItem(
    "RSLangWordsGroupAndPage78fe8a83ef752bd23c98c262b7264947",
    JSON.stringify(obj)
  );
  
  return {
    type: SET_WORDS_GROUP_AND_PAGE,
    payload: obj,
  };
};
