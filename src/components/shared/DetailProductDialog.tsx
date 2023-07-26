import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from 'next/image'
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
  data: IProduct | undefined
}

export default function DetailProductDialogs(props: IDetailProductDialog) {
  const { open, onClose, data } = props;

  const handleClose = () => {
    onClose();
  };

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
        <Grid item xs={7} direction={"column"} sx={{px: 2}}>
          <Image src={data?.cover || ""} alt={`detail-${data?.id}`} style={{objectFit: "contain", width: "100%", height: "85%"}} width={0} height={0} quality={100} />
          <Box sx={{height: "15%"}} > Manh</Box>
        </Grid>
        <Grid item xs={5}>
   
   </Grid>
        </Grid>
      </DialogContent>
    </DetailProductDialog>
  );
}
