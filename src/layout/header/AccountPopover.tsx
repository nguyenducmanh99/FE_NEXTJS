import { useCallback, useEffect, useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useLoginSlice } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@/store/selectors";
import { isEmpty } from "lodash";
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: "eva:home-fill",
  },
  {
    label: "Profile",
    icon: "eva:person-fill",
  },
  {
    label: "Settings",
    icon: "eva:settings-2-fill",
  },
];

// ----------------------------------------------------------------------
const defaultAvatarUrl =
  "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/301801856_2066107933593180_5536598901693597399_n.jpg?_nc_cat=111&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=8YAg1IrhWtQAX-qo-TC&_nc_ht=scontent.fhan18-1.fna&oh=00_AfCWMV_89XJ6GKQcYVVelPm4WDxZQkAys5_A831SI5QLGA&oe=64823D1E";
export default function AccountPopover() {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const { infoParty3rd, userInfo } = useSelector(selectAuth);
  const { status, data: session } = useSession();
  const dispatch = useDispatch();
  const { resetAuthentication } = useLoginSlice().actions;
  const { authenticationDataRequest } = useLoginSlice().actions;

  useEffect(() => {
    if (status === "authenticated" && !isEmpty(session.user)) {
      dispatch(authenticationDataRequest(session.user));
    }
  }, [authenticationDataRequest, dispatch, session, status]);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = useCallback(async () => {
    await handleClose();
    await dispatch(resetAuthentication());
    await signOut({ callbackUrl: "http://localhost:3000/auth/signin" });
  }, [dispatch, resetAuthentication]);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar
          src={infoParty3rd?.image || userInfo?.avatarUrl || defaultAvatarUrl}
          alt="photoURL"
        />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {infoParty3rd?.name || userInfo?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {infoParty3rd?.email || userInfo?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
