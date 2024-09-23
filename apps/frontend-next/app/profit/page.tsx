"use client";
import Chart from "@/components/Chart";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

interface Coin {
  name: string;
  amount: string;
  priceInAlph: string;
  cant: number;
  pnl: number;
}
function ProfitChards() {
  const coin: Coin[] = [
    {
      name: "ALEPHIUM",
      amount: "5000",
      priceInAlph: "1500",
      cant: 13213453,
      pnl: 0.8,
    },
    {
      name: "USDT",
      amount: "15000",
      priceInAlph: "1500",
      cant: 2353453,
      pnl: -2.78,
    },
  ];
  const selectedTime = ["1D", "1W", "1M", "1Y"];
  const [time, setTime] = useState<string | null>(null);
  const handleSelectionTime = (time: string) => {
    setTime(time);
  };
  const [selectCoin, setSelectCoin] = useState<Coin | null>(coin[0]);

  const handleSelectCoin = (item: Coin) => {
    setSelectCoin(item);
  };
  const dataGraph: number[] = [-100, 200];
  return (
    <Box
      sx={{
        display: "flex",
        paddingBlock: "20%",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        paddingX: "1rem",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {/*Graph*/}
      <Box sx={{ paddingTop: "2rem", height: "40vh" }}>
        <Typography sx={{ fontSize: "0.9375rem" }}>
          {selectCoin?.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "baseline",
          }}
        >
          <Typography sx={{ fontSize: "2.5rem" }}>
            {selectCoin?.cant}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.9375rem",
              paddingLeft: "1%",
              color:
                selectCoin?.pnl !== undefined && selectCoin?.pnl <= 0
                  ? "rgba(226, 66, 66, 1)"
                  : "rgba(40, 231, 197, 1)",
            }}
          >
            {selectCoin?.pnl}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: "0.625rem",
            paddingLeft: "1%",
          }}
        >
          Yesterday pnl
        </Typography>
        <Chart data={dataGraph} />
      </Box>

      {/*Selector*/}
      <Box
        sx={{
          width: "80%",
          marginInline: "auto",
          height: "2rem",
          display: "flex",
          justifyContent: "space-around",
          marginBlock: "2rem",
          zIndex: 2,
        }}
      >
        {selectedTime?.map((id) => (
          <Box
            key={id}
            onClick={() => handleSelectionTime(id)}
            sx={{
              width: "42px",
              height: "29px",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                id === time
                  ? "linear-gradient(180deg, #28E7C5 -100%, #0B1426 170.69%)"
                  : "linear-gradient(180deg, rgba(255, 255, 255, 0.15) -142.19%, rgba(11, 20, 38, 0.15) 214.06%)",
            }}
          >
            <Typography
              sx={{
                fontSize: ".9rem",
                textAlign: "center",
              }}
            >
              {id}
            </Typography>
          </Box>
        ))}
      </Box>
      {/*Favorite Coins */}
      <Typography
        sx={{ marginBottom: "5px", marginLeft: "20px" }}
        fontSize="0.625rem"
        variant="caption"
      >
        MY GRAPHS
      </Typography>
      <Box sx={{}}>
        <Box sx={{ height: "100%" }}>
          {coin?.map((item, index) => (
            <Box
              key={index}
              onClick={() => handleSelectCoin(item)}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderRadius: "10px",
                height: "48px",
                marginBlock: ".5rem",
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
                    alt={item.name}
                    src="/ALPHAGA.png"
                  />
                </Box>
                <Typography variant="subtitle2">{item.name}</Typography>
                <Typography
                  variant="caption"
                  sx={{
                    paddingLeft: ".9rem",
                    fontSize: "0.625rem",
                    color:
                      item?.pnl <= 0
                        ? "rgba(226, 66, 66, 1)"
                        : "rgba(40, 231, 197, 1)",
                  }}
                >
                  {item.pnl}
                </Typography>
              </Box>
              {/* Sección de datos */}
              <Box
                sx={{
                  width: "25%",
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                  marginInline: "3%",
                  justifyContent: "center",
                }}
              >
                <Typography variant="subtitle1">{item.amount}</Typography>
                <Typography fontSize="0.625rem" variant="caption">
                  {item.priceInAlph} ALPH
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default ProfitChards;
