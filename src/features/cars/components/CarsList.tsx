import { GetAllCar } from "@/api/Car/dto";
import React, { useMemo, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActions,
} from "@mui/material";
import { SERVER_URL } from "@/app/config/app.config";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BrandItem } from "@/api/Brand/dto";
import { Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import NoData from "@/shared/components/NoData";

type propsType = {
  carsList: GetAllCar[];
  onDetails: (carItem: GetAllCar) => void;
};
export default function CarsList(props: propsType) {
  const brands = useSelector<RootState, BrandItem[]>(
    (state) => state.brand.brands
  );
  const brandInfo = (id: number | string) => brands.find((b) => b.id == id);
  const getFileUrl = (url: string) => `${SERVER_URL}/${url}`;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {
   
      props.carsList.map((car) => (
        <Card
          key={car.id}
          sx={{ borderRadius: "18px 18px 10px 10px", padding: "6px" }}
        >
          {car.image && (
            <CardMedia
              sx={{ height: "240px", borderRadius: "14px" }}
              component="img"
              image={getFileUrl(car.image)}
              alt="green iguana"
            />
          )}

          <CardContent className="">
            <div className="flex justify-between items-center">
              {brands.length && (
                <img
                  src={`/brands/${brandInfo(car.brandId)?.name}.png`}
                  className="h-16"
                  alt=""
                />
              )}
              <Typography
                fontWeight={600}
                gutterBottom
                variant="h6"
                fontSize={20}
                margin={0}
                component="div"
              >
                {car.name} ({car.model})
              </Typography>
            </div>
    
          </CardContent>

          <CardActions className="gap-2">
            <Link
              className="flex-grow"
              to={{
                pathname: `/products`,
                search:`PageNumber=1&CarId=${car.id}`
              }}
            >
              <Button variant="contained" fullWidth>
                عرض القطع ({car.totalParts})
              </Button>
            </Link>
            <Button variant="contained" onClick={() => props.onDetails(car)}>
              <Edit></Edit>
            </Button>
          </CardActions>
        </Card>
      ))
      
      
      
      }
    </div>
  );
}
