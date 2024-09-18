'use client';
import React from 'react';
import { LineChart, markElementClasses, axisClasses, lineElementClasses } from '@mui/x-charts';
import { Box } from '@mui/material';

function Chart() {
  const pData = [{ data: [-100, -200, -1000, -200] }];
  // maxN and minN is used to set the max and min value of the y axis to avoid the chart from being cut off :D
  const maxN = (pData?.[0]?.data?.reduce((a, b) => Math.max(a, b)) || 1) * 1.1;
  const minN = (pData?.[0]?.data?.reduce((a, b) => Math.min(a, b)) || -1) * 1.1;
  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: '560px',
        width: '145%',
        left: '50%',
        transform: 'translateX(-50%)',
        height: '200px',
        [`& .${markElementClasses.root}`]: {
          display: 'none',
        },
        [`& .${axisClasses.root}`]: {
          display: 'none',
        },
        [`& .${lineElementClasses.root}`]: {
          stroke: 'url(#gradient)', // Use gradient ID here
          strokeWidth: 3,
        },
      }}
    >
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#28E7C5', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#6942E2', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
      <LineChart yAxis={[{ max: maxN, min: minN }]} axisHighlight={{ x: 'none', y: 'none' }} series={pData} />
    </Box>
  );
}

export default Chart;
