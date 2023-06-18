import { CategoryItem } from "@/api/Category/dto";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SettingsState {
    partsCategories: CategoryItem[];
}

const initialState: SettingsState = {
    partsCategories: []
}
const SettingsSlice = createSlice({
    name: 'settings',
    initialState,

    reducers: {
        setPartsCategories: (state, action: PayloadAction<CategoryItem[]>) => {
            state.partsCategories = [...action.payload]
        }
    }
})


export default SettingsSlice.reducer

export const { actions: SettingsActions } = SettingsSlice;