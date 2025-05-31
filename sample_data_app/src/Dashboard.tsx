import * as React from "react";
import { useMemo, useState } from "react";
import {
  Box,
  CssBaseline,
  CircularProgress,
  Typography,
  Stack,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Tooltip,
} from "@mui/material";
import { createTheme, ThemeProvider, PaletteMode } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import AddIcon from "@mui/icons-material/Add";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";

import { QueryResult } from "@malloy-publisher/sdk";
import AppNavbar from "./components/AppNavbar";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import { useAuth } from "./hooks/useAuth";
import { parseQueryResultString } from "./utils/parseQueryResultString";
import { Widget } from "./types/widget";
import { getNextWidgetPosition } from "./utils/getNextWidgetPosition";

export default function Dashboard() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const defaultTheme = useMemo(
    () => createTheme({ palette: { mode } }),
    [mode]
  );

  const { isLoading, accessToken, error } = useAuth();

  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [newQuery, setNewQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleAddWidget = () => {
    const parsed = parseQueryResultString(newQuery);
    if (!parsed) {
      setErrorMessage("Invalid QueryResult JSX snippet.");
      return;
    }

    const id = uuidv4();
    const widgetWidth = 6;
    const widgetHeight = 10;
    const cols = 12;

    const { x, y } = getNextWidgetPosition(widgets, widgetWidth, cols);

    const newWidget: Widget = {
      id,
      server: parsed.server,
      projectName: parsed.projectName,
      packageName: parsed.packageName,
      modelPath: parsed.modelPath,
      query: parsed.query,
      title: newTitle.trim() !== "" ? newTitle.trim() : undefined,
      layout: {
        i: id,
        x,
        y,
        w: widgetWidth,
        h: widgetHeight,
        static: false,
      },
      locked: false,
    };

    setWidgets((prev) => [...prev, newWidget]);
    setNewQuery("");
    setNewTitle("");
    setErrorMessage(null);
    setIsDialogOpen(false);
  };

  const handleRemove = (id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
  };

  const onLayoutChange = (newLayout: any[]) => {
    setWidgets((prev) =>
      prev.map((widget) => {
        const layoutItem = newLayout.find((l) => l.i === widget.id);
        return layoutItem ? { ...widget, layout: layoutItem } : widget;
      })
    );
  };

  const handleToggleLock = (id: string) => {
    setWidgets((prev) =>
      prev.map((widget) =>
        widget.id === id
          ? {
              ...widget,
              locked: !widget.locked,
              layout: { ...widget.layout, static: !widget.locked },
            }
          : widget
      )
    );
  };

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">
          Authentication error: {error.message}
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: alpha(theme.palette.background.default, 1),
            overflow: "auto",
            p: 3,
            position: "relative",
          })}
        >
          {accessToken && (
            <Stack spacing={2} sx={{ mt: { xs: 8, md: 0 } }}>
              <Header />

              <GridLayout
                className="layout"
                layout={widgets.map((w) => w.layout)}
                cols={12}
                rowHeight={30}
                width={1200}
                onLayoutChange={onLayoutChange}
                draggableHandle=".drag-handle"
              >
                {widgets.map((widget) => (
                  <div
                    key={widget.id}
                    data-grid={{ ...widget.layout, i: widget.id }}
                    style={{
                      border: "1px solid #ccc",
                      padding: 8,
                      borderRadius: 4,
                      overflow: "hidden",
                      maxWidth: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    <Box
                      sx={{
                        mb: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        className="drag-handle"
                        sx={{ cursor: "move" }}
                      >
                        {widget.title ? widget.title : widget.packageName}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Tooltip
                          title={widget.locked ? "Unlock chart" : "Lock chart"}
                          arrow
                        >
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              handleToggleLock(widget.id);
                            }}
                          >
                            {widget.locked ? <LockIcon /> : <LockOpenIcon />}
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Remove chart" arrow>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              handleRemove(widget.id);
                            }}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        overflow: "visible",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <QueryResult
                        server={widget.server}
                        accessToken={accessToken}
                        projectName={widget.projectName}
                        packageName={widget.packageName}
                        modelPath={widget.modelPath}
                        query={widget.query}
                      />
                    </Box>
                  </div>
                ))}
              </GridLayout>
            </Stack>
          )}

          <Tooltip title="Add embedded chart" arrow>
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => setIsDialogOpen(true)}
              sx={{
                position: "fixed",
                bottom: 24,
                right: 24,
                zIndex: 10,
              }}
            >
              <AddIcon />
            </Fab>
          </Tooltip>

          <Dialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Add Embedded Chart</DialogTitle>

            <DialogContent>
              <TextField
                label="Chart title (optional)"
                fullWidth
                value={newTitle}
                sx={{ mt: 1 }}
                onChange={(e) => setNewTitle(e.target.value)}
              />

              <TextField
                label="Paste embedded QueryResult"
                multiline
                fullWidth
                rows={6}
                value={newQuery}
                sx={{ mt: 1 }}
                onChange={(e) => setNewQuery(e.target.value)}
              />
              {errorMessage && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {errorMessage}
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleAddWidget}>
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
