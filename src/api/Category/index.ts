import { axiosIns } from "@/app/config/axios/axios";
import { AddCategoryDto, CategoryItem } from "./dto";
import { serialize } from "object-to-formdata";
enum CategoryEndpoint {
    Base = '/Category'
}
export class CategoryApi {
    static async GetAll() {
        try {
            const { data } = await axiosIns.get<CategoryItem[]>(CategoryEndpoint.Base)
            return data
        }
        catch (er) {
            console.log(er)
            throw er
        }
    }

    static async AddPartCategory(dto: AddCategoryDto) {
        const formData = serialize(dto)
        const { data } = await axiosIns.post(CategoryEndpoint.Base, formData)
        return data;
    }

    static async DeletePartCategory(id: string) {
       const {data} =  await axiosIns.delete(CategoryEndpoint.Base, { params: { id } })
        return  data
    }
}