import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { Box, Chip, Grid, Rating, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { IProduct } from "@/constant";
import { ColorPreview } from "../ui/ProductCard";

const DetailProductDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface IDetailProductDialog {
  open: boolean;
  onClose: CallableFunction;
  data: IProduct | undefined;
}

export const enum ImageState {
  DEFAULT = 1,
  LEFT = 2,
  RIGHT = 3,
}

export const enum IQuantity {
  INCREASE = "INCREASE",
  REDUCE = "REDUCE",
}

export default function DetailProductDialogs(props: IDetailProductDialog) {
  const { open, onClose, data } = props;
  const [image, setImage] = React.useState<ImageState>(ImageState.DEFAULT);
  const [numberOrder, setNumberOrder] = React.useState<number>(1);
  const useBackgroundImage = React.useMemo(() => {
    return { backgroundImage: `url(${data?.cover})` };
  }, [data]);

  const mainImageState = React.useMemo(() => {
    let stateValue = "";
    switch (image) {
      case ImageState.LEFT:
        stateValue = "rotate-left";
        break;
      case ImageState.RIGHT:
        stateValue = "rotate-right";
        break;
      default:
    }
    return stateValue;
  }, [image]);

  const checkSelected = React.useCallback(
    (value: ImageState): boolean => {
      return value === image;
    },
    [image],
  );

  const handleChangeQuantity = React.useCallback(
    (state: IQuantity) => {
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

  const handleClose = React.useCallback(() => {
    onClose();
  }, [onClose]);

  const handleZoomIn = React.useCallback((event: any) => {
    const zoomer = event.currentTarget;
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;
    const x = (offsetX / zoomer.offsetWidth) * 100;
    const y = (offsetY / zoomer.offsetHeight) * 100;
    zoomer.style.backgroundPosition = x + "% " + y + "%";
  }, []);

  return (
    <DetailProductDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth={"md"}
      fullWidth={true}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <Grid container rowSpacing={2} columnSpacing={2} sx={{ p: 5 }}>
          <Grid item xs={7} sx={{ px: 2 }}>
            <figure
              className={`zoom ${mainImageState}`}
              onMouseMove={handleZoomIn}
              onTouchMove={handleZoomIn}
              style={useBackgroundImage}
            >
              <Image
                src={data?.cover || ""}
                alt={`detail-${data?.id}`}
                style={{ width: "100%", height: "100%" }}
                width={0}
                height={0}
                quality={100}
              />
            </figure>
            <Box sx={{ height: "15%" }}>
              <ButtonGroup>
                <div
                  className={`image-item-button ${
                    checkSelected(ImageState.DEFAULT) && "selected-image"
                  }`}
                  style={useBackgroundImage}
                  onClick={() => setImage(ImageState.DEFAULT)}
                ></div>
                <div
                  className={`image-item-button ${
                    checkSelected(ImageState.LEFT) && "selected-image"
                  } rotate-left`}
                  style={useBackgroundImage}
                  onClick={() => setImage(ImageState.LEFT)}
                ></div>
                <div
                  className={`image-item-button ${
                    checkSelected(ImageState.RIGHT) && "selected-image"
                  } rotate-right`}
                  style={useBackgroundImage}
                  onClick={() => setImage(ImageState.RIGHT)}
                ></div>
              </ButtonGroup>
            </Box>
          </Grid>
          <Grid item xs={5} className="flex flex-col">
            <ProductName>{data?.name}</ProductName>
            <div className="flex flex-row py-2">
              <Label className="text-base">Brand:</Label>
              <span className="text-base">Nike</span>
            </div>
            <div className="flex flex-row py-2">
              <Label className="text-base" style={{ alignSelf: "end" }}>
                Rate:
              </Label>
              <Rating value={4} readOnly />
            </div>
            <div className="flex flex-row py-2">
              <Label className="text-base">Color:</Label>
              <ColorPreview
                colors={data?.colors || []}
                sx={{ minWidth: "25px" }}
              ></ColorPreview>
            </div>
            <div className="flex flex-row py-2">
              <Label className="text-base self-center">Status:</Label>
              <Stack direction="row" spacing={1}>
                <Chip
                  label="New"
                  color="success"
                  variant="outlined"
                  clickable={false}
                  disabled={false}
                />
                <Chip
                  label="Feature"
                  color="success"
                  variant="outlined"
                  clickable={false}
                  disabled={true}
                />
                <Chip
                  label="Sale"
                  color="success"
                  variant="outlined"
                  clickable={false}
                  disabled={true}
                />
              </Stack>
            </div>
            <div className="flex flex-row py-2">
              <Label className="text-base">Old Price:</Label>
              <span
                className="text-base"
                style={{ textDecorationLine: "line-through" }}
              >
                {data?.price}.000
              </span>
            </div>
            <div className="flex flex-row py-2">
              <Label className="text-base">Promotion Price:</Label>
              <span className="text-base animate-charcter">
                {data?.priceSale}.000
              </span>
            </div>
            <div className="flex flex-row py-2">
              <Label className="text-base">Update At:</Label>
              <span className="text-base">2023-7-12</span>
            </div>
            <div className="flex flex-row py-2">
              <Label className="text-base">Created By:</Label>
              <span className="text-base">Nguyen Duc Manh</span>
            </div>
            <div className="mt-2">Quantity</div>
            <div className="flex flex-row py-2">
              <div className="">
                <div
                  className="mb-2 mr-2"
                  style={{ width: "150px", position: "relative" }}
                >
                  <span
                    className="tp-cart-minus cursor-pointer"
                    onClick={() => handleChangeQuantity(IQuantity.REDUCE)}
                  >
                    <svg
                      width="11"
                      height="2"
                      viewBox="0 0 11 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1H10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>
                  <input
                    className="tp-cart-input"
                    type="text"
                    readOnly={true}
                    value={numberOrder}
                  />
                  <span
                    className="tp-cart-plus cursor-pointer"
                    onClick={() => handleChangeQuantity(IQuantity.INCREASE)}
                  >
                    <svg
                      width="11"
                      height="12"
                      viewBox="0 0 11 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 6H10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M5.5 10.5V1.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span className="flex flex-row relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 32 32"
                    className="mr-2"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M6 6h24l-3 13H9m18 4H10L5 2H2" />
                      <circle cx="25" cy="27" r="2" />
                      <circle cx="12" cy="27" r="2" />
                    </g>
                  </svg>{" "}
                  Add To Card
                </span>
              </button>
            </div>
            <button className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Buy Now
              </span>
            </button>
          </Grid>
        </Grid>
      </DialogContent>
    </DetailProductDialog>
  );
}

const ButtonGroup = styled("div")({
  display: "flex",
  justifyContent: "space-evenly",
  padding: "5px",
});

const ProductName = styled("h1")({
  fontSize: "30px",
  lineHeight: "30px",
  paddingBottom: "25px",
});

const Label = styled("span")({
  color: "gray",
  paddingRight: "1rem",
});
