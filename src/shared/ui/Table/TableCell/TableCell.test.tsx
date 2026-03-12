import {mockData, renderCell} from "./TableCell.test.page";

describe("TableCell", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("TableCell renders the text passed as parameter", async () => {
    const {cell} = await renderCell(mockData.children);

    expect(cell).toBeInTheDocument();
    expect(cell).toHaveTextContent(mockData.children as string);
  });

  it("TableCell aligns the text to the center", async () => {
    const {cell} = await renderCell(mockData.children as string);

    expect(cell).toHaveStyle("text-align: center");
  });

  it("TableCell renders a React element", async () => {
    const {cell} = await renderCell(
      <div data-testid="cellContent">{mockData.children}</div>,
    );

    expect(cell).toBeInTheDocument();
  });
});
