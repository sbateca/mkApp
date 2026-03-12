import {render, screen} from "@testing-library/react";

import TableHead from "./TableHead";

describe("TableHead component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should render correctly", () => {
    const mockHeaderLabels = ["header1", "header2", "header3"];

    render(<TableHead headerLabels={mockHeaderLabels} />);

    mockHeaderLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("shouldn't show any header labels when header labels list is empty", () => {
    render(<TableHead headerLabels={[]} />);
    expect(screen.queryByRole("cell")).not.toBeInTheDocument();
  });
});
