export interface CommonTextFieldProps {
  variant: "standard" | "outlined" | "filled";
  fullWidth: boolean;
  InputProps: {
    readOnly: boolean;
  };
}

export interface StackRowDirectionSpacingPropsProps {
  gap: string;
  direction: "row" | "column";
  spacing: number;
}

export interface StackContainerProps {
  gap: string;
  marginTop: string;
  flexGrow: number;
}

export interface StackFieldProps {
  width: string;
  minWidth: number;
}

export interface BoxContainerProps {
  display: string;
  flexDirection: string;
  padding: string;
  width: string;
  minHeight: string;
  boxSizing: "border-box";
  backgroundColor: string;
}
