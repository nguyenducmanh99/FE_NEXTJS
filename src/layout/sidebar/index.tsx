import { useEffect } from "react";
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

export default function Sidebar({ openSideBar, onCloseSideBar }: ISideBar) {
  const { pathname } = useRouter();

  const isDesktop = useResponsive("up", "lg", "xl");

  useEffect(() => {
    if (openSideBar) {
      onCloseSideBar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
                "https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/301801856_2066107933593180_5536598901693597399_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=jQA3UavyjncAX_23hhY&_nc_ht=scontent.fhan14-1.fna&oh=00_AfAqNxO7EnIUK6iedAldViusKAHWkUF15X4Wzn3YWPVHyg&oe=644CD85E"
              }
              alt="photoURL"
            />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {"Duc Manh"}
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
              <IconButton aria-label="logout" color="error">
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
