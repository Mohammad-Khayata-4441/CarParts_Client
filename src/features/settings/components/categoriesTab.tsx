import { CategoryApi } from '@/api/Category'
import { CategoryItem } from '@/api/Category/dto'
import { Add, Delete, Edit } from '@mui/icons-material'
import { Box, Button, ButtonGroup, Card, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import AddPartCategory from './forms/addPartCategory'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { SettingsActions } from '../settings.reducer'
import { useServerFile } from '@/shared/hooks/useServerFile'
import { ConfirmContext } from '@/shared/components/FeedBackProvider'

export default function categoriesTab() {

    const setConfirmMessage = useContext(ConfirmContext);
    const categories = useSelector<RootState, CategoryItem[]>(s => s.settings.partsCategories)
    const [partCategoryDialog, setPartCategoryDialog] = useState<boolean>(false)
    const [modifyDto, setModifyDto] = useState<CategoryItem | null>(null)
    const queryClient = useQueryClient()
    const dispatch = useDispatch<AppDispatch>()
    const categoriesQuery = useQuery('part-category', CategoryApi.GetAll, {
        onSuccess: (data) => {
            dispatch(SettingsActions.setPartsCategories(data))
        }
    })




    return (
        <div>
            <AddPartCategory modifyDto={modifyDto} onSubmit={() => {
                queryClient.invalidateQueries('part-category')
                setPartCategoryDialog(false)
            }}

                dialogProps={{ open: partCategoryDialog, onClose: () => setPartCategoryDialog(false) }} ></AddPartCategory>
            <Box className='grid grid-cols-12'>
                <Card className='p-4 col-span-6'>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>

                        <Typography variant='h6'>
                            تصنيفات القطع
                        </Typography>

                        <IconButton onClick={() => setPartCategoryDialog(true)}>
                            <Add color='primary'></Add>
                        </IconButton>
                    </Box>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>اسم التصنيف</TableCell>
                                <TableCell>عدد القطع</TableCell>
                                <TableCell>اجرائات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                categories.map((cat) => <TableRow key={cat.id}>
                                    <TableCell>
                                        <Box display={'flex'} alignItems={'center'} gap={4}>
                                            <img className='h-12' src={useServerFile(cat.image)}></img>
                                            <Typography>
                                                {cat.name}

                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Link to='/products'>
                                            {cat.totalParts}
                                        </Link>

                                    </TableCell>
                                    <TableCell>
                                        <ButtonGroup variant='contained'>

                                            <Button onClick={() => {
                                                setPartCategoryDialog(true)
                                                setModifyDto(cat)
                                            }}>
                                                <Edit></Edit>
                                            </Button>

                                            <Button onClick={() => {
                                                if (setConfirmMessage)
                                                    setConfirmMessage({
                                                        message: "سيتم حذف هذا التصنيف بشكل نهائي .. هل انت متأكد ؟",
                                                        onReject: () => { console.log('wtf close') },
                                                        title: 'حذف التصنيف',
                                                        onConfirm: async () => {
                                                            await CategoryApi.DeletePartCategory(cat.id)
                                                            queryClient.invalidateQueries('part-category')
                                                            return true
                                                        }
                                                    })
                                            }}
                                            >
                                                <Delete></Delete>
                                            </Button>

                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                                )
                            }
                        </TableBody>

                    </Table>
                </Card>

            </Box>

        </div >
    )
}
