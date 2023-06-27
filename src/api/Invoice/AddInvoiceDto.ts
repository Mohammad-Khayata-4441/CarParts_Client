import { InvoiceType } from "@/features/invoices/enums/InvoiceType";

class AddInvoiceDto {
  invoiceType:InvoiceType = InvoiceType.SellInvoice
  cost: number = 0;
  description: string = "";
  clientId: string = '';
  notes: string = "";
  services: number = 0;
  date: string | Date = "";
  parts: Part[] = [];
}

interface Part {
  partId: number;
  storeId: number;
  quantity: number;
  price: number;
}

export { AddInvoiceDto };
