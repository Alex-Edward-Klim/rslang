import { combineReducers } from "redux";

import userReducer from "./user/userReducer";
import settingsReducer from "./settings/settingsReducer";
import wordsGroupAndPageReducer from "./wordsGroupAndPage/wordsGroupAndPageReducer";

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  wordsGroupAndPage: wordsGroupAndPageReducer,
});

export default rootReducer;
