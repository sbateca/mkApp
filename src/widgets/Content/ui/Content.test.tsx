import {renderContent, updateUseMenu} from "./Content.test.page";
import {SharedMenuItems} from "../../../utils/enums";

describe("Content component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders SamplesContent when selectedMenuItem is 'Samples'", async () => {
    updateUseMenu(SharedMenuItems.SAMPLES);
    const {screen} = await renderContent();

    expect(screen.getByTestId("samples-content")).toBeInTheDocument();
  });

  it("renders Reports when selectedMenuItem is 'Reports'", async () => {
    updateUseMenu(SharedMenuItems.REPORTS);
    const {screen} = await renderContent();

    expect(screen.getByTestId("reports-content")).toBeInTheDocument();
  });
});
