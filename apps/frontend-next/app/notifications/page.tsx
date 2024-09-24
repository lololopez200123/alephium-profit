"use client";
import { Box, Typography } from "@mui/material";

function Notfications() {
  return (
    <Box
      sx={{
        display: "flex",
        paddingBlock: "20%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        paddingX: "1rem",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <Typography>Coming Soon</Typography>
    </Box>
  );
}

export default Notfications;
