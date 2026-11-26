import {SxProps} from "@mui/material";

export const mainTemplateStyle = {
  display: "flex",
  minHeight: "100dvh",
};

export const ContentStyle: SxProps = {
  px: {xs: 1.5, sm: 3, lg: 4},
  pt: {xs: 2.5, sm: 3.5},
  pb: 4,
  mt: "48px",
  "& h1": {fontWeight: 800, letterSpacing: "-0.03em", fontSize: "1.8rem"},
};
