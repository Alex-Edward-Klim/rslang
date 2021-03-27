import React from "react";
import styles from './footer.module.css';
import logoSrc from "../../images/icons/rs_school_js.svg";

function Footer() {
    return (
    <footer className={styles.footer}>
        <div className={styles.footerContainer}>
        <a className={styles.footerLogo} href="https://rs.school/js/">
            <img className={styles.footerLogoImg} alt="rs school" src={logoSrc} />
        </a>
        <p className={styles.footerAuthors}>
            <a href="https://github.com/Alex-Edward-Klim">
            <span>Алексей Климовской</span>
            </a>
            ,
            <a href="https://github.com/korytsa">
            <span> Анна Корытько</span>
            </a>
            ,
            <a href="https://github.com/YaroslavTrefilov">
            <span> Ярослав Трефилов</span>
            </a>
            ,
            <a href="https://github.com/NachinkaShaurmi">
            <span> Юрий Олейник</span>
            </a>, 
            <a href="https://github.com/AV-63-dev">
            <span> Анатолий Манин</span>
            </a>
        </p>
        <a className={styles.footerRss} href="https://rs.school/js/">
            <p>RS School</p>
            <p>2021</p>
        </a>
        </div>
    </footer>
    );
}

export default Footer;