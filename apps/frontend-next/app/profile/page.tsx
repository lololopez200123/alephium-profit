"use client";
import { Avatar, Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useAtom } from "jotai";
import { userAtom } from "@/store/userAtom";

function Profile() {
  const [user] = useAtom(userAtom);
  const initials = user?.name
    ?.split(" ") // Divide el nombre en palabras
    .slice(0, 2) // Toma las primeras dos palabras
    .map((word) => word[0].toUpperCase()) // Extrae la primera letra y la convierte en mayúscula
    .join("");
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
      <Box sx={{ height: "45%" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "12%",
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              background: "rgba(40, 231, 197, 1)",
            }}
          >
            <Typography
              sx={{ fontSize: "40px", color: "rgba(255, 255, 255, 1)" }}
            >
              {initials ?? "W"}
            </Typography>
          </Avatar>
          <Box sx={{ paddingBlock: "0.625rem", textAlign: "center" }}>
            <Typography
              fontSize={{ xs: ".937rem" }}
              fontWeight={500}
              color={"white"}
            >
              {user?.name ?? "WELCOME"}
            </Typography>
            <Typography
              sx={{
                fontSize: ".5rem",
                fontWeight: 400,
                color: "rgba(40, 231, 197, 1)",
                paddingTop: "0.3125rem",
              }}
            >
              Member since | {user?.date ?? "Sep, 30 2024"}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ height: "50%", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
            alignItems: "center",
            width: "100%",
            height: "100%",
            paddingBottom: "1.25rem",
          }}
        >
          <Link
            href={{
              pathname: "./",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingBlock: "2%",
                width: "450px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "1.25rem",
                  color: "rgba(40, 231, 197, 1)",
                }}
              >
                {"log out"}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "0.625rem",
                }}
              >
                <Image
                  alt="log out"
                  width={24}
                  height={24}
                  src="/rocket-color.svg"
                />
              </Box>
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
export default Profile;
