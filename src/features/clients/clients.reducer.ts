import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ClientItem } from '@/api/Client/GetAll'
interface ClientState {
    clients: ClientItem[]
}

const initialState: ClientState = {
    clients: []
}
const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        setClients: (state, { payload }: PayloadAction<ClientItem[]>) => { state.clients = payload },
    }
})