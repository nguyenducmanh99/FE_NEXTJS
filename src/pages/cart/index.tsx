/* eslint-disable @next/next/no-img-element */
import Header from "@/components/ui/header";
import { CART_DATA, IOrderItem } from "@/constant";
import { useLocalStorage } from "@/hook";
import PageContainer from "@/layout/container/PageContainer";
import { Grid } from "@mui/material";
import styled from "styled-components";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { IQuantity } from "@/components/shared/DetailProductDialog";

Cart.displayName = "Cart";
export default function Cart() {
  const [cartData, setCartData] = useLocalStorage(CART_DATA, "");
  const [mounted, setMounted] = useState<boolean>(false);
  const [numberOrder, setNumberOrder] = useState<number>(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChangeQuantity = useCallback(
    (state: IQuantity) => {
      console.log(state);
      let result = numberOrder;
      switch (state) {
        case IQuantity.INCREASE:
          result = result + 1;
          break;
        case IQuantity.REDUCE:
          if (result == 1) return;
          result = result - 1;
          // code block
          break;
        default:
        // code block
      }
      return setNumberOrder(result);
    },
    [numberOrder],
  );

  return (
    <PageContainer title="Cart" description="My Cart">
      <Container className="grow pt-2">
        <Header />
        <Grid
          container
          className="relative max-w-12xl h-auto mx-auto px-4 sm:pl-6 sm:pr-10 inset-0 py-32"
        >
          <Grid item xs={8} className="p-4 flex flex-col">
            <div className="text-2xl font-black text-gray-800 dark:text-white">
              Order
            </div>

            {mounted && cartData && cartData.length > 0 ? (
              cartData.map((item: IOrderItem, index: number) => {
                return (
                  <div
                    className="flex flex-col w-full text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-700"
                    key={index}
                  >
                    <div className="flex flex-row w-full">
                      <Image
                        className="rounded flex-0"
                        src={item.cover}
                        alt="Cart preview avatar"
                        width={100}
                        height={100}
                      />
                      <div className="flex flex-1 justify-evenly items-center">
                        <div className="flex flex-col">
                          <p className="text-black text-sm text-left">
                            {item.name}
                          </p>
                          <p className="text-black text-sm text-left ">
                            {" "}
                            <span>Color: </span>
                            <span>
                              <svg
                                height="16"
                                width="16"
                                className="inline rounded-full"
                              >
                                <circle
                                  cx="10"
                                  cy="10"
                                  r="50"
                                  fill={item.colors}
                                  stroke="black"
                                  strokeWidth="3"
                                />
                              </svg>
                            </span>
                          </p>
                        </div>
                        <div className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
                          {item.size}
                        </div>
                        <div className="flex flex-row">
                          <input
                            className="tp-cart-input"
                            type="text"
                            readOnly={true}
                            value={1}
                            style={{ width: "50px", padding: "0 5px" }}
                          />
                          <div className="flex flex-col justify-evenly ml-1">
                            <Icon
                              icon="emojione-monotone:up-arrow"
                              onClick={() =>
                                handleChangeQuantity(IQuantity.INCREASE)
                              }
                            />

                            <Icon
                              icon="emojione-monotone:down-arrow"
                              onClick={() =>
                                handleChangeQuantity(IQuantity.REDUCE)
                              }
                            />
                          </div>
                        </div>
                        <div className="flex flex-col style-1">
                          <del>
                            <span className="amount bg-red-100 text-red-800 text-base font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                              €35,00
                            </span>
                          </del>
                          <ins>
                            <span className="amount bg-green-100 text-green-800 text-base font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                              €32,50
                            </span>
                          </ins>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>Not Found</div>
            )}
          </Grid>
          <Grid item xs={0.5} />
          <Grid item xs={3.5} className="p-4 flex flex-col">
            <div className="text-2xl font-black text-gray-800 dark:text-white">
              Payment Summary
            </div>
            <div className="w-full text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-700"></div>
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
}

const Container = styled.div``;
