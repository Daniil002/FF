import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.about}>
      <h1 className={styles.about__title}>Обо мне</h1>
      <div className={styles.about__content}>
        <p className={styles.about__text}>
          Привет! Меня зовут Даниил, и я Frontend разработчик. 
        </p>
        <p className={styles.about__text}>
          Я специализируюсь на React, TypeScript, и современных инструментах разработки. 
          Мне нравится больше учиться чем работать, ибо я уже учусь 4 года!!!!!
        </p>
        <p className={styles.about__text}>
          В свободное время изучаю новые технологии, по выходным работаю в клубе. Хочу переехать из ДНР в Россию, а если будет мобилизация, то снова в Европу))))
        </p>
        <div className={styles.about__skills}>
          <h3>Технологии, которые я использую:</h3>
          <ul>
            <li>React & TypeScript</li>
            <li>Redux Toolkit</li>
            <li>React Router</li>
            <li>Mantine UI</li>
            <li>CSS Modules</li>
            <li>Vite</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;


