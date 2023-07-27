"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import CategoryShow from "./shared/CategoryShow";
import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import ProductList from "./ui/ProductList";
import { products } from "@/constant";

export default function ContentList() {
  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  const renderHeaderTitle = useCallback(
    (title: string) => (
      <h3
        id="trending-title"
        style={{ fontSize: "36px", position: "relative", zIndex: 1 }}
      >
        {title}
        <svg
          style={{
            position: "absolute",
            left: 0,
            bottom: "-12px",
            zIndex: "-1",
            color: "red",
          }}
          width="114"
          height="35"
          viewBox="0 0 114 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M112 23.275C1.84952 -10.6834 -7.36586 1.48086 7.50443 32.9053"
            stroke="currentColor"
            strokeWidth="4"
            strokeMiterlimit="3.8637"
            strokeLinecap="round"
          ></path>
        </svg>
      </h3>
    ),
    [],
  );

  return (
    <section className="relative bg-gray-100">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="relative max-w-12xl mx-auto px-4 py-8 sm:px-6">
        <div className="container mx-auto">
          {/* Title  */}
          <RowFlex className="pb-12">
            {renderHeaderTitle("Trending Products")}
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                New
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                Feature
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                Top Sale
              </button>
            </div>
          </RowFlex>
          <ProductList products={products} />
        </div>
      </div>
    </section>
  );
}

const RowFlex = styled("div")({
  justifyContent: "space-between",
  display: "flex",
});
