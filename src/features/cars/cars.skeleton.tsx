import { Box, Skeleton } from '@mui/material'
import React from 'react'

export default function CarsSkeleton() {
    return (
        <div className='grid grid-cols-4 gap-4' >
            <Box>
                <Skeleton variant="rounded" height={240} width={'100%'} />

                <div className="flex items-center justify-between">
                    <Skeleton variant='circular' sx={{ my: 2 }} height={64} width={64} />
                    <Skeleton width={75} />
                </div>

                <div className="flex gap-4">
                    <Skeleton height={60} width={'80%'} />
                    <Skeleton height={60} width={'20%'} />
                </div>
            </Box>
            <Box>
                <Skeleton variant="rounded" height={240} width={'100%'} />

                <div className="flex items-center justify-between">
                    <Skeleton variant='circular' sx={{ my: 2 }} height={64} width={64} />
                    <Skeleton width={75} />
                </div>

                <div className="flex gap-4">
                    <Skeleton height={60} width={'80%'} />
                    <Skeleton height={60} width={'20%'} />
                </div>
            </Box>
            <Box>
                <Skeleton variant="rounded" height={240} width={'100%'} />

                <div className="flex items-center justify-between">
                    <Skeleton variant='circular' sx={{ my: 2 }} height={64} width={64} />
                    <Skeleton width={75} />
                </div>

                <div className="flex gap-8">
                    <Skeleton height={60} width={'80%'} />
                    <Skeleton height={60} width={'20%'} />
                </div>
            </Box>
            <Box>
                <Skeleton variant="rounded" height={240} width={'100%'} />

                <div className="flex items-center justify-between">
                    <Skeleton variant='circular' sx={{ my: 2 }} height={64} width={64} />
                    <Skeleton width={75} />
                </div>

                <div className="flex gap-4">
                    <Skeleton height={60} width={'80%'} />
                    <Skeleton height={60} width={'20%'} />
                </div>
            </Box>
  
        
        </div>
    )
}
