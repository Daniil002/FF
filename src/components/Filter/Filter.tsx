import styles from "./Filter.module.css";
import buttonIcon from "../../assets/_ActionIcon_.png";
import locationIcon from "../../assets/citySearchIcon.png"
import arrowDown from "../../assets/cityIcon.png"
import { Pill, PillGroup } from '@mantine/core';


const Filter = () => {
    return (
        <div className={styles.container}>
            {/* Первая секция - Ключевые навыки */}
            <div className={styles.skillsSection}>
                <h2 className={styles.skillsTitle}>Ключевые навыки</h2>
                
                <div className={styles.skillsInputWrapper}>
                    <input 
                        type="text" 
                        placeholder="Навык" 
                        className={styles.skillsInput}
                    />
                    <button className={styles.addButton}>
                        <img src={buttonIcon} alt="Добавить" />
                    </button>
                </div>

                <PillGroup gap={10}>

                    <Pill onRemove={() => console.log('Пил удалён')} withRemoveButton>Java Script</Pill>
                    <Pill withRemoveButton>React</Pill>
                    <Pill withRemoveButton>Redux</Pill>
                    <Pill withRemoveButton>ReduxToolkit</Pill>
                    <Pill withRemoveButton>Next.js</Pill>
                    <Pill withRemoveButton>Vitest</Pill>
                </PillGroup>
                
                
                {/* <div className={styles.skillsTags}>
                    <span className={styles.tag}>JavaScript</span>
                    <span className={styles.tag}>React</span>
                    <span className={styles.tag}>Redux</span>
                    <span className={styles.tag}>TypeScript</span>
                    <span className={styles.tag}>HTML/CSS</span>
                </div> */}
            </div>
            
            {/* Вторая секция - Выбор города */}
            <div className={styles.citySection}>
                <div className={styles.citySelectWrapper}>
                    <img src={locationIcon} alt="Местоположение" className={styles.locationIcon} />
                    <span className={styles.cityText}>Все города</span>
                    <img src={arrowDown} alt="Выбрать" className={styles.arrowIcon} />
                </div>
            </div>
        </div>
    )
}

export default Filter;