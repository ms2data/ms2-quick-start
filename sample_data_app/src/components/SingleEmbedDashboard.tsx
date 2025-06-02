import { Stack, Typography, Box } from "@mui/material";
import Header from "./Header";
import { QueryResult } from "@malloy-publisher/sdk";
import { useAuth } from "../hooks/useAuth";

export default function SingleEmbedDashboard({
  selectedView,
}: {
  selectedView: "malloySamples" | "singleEmbed" | "dynamicDashboard";
}) {
  const { accessToken } = useAuth();
  return (
    <Stack spacing={2} sx={{ mt: { xs: 8, md: 0 }, mb: 8 }}>
      <Header selectedView={selectedView} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Open 'src/components/SingleEmbedDashboard.tsx' and replace this text
          with a '&lt;QueryResult&gt;' embedding tag obtained from a notebook
          cell in VS Code or in the MS2 admin app.
        </Typography>
      </Box>
    </Stack>
  );
}
