import {fireEvent, render, screen, within} from "@testing-library/react";

import {Table} from "./Table";
import {TableRowProps} from "../TableRow/Types";
import {useTableControls} from "./useTableControls";

const mockHeaderLabels = ["header1", "header2"];
const mockRows: TableRowProps[] = [
  {
    id: "row1",
    cells: [
      {children: "cell1", align: "left"},
      {children: "cell2", align: "left"},
    ],
  },
  {
    id: "row2",
    cells: [
      {children: "cell3", align: "left"},
      {children: "cell4", align: "left"},
    ],
  },
];
const paginatedRows: TableRowProps[] = Array.from({length: 6}, (_, index) => ({
  id: `row${index + 1}`,
  cells: [
    {children: `cell${index + 1}`, align: "left"},
    {children: `value${index + 1}`, align: "left"},
  ],
}));

jest.mock("../../../../Config/envManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

const ControlledTable = ({
  rows,
  renderActions,
}: {
  rows: TableRowProps[];
  renderActions?: (row: TableRowProps) => React.ReactElement;
}) => {
  const tableControls = useTableControls(rows);

  return (
    <Table
      headerLabels={mockHeaderLabels}
      rows={rows}
      renderActions={renderActions}
      {...tableControls}
    />
  );
};

describe("Table", () => {
  it("should render the table component with headers and cells provided", () => {
    render(<ControlledTable rows={mockRows} />);

    expect(screen.getByText("header1")).toBeInTheDocument();
    expect(screen.getByText("cell1")).toBeInTheDocument();
  });

  it("should render no results text when an empty rows list has been provided", () => {
    render(<ControlledTable rows={[]} />);

    expect(screen.getByText("No records to display")).toBeInTheDocument();
  });

  it("should render actions when renderActions prop is provided", () => {
    const renderActions = () => <button>Action</button>;

    render(<ControlledTable rows={mockRows} renderActions={renderActions} />);

    expect(screen.getAllByText("Action")).toHaveLength(mockRows.length);
  });

  it("should sort rows when a header label is clicked", () => {
    render(<ControlledTable rows={[mockRows[1], mockRows[0]]} />);

    fireEvent.click(screen.getByText("header1"));

    const rows = screen.getAllByRole("row");

    expect(within(rows[1]).getByText("cell1")).toBeInTheDocument();
    expect(within(rows[2]).getByText("cell3")).toBeInTheDocument();
  });

  it("should paginate rows with controlled table state", () => {
    render(<ControlledTable rows={paginatedRows} />);

    expect(screen.getByText("cell1")).toBeInTheDocument();
    expect(screen.queryByText("cell6")).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Go to next page"));

    expect(screen.queryByText("cell1")).not.toBeInTheDocument();
    expect(screen.getByText("cell6")).toBeInTheDocument();
  });
});
