import styles from "./NotFound.module.css";
import catNotFound from "../../assets/sad-cat 1.png"
import { useNavigate } from "react-router";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.titleRow}>
                    <h3 className={styles.title}>Упс! Такой страницы <br /> не существует</h3>
                    <button className={styles.button} onClick={() => navigate('/')}>На главную</button>
                </div>
                
                <p className={styles.text}>Давайте перейдём к началу.</p>
                <div className={styles.imageContainer}>
                    <img className={styles.image} src={catNotFound} alt="Грустный кот" />
                </div>
            </div>
        </div>
    );
};

export default NotFound;