import { axiosIns } from "@/app/config/axios/axios";
import { ClientItem } from "./GetAll";
import { CreateClient } from "./CreateClient";

enum ClientApiEndpoints {
    base = '/Client',
    Serch = '/Client/GetClientByName/'
}


export class ClientApi {

    private constructor() {

    }

    static fetchClients = async () => {
        const response = await axiosIns.get<ClientItem[]>(ClientApiEndpoints.base);
        return response.data;
    }


    static createClient = async (params: CreateClient) => {
        const response = await axiosIns.post<any, any, CreateClient>(ClientApiEndpoints.base, params);
        return response.data;
    }


    static getClientDetails = async (id: string) => {
        const response = await axiosIns.get(`${ClientApiEndpoints.base}/${id}`);
        return response.data;
    }


    static deleteClient = async (id: string) => {
        const response = await axiosIns.delete(ClientApiEndpoints.base, {
            params: {
                id
            }
        })
        return response;
    }
}