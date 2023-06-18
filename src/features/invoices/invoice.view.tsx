import { ClientApi } from "@/api/Client";
import { ClientItem } from "@/api/Client/GetAll";
import CreateInvoice from "@/features/invoices/invoice/CreateInvoice";
import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { useQuery } from "react-query";

function Invoces() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [customers, setCustomers] = useState<ClientItem[]>([]);
  const [invoiceDialog, setInvoiceDialog] = useState(false);
  const customerQuery = useQuery({
    queryFn: ClientApi.fetchClients,
    queryKey: "customer",
    onSuccess: (data) => {
      setCustomers(data);
    },
  });
  return (
    <div>
      <Button onClick={() => setInvoiceDialog(true)}>إنشاء فاتورة</Button>
      <CreateInvoice
        onSubmit={() => {}}
        parts={[]}
        customers={customers}
        onClose={(e) => setInvoiceDialog(e)}
        is={invoiceDialog}
      ></CreateInvoice>
    </div>
  );
}

export default Invoces;
