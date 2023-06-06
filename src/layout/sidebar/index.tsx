import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Link,
  Drawer,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";

// hooks
import useResponsive from "@/hook/useResponsive";
// components

import SideBarSection from "./sideBarSection";
//
import sideBarConfig from "./config";
import Logo from "@/components/logo";
import Iconify from "@/components/utils/iconify";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@/store/selectors";
import { signOut } from "next-auth/react";
import { useLoginSlice } from "@/store";
// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

interface ISideBar {
  openSideBar: boolean;
  onCloseSideBar: CallableFunction;
}
const defaultAvatarUrl =
  "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/301801856_2066107933593180_5536598901693597399_n.jpg?_nc_cat=111&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=8YAg1IrhWtQAX-qo-TC&_nc_ht=scontent.fhan18-1.fna&oh=00_AfCWMV_89XJ6GKQcYVVelPm4WDxZQkAys5_A831SI5QLGA&oe=64823D1E";

export default function Sidebar({ openSideBar, onCloseSideBar }: ISideBar) {
  const { pathname } = useRouter();
  const dispatch = useDispatch();
  const { resetAuthentication } = useLoginSlice().actions;
  const { infoParty3rd, userInfo } = useSelector(selectAuth);
  const isDesktop = useResponsive("up", "lg", "xl");

  useEffect(() => {
    if (openSideBar) {
      onCloseSideBar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleLogout = useCallback(async () => {
    await dispatch(resetAuthentication());
    await signOut({ callbackUrl: "http://localhost:3000/auth/signin" });
  }, [dispatch, resetAuthentication]);

  const renderContent = (
    <>
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 4, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar
              src={
                infoParty3rd?.image || userInfo?.avatarUrl || defaultAvatarUrl
              }
              alt="photoURL"
            />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {infoParty3rd?.name || userInfo?.name}
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {"Admin"}
              </Typography>
            </Box>
            <Box
              flex={1}
              sx={{ flexDirection: "row-reverse", display: "flex" }}
            >
              {" "}
              <IconButton
                aria-label="logout"
                color="error"
                onClick={handleLogout}
              >
                <Iconify
                  icon="ant-design:logout-outlined"
                  color="red"
                  rotate={3}
                />
              </IconButton>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <SideBarSection data={sideBarConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openSideBar}
          onClose={() => onCloseSideBar}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
