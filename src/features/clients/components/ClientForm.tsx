import { ClientApi } from "@/api/Client";
import { CreateClient } from "@/api/Client/CreateClient";
import { ClientItem } from "@/api/Client/GetAll";
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
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
  const { control, handleSubmit, reset } = useForm<FormFields>({
    defaultValues: {
      name: "",
      phoneNumber: "",
      isSeller: 0,
    },
  });

  const isModify = useMemo(() => Boolean(clientDetails), [clientDetails]);

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
  }, [isOpen]);

  const [deleteDialog, setDeleteDialog] = useState(false);
  const deleteClient = async () => {
    if (clientDetails) {
      await ClientApi.deleteClient(clientDetails.id.toString());
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
      <Dialog maxWidth="sm" fullWidth open={isOpen}>
        <DialogTitle>إضافة عميل</DialogTitle>

        <form onSubmit={handleSubmit(submit)}>
          <Box p={2} gap={2} display={"flex"} flexDirection={"column"}>
            <Controller
              name="name"
              rules={{required:'اسم العميل مطلوب'}}
              control={control}
              render={({ field , fieldState}) => (
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
                <TextField helperText='اختياري' {...field}  label="البريد الإلكتروني" />
              )}
            />
            <Controller
              name="address"

              control={control}
              render={({ field }) => (
                <TextField helperText='اختياري'  {...field}  label="العنوان" />
              )}
            />
            <Controller
              name="isSeller"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    نوع العميل
                  </FormLabel>
                  <RadioGroup
                    {...field}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
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
          <DialogActions>
            <Button
              onClick={() => {
                onSetOpen(false);
              }}
            >
              الغاء
            </Button>
            <Button type="submit" variant="contained">حفظ</Button>
            {isModify && (
              <Button color="error" onClick={() => setDeleteDialog(true)}>
                حذف
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={deleteDialog}>
        <DialogTitle>حذف عميل</DialogTitle>
        <Box px={2}>
          <Typography>
            سيتم حذف العميل {clientDetails?.name} بشكل نهائي وجميع البيانات
            المرتبطة به
          </Typography>
        </Box>
        <DialogActions>
          <Button onClick={() => deleteClient()}>تأكيد</Button>
          <Button>تراجع</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
