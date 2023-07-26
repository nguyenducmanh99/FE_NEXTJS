import { Helmet } from "react-helmet-async";
import { ReactElement, useCallback, useState } from "react";
// @mui
import { Button, Container, Stack, Typography } from "@mui/material";
// components
import { products } from "@/constant";
import ProductFilterSidebar from "@/components/ui/ProductFilterSidebar";
import ProductSort from "@/components/ui/ProductSort";
import ProductList from "@/components/ui/ProductList";
import FullLayout from "@/layout/FullLayout";
import Iconify from "@/components/utils/iconify";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
// ----------------------------------------------------------------------

export default function Products() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleExportData = useCallback(() => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const fileName = "list_product";
    const ws = XLSX.utils.json_to_sheet(products);
    const wb = { Sheets: { data: ws }, SheetNames: ["Data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }, []);

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
            <Button
              disableRipple
              color="inherit"
              endIcon={<Iconify icon="typcn:export-outline" />}
              onClick={handleExportData}
            >
              Export&nbsp;
            </Button>
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
