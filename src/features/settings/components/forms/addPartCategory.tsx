import { CategoryApi } from '@/api/Category'
import { AddCategoryDto, CategoryItem } from '@/api/Category/dto'
import Upload from '@/shared/components/Upload'
import { Add, PlusOne } from '@mui/icons-material'
import { useServerFile } from '@/shared/hooks/useServerFile'
import { Box, Button, Card, Dialog, DialogActions, DialogProps, DialogTitle, FormControl, FormLabel, Paper, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface Props {
    dialogProps: DialogProps & { onClose: () => void },
    onSubmit: (data: any) => void,
    modifyDto: CategoryItem | null

}



export default function AddPartCategory({ dialogProps, onSubmit: onSubmitProp, modifyDto }: Props) {
    const [url, setUrl] = useState('')
    const { control, handleSubmit, reset } = useForm<AddCategoryDto>({
        defaultValues: {
            image: null,
            name: ''
        }
    })



    useEffect(() => {
        if (modifyDto) {
            setUrl(useServerFile(modifyDto.image))
            reset({
                name: modifyDto.name
            })
        }
    }, [modifyDto])




    useEffect(() => {
        if (dialogProps.open === false) {
            reset();

        }
    }, [dialogProps.open])




    const onSubmit = async (data: AddCategoryDto) => {
        await CategoryApi.AddPartCategory(data)
        onSubmitProp(data);
        reset()
        setUrl('')

        

    }
    return (
        <div>
            <Dialog maxWidth='sm' fullWidth {...dialogProps} >
                <DialogTitle>
                    إضافة تصنيف
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Box p={2}  >
                        <Controller control={control} name='name' rules={{ required: 'اسم التصنيف مطلوب' }} render={({ field, fieldState }) => <TextField {...field} error={fieldState.invalid} helperText={fieldState.error?.message} className='w-full' label='اسم التصنيف' ></TextField>} />

                        <Box className='mt-4'>
                            <Controller control={control} rules={{ required: true }} name='image' render={({ field }) => <Upload label="صورة التصنيف" url={url} onChangeUrl={(url: string) => { setUrl(url) }} {...field} />} />
                        </Box>

                    </Box>
                    <DialogActions >
                        <Button color='secondary' onClick={(e) => dialogProps.onClose()}>
                            تراجع
                        </Button>
                        <Button variant='contained' type='submit' endIcon={<Add></Add>}>
                            حفظ
                        </Button>
                    </DialogActions>

                </form>
            </Dialog>
        </div >
    )
}
