import ScienceOutlined from "@mui/icons-material/ScienceOutlined";
import {Box, Typography} from "@mui/material";

import {COMPANY_NAME} from "../../../utils/constants";

export const AppBrand = () => (
  <Box sx={{display: "flex", alignItems: "center", gap: 1.25}}>
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        width: 38,
        height: 38,
        borderRadius: 2,
        bgcolor: "#e2f3fc",
        color: "#1c2876",
        flexShrink: 0,
      }}
    >
      <ScienceOutlined aria-hidden="true" />
    </Box>
    <Typography sx={{fontSize: "1.2rem", fontWeight: 800, lineHeight: 1.15}}>
      {COMPANY_NAME}
    </Typography>
  </Box>
);
