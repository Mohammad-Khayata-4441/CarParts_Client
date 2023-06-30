import { InvoiceType } from "@/features/invoices/enums/InvoiceType";

export interface ClientInvoice {

    cost: number
    description: string;
    invoiceType: InvoiceType
    services: number
}