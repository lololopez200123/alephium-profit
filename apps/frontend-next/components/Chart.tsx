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

interface ChartProps {
  data: number[]; // Definimos que la prop `data` será un array de números
}

function Chart({ data }: ChartProps) {
  const arrayData = data;
  const isConstantData = arrayData.every((val) => val === arrayData[0]);
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
          transform: "translate(-50%,-30%)",
          height: "350px",
          [`& .${markElementClasses.root}`]: {
            display: "none",
          },
          [`& .${axisClasses.root}`]: {
            display: "none",
          },
          [`& .${lineElementClasses.root}`]: {
            stroke: isConstantData
              ? "url(#paint0_linear_285_258)"
              : "url(#gradient)",
            strokeWidth: 3,
          },
          [`& .${areaElementClasses.root}`]: {
            fill: isConstantData ? "none" : "url(#areaGradient)",
            opacity: 0.3,
          },
        }}
      >
        <svg width="0" height="0">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#6942E2", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#28E7C5", stopOpacity: 1 }}
              />
            </linearGradient>
            {/* Gradiente para el área */}
            <linearGradient id="areaGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0b1426" />
              <stop offset="100%" stopColor="rgba(40, 231, 197, .4)" />
            </linearGradient>
            <linearGradient
              id="paint0_linear_285_258"
              x1="375"
              y1="-0.5"
              x2="4.37114e-08"
              y2="-0.500033"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#28E7C5" />
              <stop offset="1" stop-color="#6942E2" />
            </linearGradient>
          </defs>
        </svg>

        <LineChart
          yAxis={[{ max: maxN, min: minN }]}
          axisHighlight={{ x: "none", y: "none" }}
          series={pData}
        />
        <line
          x1="0"
          y1="50"
          x2="300"
          y2="50"
          stroke="url(#gradient)"
          stroke-width="5"
        />
      </Box>
    </>
  );
}

export default Chart;
