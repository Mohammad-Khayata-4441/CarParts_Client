import { ClientApi } from "@/api/Client";
import { Box, Button, Card, CardActions, Pagination, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import InvoicesTable from "./components/InvoicesTable";
import { InvoiceApi } from "@/api/Invoice";
import { InvoiceType, InvoiceTypeLabels } from "./enums/InvoiceType";
import { GetAllInvoiceDto } from "@/api/Invoice/GetAllDto";
import NoData from "@/shared/components/NoData";
import TableSkeleton from '@/shared/components/TableSkeleton'
import CreateInvoice from "./components/CreateInvoice";
import { AddInvoiceDto } from "@/api/Invoice/AddInvoiceDto";
import { toast } from "react-toastify";
function Invoces() {
  const [pageSize, setpageSize] = useState(10)
  const [pageNumber, setpageNumber] = useState<number>(1)
  const [invoiceType, setInvoiceType] = useState<InvoiceType>(InvoiceType.IncomingPayment);
  const [invoiceDialog, setInvoiceDialog] = useState(false)
  const { data: clients } = useQuery(["clients"], ClientApi.fetchClients);
  const queryClient = useQueryClient()
  const { isLoading, data: invoices = [] } = useQuery({
    queryFn: InvoiceApi.GetAll,
    queryKey: "invoice",
    initialData: [],
  });
  const paginatedData = useMemo(() => invoices.slice((pageNumber - 1) * pageSize, pageNumber * pageSize), [invoices , pageSize, pageNumber])


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


        <CreateInvoice onSubmit={onCreateNewInvoice} parts={[]} customers={clients ?? []} invoiceType={invoiceType} is={invoiceDialog} onClose={() => setInvoiceDialog(false)}></CreateInvoice>
      </Card>


      {
        isLoading ? <TableSkeleton></TableSkeleton> :
          <Card>
            {
              invoices?.length ?
                <InvoicesTable clients={clients} invoices={paginatedData} ></InvoicesTable>
                : <NoData></NoData>
            }


            <CardActions>
              <Pagination page={pageNumber} onChange={(e, pageNumber) => setpageNumber(pageNumber)} count={Math.ceil(invoices.length / pageSize)}></Pagination>
            </CardActions>
          </Card>
      }
    </div>
  );
}

export default Invoces
