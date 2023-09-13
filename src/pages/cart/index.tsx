/* eslint-disable @next/next/no-img-element */
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
            <div>Order</div>
            <div className="w-full text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-700">
              <div className="flex flex-row">
                <img
                  className="rounded w-36 h-36"
                  src="/images/product_2.jpg"
                  alt="Extra large avatar"
                />
                <div className="flex flex-col"></div>
              </div>
            </div>
          </Grid>
          <Grid item xs={0.5} />
          <Grid item xs={3.5} className="p-4 flex flex-col">
            <div>Payment Summary</div>
            <div className="w-full text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-700"></div>
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
}

const Container = styled.div``;
