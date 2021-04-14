import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import LoginStatus from "../loginStatus/LoginStatus";
import burgerMenuSrc from "../../images/icon/burger-menu.svg";
import burgerMenuCloseSrc from "../../images/icon/close-burger.svg";
import { NavLink } from "react-router-dom";
import { setWordsGroupAndPage } from "../../redux/wordsGroupAndPage/wordsGroupAndPageActions";
import { useSelector, useDispatch } from "react-redux";
import { getWordsGroupAndPageFromState } from "../../redux/selectors";
import { getUserDataFromState } from '../../redux/selectors';
import { useHistory } from "react-router-dom";
import { setUserData } from "../../redux/user/userActions"

function Header() {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const dispatch = useDispatch();
  const { group, page } = useSelector(getWordsGroupAndPageFromState);

  const [isBurgerMenuShow, setIsBurgerMenuShow] = useState(false);
  const {userId} = useSelector(getUserDataFromState);

  const history = useHistory();

  useEffect(() => {
  if (userId) {
    setIsAuthorized(true)
  } else {
    setIsAuthorized(false)
  }
  }, [userId])


  const logout = () => {
    localStorage.clear()
    history.push("/");
    setIsAuthorized(false);

    dispatch(setUserData (''))
  }

  function getWindowDimensions() {
    const { innerWidth: width } = window;
    return { width };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }

  const { width } = useWindowDimensions();

  const toggleMenu = () => {
    setIsBurgerMenuShow(!isBurgerMenuShow);
  };

  const textBookHandler = () => {
    dispatch(setWordsGroupAndPage({ group, page: 0 }));
  }

  const menuMain = (
    <ul className={styles.list}>
      <NavLink className={styles.listItem} to="/">
        Главная
      </NavLink>
      <div className={styles.dropdown}>
        <div className={styles.listItem}>Игры</div>
        <ul className={styles.dropdownContent}>
          <NavLink className={styles.dropdownItem} to="/startgame/savanna/nav">
            Саванна
          </NavLink>
          <NavLink className={styles.dropdownItem} to="/startgame/audiocall/nav">
            Аудиовызов
          </NavLink>
          <NavLink className={styles.dropdownItem} to="/startgame/memory/nav">
            Карточки
          </NavLink>
          <NavLink className={styles.dropdownItem} to="/startgame/sprint/nav">
            Спринт
          </NavLink>
        </ul>
      </div>
      <NavLink className={styles.listItem} to="/vocabulary" onClick={textBookHandler}>
        Словарь
      </NavLink>
      <NavLink className={styles.listItem} to="/elTextBook" onClick={textBookHandler}>
        Электронный учебник
      </NavLink>
      <NavLink className={styles.listItem} to="/settings">
        Настройки
      </NavLink>
      <NavLink className={styles.listItem} to="/statistic">
        Статистика
      </NavLink>
    </ul>
  );

  const burgerMenu = (
    <div className={styles.burgerMenuWrapper}>
      <ul>
        <NavLink className={styles.menuItem} to="/">
          Главная
        </NavLink>
        <div className={styles.menuItem}>Игры</div>
        <ul>
          <NavLink className={styles.menuItemGame} to="/">
            Саванна
          </NavLink>
          <NavLink className={styles.menuItemGame} to="/audiocall">
            Аудиовызов
          </NavLink>
          <NavLink className={styles.menuItemGame} to="/game_memory_start/nav">
            Карточки
          </NavLink>
          <NavLink className={styles.menuItemGame} to="/">
            Спринт
          </NavLink>
        </ul>
        <NavLink className={styles.menuItem} to="/vocabulary">
          Словарь
        </NavLink>
        <NavLink className={styles.menuItem} to="/elTextBook">
          Электронный учебник
        </NavLink>
        <NavLink className={styles.menuItem} to="/settings">
          Настройки
        </NavLink>
        <NavLink className={styles.menuItem} to="/">
          Статистика
        </NavLink>
      </ul>
      <img
        className={styles.burgerClose}
        onClick={toggleMenu}
        src={burgerMenuCloseSrc}
        alt="close"
      />
    </div>
  );

  const burgerMenuImg = (
    <img
      className={styles.burgerImg}
      onClick={toggleMenu}
      src={burgerMenuSrc}
      alt="burgerMenu"
    />
  );

    return (
        <header>
            <div className={styles.headerContainer}>
                {width < 1217 ? burgerMenuImg : false}
                <span className={styles.headerTitle}>RS Lang</span>
                {isBurgerMenuShow && burgerMenu}
                {width >= 1217 ? menuMain : false}
                <LoginStatus />
                {isAuthorized && (<span onClick={logout} className={styles.headerLogout}>Выход</span> )}
            </div>
        </header>
        );
    }

export default Header;
