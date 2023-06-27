import { BrandItem } from '@/api/Brand/dto'
import { GetAllCar } from '@/api/Car/dto'
import { CategoryItem } from '@/api/Category/dto'
import { WarehouseItem } from '@/api/Warehouse/dto'
import { PartApi } from '@/api/Part'
import { AddPartDTO } from '@/api/Part/AddPartDto'
import { Add, Close, } from '@mui/icons-material'
import { Button, Dialog, DialogContent, DialogTitle, FormControl, FormLabel, IconButton, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQueries, useQueryClient } from 'react-query'
import Upload from '@/shared/components/Upload';
import { toast } from 'react-toastify'
import CarForm from '@/features/cars/components/CarForm'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { CarActions } from '@/features/cars/car.reducer'

interface PropsType {
    cars: GetAllCar[],
    brands: BrandItem[],
    inventories: WarehouseItem[],
    categories: CategoryItem[]
}
export default function AddPart(props: PropsType) {
    const { control, handleSubmit } = useForm<AddPartDTO>({
        defaultValues: { ... new AddPartDTO() },

    })

    const partsQuery = useQueryClient()

    const [imageUrl, setImageUrl] = useState('')

    const [open, setOpen] = useState(false)

    const dispatch = useDispatch<AppDispatch>()

    const mutation = useMutation('carPart', {
        mutationFn: PartApi.addPart,
        onSuccess: () => {
            toast(`تمت إضافة القطعة بنجاح`, {
                theme: 'light',
                type: 'success'
            })

            setOpen(false);
            partsQuery.invalidateQueries('part')
        }
    })

    const onSubmit = (values: AddPartDTO) => {
        mutation.mutate(values);

    }

    return (
        <>
            <Button onClick={() => setOpen(true)} variant='contained'>
                إضافة قطعة جديدة
                <Add />
            </Button>
            <Dialog maxWidth='md' fullWidth open={open}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Box display={'flex'} paddingRight={2} justifyContent={'space-between'} alignItems={'center'}>

                        <DialogTitle>إضافة قطعة</DialogTitle>
                        <IconButton onClick={() => setOpen(false)}><Close /></IconButton>
                    </Box>

                    <DialogContent   >

                        <Box className='grid grid-cols-12' paddingY={2} gap={2}>

                            <Controller name='name' rules={{ required: true }} control={control} render={({ field, fieldState }) =>

                                <TextField className='col-span-12 md:col-span-6' {...field} label='اسم القطعة'></TextField>

                            } />
                            <Controller name='code' rules={{ required: true }} control={control} render={({ field, fieldState }) =>

                                <TextField className='col-span-12 md:col-span-6' {...field} label='رمز القطعة'></TextField>

                            } />



                            <Controller name='categoryId' control={control} render={({ field, fieldState }) =>


                                <FormControl className='col-span-12 md:col-span-6' >
                                    <InputLabel id='carCategory'>تصنيف القطعة</InputLabel>
                                    <Select {...field} label='تصنيف القطعة' labelId='carCategory'>

                                        {
                                            props.categories.map(p => <MenuItem value={p.id} key={p.id}>{p.name}</MenuItem>)
                                        }

                                    </Select>
                                </FormControl>
                            } />

                            <Controller name='brandId' control={control} render={({ field }) =>
                                <FormControl className='col-span-12 md:col-span-6' >
                                    <InputLabel id='brandid'>الشركة المصنعة</InputLabel>
                                    <Select {...field} label='الشركة المصنعة' labelId='brandid'>
                                        {
                                            props.brands.map(b => <MenuItem value={b.id} key={b.id}>{b.name}</MenuItem>)
                                        }

                                    </Select>
                                </FormControl>
                            } />


                            <Controller rules={{ required: ' يرجى اختيار السيارات المرتبطة بالقطعة' }} name='carIds' control={control} render={({ field, fieldState }) =>
                                <FormControl className='col-span-12 md:col-span-6'   >
                                    <InputLabel id='carType'>السيارات المرتبطة بالقطعة</InputLabel>
                                    <Select   {...field} multiple label='السيارات المرتبطة بالقطعة' labelId='carType'>
                                        <MenuItem onClick={() => dispatch(CarActions.setCarModal(true))} sx={({ palette }) => ({ color: palette.primary.main})}>إضافة سيارة جديدة  <Add></Add></MenuItem>
                                        {
                                            props.cars.map(c => <MenuItem value={c.id} key={c.id}>{c.name}</MenuItem>)
                                        }

                                    </Select>
                                </FormControl>
                            } />


                            <Controller rules={{ required: 'يرجى اختيار المتجر الذي تتوفر فيه القطعة' }} name='storeId' control={control} render={({ field, fieldState }) =>

                                <FormControl className='col-span-12 md:col-span-6' >
                                    <InputLabel id='storId'>إضافة للمستودع</InputLabel>
                                    <Select {...field} label='إضافة للمستودع' labelId='storId' >

                                        {
                                            props.inventories.map(p => <MenuItem value={p.id} key={p.id}>{p.location}</MenuItem>)
                                        }

                                    </Select>
                                </FormControl>
                            } />




                            <Controller name='orginalPrice' rules={{ required: true }} control={control} render={({ field, fieldState }) =>

                                <TextField type='number' className='col-span-12 md:col-span-4' {...field} label='السعر الأصلي'></TextField>

                            } />
                            <Controller name='sellingPrice' rules={{ required: true }} control={control} render={({ field, fieldState }) =>

                                <TextField type='number' className='col-span-12 md:col-span-4' {...field} label='سعر المبيع'></TextField>

                            } />
                            <Controller name='quantity' rules={{ required: true }} control={control} render={({ field, fieldState }) =>

                                <TextField type='number' className='col-span-12 md:col-span-4' {...field} label='الكمية'></TextField>

                            } />


                            <Controller name='description' rules={{ required: true }} control={control} render={({ field, fieldState }) =>

                                <TextField

                                    multiline
                                    rows={3}
                                    className='col-span-12 md:col-span-6'
                                    {...field} label='الوصف'></TextField>


                            } />
                            <div className='col-span-12 md:col-span-6'>
                                <Controller control={control} name='image' render={({ field, fieldState }) => <Upload  {...field} onChangeUrl={(e) => { setImageUrl(e) }} url={imageUrl}  ></Upload>}
                                />
                            </div>

                            <Button className='col-span-12 md:col-span-12' variant='contained' type='submit' >حفظ القطعة</Button>
                        </Box>
                        <CarForm showBtn={false} onCloseDialog={() => { dispatch(CarActions.setCarModal(false)) }} ></CarForm>

                    </DialogContent>

                </form>
            </Dialog>



        </>
    )
}
