import { useParams, useLocation } from "react-router";
import styles from "../Card/Card.module.css" ; // используем те же стили, что и в карточке
import { useGetVacancyByIdQuery } from "../../store/vacancy.api"; // добавлено: загрузка вакансии по id

const Vacancy = () => {
  const { id } = useParams();
  const location = useLocation();
  const { vacancyData } = location.state || {};
  // добавлено: если данных нет в state, грузим по id
  const { data, isLoading, error } = useGetVacancyByIdQuery(id as string, { skip: !!vacancyData });

  // добавлено: состояния загрузки/ошибки и проверка данных
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

  // Логика для работы с тегами (можно вынести в utils)
  const getWorkTypeTag = (schedule?: { id: string; name: string }) => {
    if (!schedule) return null;

    switch (schedule.id) {
      case "remote":
        return { text: "Можно удалённо", className: styles.remoteTag };
      case "fullDay":
        return { text: "Офис", className: styles.officeTag };
      case "flexible":
        return { text: "Гибрид", className: styles.hybridTag };
      default:
        return { text: schedule.name, className: styles.defaultTag };
    }
  };

  const workTypeTag = getWorkTypeTag(vacancy.schedule);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "40px",
      marginTop: "60px"
    }}>
      <div className={styles.card} style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className={styles.title}>{vacancy.name}</h2>

        <div className={styles.salaryRow}>
          <span className={styles.salary}>
            {vacancy.salary
              ? `${vacancy.salary.from || ""} - ${vacancy.salary.to || ""} ${vacancy.salary.currency || ""}`
              : "Зарплата не указана"}
          </span>
          <span className={styles.experience}>{vacancy.experience?.name}</span>
        </div>

        <p className={styles.company}>{vacancy.employer?.name}</p>

        {workTypeTag && (
          <span className={workTypeTag.className}>{workTypeTag.text}</span>
        )}

        <p className={styles.location}>{vacancy.area?.name}</p>

        {/* добавлено: вывод snippet (краткое описание) */}
        {(vacancy.snippet?.requirement || vacancy.snippet?.responsibility) && (
          <div style={{ margin: "16px 0", color: "#495057" }}>
            {vacancy.snippet?.requirement && <p>{vacancy.snippet.requirement}</p>}
            {vacancy.snippet?.responsibility && <p>{vacancy.snippet.responsibility}</p>}
          </div>
        )}

        <div className={styles.buttonsRow}>
          <a
            href={vacancy.alternate_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewButton}
            style={{textDecoration: "none"}}
          >
            Откликнуться на hh.ru
          </a>

          <button className={styles.applyButton}>Откликнуться</button>
        </div>
      </div>
    </div>
  );
};

export default Vacancy;
