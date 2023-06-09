import { WarehouseApi } from '@/api/Warehouse';
import { WarehouseItem } from '@/api/Warehouse/dto';
import { Add, Delete, Edit, MoveDownOutlined, TransferWithinAStation, TransferWithinAStationOutlined } from '@mui/icons-material';
import { Box, Button, Card, Dialog, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import CreateWarehouse from './components/CreateWarehouse';
import { ConfirmContext } from '@/shared/components/FeedBackProvider';
import { toast } from 'react-toastify';

export default function Warehouse() {
  // Hooks
  const confirmCtx = useContext(ConfirmContext)
  const queryClient = useQueryClient()
  const warehouseQuery = useQuery<WarehouseItem[]>(
    "warehouse",
    WarehouseApi.GetAll,
    {
      onSuccess: (data) => setWarehouseList(data),
    }
  );


  //stage 
  const [warehouseList, setWarehouseList] = useState<WarehouseItem[]>([]);
  const [dialogOpen, setdialogOpen] = useState(false)
  const [modifyDto] = useState<WarehouseItem | null>(null)

  // Functions 
  const deleteWarehouse = async (id: number) => {
    try {

      confirmCtx({
        message: "هل تريد حذف هذا المستودع ؟ ",
        title: "حذف المستودع",
        onConfirm: async () => {
          await WarehouseApi.DeleteWarehouse(id)
          toast('تم الحذف بنجاح', { type: 'success' })
          queryClient.invalidateQueries('warehouse')
        },
      })
    }

    catch (er) {
      toast('حدث خطأ ما', { type: 'error' })
    }

  }


  return (
    <div>
      <Card sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h2' fontSize={24} fontWeight={'bold'}>
          المستودعات
        </Typography>

        <Button variant='contained' onClick={() => setdialogOpen(true)} endIcon={<Add />}>
          إضافة مستودع
        </Button>
        <CreateWarehouse modifyDto={modifyDto} dialogProps={{ open: dialogOpen, onClose: () => { setdialogOpen(false) } }}></CreateWarehouse>


      </Card>

      <Card sx={{ mt: 4 }}>

        <Table>

          <TableHead>

            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>الصورة</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>الاسم</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>العنوان</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>عدد القطع</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>إجرائات</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {
              warehouseList.map(wh => <TableRow key={wh.id}>
                <TableCell>
                  <img alt="" className='h-12 rounded' src='https://mecaluxcom.cdnwm.com/blog/img/warehouse-storage-techniques.1.1.jpg' />
                </TableCell>
                <TableCell>{wh.name}</TableCell>
                <TableCell>{wh.location}</TableCell>
                <TableCell>{wh.totalParts}</TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteWarehouse(wh.id)}>
                    <Delete></Delete>
                  </IconButton>
                  <IconButton>
                    <Edit></Edit>
                  </IconButton>
                  <IconButton>
                    <MoveDownOutlined></MoveDownOutlined>
                  </IconButton>
                </TableCell>
              </TableRow>
              )
            }
          </TableBody>
        </Table>
      </Card>




    </div>
  )
}
