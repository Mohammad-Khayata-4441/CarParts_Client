import { Box, Typography } from '@mui/material'
import React from 'react'

export default function NoData() {
  return (
    <Box display={'flex'} my={10} alignItems={'center'} height={'100%'} width={'100%'} justifyContent={'center'}>
        <Typography variant='h4'>لايوجد بيانات !</Typography>
    </Box>
  )
}
