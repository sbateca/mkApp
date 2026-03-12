import {ReactElement} from "react";

import {render, screen} from "@testing-library/react";

import {TableCell} from "./TableCell";
import {TableCellProps} from "./Types";

export const mockData: TableCellProps = {
  children: "cell text",
  align: "center",
};

export const renderCell = async (cellContent: string | ReactElement) => {
  render(<TableCell align={mockData.align}>{cellContent}</TableCell>);
  return {
    cell:
      typeof cellContent === "string"
        ? screen.getByText(cellContent as string)
        : screen.getByTestId("cellContent"),
    screen,
  };
};
