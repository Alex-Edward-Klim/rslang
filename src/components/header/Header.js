import React, { useEffect, useState } from 'react';
import styles from './header.module.css';
import './burger-menu.css';
import LoginStatus from '../loginStatus/LoginStatus';
import { slide as Menu } from 'react-burger-menu';

function Header() {
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

    const menu = 
        width >= 1182
    ? <ul className={styles.list}>
        <li className={styles.listItem}>Главная</li>
        <li>Игры</li>
        <li>Словарь</li>
        <li>Электронный учебник</li>
        <li>Настройки</li>
        <li>Статистика</li>
    </ul>
    : <Menu>
        <a className={styles.menuItem} href="/">
        Главная
        </a>
        <a className={styles.menuItem} href="/">
        Игры
        </a>
        <a className={styles.menuItem} href="/">
        Словарь
        </a>
        <a className={styles.menuItem} href="/">
        Электронный учебник
        </a>
        <a className={styles.menuItem} href="/">
        Настройки
        </a><a className={styles.menuItem} href="/">
        Статистика
        </a>
    </Menu>;
    
    return (
        <header>
            <div className={styles.headerContainer}>
                <span className={styles.headerTitle}>RS Lang</span>
                {menu}
                <LoginStatus />
            </div>
        </header>
        );
    }

export default Header;
