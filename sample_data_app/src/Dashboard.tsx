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
import Typography from "@mui/material/Typography";
import AppNavbar from "./components/AppNavbar";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import MainGrid from "./components/MainGrid";
import { useMemo } from "react";
import { useAuth } from "./hooks/useAuth";
import { QueryResult } from "@malloy-publisher/sdk";

export default function Dashboard() {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const defaultTheme = useMemo(
    () => createTheme({ palette: { mode } }),
    [mode]
  );

  const { isLoading, accessToken, error } = useAuth();

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography color="error">
          Authentication error: {error.message}
        </Typography>
      </Box>
    );
  }

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
              <Box
                sx={{
                  height: "600px",
                  overflow: "auto",
                  borderRadius: 1,
                  p: 2,
                }}
              >
                {/* Replace MainGrid with a QueryResult */}
                <MainGrid />
              </Box>
            </Stack>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
