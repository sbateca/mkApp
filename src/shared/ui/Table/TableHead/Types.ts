export interface TableHeadProps {
  headerLabels: string[];
  order?: "asc" | "desc";
  orderBy?: number;
  sortableColumnCount?: number;
  onRequestSort?: (columnIndex: number) => void;
}
