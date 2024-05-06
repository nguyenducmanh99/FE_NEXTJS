import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
// @mui
import { styled, alpha, useTheme } from "@mui/material/styles";
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
import Iconify from "@/components/utils/iconify";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@/store/selectors";
import { signOut } from "next-auth/react";
import { useLoginSlice } from "@/store";
import { APP_DEFAULT_AVT, APP_LOGIN_URL } from "@/constant";
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
const defaultAvatarUrl = APP_DEFAULT_AVT;

export default function Sidebar({ openSideBar, onCloseSideBar }: ISideBar) {
  const { pathname } = useRouter();
  const dispatch = useDispatch();
  const { resetAuthentication } = useLoginSlice().actions;
  const { infoParty3rd, userInfo } = useSelector(selectAuth);
  const isDesktop = useResponsive("up", "lg", "xl");
  const { palette } = useTheme();
  useEffect(() => {
    if (openSideBar) {
      onCloseSideBar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleLogout = useCallback(async () => {
    await dispatch(resetAuthentication());
    await signOut({ callbackUrl: APP_LOGIN_URL });
  }, [dispatch, resetAuthentication]);

  const renderContent = (
    <>
      <BoxLogo />

      <Box sx={{ mb: 1.5, mx: 2 }}>
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

export const BoxLogo = styled(Box)({
  backgroundImage: `url(./images/logo_dinosaur.png)`,
  display: "inline-flex",
  height: "92px",
  marginBottom: "15px",
  backgroundPosition: "-10px 132px",
});
