import * as React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Tooltip,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import AddIcon from "@mui/icons-material/Add";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { QueryResult } from "@malloy-publisher/sdk";
import Header from "./Header";
import { useAuth } from "../hooks/useAuth";
import { parseQueryResultString } from "../utils/parseQueryResultString";
import { Widget } from "../types/widget";
import { getNextWidgetPosition } from "../utils/getNextWidgetPosition";
import { v4 as uuidv4 } from "uuid";

const DASHBOARD_STORAGE_KEY = "my-dashboard-widgets";

export default function DynamicDashboard({
  selectedView,
}: {
  selectedView: "malloySamples" | "singleEmbed" | "dynamicDashboard";
}) {
  const { accessToken } = useAuth();

  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [newQuery, setNewQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [loaded, setLoaded] = useState(false);

  const handleAddWidget = () => {
    const parsed = parseQueryResultString(newQuery);
    if (!parsed) {
      setErrorMessage("Invalid QueryResult JSX snippet.");
      return;
    }

    const id = uuidv4();
    const widgetWidth = 12;
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

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(widgets));
    }
  }, [widgets, loaded]);

  useEffect(() => {
    const saved = localStorage.getItem(DASHBOARD_STORAGE_KEY);
    if (saved) {
      try {
        const parsed: Widget[] = JSON.parse(saved);
        setWidgets(parsed);
      } catch (err) {
        console.error("Failed to parse saved dashboard", err);
      }
    } else {
      setWidgets([]);
    }
    setLoaded(true);
  }, []);

  return (
    <Stack spacing={2} sx={{ mt: { xs: 8, md: 0 }, mb: 8 }}>
      <Header selectedView={selectedView} />

      <GridLayout
        className="layout"
        layout={widgets.map((w) => w.layout)}
        cols={12}
        rowHeight={40}
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
                width: "90%",
                height: "396px",
                overflow: "visible",
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
    </Stack>
  );
}
