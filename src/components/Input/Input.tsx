import styles from "./Input.module.css";
import searchIcon from "../../assets/icon-search.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchText } from "../../store/inputSlice";

const Input = () => {
  const [lockalValue, setLocalValue] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(setSearchText(lockalValue))

  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  
  return (
    <div className={styles.container}>
      {/* Левая часть с текстом */}
      <div className={styles.textSection}>
        <h1 className={styles.title}>Список вакансий</h1>
        <p className={styles.subtitle}>по профессии Frontend-разработчик</p>
      </div>

      {/* Правая часть с инпутом и кнопкой */}
      <div className={styles.inputSection}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Должность или название компании"
            className={styles.input}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyUp={handleKeyPress}
          />
          <img
            src={searchIcon}
            alt="Поиск"
            className={styles.searchIcon}
          />
        </div>
        <button onClick={handleSearch} className={styles.button}>Найти</button>
      </div>
    </div>
  );
};

export default Input;
