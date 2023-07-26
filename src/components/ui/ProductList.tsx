// @mui
import { Grid } from "@mui/material";
import ShopProductCard from "./ProductCard";
import { IProduct } from "@/constant";
import { useCallback, useState } from "react";
import DetailProductDialogs from "../shared/DetailProductDialog";

// ----------------------------------------------------------------------

export interface IProductList {
  products: IProduct[];
}

export default function ProductList({ products, ...other }: IProductList) {
  const [productSelect, setProductSelect] = useState<IProduct>();
  const [open, setOpen] = useState<boolean>(false);

  const handleSelectProduct = useCallback((data: IProduct) => {
    setOpen(true);
    console.log("data", data)
    setProductSelect(data);
  }, []);
  
  const handleClose = useCallback(() => {
    setOpen(false)
  }, []);

  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} onSelect={handleSelectProduct}/>
        </Grid>
      ))}
      <DetailProductDialogs 
        open={open}
        onClose={handleClose}
        data={productSelect}
      />
    </Grid>
  );
}
