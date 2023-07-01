import { ClientApi } from "@/api/Client";
import { Box, Button, Card, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import InvoicesTable from "./invoice/InvoicesTable";
import { InvoiceApi } from "@/api/Invoice";
import { InvoiceType, InvoiceTypeLabels } from "./enums/InvoiceType";
import { GetAllInvoiceDto } from "@/api/Invoice/GetAllDto";
import NoData from "@/shared/components/NoData";
import TableSkeleton from '@/shared/components/TableSkeleton'
import CreateInvoice from "./invoice/CreateInvoice";
import { AddInvoiceDto } from "@/api/Invoice/AddInvoiceDto";
import { toast } from "react-toastify";
function Invoces() {
  const [invoices, setInvoices] = useState<GetAllInvoiceDto[]>([]);
  const [invoiceType, setInvoiceType] = useState<InvoiceType>(InvoiceType.IncomingPayment);
  const [invoiceDialog, setInvoiceDialog] = useState(false)
  const { data: clients } = useQuery(["clients"], ClientApi.fetchClients);
  const queryClient = useQueryClient()
  const { isLoading, isFetching } = useQuery({
    queryFn: InvoiceApi.GetAll,
    queryKey: "invoice",
    onSuccess: (data) => {
      setInvoices(data)
    },
  });


  const createInvoice = (type: InvoiceType) => {
    alert(`Invoice of type ${type}`)
    setInvoiceType(type);
    setInvoiceDialog(true)

  }
  const onCreateNewInvoice = (data: AddInvoiceDto) => {
    queryClient.invalidateQueries("invoice")
    setInvoiceDialog(false)
    toast(`تم انشاء فاتورة ${InvoiceTypeLabels[data.invoiceType]} بقيمة  ${data.cost}`, { type: 'success' })
  }



  return (
    <div>
      <Card sx={{ p: 2, mb: 2, display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography fontSize={24} fontWeight={"bold"}>
          الفواتير
        </Typography>

        <Box gap={2} className="flex items-center">

          <Button variant="contained" onClick={() => createInvoice(InvoiceType.OutgoingPayment)}>توليد وصل دفع</Button>
          <Button variant="contained" onClick={() => createInvoice(InvoiceType.IncomingPayment)}>توليد وصل قبض</Button>
        </Box>


        <CreateInvoice onSubmit={ onCreateNewInvoice } parts={[]} customers={clients ?? []} invoiceType={invoiceType} is={invoiceDialog} onClose={() => setInvoiceDialog(false)}></CreateInvoice>
      </Card>


      {
        isLoading || isFetching ? <TableSkeleton></TableSkeleton> :
          <Card>
            {
              invoices.length ?
                <InvoicesTable clients={clients} invoices={invoices} ></InvoicesTable>
                : <NoData></NoData>
            }

          </Card>
      }
    </div>
  );
}

export default Invoces
