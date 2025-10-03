// Header.jsx
import logo from "../../assets/logo.png"; // сюда подставь свой путь к логотипу
import smallIcon from "../../assets/small-icon.png"; // картинка для "Обо мне"
import styles from "./Header.module.css";
import { Link, useMatch } from "react-router";

const Header = () => {
    const vacanciesMatch = useMatch("/vacancies");
    const aboutMatch = useMatch("/about");

    return (
        <header className={styles.header}>
            {/* Левая часть — Лого + надпись */}
            <div className={styles.header__left}>
                <img src={logo} alt="Logo" className={styles.header__logo}/>
                <Link to="/vacancies" className={styles.header__brand}>.FrontEnd
                    
                </Link>
            </div>

            {/* Центральная часть — "Вакансии FE" */}
            <div className={styles.header__center}>
                <Link 
                    to="/vacancies" 
                    className={`${styles.header__vacancy} ${vacanciesMatch ? styles.active : ''}`}
                >
                    Вакансии FE
                </Link>
                <div className={styles.header__circle}></div>
                <img src={smallIcon} alt="Обо мне" className={styles.header__icon} />
                <Link 
                    to="/about" 
                    className={`${styles.header__about} ${aboutMatch ? styles.active : ''}`}
                >
                    Обо мне
                </Link>
            </div>
        </header>
    );
};

export default Header;
