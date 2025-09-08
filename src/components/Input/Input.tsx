import styles from "./Input.module.css";
import searchIcon from "../../assets/icon-search.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchText } from "../../store/inputSlice";
import { useSearchParams } from "react-router"; // добавлено: синхронизация с URL

const Input = () => {
  const [lockalValue, setLocalValue] = useState('');
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams(); // добавлено

  const handleSearch = () => {
    dispatch(setSearchText(lockalValue))
    // добавлено: запись в URL параметра q
    const next = new URLSearchParams(searchParams);
    if (lockalValue) next.set('q', lockalValue); else next.delete('q');
    setSearchParams(next, { replace: true });
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // добавлено: инициализация поля из URL при монтировании и при изменении searchParams
  useEffect(() => {
    const q = searchParams.get('q') || '';
    setLocalValue(q);
    dispatch(setSearchText(q));
  }, [searchParams, dispatch]);
  
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
