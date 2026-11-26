export const TableStyles = {
  card: {
    borderColor: "divider",
    boxShadow: "0 3px 14px rgba(23, 46, 91, 0.05)",
    overflow: "hidden",
  },
  toolbar: {
    p: 2,
    borderBottom: 1,
    borderColor: "divider",
  },
  table: {
    minWidth: 650,
    "& .MuiTableCell-root": {borderColor: "divider", px: 1.25},
    "& .MuiTableCell-head": {
      color: "text.secondary",
      fontSize: "0.72rem",
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: "0.035em",
      textTransform: "uppercase",
      py: 1.25,
      bgcolor: "#f8fbfd",
    },
    "& .MuiTableSortLabel-icon": {fontSize: "1rem", mx: 0.25},
    "& .MuiTableCell-body": {py: 1.5, fontSize: "0.82rem"},
    "& .MuiTableCell-body:first-of-type": {fontWeight: 700},
    "& tbody tr:hover": {bgcolor: "#f6faff"},
  },
  noContentStyle: {p: 3, color: "text.secondary"},
};
