import {render, screen} from "@testing-library/react";
import {SideSection} from "./SideSection";

jest.mock("../../../Config/envManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

describe("SideSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders children when isOpen is true", () => {
    const isOpen = true;
    render(
      <SideSection isOpen={isOpen}>
        <div>Test Child</div>
      </SideSection>,
    );

    const childElement = screen.getByText("Test Child");
    expect(childElement).toBeInTheDocument();
  });

  test("does not render children when isOpen is false", () => {
    const isOpen = false;
    render(
      <SideSection isOpen={isOpen}>
        <div>Test Child</div>
      </SideSection>,
    );

    const childElement = screen.queryByText("Test Child");
    expect(childElement).not.toBeInTheDocument();
  });
});
