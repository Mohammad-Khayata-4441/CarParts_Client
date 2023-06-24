import { WarehouseApi } from '@/api/Warehouse'
import { AddWarehouseDto, WarehouseItem } from '@/api/Warehouse/dto'
import { Add, Edit } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField } from '@mui/material'
import React, { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'

interface Props {
    dialogProps: DialogProps,
    modifyDto: WarehouseItem | null,
}

export default function CreateWarehouse({ dialogProps, modifyDto }: Props) {
    const isModify = useMemo(() => modifyDto && modifyDto.id, [modifyDto])
    const queryClient = useQueryClient()
    const { control, handleSubmit } = useForm<AddWarehouseDto>({ defaultValues: { location: "", name: "" } })
    const onSubmit = async (dto: AddWarehouseDto) => {
        console.log('on submit')
        await WarehouseApi.AddWarehouse(dto)
        dialogProps.onClose?.(dto, 'escapeKeyDown')
        queryClient.invalidateQueries('warehouse')
    }
    return (

        <Dialog maxWidth='sm' fullWidth {...dialogProps}>
            <form onSubmit={handleSubmit(onSubmit)}>

                <DialogTitle>إضافة مستودع</DialogTitle>
                <DialogContent>
                    <Box mt={2} display={'flex'} gap={2} >
                        <Controller control={control} name='name' render={({ field }) => <TextField label='اسم المستودع' sx={{ flexGrow: 1 }}  {...field}></TextField>} />
                        <Controller control={control} name='location' render={({ field }) => <TextField label='العنوان' sx={{ flexGrow: 1 }} {...field}></TextField>} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => dialogProps.onClose?.(e, 'backdropClick')} >تراجع</Button>
                    <Button type='submit' variant='contained' endIcon={!isModify ? <Add></Add> : <Edit></Edit>}> {isModify ? 'تعديل' : 'إضافة'}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
