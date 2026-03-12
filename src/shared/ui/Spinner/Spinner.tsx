import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Spinner = (): React.ReactElement => {
  return (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <CircularProgress />
    </Box>
  );
};
