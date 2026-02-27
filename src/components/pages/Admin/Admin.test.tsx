import {render, screen} from "@testing-library/react";
import {Admin} from "./Admin";
import {MainTemplateProps} from "../../templates/Main/Type";

jest.mock("../../../Config/envManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));
jest.mock("../../organisms/ReportsDetail", () => ({
  ReportsDetail: () => <div data-testid="reportsDetailComponent" />,
}));
jest.mock("../../templates/Main/Main", () => ({
  MainTemplate: ({header, menu, mainContent}: MainTemplateProps) => (
    <div>
      <div data-testid="headerComponent">{header}</div>
      <div data-testid="menuComponent">{menu}</div>
      <div data-testid="mainContentComponent">{mainContent}</div>
    </div>
  ),
}));

describe("Admin component", () => {
  it("renders without crashing", async () => {
    render(<Admin />);

    expect(screen.getByTestId("headerComponent")).toBeInTheDocument();
    expect(screen.getByTestId("menuComponent")).toBeInTheDocument();
    expect(screen.getByTestId("mainContentComponent")).toBeInTheDocument();
  });
});
