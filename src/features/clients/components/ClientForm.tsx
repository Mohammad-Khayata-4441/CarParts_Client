import { ClientApi } from "@/api/Client";
import { CreateClient } from "@/api/Client/CreateClient";
import { ClientItem } from "@/api/Client/GetAll";
import { InvoiceApi } from "@/api/Invoice";
import { ClientInvoice } from "@/api/Invoice/ClientInvoice.dto";
import InvoicesTable from "@/features/invoices/components/InvoicesTable";
import { ConfirmContext } from "@/shared/components/FeedBackProvider";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
type FormFields = Omit<CreateClient, "isSeller"> & { isSeller: 0 | 1 };
type Props = {
  isOpen: boolean;
  onSetOpen: (is: boolean) => void;
  onSubmit: () => void;
  clientDetails: ClientItem | null;
};
export default function ClientForm({
  isOpen,
  onSetOpen,
  onSubmit,
  clientDetails,
}: Props) {
  const confirmProvider = useContext(ConfirmContext)
  const { control, handleSubmit, reset } = useForm<FormFields>({
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
      email: "",
      isSeller: 0,
    },
  });
  const [clientInvoices, setclientInvoices] = useState<ClientInvoice[]>([])
  const isModify = useMemo(() => Boolean(clientDetails), [clientDetails]);
  const queryClient = useQueryClient()

  useEffect(() => {
    if (clientDetails) {
      onSetOpen(true);
      reset({
        isSeller: Number(clientDetails.isSeller) as 1 | 0,
        name: clientDetails.name,
        phoneNumber: clientDetails.phoneNumber,
      });
    }
  }, [clientDetails]);

  useEffect(() => {
    if (isOpen === false) {
      reset({ name: "", isSeller: 0, phoneNumber: "" });
    }
    if (isOpen === true) {
      console.log('get data')
    }
  }, [isOpen]);

  const { isFetching, isLoading } = useQuery([`client-account-${clientDetails?.id}`], () => InvoiceApi.GetClientAccount(clientDetails?.id.toString() as string), {
    enabled: isModify,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setclientInvoices(data)
    }
  })
  const deleteClient = async () => {
    if (clientDetails) {
      await ClientApi.deleteClient(clientDetails.id.toString());
      queryClient.invalidateQueries('clients')
      onSetOpen(false);
      onSubmit();
    }
  };
  const submit = async (data: FormFields) => {
    await ClientApi.createClient({
      ...data,
      isSeller: Boolean(data.isSeller),
    });
    onSetOpen(false);
    onSubmit();
  };

  return (
    <div>
      <Dialog onClose={() => onSetOpen(false)} maxWidth="md" fullWidth open={isOpen}>
        <form onSubmit={handleSubmit(submit)}>

          <Box width={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>

            <DialogTitle>
              {
                isModify ?
                  "معلومات العميل"
                  : "إضافة عميل"
              }
            </DialogTitle>

            <IconButton sx={{ mx: 2 }} onClick={() => onSetOpen(false)}>
              <Close></Close>
            </IconButton>

          </Box>
          <DialogContent sx={{ p: 2 }}>
            <Controller
              name="isSeller"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ mb: 2 }} >
                  <FormLabel>نوع العميل</FormLabel>
                  <RadioGroup
                    {...field}
                    row
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value={0}
                      control={<Radio />}
                      label="زبون"
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="بائع"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
            <Box gap={2} className='grid grid-cols-2'>
              <Controller
                name="name"
                rules={{ required: 'اسم العميل مطلوب' }}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField error={fieldState.invalid} helperText={fieldState.error?.message} {...field} label="اسم العميل" />
                )}
              />

              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextField {...field} type="number" label="رقم الهاتف" />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField helperText='اختياري' {...field} value={field.value ?? ""} label="البريد الإلكتروني" />
                )}
              />
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField helperText='اختياري'  {...field} value={field.value ?? ""} label="العنوان" />
                )}
              />

            </Box>

            {
              clientDetails &&
              <Box mt={4}>
                <Typography variant="h6">
                  فواتير العميل
                </Typography>
                {
                  isLoading || isFetching ? <>
                    <Skeleton height={64} animation="pulse" />
                    <Skeleton height={64} animation="pulse" />
                    <Skeleton height={64} animation="pulse" />
                    <Skeleton height={64} animation="pulse" />
                  </> :
                    clientInvoices.length ?
                      <InvoicesTable invoices={clientInvoices} totalAccount={clientDetails.totalAccount}></InvoicesTable>
                      : "لايوجد فواتير لهذا العميل"
                }

              </Box>
            }
          </DialogContent>



        <DialogActions >
          {isModify && (
            <Button color="error" onClick={() => confirmProvider({
              message: `سيتم حذف العميل ${clientDetails?.name} بشكل نهائي وجميع البيانات
                المرتبطة به`,
              title: 'حذف العميل',
              onConfirm: async () => { await deleteClient() },
              onReject: () => { }
            })}>
              حذف
            </Button>
          )}
          <Button
            onClick={() => {
              onSetOpen(false);
            }}
          >
            الغاء
          </Button>
          <Button sx={{ justifySelf: 'flex-end' }} type="submit" variant="contained">حفظ</Button>

        </DialogActions>
        </form>

      </Dialog>



    </div>
  );
}
