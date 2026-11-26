export const LoginTemplateStyles = {
  container: {
    display: "grid",
    minHeight: "100dvh",
    gridTemplateColumns: {xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)"},
  },
  intro: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    background: "linear-gradient(145deg, #16236d 5%, #226da0 100%)",
    color: "#fff",
    px: {xs: 3, sm: 6, lg: 8},
    py: {xs: 4, md: 8},
  },
  access: {
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    px: {xs: 3, sm: 6},
    py: {xs: 5, md: 8},
  },
};
