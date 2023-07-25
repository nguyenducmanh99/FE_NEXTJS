"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
export default function Header() {
  const [top, setTop] = useState<boolean>(true);

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

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
                  href="/auth/signup"
                  className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                >
                  <span>Sign up</span>
                  <svg
                    className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                      fillRule="nonzero"
                    />
                  </svg>
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
