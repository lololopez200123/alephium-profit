import Chart from "@/components/Chart";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

function ProfitChards() {
  const coin = [
    {
      name: "ALEPHIUM",
      amount: "10 ALPH",
      price: "3.10",
      cant: 1.223453,
      pnl: "-2.78",
    },
    { name: "USDT", amount: "10 ALPH ", price: "1" },
    { name: "WBTC", amount: "2100 ALPH", price: "60000" },
    { name: "WETH", amount: "12 ALPH", price: "2122" },
    { name: "ALEPHIUM", amount: "10 ALPH", price: "2.5" },
  ];

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: 60,
        }}
      >
        <Typography variant="caption">PROFIT CHARDS</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          marginTop: "30%",
          paddingBottom: "78px",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          paddingX: "1rem",
          overflow: "auto",
        }}
      >
        <Box>
          <Typography sx={{ fontSize: "0.9375rem" }}>{coin[0].name}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "baseline",
            }}
          >
            <Typography sx={{ fontSize: "2.5rem" }}>{coin[0].cant}</Typography>
            <Typography
              sx={{
                fontSize: "0.9375rem",
                paddingLeft: "1%",
                color: true ? "rgba(226, 66, 66, 1)" : "rgba(40, 231, 197, 1)",
              }}
            >
              {coin[0].pnl}
            </Typography>
          </Box>
          <Chart></Chart>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderRadius: "10px",
              background: `linear-gradient(180deg, rgba(255, 255, 255, 0.15) -142.19%, rgba(11, 20, 38, 0.15) 214.06%)`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "24px",
                  height: "24px",
                  background: "white",
                  borderRadius: "30px",
                  margin: "0.8rem",
                  marginInline: "1.25rem",
                }}
              >
                <Image
                  width="16"
                  height="16"
                  alt="1"
                  src="/ALPHAGA.png"
                ></Image>
              </Box>
              <Typography variant="subtitle2">moneda</Typography>
            </Box>
            <Box
              sx={{
                width: "16%",
                display: "flex",
                alignItems: "left",
                flexDirection: "column",
                marginInline: "3%",
                justifyContent: "center",
              }}
            >
              <Typography variant="subtitle1">{1234}</Typography>
              <Typography fontSize="0.625rem" variant="caption">
                {23}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProfitChards;
