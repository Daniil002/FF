import styles from "./Filter.module.css";
import buttonIcon from "../../assets/_ActionIcon_.png";
import { Pill, PillGroup, Select } from '@mantine/core';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCity, addSkill, removeSkill } from "../../store/inputSlice";
import type { RootState } from "../../store/store";
import { useState } from "react";

const Filter = () => {
    const dispatch = useDispatch();
    const selectedCity = useSelector((state: RootState) => state.input.selectedCity);
    const skills = useSelector((state: RootState) => state.input.skills);
    const [newSkill, setNewSkill] = useState('');

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

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            dispatch(addSkill(newSkill));
            setNewSkill(''); // очищаем поле ввода
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddSkill();
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        dispatch(removeSkill(skillToRemove));
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
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button 
                        className={styles.addButton}
                        onClick={handleAddSkill}
                    >
                        <img src={buttonIcon} alt="Добавить" />
                    </button>
                </div>

                <PillGroup gap={10}>
                    {skills.map((skill) => (
                        <Pill 
                            key={skill}
                            onRemove={() => handleRemoveSkill(skill)} 
                            withRemoveButton
                        >
                            {skill}
                        </Pill>
                    ))}
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