import styles from "./Filter.module.css";
import buttonIcon from "../../assets/_ActionIcon_.png";
import { Pill, PillGroup, Select } from '@mantine/core';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCity, addSkill, removeSkill } from "../../store/inputSlice";
import type { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router"; // добавлено: синхронизация с URL

const Filter = () => {
    const dispatch = useDispatch();
    const selectedCity = useSelector((state: RootState) => state.input.selectedCity);
    const skills = useSelector((state: RootState) => state.input.skills);
    const [newSkill, setNewSkill] = useState('');
    const [searchParams, setSearchParams] = useSearchParams(); // добавлено

    const cityOptions = [
        { value: 'all', label: 'Все города' },
        { value: '1', label: 'Москва' },
        { value: '2', label: 'Санкт-Петербург' }
    ];

    const handleCityChange = (value: string | null) => {
        if (value) {
            dispatch(setSelectedCity(value));
            // добавлено: запись города в URL
            const next = new URLSearchParams(searchParams);
            if (value && value !== 'all') next.set('city', value); else next.delete('city');
            setSearchParams(next, { replace: true });
        }
    };

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            const skill = newSkill.trim();
            dispatch(addSkill(skill));
            // добавлено: запись массива навыков в URL
            const next = new URLSearchParams(searchParams);
            const nextSkills = Array.from(new Set([...(skills || []), skill])).sort();
            if (nextSkills.length) next.set('skills', nextSkills.join(',')); else next.delete('skills');
            setSearchParams(next, { replace: true });
            setNewSkill('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddSkill();
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        dispatch(removeSkill(skillToRemove));
        // добавлено: обновление URL при удалении навыка
        const next = new URLSearchParams(searchParams);
        const nextSkills = skills.filter((s) => s !== skillToRemove).sort();
        if (nextSkills.length) next.set('skills', nextSkills.join(',')); else next.delete('skills');
        setSearchParams(next, { replace: true });
    };

    // добавлено: инициализация значений из URL при монтировании и изменении searchParams
    useEffect(() => {
        const city = searchParams.get('city') || 'all';
        const rawSkills = searchParams.get('skills') || '';
        // не модифицируем существующие навыки, только устанавливаем отсутствующие
        if (city !== selectedCity) {
            dispatch(setSelectedCity(city));
        }
        if (rawSkills) {
            const parsed = rawSkills.split(',').filter(Boolean);
            // добавляем недостающие навыки
            parsed.forEach((s) => {
                if (!skills.includes(s)) dispatch(addSkill(s));
            });
        }
    }, [searchParams]);

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