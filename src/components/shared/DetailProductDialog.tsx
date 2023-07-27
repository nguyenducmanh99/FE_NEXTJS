import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { IProduct } from "@/constant";

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

export default function DetailProductDialogs(props: IDetailProductDialog) {
  const { open, onClose, data } = props;
  const [image, setImage] = React.useState<ImageState>(ImageState.DEFAULT);

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
          <Grid item xs={5}></Grid>
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
