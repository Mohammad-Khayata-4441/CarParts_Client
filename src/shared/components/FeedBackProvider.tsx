import Confirm from '@/shared/models/confirm'
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { PropsWithChildren, createContext, useMemo, useState } from 'react'
import { useQueryClient } from 'react-query';

export const ConfirmContext = createContext<((c: Confirm) => any)>(() => { });

export default function FeedBackProvider(props: PropsWithChildren) {
    const [confirm, setConfirmMessage] = useState<(Confirm) | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const setConfirm = (confirm: Confirm | null) => {
        setConfirmMessage(confirm)
    }

    const handleConfirm = async () => {
        if (confirm) {
            setIsLoading(true)
            await confirm.onConfirm();
            setIsLoading(false)
            setConfirmMessage(null)
        }
    }
    return (
        <>
            <Dialog fullWidth maxWidth='sm' open={Boolean(confirm && confirm.message)}>

                    <DialogTitle>
                        {confirm?.title}
                    </DialogTitle>

                <DialogContent>
                    {confirm?.message}
                </DialogContent>


                <DialogActions>
                    <Button onClick={() => setConfirm(null)}>
                        إلغاء
                    </Button>
                    <Button onClick={handleConfirm} variant='contained'>
                        {
                            isLoading ?
                                <CircularProgress color='inherit' variant='indeterminate' size={'18px'} />
                                : "تأكيد"
                        }

                    </Button>
                </DialogActions>
            </Dialog>

            <ConfirmContext.Provider value={setConfirmMessage}>

                {props.children}
            </ConfirmContext.Provider>

        </>

    )
}
