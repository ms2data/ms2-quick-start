import * as React from "react";
import {
  PaletteMode,
  createTheme,
  ThemeProvider,
  alpha,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "./components/AppNavbar";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { QueryResult } from "@malloy-publisher/sdk";
import MainGrid from "./components/MainGrid";

export default function Dashboard() {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const defaultTheme = createTheme({ palette: { mode } });

  const { isLoading, isAuthenticated, loginWithRedirect, getIdTokenClaims } =
    useAuth0();
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    (async function login() {
      if (!isLoading && !isAuthenticated) {
        await loginWithRedirect();
      }
    })();
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  useEffect(() => {
    const getIdToken = async () => {
      try {
        const token = await getIdTokenClaims();
        if (token) {
          setAccessToken(token.__raw);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getIdToken();
  }, [isLoading, isAuthenticated, getIdTokenClaims]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          {accessToken && (
            <Stack
              spacing={2}
              sx={{
                mx: 3,
                pb: 10,
                mt: { xs: 8, md: 0 },
              }}
            >
              <Header />
              {/* Replace MainGrid with a QueryResult */}
              <MainGrid />
            </Stack>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
