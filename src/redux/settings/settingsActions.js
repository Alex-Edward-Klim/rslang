import { SET_SETTINGS } from "./settingsTypes";

// Action Creators
export const setSettings = (data) => ({
  type: SET_SETTINGS,
  payload: data,
});
