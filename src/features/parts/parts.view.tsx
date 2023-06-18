import PartsTable from "./components/PartsTable";
import PartsFilter from "./components/PartsFilter";

import { PartApi } from "@/api/Part";
import { useQuery, useQueryClient } from "react-query";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Typography,
} from "@mui/material";
import AddCarPart from "@/features/parts/components/AddCarPart";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CarApi } from "@/api/Car";
import { useEffect, useMemo, useState } from "react";
import { GetAllCar } from "@/api/Car/dto";
import { BrandItem } from "@/api/Brand/dto";
import { CategoryApi } from "@/api/Category";
import { InventoryApi } from "@/api/Inventory";
import { CategoryItem } from "@/api/Category/dto";
import { InventoryItem } from "@/api/Inventory/dto";
import { GetAllPartsParams, PartItem } from "@/api/Part/GetAllDto";
import { BrandApi } from "@/api/Brand";
import { Refresh } from "@mui/icons-material";
import CreateInvoice from "@/features/invoices/invoice/CreateInvoice";
import { ClientItem } from "@/api/Client/GetAll";
import { ClientApi } from "@/api/Client";
import { useParams, useSearchParams } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Products() {
  const [carsList, setCarsList] = useState<GetAllCar[]>([]);
  const [categoriesList, setcategoriesList] = useState<CategoryItem[]>([]);
  const [inventoriesList, setinventoriesList] = useState<InventoryItem[]>([]);
  const [brandsList, setBrandsList] = useState<BrandItem[]>([]);
  const [parts, setParts] = useState<PartItem[]>([]);

  const [customers, setCustomers] = useState<ClientItem[]>([]);
  const [partsToInvoice, setPartsToInvoice] = useState<PartItem[]>([]);
  const [invoiceDialog, setInvoiceDialog] = useState(false);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo<GetAllPartsParams>(
    () => Object.fromEntries(searchParams) as any,
    [searchParams]
  );

  searchParams.getAll;

  const brands = useSelector<RootState, BrandItem[]>((s) => s.brand.brands);

  const { refetch } = useQuery(
    ["part"],
    () => PartApi.getParts(params),
    {
      onSuccess(data) {
        setParts(data.parts);
        setTotal(data.totalNumber);
      },
    }
  );

  const { invalidateQueries } = useQueryClient();

  const carQuery = useQuery("car", CarApi.fetchCars, {
    onSuccess: (cars) => setCarsList(cars),
  });

  const categoryQuery = useQuery<CategoryItem[]>(
    "category",
    CategoryApi.GetAll,
    {
      onSuccess: (data) => setcategoriesList(data),
    }
  );

  const inventoryQuery = useQuery<InventoryItem[]>(
    "inventory",
    InventoryApi.GetAll,
    {
      onSuccess: (data) => setinventoriesList(data),
    }
  );

  const brandQuery = useQuery<BrandItem[]>("brands", BrandApi.fetchBrands, {
    onSuccess: (data) => {
      setBrandsList(data);
    },
  });
  const customerQuery = useQuery({
    queryFn: ClientApi.fetchClients,
    queryKey: "customer",
    onSuccess: (data) => {
      setCustomers(data);
    },
  });
  const [expanded, setExpanded] = useState(true);

  const onPaginationChage = (PageNumber: number, PageSize: number) => {
    searchParams.set("PageSize", PageSize.toString());
    searchParams.set("PageNumber", PageNumber.toString());
    setSearchParams(searchParams);
    refetch();
  };

  const showInvoiceDialog = (data: PartItem[]) => {
    console.log("invoice", data);
    setInvoiceDialog(true);
    setPartsToInvoice(data);
  };
  useEffect(() => {
    refetch();
  }, [JSON.stringify(params)]);

  return (
    <div>
      <Card className="mb-4">
        <div className="flex flex-col p-4 gap-4 ">
          <div className="flex justify-between">
            <Typography variant="h2" fontWeight={"bold"} fontSize={24}>
              قطع السيارات
            </Typography>
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setSearchParams({
                    PageSize: "5",
                    PageNumber: "1",
                  });
                }}
                endIcon={<Refresh />}
              >
                تهيئة
              </Button>
              <AddCarPart
                brands={brands}
                inventories={inventoriesList}
                categories={categoriesList}
                cars={carsList}
              ></AddCarPart>
            </div>
          </div>

          <PartsFilter
            {...{
              brandsList,
              carsList,
              categoriesList,
              countriesList: [],
              inventoriesList,
              params,
            }}
            onFilterChange={(key: string, value: string | null) => {
              if (value) {
                searchParams.set(key, value);
                setSearchParams(searchParams);
              } else {
                searchParams.delete(key);
              }
            }}
          />

        </div>
      </Card>
      <CreateInvoice
        onSubmit={() => {
          invalidateQueries("part");
        }}
        parts={partsToInvoice}
        customers={customers}
        onClose={(e) => setInvoiceDialog(e)}
        is={invoiceDialog}
      ></CreateInvoice>
      <PartsTable
        onGenerateInvoice={(data: PartItem[]) => showInvoiceDialog(data)}
        page={params.PageNumber}
        onPageChange={onPaginationChage}
        rows={parts}
        rowsPerPage={params.PageSize}
        totalCount={total}
      />
    </div>
  );
}

export default Products;