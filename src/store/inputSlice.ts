import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchText: '',
    selectedCity: 'all' // 'all', '1' (Москва), '2' (Санкт-Петербург)
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
        }
    }
})

export const { setSearchText, setSelectedCity } = inputSlice.actions;
export default inputSlice.reducer;