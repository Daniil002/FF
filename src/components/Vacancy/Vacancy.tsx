import { useParams, useLocation } from "react-router";
import styles from "../Card/Card.module.css" ; // используем те же стили, что и в карточке

const Vacancy = () => {
  const { id } = useParams();
  const location = useLocation();
  const { vacancyData } = location.state || {};

  if (!vacancyData) {
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

  const workTypeTag = getWorkTypeTag(vacancyData.schedule);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "40px",
      marginTop: "60px"
    }}>
      <div className={styles.card} style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className={styles.title}>{vacancyData.name}</h2>

        <div className={styles.salaryRow}>
          <span className={styles.salary}>
            {vacancyData.salary
              ? `${vacancyData.salary.from || ""} - ${vacancyData.salary.to || ""} ${vacancyData.salary.currency || ""}`
              : "Зарплата не указана"}
          </span>
          <span className={styles.experience}>{vacancyData.experience?.name}</span>
        </div>

        <p className={styles.company}>{vacancyData.employer?.name}</p>

        {workTypeTag && (
          <span className={workTypeTag.className}>{workTypeTag.text}</span>
        )}

        <p className={styles.location}>{vacancyData.area?.name}</p>

        <div className={styles.buttonsRow}>
          <a
            href={vacancyData.alternate_url}
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
