"use client";
import React from "react";
import {
  LineChart,
  markElementClasses,
  axisClasses,
  lineElementClasses,
  areaElementClasses,
} from "@mui/x-charts";
import { Box } from "@mui/material";

function Chart() {
  const arrayData = [1, 1];
  // maxN and minN is used to set the max and min value of the y axis to avoid the chart from being cut off :D
  const maxN = (arrayData?.reduce((a, b) => Math.max(a, b)) || 1) * 1.1;
  const minN =
    (arrayData?.reduce((a, b) => Math.min(a, b)) || -1) * 1.1 > 0
      ? 0
      : (arrayData?.reduce((a, b) => Math.min(a, b)) || -1) * 1.1;
  const pData = [{ data: arrayData, area: true, baseline: minN }];
  return (
    <>
      <Box
        sx={{
          position: "relative",
          maxWidth: "560px",
          width: "145%",
          left: "50%",
          transform: "translateX(-50%)",
          height: "200px",
          [`& .${markElementClasses.root}`]: {
            display: "none",
          },
          [`& .${axisClasses.root}`]: {
            display: "none",
          },
          [`& .${lineElementClasses.root}`]: {
            stroke: "url(#gradient)",
            strokeWidth: 3,
          },
          [`& .${areaElementClasses.root}`]: {
            fill: "url(#areaGradient)",
            opacity: 0.3,
          },
        }}
      >
        <svg width="0" height="0">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#28E7C5", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#6942E2", stopOpacity: 1 }}
              />
            </linearGradient>
            {/* Gradiente para el área */}
            <linearGradient id="areaGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="2%" stopColor="#0b1426" />
              <stop offset="80%" stopColor="rgba(40, 231, 197, .4)" />
            </linearGradient>
          </defs>
        </svg>
        <LineChart
          yAxis={[{ max: maxN, min: minN }]}
          axisHighlight={{ x: "none", y: "none" }}
          series={pData}
        />
      </Box>
    </>
  );
}

export default Chart;
