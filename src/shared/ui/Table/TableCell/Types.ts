export interface TableCellProps {
  key?: string;
  children: string | React.ReactElement;
  isDate?: boolean;
  badgeColor?: "info" | "success" | "warning";
  align: "center" | "inherit" | "justify" | "left" | "right";
}
