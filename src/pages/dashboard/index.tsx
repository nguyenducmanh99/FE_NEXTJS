import type { ReactElement } from "react";
import PageContainer from "@/layout/container/PageContainer";
import FullLayout from "@/layout/FullLayout";
import Button from "@mui/material/Button";
// components

export default function Dashboard() {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Button variant="contained">Hello World</Button>
    </PageContainer>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
