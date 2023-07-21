import React, { useEffect, useState } from "react";
import { styled, Container, Box } from "@mui/material";

import Header from "./header/index";
import Sidebar from "./sidebar";
import PopupMessage from "@/components/shared/PopupMessage";

import { redirect } from 'next/navigation'
import { useLocalStorage } from "@/hook";
import dayjs, { Dayjs } from "dayjs";
import { AUTH_INFO, AUTH_TOKEN } from "@/constant";


export  const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ComponentWithAuth = (props: P) => {
    const [authInfo, setAuthInfo] = useLocalStorage(AUTH_INFO, "");
    const [token, setToken] = useLocalStorage(AUTH_TOKEN, "");

    useEffect(() => {
      // If isSever render return...
      if(typeof window === "undefined") return
      // Else client render process check auth
      const currentDate: string | any = dayjs(new Date()).format("YYYY-MM-DD hh:mm:ss") 
      const expired: any  = dayjs(authInfo?.expired).format("YYYY-MM-DD hh:mm:ss");
      console.log("currentDate", currentDate)
      console.log("expired", expired)
      console.log("???", dayjs().isBefore(currentDate , expired))
      // if(!expired || )


      // if (!isAuthenticated) {
      //   redirect("/auth/signin")
      // }
    }, [authInfo]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

const FullLayout: React.FC<Props> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <MainWrapper className="mainwrapper">
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      <Sidebar
        openSideBar={isSidebarOpen}
        onCloseSideBar={() => setMobileSidebarOpen(false)}
      />
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper className="page-wrapper">
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        <Header onOpenNav={() => setMobileSidebarOpen(true)} />
        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}
        <MainContainer
          sx={{
            paddingTop: "20px",
            maxWidth: "100% !important",
          }}
        >
          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </MainContainer>
        <PopupMessage />
      </PageWrapper>
    </MainWrapper>
  );
};

export default withAuth(FullLayout);
const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "rgb(238, 242, 246)",
}));

interface Props {
  children: React.ReactNode;
}

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const MainContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));