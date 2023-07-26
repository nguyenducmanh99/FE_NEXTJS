"use client";

import { useState, useRef, useEffect } from "react";
import CategoryShow from "./shared/CategoryShow";
import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";

export interface IntroduceType {
  iconName: string;
  title: string;
  describe: string;
}
const introduceData: IntroduceType[] = [
  {
    iconName: "mdi:truck-fast-outline",
    title: "Fast Delivery",
    describe: "Orders from all item",
  },
  {
    iconName: "healthicons:money-bag",
    title: "Return & Refund",
    describe: "Money back guarantee",
  },
  {
    iconName: "ri:secure-payment-line",
    title: "Payment",
    describe: "Secure system",
  },
  {
    iconName: "material-symbols:support-agent-rounded",
    title: "Support 24/7",
    describe: "Contact us 24 hours a day",
  },
];
export default function Features() {
  const [tab, setTab] = useState<number>(1);

  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <section className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 bg-gray-100 pointer-events-none"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-12xl mx-auto px-4 sm:px-6">
        <CategoryShow />
        <RowGrid
          className="container mx-auto"
          style={{ backgroundColor: "whitesmoke" }}
        >
          {introduceData.map((el, index) => (
            <GridItem key={index}>
              <Icon icon={el.iconName} color="red" width="65" />
              <div className="middle-form">
                <h4>{el.title}</h4>
                <span>{el.describe}</span>
              </div>
            </GridItem>
          ))}
        </RowGrid>
      </div>
    </section>
  );
}

const RowGrid = styled("div")({
  display: "grid",
  padding: "2rem 0px",
  backgroundColor: "rgb(255, 255, 255)",
  gridTemplateColumns: "repeat(4, 1fr)",
});

const GridItem = styled("div")({
  gap: "1rem",
  alignItems: "center",
  justifyContent: "center",
  borderRight: "1px solid rgb(218, 225, 231)",
  display: "flex",
  flexDirection: "row",
  flex: 1,
});
