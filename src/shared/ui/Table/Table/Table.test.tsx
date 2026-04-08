import {render, screen} from "@testing-library/react";

import {Table} from "./Table";
import {TableRowProps} from "../TableRow/Types";

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
jest.mock("../../../../Config/envManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

describe("Table", () => {
  it("should render the table component with headers and cells provided", () => {
    render(<Table headerLabels={mockHeaderLabels} rows={mockRows} />);

    expect(screen.getByText("header1")).toBeInTheDocument();
    expect(screen.getByText("cell1")).toBeInTheDocument();
  });

  it("should render no results text when an empty rows list has been provided", () => {
    render(<Table headerLabels={mockHeaderLabels} rows={[]} />);

    expect(screen.getByText("No records to display")).toBeInTheDocument();
  });

  it("should render actions when renderActions prop is provided", () => {
    const renderActions = () => <button>Action</button>;

    render(
      <Table
        headerLabels={mockHeaderLabels}
        rows={mockRows}
        renderActions={renderActions}
      />,
    );

    expect(screen.getAllByText("Action")).toHaveLength(mockRows.length);
  });
});
