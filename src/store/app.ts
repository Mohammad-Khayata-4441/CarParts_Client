import Confirm from "@/shared/confirm";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface appState {
    confirm: Confirm | null,
}


const initialState: appState = {
    confirm: null
}

const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setConfirm: (state: appState, action: PayloadAction<Confirm|null>) => {
            state.confirm = action.payload
        }
    }
})

export default AppSlice.reducer;

export const appActions = AppSlice.actions; 