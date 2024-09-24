"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import BurgerMenu from "./BurgerMenu";
import { usePathname } from "next/navigation";
import ButtonConnectWallet from "./ButtonConnectWallet";

function NavTop() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);
  const isHome = currentPath === "/home";
  const getHeaderTitle = () => {
    switch (currentPath) {
      case "/home":
        return "Overview";
      case "/profit":
        return "Profit Charts";
      case "/wallet":
        return "Wallet";
      case "/notifications":
        return "Notifications";
      case "/profile":
        return "Profile";
      default:
        return "";
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        zIndex: 2,
        height: "auto",
        top: 0,
        paddingY: "7px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(11, 20, 38, 0.8)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxHeight: "70px",
          paddingY: "7px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "20%",
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
            width: "60%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!isHome ? (
            <Box
              sx={{
                width: " 226px",
                height: "32px",
                background:
                  "linear-gradient(180deg, rgba(40, 231, 197, 0.15) -142.19%, rgba(11, 20, 38, 0.15) 214.06%)",
                borderRadius: "19px",
              }}
            ></Box>
          ) : (
            <ButtonConnectWallet />
          )}
        </Box>
        <Box
          sx={{
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BurgerMenu />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          height: "20px",
        }}
      >
        <Typography>{getHeaderTitle()}</Typography>
      </Box>
    </Box>
  );
}

export default NavTop;
