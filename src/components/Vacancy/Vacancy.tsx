import { useParams, useLocation } from "react-router";
import { useGetVacancyByIdQuery } from "../../store/vacancy.api";
import Card from "../Card/Card";
import styles from "./Vacancy.module.css";

const Vacancy = () => {
  const { id } = useParams();
  const location = useLocation();
  const { vacancyData } = location.state || {};
  const { data, isLoading, error } = useGetVacancyByIdQuery(id as string, { skip: !!vacancyData });

  if (!vacancyData && isLoading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Загрузка...</p>;
  }
  if (!vacancyData && error) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Ошибка загрузки</p>;
  }

  const vacancy = vacancyData || data;
  if (!vacancy) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Информация о вакансии не найдена</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <Card vacancy={vacancy} />

        {(vacancy.snippet?.requirement || vacancy.snippet?.responsibility) && (
          <div className={styles.description}>
            {vacancy.snippet?.requirement && (
              <p className={styles.requirement}>{vacancy.snippet.requirement}</p>
            )}
            {vacancy.snippet?.responsibility && (
              <p className={styles.responsibility}>{vacancy.snippet.responsibility}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vacancy;
