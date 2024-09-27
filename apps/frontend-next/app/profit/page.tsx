"use client";
import Chart from "@/components/Chart";
import { Box, Button, Typography } from "@mui/material";
import { userBalanceAtom } from "@/store/userBalanceAtom";
import { useAtom } from "jotai";
import Image from "next/image";
import { useState } from "react";
import { TokenDetails } from "../../../backend-nest/src/indexer-alephium/interfaces/balance";

const FIRST_COIN: TokenDetails = {
  name: "Coin",
  amount: 0,
  amountOnAlph: 0,
  logo: "",
  percent: 0,
  isFavourite: false,
};

function ProfitCharts() {
  const [balance] = useAtom(userBalanceAtom);

  const coin =
    balance?.tokens?.filter((token) => token.isFavourite === true) || [];

  const selectedTime = ["1D", "1W", "1M", "1Y"];
  const [time, setTime] = useState<string | null>(null);
  const handleSelectionTime = (time: string) => {
    setTime(time);
  };

  const [selectCoin, setSelectCoin] = useState<TokenDetails | null>(FIRST_COIN);

  const handleSelectCoin = (item: TokenDetails) => {
    setSelectCoin(item);
  };
  const dataGraph = [
    ...(balance?.totalHistory.map((item) => item.totalAmount) || [0, 0]),
    balance?.totalAmount ?? 0,
  ];
  return (
    <Box
      sx={{
        display: "flex",
        paddingBlock: "1.25rem",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        paddingX: "1rem",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          height: "45%",
          position: "relative",
        }}
      >
        {/*Graph*/}
        <Box
          sx={{
            height: "100%",
            position: "absolute",
            width: "100%",
            zIndex: 2,
          }}
        >
          <Typography
            sx={{ fontSize: "0.9375rem", textTransform: "uppercase" }}
          >
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
              {selectCoin?.amount}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.9375rem",
                paddingLeft: "1%",
                color:
                  selectCoin?.percent !== undefined && selectCoin?.percent <= 0
                    ? "rgba(226, 66, 66, 1)"
                    : "rgba(40, 231, 197, 1)",
              }}
            >
              {selectCoin?.percent}
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
        </Box>
        <Box sx={{ height: "100%", marginTop: "3rem" }}>
          <Chart data={dataGraph} />
        </Box>
        {/*Selector*/}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            marginInline: "auto",
            paddingInline: "3rem",
            height: "2rem",
            display: "flex",
            justifyContent: "space-around",
            zIndex: 99,
          }}
        >
          {selectedTime?.map((id) => (
            <Button
              key={id}
              onClick={() => handleSelectionTime(id)}
              sx={{
                width: "42px",
                minWidth: "unset",
                height: "29px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0",
                backdropFilter: "blur(3px)",
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
                  color: "white",
                  fontFamily: "Poppins",
                }}
              >
                {id}
              </Typography>
            </Button>
          ))}
        </Box>
      </Box>
      <Typography
        sx={{
          marginBlock: "0.3125rem",
          marginLeft: "1.25rem",
        }}
        fontSize="0.625rem"
        variant="caption"
      >
        MY GRAPHS
      </Typography>
      <Box
        sx={{
          height: "45%",
          minHeight: "15.625rem",
          overflowY: "auto",
          paddingBottom: "4rem",
        }}
      >
        {/*Favorite Coins */}

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
                      src={item.logo}
                    />
                  </Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "uppercase" }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      paddingLeft: ".9rem",
                      fontSize: "0.625rem",
                      color:
                        item?.percent <= 0
                          ? "rgba(226, 66, 66, 1)"
                          : "rgba(40, 231, 197, 1)",
                    }}
                  >
                    {item.percent} %
                  </Typography>
                </Box>
                {/* Data section */}
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
                    {item.amountOnAlph} ALPH
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfitCharts;
