import { InvoiceType } from "@/features/invoices/enums/InvoiceType";

export interface GetAllInvoiceDto {
  id: number;
  date: string;
  cost: number;
  clientId: number;
  notes: string;
  services: number;
  invoiceType: InvoiceType;
}