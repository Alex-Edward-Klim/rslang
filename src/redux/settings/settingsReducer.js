import { SET_SETTINGS } from "./settingsTypes";

// Initial State
let initialState;

const storageSettings = localStorage.getItem(
  "RSLangSettings"
);

if (storageSettings) {
  initialState = JSON.parse(storageSettings);
} else {
  initialState = {
    translate: true,
    changeWordStatus: true
  };
}

// Reducer
export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SETTINGS:
      localStorage.setItem("RSLangSettings", JSON.stringify({...action.payload}))
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default settingsReducer;
