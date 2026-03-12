import {render, screen} from "@testing-library/react";

import {TableRowProps} from "../../../../components/molecules/TableRow/Types";
import {Table} from "./Table";

const mockHeaderLabels = ["header1", "header2"];
const mockRows: TableRowProps[] = [
  {
    cells: [
      {children: "cell1", align: "left"},
      {children: "cell2", align: "left"},
    ],
  },
  {
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
});
