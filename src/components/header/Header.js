import React from 'react';
import styles from './header.module.css';
import LoginStatus from '../loginStatus/LoginStatus';

function Header(props) {

    return (
        <header>
            <div className={styles.headerContainer}>
                <span className={styles.headerTitle}>RS Lang</span>
                <ul className={styles.list}>
                    <li className={styles.listItem}>Главная</li>
                    <li>Игры</li>
                    <li>Словарь</li>
                    <li>Электронный учебник</li>
                    <li>Настройки</li>
                    <li>Статистика</li>
                </ul>
                
                <LoginStatus />
            </div>
        </header>
        );
    }

export default Header;
