import { Box, Typography } from "@mui/material";

interface ErrorScreenProps {
  error: {
    message: string;
  };
}

export function ErrorScreen({ error }: ErrorScreenProps) {
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
