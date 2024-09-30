'use client';
import React from 'react';
import { LineChart, markElementClasses, axisClasses, lineElementClasses, areaElementClasses } from '@mui/x-charts';
import { Box, Typography } from '@mui/material';

interface ChartProps {
  data: number[]; // Definimos que la prop `data` será un array de números
}

const FACTOR_MULTIPLIER = 1.5;
function Chart({ data }: ChartProps) {
  if (!data || data.length === 1) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography textAlign={'center'} color={'rgba(40, 231, 197, .4)'}>
          Not enough information <br /> to show the graph.
        </Typography>
      </Box>
    );
  }
  const arrayData = data;
  const isConstantData = arrayData.every((val) => val === arrayData[0]);
  // maxN and minN is used to set the max and min value of the y axis to avoid the chart from being cut off :D
  const maxN = (arrayData?.reduce((a, b) => Math.max(a, b)) || 1) * FACTOR_MULTIPLIER;
  const minN =
    (arrayData?.reduce((a, b) => Math.min(a, b)) || -1) * FACTOR_MULTIPLIER > 0 ? 0 : (arrayData?.reduce((a, b) => Math.min(a, b)) || -1) * FACTOR_MULTIPLIER;
  const pData = [{ data: arrayData, area: true, baseline: minN }];
  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: '560px',
        width: '145%',
        left: '50%',
        transform: 'translate(-50%,-20%)',
        height: '100%',
        [`& .${markElementClasses.root}`]: {
          display: 'none',
        },
        [`& .${axisClasses.root}`]: {
          display: 'none',
        },
        [`& .${lineElementClasses.root}`]: {
          stroke: isConstantData ? 'url(#paint0_linear_285_258)' : 'url(#gradient)',
          strokeWidth: 3,
        },
        [`& .${areaElementClasses.root}`]: {
          fill: isConstantData ? 'none' : 'url(#areaGradient)',
          opacity: 0.3,
        },
      }}
    >
      <LineChart yAxis={[{ max: maxN, min: minN }]} axisHighlight={{ x: 'none', y: 'none' }} series={pData}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6942E2" stopOpacity="1" />
            <stop offset="100%" stopColor="#28E7C5" stopOpacity="1" />
          </linearGradient>
          {/* Gradiente para el área */}
          <linearGradient id="areaGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0b1426" />
            <stop offset="100%" stopColor="rgba(40, 231, 197, .4)" />
          </linearGradient>
          <linearGradient id="paint0_linear_285_258" x1="375" y1="-0.5" x2="4.37114e-08" y2="-0.500033" gradientUnits="userSpaceOnUse">
            <stop stopColor="#28E7C5" />
            <stop offset="1" stopColor="#6942E2" />
          </linearGradient>
        </defs>
      </LineChart>
    </Box>
  );
}

export default Chart;
