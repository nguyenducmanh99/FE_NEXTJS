"use-client";
/* eslint-disable @next/next/no-img-element */
import Header from "@/components/ui/header";
import { CART_DATA, IOrderItem, IProduct } from "@/constant";
import { useLocalStorage } from "@/hook";
import PageContainer from "@/layout/container/PageContainer";
import { Grid } from "@mui/material";
import styled from "styled-components";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { IQuantity } from "@/components/shared/DetailProductDialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { BootstrapInput } from "@/components/utils/Input";
Cart.displayName = "Cart";
const unitPrice = '€';
export default function Cart() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const [cartData, setCartData] = useLocalStorage(CART_DATA, "");
  const [mounted, setMounted] = useState<boolean>(false);
  const [numberOrder, setNumberOrder] = useState<number>(1);
  const selectedOption = watch("selectedOption");
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

  const originalPrice = useMemo(() => {
    let result = 0;
    if (!cartData) return;
    const totalPrice = cartData.reduce(
      (acc: any, currentItem: IProduct) => acc + currentItem.price,
      0,
    );

    return totalPrice;
  }, [cartData]);

  const reducedAmount = useMemo(() => {
    let result = 0;
    if (!cartData) return;
    const totalPrice = cartData.reduce(
      (acc: any, currentItem: IProduct) =>
        acc + (currentItem.price - currentItem.priceSale),
      0,
    );

    return totalPrice;
  }, [cartData]);

  const onSubmit: SubmitHandler<any> = useCallback(async (data) => {
    console.log("submit", data);
  }, []);

  const handleCheckboxChange = useCallback(
    (value) => {
      setValue("selectedOption", value);
    },
    [setValue],
  );

  return (
    <PageContainer title="Cart" description="My Cart">
      <Container className="grow pt-2">
        <Header />
        <Grid
          container
          className="relative max-w-12xl h-auto mx-auto px-4 sm:pl-6 sm:pr-10 inset-0 py-32"
          style={{ height: "100%" }}
        >
          <Grid item xs={8} className="p-4 flex flex-col">
            <div className="text-2xl font-black text-gray-800 dark:text-white">
              Order
            </div>

            {mounted && cartData && cartData.length > 0 ? (
              cartData.map((item: IOrderItem, index: number) => {
                return (
                  <div
                    className="flex flex-col h-full overflow-y-auto w-full text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-700"
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
                              {item.price + unitPrice}
                            </span>
                          </del>
                          <ins>
                            <span className="amount bg-green-100 text-green-800 text-base font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                              {item.priceSale + unitPrice}
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

            <div className="w-full mb-5 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-700">
              <RowDetailCart>
                <span className="text-gray-500">Total Item</span>
                <span suppressHydrationWarning>{cartData?.length || 0}</span>
              </RowDetailCart>
              <RowDetailCart>
                <span className="text-gray-500">Original price</span>
                <span suppressHydrationWarning>{originalPrice + unitPrice}</span>
              </RowDetailCart>
              <RowDetailCart>
                <span className="text-gray-500">Reduced amount</span>
                <span suppressHydrationWarning>{reducedAmount + unitPrice}</span>
              </RowDetailCart>
              <RowDetailCart>
                <label
                  htmlFor="search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
                  <input
                    type="search"
                    id="search"
                    className="block w-full p-3 ps-10 text-sm text-gray-900 border rounded-lg  focus:ring-blue-500"
                    placeholder="Discount code"
                  />
                  <button
                    type="submit"
                    style={{ bottom: "6px" }}
                    className="text-white absolute end-2.5 max-w-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Apply
                  </button>
                </div>
              </RowDetailCart>
            </div>

            <div className="w-full text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-700">
              <form
                className="max-w-md mx-auto"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="relative z-0 w-full mb-2 group">
                  <BootstrapInput
                    {...register("customer_name", {
                      required: true,
                      maxLength: 200,
                    })}
                    type="text"
                    name="customer_name"
                    id="customer_name"
                    className="block py-2.5 px-0 w-full text-sm "
                    placeholder="Please input your name"
                    required
                  />

                </div>
                <div className="relative z-0 w-full mb-2 group">
                  <BootstrapInput
                    {...register("customer_phone", {
                      required: true,
                      maxLength: 200,
                    })}
                    type="text"
                    name="customer_phone"
                    id="customer_phone"
                    className="block py-2.5 px-0 w-full text-sm "
                    placeholder="Please input your phone"
                    required
                  />
                </div>
                <div className="relative z-0 w-full mb-2 group">
                  <BootstrapInput
                    {...register("customer_address", {
                      required: true,
                      maxLength: 200,
                    })}
                    type="text"
                    name="customer_address"
                    id="customer_address"
                    className="block py-2.5 px-0 w-full text-sm"
                    placeholder="Please input your delivery address"
                    required
                  />
                </div>
                <div className="flex flex-row justify-between mb-5">
                  <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 w-40">
                    <input
                      {...register("selectedOption")}
                      id="bordered-checkbox-1"
                      type="checkbox"
                      value="online"
                      name="bordered-checkbox"
                      onChange={() => handleCheckboxChange("online")}
                      checked={selectedOption === "online"}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="bordered-checkbox-1"
                      className="w-full py-4 ms-2 text-sm font-medium "
                    >
                      Online
                    </label>
                  </div>
                  <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 w-40">
                    <input
                      {...register("selectedOption")}
                      id="bordered-checkbox-2"
                      type="checkbox"
                      value="offline"
                      onChange={() => handleCheckboxChange("offline")}
                      checked={selectedOption === "offline"}
                      name="bordered-checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="bordered-checkbox-2"
                      className="w-full py-4 ms-2 text-sm font-medium"
                    >
                      Offline
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-2/3 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Submit
                </button>
              </form>
            </div>
          </Grid>
          {/* <p>Thank you for visiting the store and shopping</p> */}
        </Grid>
      </Container>
    </PageContainer>
  );
}

const Container = styled.div`
  position: relative;
`;
const RowDetailCart = styled("div")({
  justifyContent: "space-between",
  display: "flex",
  marginTop: "1rem",
});


