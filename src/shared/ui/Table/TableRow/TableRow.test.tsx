import {render, screen} from "@testing-library/react";

import {TableRow} from "./TableRow";
import {TableCellProps} from "../TableCell/Types";

jest.mock("../../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));

jest.mock("../../../../features/menu", () => ({
  __esModule: true,
  useMenuStore: jest.fn().mockReturnValue("SAMPLES"),
  selectSelectedMenuItem: jest.fn(),
}));

describe("TableRow component", () => {
  it("should render correctly", () => {
    const mockCells: TableCellProps[] = [
      {align: "left", children: "cell1"},
      {align: "right", children: "cell2"},
      {align: "center", children: "cell3"},
    ];

    render(<TableRow cells={mockCells} />);

    mockCells.forEach((cell) => {
      expect(screen.getByText(cell.children as string)).toBeInTheDocument();
    });
  });

  it("should show progress element when cells list is empty", () => {
    render(<TableRow cells={[]} />);

    expect(screen.queryByRole("progressbar")).toBeInTheDocument();
  });
});
