import { Stack, Typography } from "@mui/material";
import Header from "./Header";
import MainGrid from "./MainGrid";

export default function SingleEmbedDashboard({
  selectedView,
}: {
  selectedView: "malloySamples" | "singleEmbed" | "dynamicDashboard";
}) {
  return (
    <Stack spacing={2} sx={{ mt: { xs: 8, md: 0 }, mb: 8 }}>
      <Header selectedView={selectedView} />
      <MainGrid />
    </Stack>
  );
}
