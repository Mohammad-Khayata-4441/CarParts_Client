import { configureStore } from "@reduxjs/toolkit";
import { BrandReducer } from "./brands";
import CountrySlice from './countries/'
import CarSlice from '../features/cars/car.reducer'
import PartSlice from "./parts";
import SettingsSlice from "@/features/settings/settings.reducer";
import AppSlice from "./app";
export const store = configureStore({
    reducer: {
        brand: BrandReducer,
        country: CountrySlice,
        car: CarSlice,
        part: PartSlice,
        settings: SettingsSlice,
        app:AppSlice
    }
});


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch