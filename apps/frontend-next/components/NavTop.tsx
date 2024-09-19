"use client";
import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import BurgerMenu from "./BurgerMenu";

function NavTop() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "10%",
        maxHeight: "70px",
        position: "absolute",
        top: 0,
        paddingY: "7px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src="/profit-logo.svg"
          alt="Profit Icon"
          width={32}
          height={32}
        ></Image>
      </Box>
      <Box
        sx={{
          width: " 226px",
          height: "32px",
          background:
            "linear-gradient(180deg, rgba(40, 231, 197, 0.15) -142.19%, rgba(11, 20, 38, 0.15) 214.06%)",
          borderRadius: "19px",
        }}
      ></Box>
      <BurgerMenu />
    </Box>
  );
}

export default NavTop;
