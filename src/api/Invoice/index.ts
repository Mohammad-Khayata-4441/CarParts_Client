import { axiosIns } from "@/app/config/axios/axios";
import { AddInvoiceDto } from "./AddInvoiceDto";
import { ClientInvoice } from "./ClientInvoice.dto";

enum InvoiceEndPoints {
  Base = "/Invoice",
  GetClientAccount = "/Invoice/GetAccountClient/"
}

export class InvoiceApi {
  static async GetAll() {
    return await axiosIns.get<any[]>(InvoiceEndPoints.Base);
  }

  static async CreateInvoice(payload: AddInvoiceDto) {
    const { data } = await axiosIns.post<AddInvoiceDto, any>(
      InvoiceEndPoints.Base,
      payload
    );
    return data
  }

  static async GetClientAccount(clientId: string) {
    const { data } = await axiosIns.get<ClientInvoice[]>(InvoiceEndPoints.GetClientAccount + `${clientId}`)
    return data;

  }
}
