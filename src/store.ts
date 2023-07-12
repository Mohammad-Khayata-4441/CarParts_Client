import { configureStore } from "@reduxjs/toolkit";
import { BrandReducer } from "@/features/brands/brands.reducer";
import CountrySlice from '@/features/countries/countries.reducer'
import CarSlice from '@/features/cars/car.reducer'
import PartSlice from "@/features/parts/parts.reducer";
import SettingsSlice from "@/features/settings/settings.reducer";
export const store = configureStore({
    reducer: {
        brand: BrandReducer,
        country: CountrySlice,
        car: CarSlice,
        part: PartSlice,
        settings: SettingsSlice,
    }
});


type x = {name:string ,phone:number}
type y = {username:string ,mobile:number}

type z = x&y


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch