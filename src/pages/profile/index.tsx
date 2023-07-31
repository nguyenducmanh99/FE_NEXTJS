"use client";
/* eslint-disable @next/next/no-img-element */
import { Helmet } from "react-helmet-async";
import { ReactElement, useCallback, useState } from "react";
// @mui
import {
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
// components

import FullLayout from "@/layout/FullLayout";
import Iconify from "@/components/utils/iconify";
import "tailwindcss/tailwind.css";
import { useLocalStorage } from "@/hook";
import { AUTH_INFO } from "@/constant";
// ----------------------------------------------------------------------

export default function Profile() {
  const [authInfo, setAuthInfo] = useLocalStorage(AUTH_INFO, "");
  console.log(authInfo);
  return (
    <>
      <Helmet>
        <title> Profile </title>
      </Helmet>
      <Container sx={{ mx: 0, maxWidth: "unset !important" }}>
        <main className="profile-page">
          <section className="relative block" style={{ height: "700px" }}>
            <div className="w-full">
              <div className="relative">
                <img
                  alt="..."
                  src={"/images/background.jpg"}
                  className="shadow-xl h-auto w-full align-middle border-none"
                />
              </div>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
              style={{ height: "70px", transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-300 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-gray-300">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <IconButton
                        className="relative"
                        size="large"
                        sx={{ width: "150px" }}
                      >
                        <img
                          alt="..."
                          src="https://i.pinimg.com/originals/e1/ed/eb/e1edeb6d3f086b74b0f33be6e665c10f.jpg"
                          className="shadow-xl rounded-full h-auto align-middle border-b border-teal-300 absolute -m-16 -ml-20 lg:-ml-16"
                          style={{ maxWidth: "150px" }}
                        />
                      </IconButton>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <button
                          className="bg-red-500 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                        >
                          Connect
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            22
                          </span>
                          <span className="text-sm text-gray-500">Friends</span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            10
                          </span>
                          <span className="text-sm text-gray-500">Photos</span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            89
                          </span>
                          <span className="text-sm text-gray-500">
                            Comments
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3
                      className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
                      suppressHydrationWarning
                    >
                      {authInfo.fullName}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                      <i
                        className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"
                        suppressHydrationWarning
                      ></i>{" "}
                      {`${authInfo.address}, Vietnamese`}
                    </div>
                    <div className="mb-2 text-gray-700 mt-10">
                      <i
                        className="fas fa-briefcase mr-2 text-lg text-gray-500"
                        suppressHydrationWarning
                      ></i>
                      {`${authInfo.phone} - ${authInfo.dateOfBirth}`}
                    </div>
                    <div className="mb-2 text-gray-700">
                      <i
                        className="fas fa-university mr-2 text-lg text-gray-500"
                        suppressHydrationWarning
                      ></i>
                      {authInfo.email}
                    </div>
                  </div>
                  {/* Form edit  */}
                  <div className="mt-10 py-10 border-t border-gray-300 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-gray-800">
                          An artist of considerable range, Jenna the name taken
                          by Melbourne-raised, Brooklyn-based Nick Murphy
                          writes, performs and records all of his own music,
                          giving it a warm, intimate feel with a solid groove
                          structure. An artist of considerable range.
                        </p>
                        <a
                          href="#pablo"
                          className="font-normal text-red-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Show more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Container>
    </>
  );
}
Profile.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
