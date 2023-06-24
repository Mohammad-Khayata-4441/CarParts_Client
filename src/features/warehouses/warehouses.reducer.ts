import { WarehouseItem } from "@/api/Warehouse/dto";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface warehouseState {
    inventories: WarehouseItem[]
}

const initialState: warehouseState = {
    inventories: []
}

const warehouseSlice = createSlice({
    name: 'warehouse',
    initialState,
    reducers: {
        setinventories: (state: warehouseState, action: PayloadAction<WarehouseItem[]>) => { state.inventories = action.payload }
    }
})

export default warehouseSlice;

export const warehouseActions = warehouseSlice.actions; 