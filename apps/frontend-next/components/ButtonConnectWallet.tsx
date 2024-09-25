import { AlephiumConnectButton } from "@alephium/web3-react";
import { useState } from "react";
import { Button, Box, Typography, Modal, IconButton } from "@mui/material";
import Image from "next/image";
import nookies from "nookies";

import { useAtom } from "jotai";
import { userAtom } from "@/store/userAtom";

const ButtonConnectWallet = () => {
  const [open, setOpen] = useState(false);

  const [user, setUser] = useAtom(userAtom);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <AlephiumConnectButton.Custom>
      {({ isConnected, disconnect, show, account }) => {
        let text: string = "";
        if (user?.name) {
          text = user.name;
        } else {
          const firstPart = account?.address?.substring(0, 6);
          const lastPart = account?.address?.substring(
            account?.address?.length - 6
          );
          text = firstPart + "..." + lastPart;
        }
        const handleDisconnect = () => {
          localStorage.clear();
          nookies.destroy(null, "jwt");
          disconnect();
        };

        return isConnected ? (
          <>
            <Button
              onClick={handleOpen}
              sx={{
                width: "150px",
                color: "white",
                textTransform: "none",
                paddingInline: "1rem",
                height: "30px",
                background: "linear-gradient(90deg, #6942E2 0%,  #28E7C5 99%)",
                borderRadius: "41px",
                fontSize: { xs: "12px", sm: "14px" },
              }}
            >
              {text}
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "black",
                  border: "2px solid #000",
                  borderRadius: "20px",
                  boxShadow: 24,
                  p: 4,
                  textAlign: "center",
                }}
              >
                <IconButton
                  sx={{ position: "absolute", right: 0, top: 0 }}
                  edge="start"
                  onClick={handleClose}
                >
                  <Image alt="close" src="/close.svg" width="25" height="25" />
                </IconButton>
                <Typography variant="h6">{text}</Typography>
                <Button onClick={handleDisconnect}>Disconnect</Button>
              </Box>
            </Modal>
          </>
        ) : (
          <Button
            onClick={show}
            sx={{
              width: "150px",
              color: "white",
              textTransform: "none",
              paddingInline: "1rem",
              height: "30px",
              background: "linear-gradient(90deg, #6942E2 0%,  #28E7C5 99%)",
              borderRadius: "41px",
              fontSize: { xs: "12px", sm: "14px" },
            }}
          >
            Connect
          </Button>
        );
      }}
    </AlephiumConnectButton.Custom>
  );
};

export default ButtonConnectWallet;
