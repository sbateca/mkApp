import {
  mockTypographyDefaultProps,
  mockTypographyProps,
  renderTypography,
} from "./Typography.test.page";

describe("Typography", () => {
  it("should render the Typography with the provided parameters", async () => {
    const {typography} = await renderTypography(mockTypographyProps);

    expect(typography.textContent).toBe(mockTypographyProps.text);
    expect(typography).toHaveStyle(`font-size: ${mockTypographyProps.size}`);
    expect(typography).toHaveStyle(`padding: ${mockTypographyProps.padding}`);
    expect(typography).toHaveStyle(`text-align: ${mockTypographyProps.align}`);
    expect(typography).toHaveClass(
      `MuiTypography-${mockTypographyProps.variant}`,
    );
  });

  it("should render the Typography with the default parameters", async () => {
    const {typography} = await renderTypography(mockTypographyDefaultProps);

    expect(typography.textContent).toBe(mockTypographyDefaultProps.text);
    expect(typography).toHaveStyle("font-size: 6rem;");
    expect(typography).toHaveStyle("text-align: left");
    expect(typography).toHaveClass(
      `MuiTypography-${mockTypographyDefaultProps.variant}`,
    );
  });
});
