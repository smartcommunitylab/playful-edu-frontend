import { useMediaQuery, Theme } from "@mui/material";
import { MyAppBar } from "./MyAppBar";
import { Login, Title, useLogin, useTranslate } from "react-admin";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

export const LoginPage = () => {
  const isLarge = useMediaQuery<Theme>((theme) => theme.breakpoints.down("lg"));
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

  return (
    <>
      <MyAppBar></MyAppBar>
      <Title title="titlePages.dashboard" />

      <Login
        sx={{
          backgroundImage: "none",
          "& .RaLogin-avatar": {
            display: "none",
          },
          "& .RaLogin-card": {
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left:
              !isLarge && !isSmall ? "30%" : isLarge && !isSmall ? "20%" : "5%",
            right:
              !isLarge && !isSmall ? "30%" : isLarge && !isSmall ? "20%" : "5%",
            top: "35%",
            marginTop: 0,
            minWidth: 0,
          },
        }}
      >
        <LoginCard />
      </Login>
    </>
  );
};

const LoginCard = () => {
  const translate = useTranslate();
  const login = useLogin();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    login({});
  };

  return (
    <Box style={{ padding: 20 }}>
      <Box textAlign="center" mb={4}>
        <h1>{translate("resources.dashboard.welcome")}</h1>
      </Box>

      <Box display="flex" justifyContent="center">
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleLogin}
          disabled={loading}
        >
          {translate("ra.auth.sign_in")}
        </Button>
      </Box>
    </Box>
  );
};
