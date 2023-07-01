import { Skeleton } from '@mui/material'
import React from 'react'

export default function PartsSkeleton() {
  return (
    <div>
        <Skeleton height={80}></Skeleton>
        <Skeleton height={64}></Skeleton>
        <Skeleton height={50}></Skeleton>
    </div>
  )
}
