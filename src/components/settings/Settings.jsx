import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { getSettingsFromState } from "../../redux/selectors";
import { setSettings } from "../../redux/settings/settingsActions";
import s from './settings.module.scss'


function Settings() {
  const { translate, changeWordStatus } = useSelector(getSettingsFromState);
  const dispatch = useDispatch();

  const handleSetting = (name, value) => {
    dispatch(setSettings({ translate, changeWordStatus, [name]: value }))
  };

  return (
    <>
      <div className={s.settings}>
        <h2 className={s.title}>Настройки</h2>
        <form action="" className={s.form}>
          <label className={s.label}>
            <Checkbox
              color="primary"
              name="translate"
              onChange={({ target }) =>
                handleSetting(target.name, target.checked)
              }
              checked={translate}
            />
            Показывать перевод
          </label>

          <label className={s.label}>
            <Checkbox
              color="primary"
              name="changeWordStatus"
              onChange={({ target }) =>
                handleSetting(target.name, target.checked)
              }
              checked={changeWordStatus}
            />
            Показывать кнопки добавления в разделы словаря
          </label>
        </form>
        {/* кнопка назад */}
      </div>
    </>
  );
}

export default Settings;
