import { Helmet } from "react-helmet-async";
import { ReactElement, useCallback, useState } from "react";
// @mui
import { Button, Container, Stack, Typography } from "@mui/material";
// components
import { AUTH_TOKEN, IProduct } from "@/constant";
import ProductFilterSidebar from "@/components/ui/ProductFilterSidebar";
import ProductSort from "@/components/ui/ProductSort";
import ProductList from "@/components/ui/ProductList";
import FullLayout from "@/layout/FullLayout";
import Iconify from "@/components/utils/iconify";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import { store, useProductSlice, wrapper } from "@/store";
import Cookies from "universal-cookie";
import { END } from "redux-saga";
// ----------------------------------------------------------------------

export default function Products({
  dataServer,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
    const ws = XLSX.utils.json_to_sheet(dataServer);
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

        <ProductList products={dataServer} />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  dataServer: IProduct[] | undefined;
}> = wrapper.getServerSideProps(() => async ({ req, res }: any) => {
  const { getProductRequest } = useProductSlice().actions;
  const cookies = new Cookies(req.headers.cookie);
  const isServerRender = !req || typeof window === "undefined";
  const token = isServerRender
    ? cookies.get("token") || req.cookies["token"]
    : window?.localStorage?.getItem(AUTH_TOKEN) || "";

  const payload = {
    token,
  };
  if (!token) return;
  await store.dispatch(getProductRequest(payload));
  await store.dispatch(END);
  await store.sagaTask.toPromise();
  const dataServer: IProduct[] | undefined =
    store.getState().products.productData;
  if (dataServer) return { props: { dataServer } };
});

Products.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
