import { Helmet } from "react-helmet-async";
import { ReactElement, useState } from "react";
// @mui
import { Container, Stack, Typography } from "@mui/material";
// components

import ProductFilterSidebar from "@/components/ui/ProductFilterSidebar";
import ProductSort from "@/components/ui/ProductSort";
import ProductList from "@/components/ui/ProductList";
import FullLayout from "@/layout/FullLayout";
// ----------------------------------------------------------------------

export default function Products() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Products </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={products} />
      </Container>
    </>
  );
}
Products.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export interface IProduct {
  id: number;
  cover: string;
  name: string;
  price: number;
  priceSale: number;
  colors: string[];
  status: "sale" | "new" | "";
}

const products: IProduct[] = [
  {
    id: 1,
    cover: `/images/product_1.jpg`,
    name: "Nike Air Force 1 NDESTRUKT",
    price: 20,
    priceSale: 18,
    colors: ["#00AB55", "#000000"],
    status: "sale",
  },
  {
    id: 2,
    cover: `/images/product_2.jpg`,
    name: "Nike Space Hippie 04",
    price: 10,
    priceSale: 8,
    colors: ["#94D82D", "#FFC107"],
    status: "new",
  },
  {
    id: 3,
    cover: `/images/product_3.jpg`,
    name: "Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear",
    price: 30,
    priceSale: 26,
    colors: ["#FFFFFF", "#FFC0CB"],
    status: "",
  },
  {
    id: 4,
    cover: `/images/product_4.jpg`,
    name: "Nike Blazer Low 77 Vintage",
    price: 56,
    priceSale: 50,
    colors: ["#94D82D", "#FFC107"],
    status: "sale",
  },
  {
    id: 5,
    cover: `/images/product_5.jpg`,
    name: "Nike ZoomX SuperRep Surge",
    price: 17,
    priceSale: 16,
    colors: ["#FFC0CB", "#FF4842", "#1890FF", "#94D82D"],
    status: "",
  },
  {
    id: 6,
    cover: `/images/product_6.jpg`,
    name: "Zoom Freak 2",
    price: 60,
    priceSale: 48,
    colors: ["#00AB55", "#000000", "#FFFFFF", "#FFC0CB", "#FF4842"],
    status: "sale",
  },
  {
    id: 7,
    cover: `/images/product_7.jpg`,
    name: "Nike Air Max Zephyr",
    price: 33,
    priceSale: 30,
    colors: ["#FFC107"],
    status: "new",
  },
  {
    id: 8,
    cover: `/images/product_8.jpg`,
    name: "Jordan Delta",
    price: 44,
    priceSale: 42,
    colors: ["#00AB55", "#000000", "#FFFFFF"],
    status: "",
  },
  {
    id: 9,
    cover: `/images/product_9.jpg`,
    name: "Air Jordan XXXV PF",
    price: 52,
    priceSale: 50,
    colors: ["#94D82D"],
    status: "sale",
  },
  {
    id: 10,
    cover: `/images/product_10.jpg`,
    name: "Nike Waffle Racer Crater",
    price: 67,
    priceSale: 60,
    colors: ["#000000", "#FFFFFF", "#FFC0CB", "#FF4842"],
    status: "new",
  },
];
