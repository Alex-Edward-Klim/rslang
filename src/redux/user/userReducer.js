import { SET_USER_DATA } from "./userTypes";

// Initial State
let initialState;

const storageUserData = localStorage.getItem(
  "RSLangUserData78fe8a83ef752bd23c98c262b7264947"
);

if (storageUserData) {
  initialState = JSON.parse(storageUserData);
} else {
  initialState = {};
}

// Reducer
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
