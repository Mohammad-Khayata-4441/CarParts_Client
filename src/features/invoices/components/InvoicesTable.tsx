import { ClientInvoice } from '@/api/Invoice/ClientInvoice.dto'
import { Button, IconButton, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { InvoiceType, InvoiceTypeLabels } from '../enums/InvoiceType'
import { APP_CURRENCY } from '@/app/config/app.config'
import { Info } from '@mui/icons-material'
import { GetAllInvoiceDto } from '@/api/Invoice/GetAllDto'
import { ClientItem } from '@/api/Client/GetAll'

interface Props {
    invoices:  Partial<GetAllInvoiceDto>[]
    totalAccount?: number,
    clients?: ClientItem[]
}


export default function InvoicesTable({ invoices, totalAccount, clients }: Props) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {
                        clients &&
                        <TableCell>اسم العميل</TableCell>
                    }
                    <TableCell>تاريخ الفاتورة</TableCell>
                    <TableCell>الكلفة</TableCell>
                    <TableCell>نوع الفاتورة</TableCell>
                    <TableCell>خدمات اضافية</TableCell>
                    <TableCell>تفاصيل </TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {
                    invoices.map((invoice) => <TableRow>
                        {
                            clients && invoice.clientId &&
                            <TableCell > {clients.find(c => c.id === invoice.clientId)?.name}</TableCell>
                        }

                        <TableCell>{new Date().toLocaleDateString()}</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>{invoice.cost} {APP_CURRENCY} </TableCell>
                        <TableCell>{InvoiceTypeLabels[invoice.invoiceType as InvoiceType]}</TableCell>
                        <TableCell>{invoice.services} {APP_CURRENCY}</TableCell>
                        <TableCell>
                            <Tooltip title="تفاصيل الفاتورة">
                                <IconButton color="primary">
                                    <Info></Info>
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>)
                }
            </TableBody>
            {

                totalAccount &&
                <TableFooter >
                    <TableRow>
                        <TableCell>إجمالي الحساب</TableCell>
                        <TableCell>

                            <Typography fontWeight={'bold'} fontSize={20} color={totalAccount < 0 ? 'red' : 'green'}>
                                {totalAccount} {APP_CURRENCY}
                            </Typography>


                        </TableCell>
                        <TableCell>
                            <Button variant="outlined">
                                تصفية الحساب
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            }


        </Table >
    )
}
