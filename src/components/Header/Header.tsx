// Header.jsx
import logo from "../../assets/logo.png"; // сюда подставь свой путь к логотипу
import smallIcon from "../../assets/small-icon.png"; // картинка для "Обо мне"
import styles from "./Header.module.css";

const Header = () => {
    return (
        <header className={styles.header}>
            {/* Левая часть — Лого + надпись */}
            <div className={styles.header__left}>
                <img src={logo} alt="Logo" className={styles.header__logo}/>
                <span className={styles.header__brand}>.FrontEnd</span>
            </div>

            {/* Центральная часть — "Вакансии FE" */}
            <div className={styles.header__center}>
                <span className={styles.header__vacancy}>Вакансии FE</span>
                <div className={styles.header__circle}></div>
                <img src={smallIcon} alt="Обо мне" className={styles.header__icon} />
                <span className={styles.header__about}>Обо мне</span>
            </div>
        </header>
    );
};

export default Header;
