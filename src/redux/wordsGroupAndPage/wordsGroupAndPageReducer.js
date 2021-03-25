import { SET_WORDS_GROUP_AND_PAGE } from "./wordsGroupAndPageTypes";

// Initial State
let initialState;

const storageWordsGroupAndPage = localStorage.getItem(
  "RSLangWordsGroupAndPage78fe8a83ef752bd23c98c262b7264947"
);

if (storageWordsGroupAndPage) {
  initialState = JSON.parse(storageWordsGroupAndPage);
} else {
  initialState = {
    group: 0,
    page: 0,
  };
}

// Reducer
export const wordsGroupAndPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WORDS_GROUP_AND_PAGE:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default wordsGroupAndPageReducer;
