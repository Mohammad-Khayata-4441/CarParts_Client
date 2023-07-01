import React, { useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useQuery, useQueryClient } from "react-query";
import { APP_CURRENCY } from '@/app/config/app.config'
import { ClientApi } from "@/api/Client";
import {
  Card,
  IconButton,
  Paper,
  TableBody,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import {  FaStore, FaUser } from "react-icons/fa";
import ClientForm from "@/features/clients/components/ClientForm";
import { ClientItem } from "@/api/Client/GetAll";

function Clients() {
  const queryClient = useQueryClient();
  const [clientToModify, setClientToModify] = useState<ClientItem | null>(null);
  const { data } = useQuery(["client"], ClientApi.fetchClients);
  const [showClientModal, setClientModal] = useState(false);
  return (
    <div>
      <ClientForm
        clientDetails={clientToModify}
        onSubmit={() => {
          queryClient.invalidateQueries("client");
        }}
        isOpen={showClientModal}
        onSetOpen={(nv) => {
          if (!nv) {
            setClientToModify(null);
          }
          setClientModal(nv);
        }}
      />
      <TableContainer>
        <Card sx={{ p: 2, mb: 2 }}>
          <Typography fontSize={24} fontWeight={"bold"}>
            العملاء
          </Typography>
          <Box mt={2} gap={2} className="filters flex">
            <FormControl
              size="small"
              className="flex-grow lg:grow-0 basis-full lg:basis-[300px]"
            >
              <InputLabel id="brand-id-label">نوع العميل</InputLabel>
              <Select labelId="brand-id-label" label="نوع العميل" value={''}>
                <MenuItem value={1}>متاجر</MenuItem>
                <MenuItem value={0}>زبائن</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" onClick={() => setClientModal(true)}>إضافة عميل</Button>
          </Box>
        </Card>

        <Paper>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">اسم الزبون</TableCell>
                <TableCell align="left">صافي الحساب</TableCell>
                <TableCell align="right">رقم الهاتف</TableCell>
                <TableCell align="right">البريد الالكتروني</TableCell>
                <TableCell align="right">العنوان</TableCell>
                <TableCell align="right">إجرائات</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data &&
                data.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <div className="flex">
                        {row.isSeller ? <FaStore /> : <FaUser />}
                        <span className="mr-4">{row.name}</span>
                      </div>
                    </TableCell>
                    <TableCell sx={{ color: row.totalAccount >= 0 ? "green" : "red" }}>{row.totalAccount} {APP_CURRENCY}</TableCell>
                    <TableCell align="right">{row.phoneNumber}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.address}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => setClientToModify(row)}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      </TableContainer>
    </div>
  );
}

export default Clients;
