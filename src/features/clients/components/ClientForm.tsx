import { ClientApi } from "@/api/Client";
import { CreateClient } from "@/api/Client/CreateClient";
import { ClientItem } from "@/api/Client/GetAll";
import { InvoiceApi } from "@/api/Invoice";
import { ConfirmContext } from "@/shared/components/FeedBackProvider";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
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
      isSeller: 0,
    },
  });

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

  const [deleteDialog, setDeleteDialog] = useState(false);
  const { } = useQuery(['client-account'], () => InvoiceApi.GetClientAccount(clientDetails?.id.toString() as string), {
    enabled: isModify
  })
  const deleteClient = async () => {
    if (clientDetails) {
      await ClientApi.deleteClient(clientDetails.id.toString());
      queryClient.invalidateQueries('clients')
      setDeleteDialog(false);
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
        <Box width={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>

          <DialogTitle>
            {
              isModify?
              "معلومات العميل"
              :"إضافة عميل"
            }
            </DialogTitle>
          <Controller
            name="isSeller"
            control={control}
            render={({ field }) => (
              <FormControl >

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
                    label="متجر"
                  />
                </RadioGroup>
              </FormControl>
            )}
          />
        </Box>
        <form onSubmit={handleSubmit(submit)}>
          <Box p={2} gap={2} className='grid grid-cols-2'>
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
                <TextField helperText='اختياري' {...field} label="البريد الإلكتروني" />
              )}
            />
            <Controller
              name="address"

              control={control}
              render={({ field }) => (
                <TextField helperText='اختياري'  {...field} label="العنوان" />
              )}
            />

          </Box>
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
