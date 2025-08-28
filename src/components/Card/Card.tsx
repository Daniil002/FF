import styles from "./Card.module.css";
import type { Vacancy } from "../../store/vacancy.api";

// принимаем проп vacancy с типизацией
const Card = ({ vacancy }: { vacancy: Vacancy }) => {
  // Функция для определения типа работы и возврата соответствующего тега
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
    <div className={styles.card}>
      {/* Заголовок вакансии */}
      <h2 className={styles.title}>{vacancy.name}</h2>

      {/* Зарплата и опыт */}
      <div className={styles.salaryRow}>
        <span className={styles.salary}>
          {vacancy.salary
            ? `${vacancy.salary.from || ""} - ${vacancy.salary.to || ""} ${
                vacancy.salary.currency || ""
              }`
            : "Зарплата не указана"}
        </span>
        <span className={styles.experience}>{vacancy.experience?.name}</span>
      </div>

      {/* Название компании */}
      <p className={styles.company}>{vacancy.employer?.name}</p>

      {/* Тег типа работы */}
      {workTypeTag && (
        <span className={workTypeTag.className}>{workTypeTag.text}</span>
      )}

      {/* Локация */}
      <p className={styles.location}>{vacancy.area?.name}</p>

      {/* Кнопки */}
      <div className={styles.buttonsRow}>
        <button className={styles.viewButton} disabled>
          Смотреть вакансию
        </button>

        <button className={styles.applyButton}>Откликнуться</button>
      </div>
    </div>
  );
};

export default Card;
// vacancy.name — название вакансии.

// vacancy.salary — зарплата (у неё могут быть from, to, currency). Если пусто — пишем "Зарплата не указана".

// vacancy.experience?.name — опыт, например "1–3 года".

// vacancy.employer?.name — компания.

// vacancy.schedule?.id — если remote, выводим тег "можно удаленно".

// vacancy.area?.name — город.

// vacancy.alternate_url — ссылка на вакансию на hh.ru.
