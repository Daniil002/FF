import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchText: '',
    selectedCity: 'all', // 'all', '1' (Москва), '2' (Санкт-Петербург)
    skills: ['TypeScript', 'React', 'Redux'] // начальные навыки
}

export const inputSlice = createSlice({
    name: 'input',
    initialState,
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload
        },
        setSelectedCity: (state, action) => {
            state.selectedCity = action.payload
        },
        addSkill: (state, action) => {
            const newSkill = action.payload.trim();
            if (newSkill && !state.skills.includes(newSkill)) {
                state.skills.push(newSkill);
            }
        },
        removeSkill: (state, action) => {
            state.skills = state.skills.filter(skill => skill !== action.payload);
        }
    }
})

export const { setSearchText, setSelectedCity, addSkill, removeSkill } = inputSlice.actions;
export default inputSlice.reducer;