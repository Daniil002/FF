import Input from '../Input/Input';
import Filter from '../Filter/Filter';
import CardList from '../CardList/CardList';
import styles from './VacanciesPage.module.css';

const VacanciesPage = () => {
  return (
    <div className={styles.vacanciesPage}>
      <Input />
      <div className="main-content">
        <Filter />
        <CardList />
      </div>
    </div>
  );
};

export default VacanciesPage;


