import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";

const mainListItems = [
  { key: "malloySamples", text: "Malloy Samples", icon: <HomeRoundedIcon /> },
  { key: "singleEmbed", text: "Single Embed", icon: <AnalyticsRoundedIcon /> },
  {
    key: "dynamicDashboard",
    text: "Dynamic Dashboard",
    icon: <AssignmentRoundedIcon />,
  },
];

export default function MenuContent({
  selectedView,
  setSelectedView,
}: {
  selectedView: "malloySamples" | "singleEmbed" | "dynamicDashboard";
  setSelectedView: (
    view: "malloySamples" | "singleEmbed" | "dynamicDashboard"
  ) => void;
}) {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedView === item.key}
              onClick={() => setSelectedView(item.key as any)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
