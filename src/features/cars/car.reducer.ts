import {  PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetAllCar } from "@/api/Car/dto";



export interface carState {
    cars: GetAllCar[],
    carFormModal: boolean,
}

const initialState: carState = {
    cars: [],
    carFormModal: false,
}

const carSlice = createSlice({
    name: 'car',
    initialState,
    reducers: {
        setCarsList: (state: carState, action: PayloadAction<GetAllCar[]>) => {
            state.cars = action.payload
        },


        setCarModal: (state: carState, action: PayloadAction<boolean>) => {
            state.carFormModal = action.payload
        }
    },
})

export default carSlice.reducer
export const CarActions = carSlice.actions

