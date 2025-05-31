import { Stack, Typography } from "@mui/material";
import Header from "./Header";

export default function MalloySamplesDashboard({
  selectedView,
}: {
  selectedView: "malloySamples" | "singleEmbed" | "dynamicDashboard";
}) {
  return (
    <Stack spacing={2} sx={{ mt: { xs: 8, md: 0 }, mb: 8 }}>
      <Header selectedView={selectedView} />
      <Typography variant="h4">Malloy Samples View</Typography>
    </Stack>
  );
}
