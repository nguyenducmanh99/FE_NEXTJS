import React from "react";
import DashboardCard from "../shared/DashboardCard";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from "@mui/lab";
import { Avatar, Link, Typography } from "@mui/material";
import { IHistory } from "@/store/history-slice/types";
import dayjs from "dayjs";
import { APP_DEFAULT_AVT } from "@/constant";

interface IRecentActivity {
  data: IHistory[] | undefined;
}
const RecentActivity = (props: IRecentActivity) => {
  const { data } = props;
  return (
    <DashboardCard title="Recent Activity">
      <>
        <Timeline
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            p: 0,
            mb: "50px",
            maxHeight: '320px',
            overflowY: 'auto',
            "& .MuiTimelineConnector-root": {
              width: "1px",
              backgroundColor: "#efefef",
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
          }}
        >
          {data &&
            data?.map((el, index) => {
              const { authorUrl, action, categoryName, createAt } = el;

              return (
                <TimelineItem key={index}>
                  <TimelineOppositeContent>
                    {dayjs(createAt).format("hh:mm a")}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot sx={{ p: 0 }}>
                      <Avatar
                        src={authorUrl || APP_DEFAULT_AVT}
                        alt="photoDotAvt"
                        sx={{ width: 24, height: 24 }}
                      />
                    </TimelineDot>
                    <TimelineConnector
                      sx={{ backgroundColor: "cornflowerblue !important" }}
                    />
                  </TimelineSeparator>
                  <TimelineContent>
                    {action} <br /> {categoryName}
                  </TimelineContent>
                </TimelineItem>
              );
            })}
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default RecentActivity;
