import Header from "@/components/ui/header";
import PageContainer from "@/layout/container/PageContainer";
import { Grid } from "@mui/material";
import styled from "styled-components";
import "tailwindcss/tailwind.css";

Cart.displayName = "Cart";
export default function Cart() {
  return (
    <PageContainer title="Cart" description="My Cart">
      <Container className="grow pt-2">
        <Header />
        <Grid
          container
          className="relative max-w-12xl h-auto mx-auto px-4 sm:pl-6 sm:pr-10 inset-0  pointer-events-none py-32"
        >
          <Grid item xs={8} className="p-4 flex flex-col">
            <div>Title 1</div>
            <div className="w-full text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"></div>
          </Grid>
          <Grid item xs={0.5} />
          <Grid item xs={3.5} className="p-4 p-4 flex flex-col">
            <div>Title 2</div>
            <div className="w-full text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"></div>
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
}

const Container = styled.div``;
