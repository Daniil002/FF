import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchText: ''
}


export const inputSlice = createSlice({
    name: 'input',
    initialState,
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload
        }
    }
})

export const { setSearchText } = inputSlice.actions;
export default inputSlice.reducer;