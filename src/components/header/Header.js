import React, { useEffect, useState } from 'react';
import styles from './header.module.css';
import LoginStatus from '../loginStatus/LoginStatus';
import burgerMenuSrc from '../../images/icon/burger-menu.svg';
import burgerMenuCloseSrc from '../../images/icon/close-burger.svg';
import { NavLink } from 'react-router-dom';

function Header() {
    
    const [isBurgerMenuShow, setIsBurgerMenuShow] = useState(false);

    function getWindowDimensions() {
    const { innerWidth: width} = window;
    return {width};}

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
        setIsBurgerMenuShow(!isBurgerMenuShow)
    }

    const menuMain = (
        <ul className={styles.list}>
            <NavLink className={styles.listItem} to="/">Главная</NavLink>
            <div className={styles.dropdown}>
                <NavLink className={styles.listItem} to="/">Игры</NavLink>
                    <ul className={styles.dropdownContent}>
                        <NavLink className={styles.dropdownItem} to="/">Саванна</NavLink>
                        <NavLink className={styles.dropdownItem} to="/">Аудиовызов</NavLink>
                        <NavLink className={styles.dropdownItem} to="/">Своя игра</NavLink>
                        <NavLink className={styles.dropdownItem} to="/">Спринт</NavLink>
                    </ul>
                </div>
            <NavLink className={styles.listItem} to="/">Словарь</NavLink>
            <NavLink className={styles.listItem} to="/">Электронный учебник</NavLink>
            <NavLink className={styles.listItem} to="/">Настройки</NavLink>
            <NavLink className={styles.listItem} to="/">Статистика</NavLink>
        </ul>
    );
    
    const burgerMenu = (
        <div className={styles.burgerMenuWrapper}>
            <ul >
                <NavLink className={styles.menuItem} to="/">Главная</NavLink>
                <NavLink className={styles.menuItem} to="/">Игры</NavLink>
                    <ul>
                        <NavLink className={styles.menuItemGame} to="/">Саванна</NavLink>
                        <NavLink className={styles.menuItemGame} to="/">Аудиовызов</NavLink>
                        <NavLink className={styles.menuItemGame} to="/">Своя игра</NavLink>
                        <NavLink className={styles.menuItemGame} to="/">Спринт</NavLink>
                    </ul>
                <NavLink className={styles.menuItem} to="/">Словарь</NavLink>
                <NavLink className={styles.menuItem} to="/">Электронный учебник</NavLink>
                <NavLink className={styles.menuItem} to="/">Настройки</NavLink>
                <NavLink className={styles.menuItem} to="/">Статистика</NavLink>
            </ul>
            <img className={styles.burgerClose} onClick={toggleMenu} src={burgerMenuCloseSrc} alt="close" />
        </div>
    );

    const burgerMenuImg = <img className={styles.burgerImg} onClick={toggleMenu} src={burgerMenuSrc} alt="burgerMenu" />;

    return (
        <header>
            <div className={styles.headerContainer}>
                {width < 1182 ? burgerMenuImg : false}
                <span className={styles.headerTitle}>RS Lang</span>
                {isBurgerMenuShow && burgerMenu}
                {width >= 1182 ? menuMain : false}
                <LoginStatus />
            </div>
        </header>
        );
    }

export default Header;