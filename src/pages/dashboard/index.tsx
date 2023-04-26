import type { ReactElement } from "react";
import PageContainer from "@/layout/container/PageContainer";
import FullLayout from "@/layout/FullLayout";
import { Box, Grid } from "@mui/material";
import RecentTransactions from "@/components/ui/RecentTransactions";
import ProductPerformance from "@/components/ui/ProductPerformance";
import AppWidgetSummary from "@/components/ui/AppWidgetSummary";

// components

export default function Dashboard() {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Weekly Sales"
              total={714000}
              icon={"ant-design:android-filled"}
              color="rgb(6, 27, 100)"
              bgColor="rgb(209, 233, 252)"
              iconColor="16, 57, 150"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="New Users"
              total={1352831}
              color="rgb(4, 41, 122)"
              icon={"ant-design:apple-filled"}
              bgColor="rgb(208, 242, 255)"
              iconColor="12, 83, 183"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Item Orders"
              total={1723315}
              color="rgb(122, 79, 1)"
              icon={"ant-design:windows-filled"}
              bgColor="rgb(255, 247, 205)"
              iconColor="183, 129, 3"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Bug Reports"
              total={234}
              color="rgb(122, 12, 46)"
              icon={"ant-design:bug-filled"}
              bgColor="rgb(255, 231, 217)"
              iconColor="183, 33, 54"
            />
          </Grid>
          <Grid item xs={8} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={4} lg={4}>
            <RecentTransactions />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
