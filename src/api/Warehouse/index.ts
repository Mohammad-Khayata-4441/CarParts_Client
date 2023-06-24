import { axiosIns } from "@/app/config/axios/axios"
import { AddWarehouseDto, WarehouseItem } from "./dto"

export enum WAREHOUSE_API {
    Base = '/Store'
}


export class WarehouseApi {
    static async GetAll() {
        try {
            const { data } = await axiosIns.get<WarehouseItem[]>(WAREHOUSE_API.Base)
            return data
        }
        catch (er) {
            console.log(er)
            throw er
        }
    }

    static async AddWarehouse(dto: AddWarehouseDto) {
        try {
            const { data } = await axiosIns.post(WAREHOUSE_API.Base, dto);
            return data;
        }

        catch (er) {
            console.log(er);
            throw (er)
        }
    }

    static async DeleteWarehouse(id: number) {
        try {
            await axiosIns.delete(WAREHOUSE_API.Base, {
                params: {
                    id
                }
            })
        }

        catch (er) {

        }
    }
}