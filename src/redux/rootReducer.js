import { combineReducers } from "redux";

import userReducer from "./user/userReducer";
import wordsGroupAndPageReducer from "./wordsGroupAndPage/wordsGroupAndPageReducer";

const rootReducer = combineReducers({
  user: userReducer,
  wordsGroupAndPage: wordsGroupAndPageReducer,
});

export default rootReducer;
