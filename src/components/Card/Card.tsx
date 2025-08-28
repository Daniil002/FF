import styles from "./Card.module.css";

// принимаем проп vacancy
const Card = ({ vacancy }) => {
    return (
        <div className={styles.card}>
            {/* Заголовок вакансии */}
            <h2 className={styles.title}>{vacancy.name}</h2>
            
            {/* Зарплата и опыт */}
            <div className={styles.salaryRow}>
                <span className={styles.salary}>
                    {vacancy.salary 
                        ? `${vacancy.salary.from || ''} - ${vacancy.salary.to || ''} ${vacancy.salary.currency || ''}`
                        : "Зарплата не указана"}
                </span>
                <span className={styles.experience}>{vacancy.experience?.name}</span>
            </div>
            
            {/* Название компании */}
            <p className={styles.company}>{vacancy.employer?.name}</p>
            
            {/* Тег удаленной работы */}
            {vacancy.schedule?.id === "remote" && (
                <span className={styles.remoteTag}>можно удаленно</span>
            )}
            
            {/* Локация */}
            <p className={styles.location}>{vacancy.area?.name}</p>
            
            {/* Кнопки */}
            <div className={styles.buttonsRow}>
                <a href={vacancy.alternate_url} target="_blank" rel="noreferrer">
                    <button className={styles.viewButton}>Смотреть вакансию</button>
                </a>
                <button className={styles.applyButton}>Откликнуться</button>
            </div>
        </div>
    )
}

export default Card;

// vacancy.name — название вакансии.

// vacancy.salary — зарплата (у неё могут быть from, to, currency). Если пусто — пишем "Зарплата не указана".

// vacancy.experience?.name — опыт, например "1–3 года".

// vacancy.employer?.name — компания.

// vacancy.schedule?.id — если remote, выводим тег "можно удаленно".

// vacancy.area?.name — город.

// vacancy.alternate_url — ссылка на вакансию на hh.ru.