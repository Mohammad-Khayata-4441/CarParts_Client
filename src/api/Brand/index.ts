import { axiosIns } from "@/app/config/axios/axios";

export enum BrandController {
    BASE = 'Brand',
}

export class BrandApi {
    static fetchBrands = async () => {
        try {
            const res = await axiosIns.get(BrandController.BASE);
            return res.data
        }

        catch (er) {
            throw er
        }

    }
}