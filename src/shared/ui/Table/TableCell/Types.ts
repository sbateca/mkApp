export interface TableCellProps {
  key?: string;
  children: string | React.ReactElement;
  align: "center" | "inherit" | "justify" | "left" | "right";
}
