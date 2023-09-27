"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CART_DATA } from "@/constant";
import { useLocalStorage } from "@/hook";
export default function Header() {
  const [top, setTop] = useState<boolean>(true);
  const [cartData, setCartData] = useLocalStorage(CART_DATA, "");
  
  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);
  
  const numberItem: number = useMemo(() => {
    return cartData?.length || 0;
  }, [cartData?.length]);

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top ? "bg-white backdrop-blur-sm shadow-lg" : ""
      }`}
    >
      <div className="mx-2 px-5 sm:px-6 w-full">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <TitleLogo> Dinosaur </TitleLogo>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center mb-0">
              {/* Search input */}
              <li className="mx-auto w-1/3">
                <div className="overflow-hidden z-0 rounded-full relative p-3">
                  <form
                    role="form"
                    className="relative flex z-50 bg-white rounded-full"
                  >
                    <input
                      type="text"
                      placeholder="enter your search here"
                      className="rounded-full flex-1 px-6 py-4 text-gray-700 focus:outline-none"
                    />
                    <button className="bg-indigo-500 text-white rounded-full font-semibold px-8 py-4 hover:bg-indigo-400 focus:bg-indigo-600 focus:outline-none">
                      Search
                    </button>
                  </form>
                  <div className="glow glow-1 z-10 bg-pink-400 absolute"></div>
                  <div className="glow glow-2 z-20 bg-purple-400 absolute"></div>
                  <div className="glow glow-3 z-30 bg-yellow-400 absolute"></div>
                  <div className="glow glow-4 z-40 bg-blue-400 absolute"></div>
                </div>
              </li>
              {/* Search input */}
              <li>
                <Link
                  href="/auth/signin"
                  className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="relative inline-flex items-center btn-sm ml-3 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 32 32"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M6 6h24l-3 13H9m18 4H10L5 2H2" />
                      <circle cx="25" cy="27" r="2" />
                      <circle cx="12" cy="27" r="2" />
                    </g>
                  </svg>
                  <span style={{ marginLeft: "5px" }}>My Cart</span>
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">{numberItem}</div>
                </Link>
              </li>
            </ul>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

export const TitleLogo = styled(Typography)({
  fontWeight: "700",
  fontSize: "25px",
  fontFamily: "system-ui",
});
