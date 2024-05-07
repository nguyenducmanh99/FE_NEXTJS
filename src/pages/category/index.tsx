import { Helmet } from "react-helmet-async";
// @mui
import { Grid, Button, Container, Stack, Typography } from "@mui/material";
// components

import CategoryCard from "@/components/ui/CategoryCard";
import Iconify from "@/components/utils/iconify";
import FullLayout from "@/layout/FullLayout";
import { ReactElement } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import { store, wrapper } from "@/store";
import { ICategory } from "@/store/category-slice/types";
import Cookies from "universal-cookie";
import { useCategorySlice } from "@/store/category-slice";
import { AUTH_TOKEN } from "@/constant";
import { END } from "redux-saga";

// ----------------------------------------------------------------------

export default function Category({
  dataServer,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Helmet>
        <title> Category </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Category
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Category
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {dataServer?.map((el, index) => (
            <CategoryCard key={el.id} category={el} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  dataServer: ICategory[] | undefined;
}> = wrapper.getServerSideProps(() => async ({ req, res }: any) => {
  const { getCategoryRequest } = useCategorySlice().actions;
  const cookies = new Cookies(req.headers.cookie);
  const isServerRender = !req || typeof window === "undefined";
  const token = isServerRender
    ? cookies.get("token") || req.cookies["token"]
    : window?.localStorage?.getItem(AUTH_TOKEN) || "";

  const payload = {
    token,
  };
  if (!token) return;
  await store.dispatch(getCategoryRequest(payload));
  await store.dispatch(END);
  await store.sagaTask.toPromise();
  const dataServer: ICategory[] | undefined =
    store.getState().category?.categoryData;
  if (dataServer) return { props: { dataServer } };
});

Category.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
