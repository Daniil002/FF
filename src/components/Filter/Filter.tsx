import styles from "./Filter.module.css";
import buttonIcon from "../../assets/_ActionIcon_.png";
import { Pill, PillGroup, Select } from '@mantine/core';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCity } from "../../store/inputSlice";
import type { RootState } from "../../store/store";

const Filter = () => {
    const dispatch = useDispatch();
    const selectedCity = useSelector((state: RootState) => state.input.selectedCity);

    const cityOptions = [
        { value: 'all', label: 'Все города' },
        { value: '1', label: 'Москва' },
        { value: '2', label: 'Санкт-Петербург' }
    ];

    const handleCityChange = (value: string | null) => {
        if (value) {
            dispatch(setSelectedCity(value));
        }
    };

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
            </div>
            
            {/* Вторая секция - Выбор города */}
            <div className={styles.citySection}>
                <Select
                    placeholder="Выберите город"
                    data={cityOptions}
                    value={selectedCity}
                    onChange={handleCityChange}
                    className={styles.citySelect}
                    styles={{
                        input: {
                            border: '1px solid #D5D6DC',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            fontSize: '14px',
                            '&:focus': {
                                borderColor: '#5E96FC'
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default Filter;