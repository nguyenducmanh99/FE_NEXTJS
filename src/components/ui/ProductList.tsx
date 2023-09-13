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
  const [productSelect, setProductSelect] = useState<IProduct>(products[0]);
  const [open, setOpen] = useState<boolean>(false);

  const handleSelectProduct = useCallback((data: IProduct) => {
    setOpen(true);
    setProductSelect(data);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    const el: any = document.getElementById(
      `list-button-action${productSelect?.id}`,
    );
    el.style.display = "none";
    setTimeout(() => {
      el.style.display = "flex";
    }, 1000);
  }, [productSelect?.id]);

  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} onSelect={handleSelectProduct} />
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
