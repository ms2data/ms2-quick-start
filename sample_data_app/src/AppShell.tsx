import { ThemeProvider } from "@emotion/react";
import {
  PaletteMode,
  createTheme,
  CssBaseline,
  Box,
  alpha,
} from "@mui/material";
import { useState, useMemo } from "react";
import AppNavbar from "./components/AppNavbar";
import SideMenu from "./components/SideMenu";
import { useAuth } from "./hooks/useAuth";
import { Loader } from "./components/Loader";
import { ErrorScreen } from "./components/ErrorScreen";
import MalloySamplesDashboard from "./components/MalloySamplesDashboard";
import SingleEmbedDashboard from "./components/SingleEmbedDashboard";
import DynamicDashboard from "./components/DynamicDashboard";

export default function AppShell() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const defaultTheme = useMemo(
    () => createTheme({ palette: { mode } }),
    [mode]
  );
  const [selectedView, setSelectedView] = useState<
    "malloySamples" | "singleEmbed" | "dynamicDashboard"
  >("malloySamples");

  const { isLoading, accessToken, error } = useAuth();

  if (error) {
    return <ErrorScreen error={error} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu
          selectedView={selectedView}
          setSelectedView={setSelectedView}
        />
        <AppNavbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: (theme) =>
              alpha(theme.palette.background.default, 1),
            overflow: "auto",
            p: 3,
            position: "relative",
          }}
        >
          {accessToken && (
            <>
              {selectedView === "malloySamples" && (
                <MalloySamplesDashboard selectedView={selectedView} />
              )}
              {selectedView === "singleEmbed" && (
                <SingleEmbedDashboard selectedView={selectedView} />
              )}
              {selectedView === "dynamicDashboard" && (
                <DynamicDashboard selectedView={selectedView} />
              )}
            </>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
