import { useCallback, useState } from "react";
// @mui
import { Badge, IconButton } from "@mui/material";
// utils

// components
import Iconify from "@/components/utils/iconify";
import { useDispatch } from "react-redux";
import { useMessageSlice } from "@/store";

// ----------------------------------------------------------------------

export default function MessageButtonIcon() {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();
  const { changeStatePopup } = useMessageSlice().actions;

  const handleChangePopup = useCallback(() => {
    dispatch(changeStatePopup());
  }, [changeStatePopup, dispatch]);

  return (
    <>
      <IconButton
        color={"success"}
        onClick={handleChangePopup}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={1} color="error">
          <Iconify icon="fe:messanger" />
        </Badge>
      </IconButton>
    </>
  );
}

// ----------------------------------------------------------------------
